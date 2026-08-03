/* TOEFL Reading MVP (Test 1)
   - Start screen: select test + Load
   - Test has 2 modules
   - Each module:
     Screen 0 = Complete the Words (Q1–10) in one page
     Screen 1..5 = Daily Life (Q11–15) (two-column: left stimulus, right question)
     Screen 6..10 = Academic Passage (Q16–20) (two-column)
   - Back from the first screen returns to Start
   - Next only activates when current screen is answered
   - Finish & Score at the end -> Answer Key & Explanations
*/

const AVAILABLE_TESTS = [
  { id: "test1", label: "Test 1", file: "data/test1.json" },
  { id: "test2", label: "Test 2", file: "data/test2.json" },
  { id: "test3", label: "Test 3", file: "data/test3.json" },
  { id: "test4", label: "Test 4", file: "data/test4.json" },
  { id: "test5", label: "Test 5", file: "data/test5.json" }
];

const mainEl = document.getElementById("main");
const statusEl = document.getElementById("status");
const subtitleEl = document.getElementById("subtitle");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

let testData = null;
let view = "start"; // start | screen | results
let testId = "test1";
let moduleIndex = 0;
let screenIndex = 0;

// moduleAnswers[moduleIndex] = { fill: ["",...10], mcq: {11:{...}, ...} }
let moduleAnswers = [];

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// deterministic shuffle (stable across refresh)
function hashToSeed(str){
  let h = 2166136261 >>> 0;
  for (let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a){
  return function(){
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

function setStatus(text){ statusEl.textContent = text || ""; }

function setNav(backEnabled, nextEnabled, nextLabel="Next"){
  backBtn.disabled = !backEnabled;
  nextBtn.disabled = !nextEnabled;
  nextBtn.textContent = nextLabel;
}

function initAnswers(){
  moduleAnswers = testData.modules.map(() => ({
    fill: Array(10).fill(""),
    mcq: {} // qnum -> { selectedOriginalIndex, shownOrderOriginalIndexes }
  }));
}

backBtn.addEventListener("click", ()=>{
  if (view === "start") return;

  if (view === "results"){
    view = "start";
    render();
    return;
  }

  // view === screen
  if (moduleIndex === 0 && screenIndex === 0){
    view = "start";
    render();
    return;
  }

  if (screenIndex > 0){
    screenIndex--;
  } else {
    moduleIndex = Math.max(0, moduleIndex - 1);
    screenIndex = 10;
  }
  render();
});

nextBtn.addEventListener("click", ()=>{
  if (view === "start"){
    loadSelectedTest();
    return;
  }

  if (view === "results") return;

  // view === screen
  const lastModule = (moduleIndex === testData.modules.length - 1);
  const lastScreen = (screenIndex === 10);

  if (lastModule && lastScreen){
    view = "results";
    render();
    return;
  }

  if (screenIndex < 10){
    screenIndex++;
  } else {
    moduleIndex++;
    screenIndex = 0;
  }
  render();
});

function render(){
  if (view === "start") return renderStart();
  if (view === "results") return renderResults();
  return renderScreen();
}

function renderStart(){
  const cur = AVAILABLE_TESTS.find(t => t.id === testId) || AVAILABLE_TESTS[0];
  subtitleEl.textContent = `MVP (${cur.label})`;
  setStatus("Ready");

  const options = AVAILABLE_TESTS
    .map(t => `<option value="${t.id}">${escapeHtml(t.label)}</option>`)
    .join("");

  mainEl.innerHTML = `
    <div class="card">
      <h1 class="h1">Start Screen</h1>
      <p class="p">Select a test from the dropdown and click <b>Load</b> to begin.</p>
      <div class="hr"></div>

      <div class="startGrid">
        <label>
          <div class="qnum">Test</div>
          <select id="testSelect" class="select">${options}</select>
        </label>
        <button id="loadBtn" class="btn">Load</button>
      </div>

      <div class="smallNote">
        <div><b>Navigation:</b> Use <b>Back</b> to review earlier questions anytime. <b>Next</b> unlocks only after answering.</div>
      </div>
    </div>
  `;

  const sel = document.getElementById("testSelect");
  sel.value = testId;

  document.getElementById("loadBtn").addEventListener("click", ()=>{
    testId = sel.value;
    loadSelectedTest();
  });

  setNav(false, true, "Load");
}

async function loadSelectedTest(){
  const test = AVAILABLE_TESTS.find(t => t.id === testId) || AVAILABLE_TESTS[0];
  try{
    setStatus("Loading...");
    const res = await fetch(test.file, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${test.file} (${res.status})`);
    testData = await res.json();
    initAnswers();
    moduleIndex = 0;
    screenIndex = 0;
    view = "screen";
    render();
  }catch(err){
    console.error(err);
    mainEl.innerHTML = `
      <div class="card">
        <h1 class="h1">Could not load the test</h1>
        <p class="p">Check that <code>${escapeHtml(test.file)}</code> exists in your repo and the folder name is exactly <code>data</code>.</p>
        <div class="hr"></div>
        <p class="p"><b>Error:</b> ${escapeHtml(err.message)}</p>
      </div>
    `;
    setNav(false, false, "Next");
    view = "start";
    setStatus("Error");
  }
}

function moduleLabel(){
  const cur = AVAILABLE_TESTS.find(t => t.id === testId) || AVAILABLE_TESTS[0];
  return `${cur.label} • Module ${moduleIndex + 1} of ${testData.modules.length}`;
}

function renderScreen(){
  subtitleEl.textContent = moduleLabel();
  const mod = testData.modules[moduleIndex];

  let screenType = "";
  if (screenIndex === 0) screenType = "fill";
  else if (screenIndex >= 1 && screenIndex <= 5) screenType = "daily";
  else screenType = "academic";

  const qDisplay = (screenIndex === 0)
    ? "Questions 1–10"
    : `Question ${10 + screenIndex}`;

  setStatus(`${mod.title} • ${qDisplay}`);

  if (screenType === "fill") return renderFill(mod);
  if (screenType === "daily") return renderDaily(mod, screenIndex);
  return renderAcademic(mod, screenIndex);
}
function renderFill(mod){
  const answers = moduleAnswers[moduleIndex].fill; // missing letters only, per blank 1..10
  const paragraph = mod.completeWords.paragraph;
  const correct = mod.completeWords.answers; // full words

  // supports ___ or ____ etc, and apostrophes
  const re = /([A-Za-z’']+?)_{3,}\s*\((\d+)\)/g;

  let lastIndex = 0;
  let match;
  const htmlParts = [];

  while ((match = re.exec(paragraph)) !== null){
    const fullMatch = match[0];
    const prefix = match[1];
    const num = parseInt(match[2], 10);

    htmlParts.push(escapeHtml(paragraph.slice(lastIndex, match.index)));
    lastIndex = match.index + fullMatch.length;

    const correctWord = correct[num-1] || "";
    const missingLen = Math.max(0, correctWord.length - prefix.length);

    const val = (answers[num-1] || "").padEnd(missingLen, " ").slice(0, missingLen);

    const boxes = Array.from({length: missingLen}).map((_,i)=>{
      const ch = (val[i] || "").trim();
      return `
        <span class="charBox">
          <input
            class="blankChar"
            data-blank="${num}"
            data-pos="${i}"
            maxlength="1"
            inputmode="text"
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
            value="${escapeHtml(ch)}"
          />
        </span>
      `;
    }).join("");

    htmlParts.push(`
      <span class="nowrap">
        <span class="blankWrap">
          <span class="blankPrefix">${escapeHtml(prefix)}</span>
          <span class="boxRow" data-boxrow="${num}" data-len="${missingLen}">
            ${boxes}
          </span>
        </span>
        <span class="blankNum">(${num})</span>
      </span>
    `);
  }

  htmlParts.push(escapeHtml(paragraph.slice(lastIndex)));

  mainEl.innerHTML = `
    <div class="card">
      <h1 class="h1">Complete the Words</h1>
      <p class="p">Fill in the missing letters. <b>Next</b> unlocks only after all blanks are filled.</p>
      <div class="hr"></div>
      <div class="fillPara">${htmlParts.join("")}</div>
    </div>
  `;

  const inputs = [...document.querySelectorAll(".blankChar")];
  inputs.forEach(inp=>{
    inp.addEventListener("input", ()=>{
      const blankNum = parseInt(inp.getAttribute("data-blank"), 10);
      const pos = parseInt(inp.getAttribute("data-pos"), 10);

      const row = document.querySelector(`[data-boxrow="${blankNum}"]`);
      const expectedLen = parseInt(row.getAttribute("data-len"), 10);

      let ch = (inp.value || "").slice(-1).toLowerCase();
      ch = ch.replace(/[^a-z]/g, "");
      inp.value = ch;

      const cur = (moduleAnswers[moduleIndex].fill[blankNum-1] || "")
        .padEnd(expectedLen, " ")
        .split("");

      cur[pos] = ch || " ";
      moduleAnswers[moduleIndex].fill[blankNum-1] = cur.join("").trimEnd();

      if (ch){
        const next = row.querySelector(`.blankChar[data-pos="${pos+1}"]`);
        if (next) next.focus();
      }

      updateNavForCurrentScreen();
    });

    inp.addEventListener("keydown", (e)=>{
      if (e.key === "Backspace" && !inp.value){
        const blankNum = parseInt(inp.getAttribute("data-blank"), 10);
        const pos = parseInt(inp.getAttribute("data-pos"), 10);
        const row = document.querySelector(`[data-boxrow="${blankNum}"]`);
        const prev = row.querySelector(`.blankChar[data-pos="${pos-1}"]`);
        if (prev){
          prev.focus();
          e.preventDefault();
        }
      }
    });
  });

  updateNavForCurrentScreen();
}
function dailyPack(mod){
  const packs = [
    { label: mod.dailyLife.notice.label, text: mod.dailyLife.notice.text, questions: mod.dailyLife.notice.questions },
    { label: mod.dailyLife.post.label, text: mod.dailyLife.post.text, questions: mod.dailyLife.post.questions },
    { label: mod.dailyLife.message.label, text: mod.dailyLife.message.text, questions: mod.dailyLife.message.questions }
  ];
  const out = [];
  packs.forEach(p=>{
    p.questions.forEach(q=>{
      out.push({ stimulusLabel: p.label, stimulusText: p.text, q });
    });
  });
  return out;
}

function ensureShownOrder(q){
  // Disable shuffling: keep original choice order (A,B,C,D)
  const key = q.number;
  const idxs = q.choices.map((_, i) => i);

  // keep structure so the rest of the app doesn't break
  const saved = moduleAnswers[moduleIndex].mcq[key];
  moduleAnswers[moduleIndex].mcq[key] = {
    selectedOriginalIndex: saved?.selectedOriginalIndex ?? null,
    shownOrderOriginalIndexes: idxs
  };

  return idxs;
}

function renderMCQTwoColumn(stimLabel, stimText, q){
  const shownOrder = ensureShownOrder(q);
  const selectedOriginal = moduleAnswers[moduleIndex].mcq[q.number]?.selectedOriginalIndex ?? null;
  const shown = shownOrder.map(oi => ({ originalIndex: oi, text: q.choices[oi] }));

  mainEl.innerHTML = `
    <div class="card">
      <div class="row">
        <div class="col col--left">
          <div class="stimulusLabel">${escapeHtml(stimLabel)}</div>
          <div class="hr"></div>
          <div class="passage">${escapeHtml(stimText)}</div>
        </div>
        <div class="col col--right">
          <div class="qbox">
            <div class="qnum">Question ${q.number}</div>
            <div class="qtext">${escapeHtml(q.question)}</div>
            <div class="choices">
              ${shown.map((c, i)=>{
                const tag = "ABCD"[i];
                const isSel = selectedOriginal === c.originalIndex;
                return `
                  <div class="choice ${isSel ? "is-selected":""}" data-q="${q.number}" data-original="${c.originalIndex}">
                    <div class="choice__tag">${tag}</div>
                    <div class="choice__text">${escapeHtml(c.text)}</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".choice").forEach(el=>{
    el.addEventListener("click", ()=>{
      const qn = parseInt(el.getAttribute("data-q"), 10);
      const orig = parseInt(el.getAttribute("data-original"), 10);
      moduleAnswers[moduleIndex].mcq[qn].selectedOriginalIndex = orig;
      updateNavForCurrentScreen();
      render();
    });
  });

  updateNavForCurrentScreen();
}

function renderDaily(mod, idx){
  const daily = dailyPack(mod);
  const item = daily[idx-1];
  renderMCQTwoColumn(item.stimulusLabel, item.stimulusText, item.q);
}

function renderAcademic(mod, idx){
  const q = mod.academicPassage.questions[idx-6]; // screenIndex 6..10
  const stimText = `${mod.academicPassage.title}\n\n${mod.academicPassage.passage}`;
  renderMCQTwoColumn("PASSAGE", stimText, q);
}

function isFillComplete(){
  const mod = testData.modules[moduleIndex];
  const answers = moduleAnswers[moduleIndex].fill;
  const correct = mod.completeWords.answers;

  const re = /([A-Za-z’']+?)_{3,}\s*\((\d+)\)/g;
  const expectedLens = Array(10).fill(0);
  let match;
  while ((match = re.exec(mod.completeWords.paragraph)) !== null){
    const prefix = match[1];
    const num = parseInt(match[2], 10);
    const correctWord = correct[num-1] || "";
    expectedLens[num-1] = Math.max(0, correctWord.length - prefix.length);
  }

  for (let i=0;i<10;i++){
    if ((answers[i] || "").length !== expectedLens[i]) return false;
  }
  return true;
}

function currentMCQNumber(){
  if (screenIndex>=1 && screenIndex<=5) return 10 + screenIndex; // 11..15
  if (screenIndex>=6 && screenIndex<=10) return 10 + screenIndex; // 16..20
  return null;
}

function isMCQAnswered(qnum){
  const a = moduleAnswers[moduleIndex].mcq[qnum];
  return a && a.selectedOriginalIndex !== null && a.selectedOriginalIndex !== undefined;
}

function updateNavForCurrentScreen(){
  if (!testData){
    setNav(false,false,"Next");
    return;
  }
  const isLastScreenOfLastModule = (moduleIndex === testData.modules.length - 1 && screenIndex === 10);
  const nextLabel = isLastScreenOfLastModule ? "Finish & Score" : "Next";

  let canNext = false;
  if (screenIndex === 0){
    canNext = isFillComplete();
  } else {
    const qnum = currentMCQNumber();
    canNext = qnum ? isMCQAnswered(qnum) : false;
  }
  setNav(true, canNext, nextLabel);
}

function gradeAll(){
  const results = [];

  testData.modules.forEach((mod, mi)=>{
    const re = /([A-Za-z’']+?)_{3,}\s*\((\d+)\)/g;
    const expectedMissing = [];
    let match;
    while ((match = re.exec(mod.completeWords.paragraph)) !== null){
      const prefix = match[1];
      const num = parseInt(match[2],10);
      const correctWord = mod.completeWords.answers[num-1];
      expectedMissing[num-1] = correctWord.slice(prefix.length);
    }

    for (let i=0;i<10;i++){
      const user = (moduleAnswers[mi].fill[i] || "").trim();
      const correct = (expectedMissing[i] || "").trim();
      const isCorrect = user.toLowerCase() === correct.toLowerCase();
      results.push({
        module: mi+1,
        number: i+1,
        type: "fill",
        prompt: "Complete the Words",
        question: `Blank (${i+1})`,
        userAnswer: user,
        correctAnswer: correct,
        isCorrect,
        explanation: mod.completeWords.explanations?.[i] || ""
      });
    }

    const allMcq = [
      ...mod.dailyLife.notice.questions,
      ...mod.dailyLife.post.questions,
      ...mod.dailyLife.message.questions,
      ...mod.academicPassage.questions
    ];

    allMcq.forEach(q=>{
      const userOrig = moduleAnswers[mi].mcq[q.number]?.selectedOriginalIndex;
      const isCorrect = userOrig === q.answerIndex;
      results.push({
        module: mi+1,
        number: q.number,
        type: "mcq",
        prompt: q.number<=15 ? "Read in Daily Life" : "Read an Academic Passage",
        question: q.question,
        userAnswer: userOrig!=null ? q.choices[userOrig] : "",
        correctAnswer: q.choices[q.answerIndex],
        isCorrect,
        explanation: q.explanation || ""
      });
    });
  });

  return results;
}

function renderResults(){
  subtitleEl.textContent = "Results";
  const graded = gradeAll();
  const total = graded.length;
  const correct = graded.filter(r=>r.isCorrect).length;

  const byModule = {};
  graded.forEach(r=>{
    byModule[r.module] = byModule[r.module] || { total:0, correct:0 };
    byModule[r.module].total++;
    if (r.isCorrect) byModule[r.module].correct++;
  });

  setStatus(`Score: ${correct}/${total}`);

  mainEl.innerHTML = `
    <div class="card">
      <div class="resultHeader">
        <div>
          <h1 class="h1">Answer Key & Explanations</h1>
          <p class="p">Review your answers below.</p>
        </div>
        <div class="scoreBox">
          <p class="scoreLine">${correct} / ${total}</p>
          <p class="scoreSub">Module 1: ${byModule[1].correct}/${byModule[1].total} • Module 2: ${byModule[2].correct}/${byModule[2].total}</p>
        </div>
      </div>

      <div class="hr"></div>

      ${graded.map(r=>{
        const badge = r.isCorrect
          ? `<span class="badge good">Correct</span>`
          : `<span class="badge bad">Incorrect</span>`;

        const ua = r.userAnswer ? escapeHtml(r.userAnswer) : "<i>(no answer)</i>";

        return `
          <div class="reviewItem">
            <div class="reviewTop">
              <div class="qnum">Module ${r.module} • Q${r.number} • ${escapeHtml(r.prompt)}</div>
              ${badge}
            </div>
            <div class="reviewQ">${escapeHtml(r.question)}</div>
            <div class="reviewA"><b>Your answer:</b> ${ua}</div>
            <div class="reviewA"><b>Correct answer:</b> ${escapeHtml(r.correctAnswer)}</div>
            <div class="reviewExpl"><b>Explanation:</b> ${escapeHtml(r.explanation)}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  setNav(true, false, "Next");
}

function render(){
  if (view === "start") return renderStart();
  if (view === "results") return renderResults();
  return renderScreen();
}

// boot
render();
