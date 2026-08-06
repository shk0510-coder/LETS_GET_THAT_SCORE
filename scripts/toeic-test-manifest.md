# TOEIC Test 1 — Listening Asset Manifest

Generated from the current `web/src/data/toeic/test1/listening/*` data files
(`questions.ts`, `audio.ts`, `pages.ts`). If those files change, regenerate
this list — don't hand-edit it out of sync with the code.

All paths below are relative to `web/public/toeic/test1/` (i.e. served at
`/toeic/test1/...`).

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

## `audio/` — one file per page (15 total)

Audio plays one track per page, not per question or per set. Pages with
their own Directions get a separate directions file, played before the
question-track file. Global sequential lock + 2-play cap applies across all
15, in the order listed below.

| Order | File | Page | Covers |
|---|---|---|---|
| 1 | `directions.mp3` | P1 | Intro + Part 1 directions |
| 2 | `p02.mp3` | P2 | Q1–2 |
| 3 | `p03.mp3` | P3 | Q3–4 |
| 4 | `p04.mp3` | P4 | Q5–6 |
| 5 | `p05-directions.mp3` | P5 | Part 2 directions |
| 6 | `p05.mp3` | P5 | Q7–31 (one continuous ETS recording) |
| 7 | `p06-directions.mp3` | P6 | Part 3 directions |
| 8 | `p06.mp3` | P6 | Q32–43 (4 sets) |
| 9 | `p07.mp3` | P7 | Q44–55 (4 sets) |
| 10 | `p08.mp3` | P8 | Q56–64 (3 sets, has graphic `q062.png`) |
| 11 | `p09.mp3` | P9 | Q65–70 (2 sets, has graphics `q065.png`, `q068.png`) |
| 12 | `p10-directions.mp3` | P10 | Part 4 directions |
| 13 | `p10.mp3` | P10 | Q71–82 (4 sets) |
| 14 | `p11.mp3` | P11 | Q83–94 (4 sets) |
| 15 | `p12.mp3` | P12 | Q95–100 (2 sets, has graphics `q095.png`, `q098.png`) |

P13 (end screen) has no audio.

## Totals

- Photos: 7 (6 questions + 1 example)
- Graphics: 5
- Audio files: 15 (1 intro/Part 1 directions + 3 Part 1 pages + Part 2
  directions + Part 2 questions + Part 3 directions + 4 Part 3 pages + Part
  4 directions + 3 Part 4 pages)
