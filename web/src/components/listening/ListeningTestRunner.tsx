"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button, Container, Icon } from "@/components/ui";
import { ListeningTest } from "@/data/listening/types";
import {
  AudioItemState,
  buildModuleScreens,
  createInitialAnswers,
  createInitialAudioState,
  ItemAnswerState,
  normalizeQuestion,
  ScreenRef,
} from "./state";
import { ListeningScreen } from "./ListeningScreen";
import { ModuleIntroScreen } from "./ModuleIntroScreen";
import { ResultsScreen } from "./ResultsScreen";
import { gradeTest } from "./grade";

const AUTO_PLAY_DELAY_MS = 1200;

type View = "moduleIntro" | "screen" | "results";

export function ListeningTestRunner({
  test,
  sectionHref,
}: {
  test: ListeningTest;
  sectionHref: string;
}) {
  const moduleScreens = useMemo(
    () => test.modules.map((mod) => buildModuleScreens(mod)),
    [test]
  );

  const [view, setView] = useState<View>("moduleIntro");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<ItemAnswerState[][]>(() =>
    createInitialAnswers(test)
  );
  const [audioState, setAudioState] = useState<AudioItemState[][]>(() =>
    createInitialAudioState(test)
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function updateAudioState(mi: number, itemIndex: number, patch: Partial<AudioItemState>) {
    setAudioState((prev) => {
      const next = prev.map((m) => m.map((s) => ({ ...s })));
      next[mi][itemIndex] = { ...next[mi][itemIndex], ...patch };
      return next;
    });
  }

  function playAudio(mi: number, itemIndex: number, src: string) {
    const current = audioState[mi][itemIndex];
    if (current.played || current.playing) return;

    clearTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    updateAudioState(mi, itemIndex, {
      played: true,
      playing: true,
      finished: false,
      blocked: false,
      failed: false,
    });

    const audio = new Audio(`/audio/listening/${src}`);
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      updateAudioState(mi, itemIndex, { playing: false, finished: true });
      audioRef.current = null;
    });
    audio.addEventListener("error", () => {
      updateAudioState(mi, itemIndex, {
        playing: false,
        finished: false,
        played: false,
        failed: true,
      });
      audioRef.current = null;
    });

    audio.play().catch(() => {
      updateAudioState(mi, itemIndex, {
        playing: false,
        finished: false,
        played: false,
        blocked: true,
      });
      audioRef.current = null;
    });
  }

  // Mirrors the original app calling stopAudio() at the top of every render(),
  // then scheduling autoplay for the newly entered screen. The teardown (pausing
  // audio, clearing the timer, resetting the "playing" flag) runs in the cleanup
  // so it fires on every transition away from a screen, including unmount.
  useEffect(() => {
    if (view === "screen") {
      const screen = moduleScreens[moduleIndex][screenIndex];
      const item = test.modules[moduleIndex].items[screen.itemIndex];
      timerRef.current = setTimeout(() => {
        playAudio(moduleIndex, screen.itemIndex, item.audio);
      }, AUTO_PLAY_DELAY_MS);
    }

    return () => {
      clearTimer();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setAudioState((prev) =>
        prev.map((m) => m.map((s) => (s.playing ? { ...s, playing: false } : s)))
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, moduleIndex, screenIndex]);

  const mod = test.modules[moduleIndex];
  const currentScreen: ScreenRef | null = view === "screen" ? moduleScreens[moduleIndex][screenIndex] : null;
  const currentItem = currentScreen ? mod.items[currentScreen.itemIndex] : null;
  const currentAudioState = currentScreen ? audioState[moduleIndex][currentScreen.itemIndex] : null;
  const currentAnswer = currentScreen ? answers[moduleIndex][currentScreen.itemIndex] : null;

  function isScreenAnswered(): boolean {
    if (!currentScreen || !currentAnswer) return false;
    if (currentScreen.kind === "response") {
      return currentAnswer.kind === "response" && currentAnswer.selectedIndex !== null;
    }
    return (
      currentAnswer.kind === "set" &&
      currentAnswer.selectedIndexes[currentScreen.questionIndex] !== null
    );
  }

  const isLastScreenOfModule = screenIndex === moduleScreens[moduleIndex].length - 1;
  const isLastModule = moduleIndex === test.modules.length - 1;

  let nextLabel = "Next";
  if (view === "moduleIntro") nextLabel = "Start Module";
  else if (isLastScreenOfModule && isLastModule) nextLabel = "Finish & Score";
  else if (isLastScreenOfModule) nextLabel = "Next Module";

  const canNext = view === "moduleIntro" ? true : view === "screen" ? isScreenAnswered() : false;
  const isVeryFirstScreen = view === "moduleIntro" && moduleIndex === 0;

  function selectAnswer(index: number) {
    if (!currentScreen) return;
    setAnswers((prev) => {
      const next = prev.map((m) => m.map((a) => ({ ...a })));
      const itemAnswer = next[moduleIndex][currentScreen.itemIndex];
      if (currentScreen.kind === "response" && itemAnswer.kind === "response") {
        itemAnswer.selectedIndex = index;
      } else if (currentScreen.kind === "setQuestion" && itemAnswer.kind === "set") {
        itemAnswer.selectedIndexes = [...itemAnswer.selectedIndexes];
        itemAnswer.selectedIndexes[currentScreen.questionIndex] = index;
      }
      return next;
    });
  }

  function handleNext() {
    if (view === "moduleIntro") {
      setView("screen");
      setScreenIndex(0);
      return;
    }
    if (view !== "screen") return;

    if (isLastScreenOfModule && isLastModule) {
      setView("results");
      return;
    }
    if (isLastScreenOfModule) {
      setModuleIndex(moduleIndex + 1);
      setView("moduleIntro");
      return;
    }
    setScreenIndex(screenIndex + 1);
  }

  function handleBack() {
    if (screenIndex > 0) {
      setScreenIndex(screenIndex - 1);
      return;
    }
    if (moduleIndex > 0) {
      const prevModuleIndex = moduleIndex - 1;
      setModuleIndex(prevModuleIndex);
      setView("screen");
      setScreenIndex(moduleScreens[prevModuleIndex].length - 1);
      return;
    }
    setView("moduleIntro");
  }

  if (view === "results") {
    const graded = gradeTest(test, answers);
    return (
      <div className="flex flex-col flex-1">
        <header className="bg-primary text-on-primary">
          <Container className="py-4">
            <h1 className="text-body-md font-bold">{test.title}</h1>
          </Container>
        </header>
        <main className="flex-grow">
          <Container className="py-12">
            <ResultsScreen
              reviewed={graded.reviewed}
              total={graded.total}
              correct={graded.correct}
              moduleScores={graded.moduleScores}
              sectionHref={sectionHref}
            />
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-10 bg-primary text-on-primary border-b border-primary-container">
        <Container className="py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href={sectionHref}
              className="flex items-center gap-1 text-body-sm hover:opacity-80 transition-opacity shrink-0"
            >
              <Icon name="close" className="text-[18px]" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
            <h1 className="text-body-md font-bold truncate">{test.title}</h1>
          </div>
          <p className="text-body-sm opacity-90 text-right shrink-0">
            Module {moduleIndex + 1} of {test.modules.length}
            {currentScreen && currentItem
              ? ` • Question ${normalizeQuestion(currentItem, currentScreen).number} of 18`
              : ""}
          </p>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-8">
          {view === "moduleIntro" ? (
            <ModuleIntroScreen module={mod} />
          ) : currentScreen && currentItem && currentAudioState && currentAnswer ? (
            <ListeningScreen
              visual={currentItem.visual}
              instruction={currentItem.instruction}
              question={normalizeQuestion(currentItem, currentScreen)}
              audioState={currentAudioState}
              selectedIndex={
                currentScreen.kind === "response"
                  ? currentAnswer.kind === "response"
                    ? currentAnswer.selectedIndex
                    : null
                  : currentAnswer.kind === "set"
                    ? currentAnswer.selectedIndexes[currentScreen.questionIndex]
                    : null
              }
              onSelect={selectAnswer}
              onPlayFallback={() =>
                playAudio(moduleIndex, currentScreen.itemIndex, currentItem.audio)
              }
            />
          ) : null}
        </Container>
      </main>

      <footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant">
        <Container className="py-4 flex items-center gap-4">
          {isVeryFirstScreen ? (
            <Button variant="secondary" href={sectionHref}>
              Back
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="flex-grow" />
          <Button variant="primary" onClick={handleNext} disabled={!canNext}>
            {nextLabel}
          </Button>
        </Container>
      </footer>
    </div>
  );
}
