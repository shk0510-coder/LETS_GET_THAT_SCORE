import listening_test1 from "./listening_test1.json";
import listening_test2 from "./listening_test2.json";
import listening_test3 from "./listening_test3.json";
import listening_test4 from "./listening_test4.json";
import listening_test5 from "./listening_test5.json";
import { ListeningTest } from "./types";

const LISTENING_TESTS: Record<string, ListeningTest> = {
  listening_test1: listening_test1 as ListeningTest,
  listening_test2: listening_test2 as ListeningTest,
  listening_test3: listening_test3 as ListeningTest,
  listening_test4: listening_test4 as ListeningTest,
  listening_test5: listening_test5 as ListeningTest,
};

export const LISTENING_TEST_IDS = Object.keys(LISTENING_TESTS);

export function getListeningTest(testId: string): ListeningTest | undefined {
  return LISTENING_TESTS[testId];
}

export type {
  ListeningTest,
  ListeningModule,
  ListeningItem,
  ResponseItem,
  SetItem,
  SetQuestion,
} from "./types";
