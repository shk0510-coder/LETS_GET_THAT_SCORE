# TOEIC Test 1 — Listening Asset Manifest

Generated from the current `web/src/data/toeic/test1/listening/*` data files
(`questions.ts`, `audio.ts`). If those files change, regenerate this list —
don't hand-edit it out of sync with the code.

All paths below are relative to `web/public/toeic/test1/` (i.e. served at
`/toeic/test1/...`). Folders already exist (empty, with a `.gitkeep`) —
just drop files in with these exact names.

Until a file exists, the UI shows a gray placeholder box (photos/graphics)
printing the expected path, or falls back to a ~3s simulated playback
(audio) — so dropping files in later works with no code changes.

## `part1/` — Part 1 photos + intro example

| File | Used by |
|---|---|
| `example.jpg` | Intro page (P1), Part 1 directions example photo |
| `q001.jpg` | Question 1 |
| `q002.jpg` | Question 2 |
| `q003.jpg` | Question 3 |
| `q004.jpg` | Question 4 |
| `q005.jpg` | Question 5 |
| `q006.jpg` | Question 6 |

## `graphics/` — Part 3/4 diagrams

Only the 5 sets that include a graphic in the real ETS test need one.

| File | Used by |
|---|---|
| `q062.png` | Questions 62–64 |
| `q065.png` | Questions 65–67 |
| `q068.png` | Questions 68–70 |
| `q095.png` | Questions 95–97 |
| `q098.png` | Questions 98–100 |

## `audio/part1/` — Part 1 directions + individual photo audio

| File | Covers |
|---|---|
| `directions.mp3` | Part 1 directions (standalone, not bundled with Q1) |
| `q001.mp3` | Question 1 |
| `q002.mp3` | Question 2 |
| `q003.mp3` | Question 3 |
| `q004.mp3` | Question 4 |
| `q005.mp3` | Question 5 |
| `q006.mp3` | Question 6 |

## `audio/part2/` — one continuous track

| File | Covers |
|---|---|
| `directions.mp3` | Part 2 directions + all of Q7–31 (one continuous ETS recording, one speaker button on the page) |

## `audio/part3/` — one file per 3-question set (13 sets, Q32–70)

| File | Covers |
|---|---|
| `set032.mp3` | Questions 32–34 (directions bundled into this file) |
| `set035.mp3` | Questions 35–37 |
| `set038.mp3` | Questions 38–40 |
| `set041.mp3` | Questions 41–43 |
| `set044.mp3` | Questions 44–46 |
| `set047.mp3` | Questions 47–49 |
| `set050.mp3` | Questions 50–52 |
| `set053.mp3` | Questions 53–55 |
| `set056.mp3` | Questions 56–58 |
| `set059.mp3` | Questions 59–61 |
| `set062.mp3` | Questions 62–64 (has graphic `q062.png`) |
| `set065.mp3` | Questions 65–67 (has graphic `q065.png`) |
| `set068.mp3` | Questions 68–70 (has graphic `q068.png`) |

## `audio/part4/` — one file per 3-question set (10 sets, Q71–100)

| File | Covers |
|---|---|
| `set071.mp3` | Questions 71–73 (directions bundled into this file) |
| `set074.mp3` | Questions 74–76 |
| `set077.mp3` | Questions 77–79 |
| `set080.mp3` | Questions 80–82 |
| `set083.mp3` | Questions 83–85 |
| `set086.mp3` | Questions 86–88 |
| `set089.mp3` | Questions 89–91 |
| `set092.mp3` | Questions 92–94 |
| `set095.mp3` | Questions 95–97 (has graphic `q095.png`) |
| `set098.mp3` | Questions 98–100 (has graphic `q098.png`) |

## Totals

- Photos: 7 (6 questions + 1 example)
- Graphics: 5
- Audio files: 31 (1 directions + 6 Part 1 + 1 Part 2 + 13 Part 3 sets + 10 Part 4 sets)
