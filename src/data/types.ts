export type DivisionId = "accounting" | "marketing" | "hr";

export type MultipleChoiceChallenge = {
  type: "multiple-choice";
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export type WrittenChallenge = {
  type: "written";
  title: string;
  scenario: string;
  question: string;
  minLength: number;
  keywords: string[];
  correctFeedback: string;
  improvementTip: string;
  exampleAnswer: string;
};

export type Challenge = MultipleChoiceChallenge | WrittenChallenge;

export type Division = {
  id: DivisionId;
  name: string;
  skillName: string;
  description: string;
  deskLabel: string;
  color: string;
  mayaBriefing: string[];
  sessions: {
    title: string;
    difficulty: string;
    challenges: [Challenge, Challenge, Challenge];
  }[];
};
