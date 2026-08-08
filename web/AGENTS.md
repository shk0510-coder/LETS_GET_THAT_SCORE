<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TOEIC Reading Part 5 — standard 30-question page layout

Any standalone 30-question Part 5 set (a full test's Part 5, or a
Practice by Type set) splits into exactly 3 pages, reverse-engineered
from the real ETS sample booklet (`design-reference/toeic_sample.pdf.pdf`,
pages 14-16):

- Page 1: questions 1-8 of the set, directions shown (section intro + PART 5 box eats vertical space, so fewer items fit)
- Page 2: questions 9-20 of the set (12 questions)
- Page 3: questions 21-30 of the set (10 questions)

Column split within each page (left-then-right, ceil-half) is separate
and handled by `QuestionColumns`/`splitIntoColumns`.

Don't hand-split page ranges again — call
`standardPart5Pages(questionIds)` from
`web/src/data/toeic/readingPart5Layout.ts` (takes an array of exactly 30
question IDs, returns the 3-page breakdown). Both
`data/toeic/test1/reading/pages.ts` and `data/toeic/practice/part5/sets.ts`
already use it.
