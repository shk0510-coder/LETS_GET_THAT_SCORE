import { ListeningItem, ListeningModule, ListeningTest } from "@/data/listening/types";

export type ScreenRef =
  | { kind: "response"; itemIndex: number }
  | { kind: "setQuestion"; itemIndex: number; questionIndex: number };

export function buildModuleScreens(mod: ListeningModule): ScreenRef[] {
  const screens: ScreenRef[] = [];
  mod.items.forEach((item, itemIndex) => {
    if (item.kind === "response") {
      screens.push({ kind: "response", itemIndex });
    } else {
      item.questions.forEach((_, questionIndex) => {
        screens.push({ kind: "setQuestion", itemIndex, questionIndex });
      });
    }
  });
  return screens;
}

export type ItemAnswerState =
  | { kind: "response"; selectedIndex: number | null }
  | { kind: "set"; selectedIndexes: (number | null)[] };

export type AudioItemState = {
  played: boolean;
  playing: boolean;
  finished: boolean;
  blocked: boolean;
  failed: boolean;
};

function initialAudioState(): AudioItemState {
  return { played: false, playing: false, finished: false, blocked: false, failed: false };
}

function initialAnswerFor(item: ListeningItem): ItemAnswerState {
  if (item.kind === "response") return { kind: "response", selectedIndex: null };
  return { kind: "set", selectedIndexes: item.questions.map(() => null) };
}

export function createInitialAnswers(test: ListeningTest): ItemAnswerState[][] {
  return test.modules.map((mod) => mod.items.map(initialAnswerFor));
}

export function createInitialAudioState(test: ListeningTest): AudioItemState[][] {
  return test.modules.map((mod) => mod.items.map(initialAudioState));
}

export type NormalizedQuestion = {
  number: number;
  text: string;
  choices: string[];
};

export function normalizeQuestion(item: ListeningItem, screen: ScreenRef): NormalizedQuestion {
  if (item.kind === "response") {
    return { number: item.number, text: item.instruction, choices: item.choices };
  }
  const q = item.questions[(screen as { questionIndex: number }).questionIndex];
  return { number: q.number, text: q.question, choices: q.choices };
}

export function questionDisplay(item: ListeningItem, screen: ScreenRef): string {
  return `Question ${normalizeQuestion(item, screen).number} of 18`;
}
