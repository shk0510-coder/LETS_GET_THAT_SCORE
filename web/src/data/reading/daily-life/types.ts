import { MCQQuestion } from "@/data/reading/types";

export interface DailyLifePassage {
  practiceNumber: number; // 1-5
  docType: string; // e.g. 이메일, 공지문, 광고, 제품 리뷰, 웹페이지(FAQ)
  title: string;
  passage: string;
  translation: string;
  questions: MCQQuestion[]; // exactly 5, ordered by number, one per required qtype
}
