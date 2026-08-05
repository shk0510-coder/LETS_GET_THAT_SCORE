export interface ToeicSetQuestion {
  number: number;
  prompt: string;
  choices: string[];
}

export interface ToeicSet {
  id: string;
  startNumber: number;
  hasDiagram: boolean;
  // null = this set's dummy content hasn't been written yet (placeholder screen)
  questions: ToeicSetQuestion[] | null;
}

export interface ToeicListeningTest {
  testNumber: number;
  part1Count: number;
  part2Range: [number, number];
  part3Sets: ToeicSet[];
  part4Sets: ToeicSet[];
}

function buildEmptySets(startNumber: number, endNumber: number): ToeicSet[] {
  const sets: ToeicSet[] = [];
  for (let n = startNumber; n <= endNumber; n += 3) {
    sets.push({
      id: `${n}-${n + 2}`,
      startNumber: n,
      hasDiagram: false,
      questions: null,
    });
  }
  return sets;
}

const part3Sets = buildEmptySets(32, 70);
const part4Sets = buildEmptySets(71, 100);

// Only the first two sets per part carry real dummy content — the rest stay
// as "coming soon" placeholders until the actual test content is written.
part3Sets[0] = {
  id: "32-34",
  startNumber: 32,
  hasDiagram: true,
  questions: [
    {
      number: 32,
      prompt: "What are the speakers mainly discussing?",
      choices: [
        "A new marketing campaign",
        "A change in office location",
        "A delay in a product shipment",
        "An upcoming client visit",
      ],
    },
    {
      number: 33,
      prompt: "What does the man say he will do next?",
      choices: [
        "Contact the supplier",
        "Reschedule a meeting",
        "Submit a report early",
        "Book a flight",
      ],
    },
    {
      number: 34,
      prompt: "Look at the graphic. Which department will be affected first?",
      choices: ["Sales", "Marketing", "Logistics", "Finance"],
    },
  ],
};

part3Sets[1] = {
  id: "35-37",
  startNumber: 35,
  hasDiagram: false,
  questions: [
    {
      number: 35,
      prompt: "Why is the woman calling?",
      choices: [
        "To confirm a reservation",
        "To request a refund",
        "To report a technical issue",
        "To ask about business hours",
      ],
    },
    {
      number: 36,
      prompt: "What does the man ask the woman to do?",
      choices: [
        "Provide a reference number",
        "Visit the store in person",
        "Send an email",
        "Call back tomorrow",
      ],
    },
    {
      number: 37,
      prompt: "What will most likely happen next?",
      choices: [
        "The woman will receive a callback",
        "The man will transfer the call",
        "The woman will cancel her order",
        "The man will issue a refund",
      ],
    },
  ],
};

part4Sets[0] = {
  id: "71-73",
  startNumber: 71,
  hasDiagram: false,
  questions: [
    {
      number: 71,
      prompt: "What is the purpose of the announcement?",
      choices: [
        "To introduce a new employee",
        "To announce a schedule change",
        "To describe a policy update",
        "To promote a company event",
      ],
    },
    {
      number: 72,
      prompt: "According to the speaker, what should listeners do by Friday?",
      choices: [
        "Submit their timesheets",
        "Register for the workshop",
        "Return their badges",
        "Update their contact information",
      ],
    },
    {
      number: 73,
      prompt: "What will most likely happen next week?",
      choices: [
        "A new office will open",
        "A training session will be held",
        "A survey will be sent out",
        "A holiday schedule will begin",
      ],
    },
  ],
};

part4Sets[1] = {
  id: "74-76",
  startNumber: 74,
  hasDiagram: false,
  questions: [
    {
      number: 74,
      prompt: "Who is the speaker most likely addressing?",
      choices: ["New hires", "Store customers", "Factory workers", "Job applicants"],
    },
    {
      number: 75,
      prompt: "What problem does the speaker mention?",
      choices: [
        "A shipment delay",
        "A budget shortfall",
        "A staffing shortage",
        "A system outage",
      ],
    },
    {
      number: 76,
      prompt: "What are listeners encouraged to do?",
      choices: [
        "Contact the help desk",
        "Check the website for updates",
        "Attend a meeting in person",
        "Wait for a follow-up email",
      ],
    },
  ],
};

export const TOEIC_LISTENING_TEST1: ToeicListeningTest = {
  testNumber: 1,
  part1Count: 6,
  part2Range: [7, 31],
  part3Sets,
  part4Sets,
};

export function getToeicListeningTest(testNumber: number): ToeicListeningTest | null {
  return testNumber === 1 ? TOEIC_LISTENING_TEST1 : null;
}
