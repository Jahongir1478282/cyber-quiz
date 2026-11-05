import HomeClient from "./HomeClient";
import { QUIZ_TITLE, QUIZ_SUBTITLE, QUESTION_COUNT, TIME_LIMIT_SEC } from "@/lib/config";
import { QUESTIONS } from "@/data/questions";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <HomeClient
      title={QUIZ_TITLE}
      subtitle={QUIZ_SUBTITLE}
      count={Math.min(QUESTION_COUNT, QUESTIONS.length)}
      minutes={Math.round(TIME_LIMIT_SEC / 60)}
    />
  );
}
