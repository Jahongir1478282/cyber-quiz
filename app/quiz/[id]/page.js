import QuizClient from "./QuizClient";
import { QUIZ_TITLE } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Test — ${QUIZ_TITLE}`,
  robots: { index: false, follow: false },
};

export default async function QuizPage({ params }) {
  const { id } = await params;
  return <QuizClient id={id} title={QUIZ_TITLE} />;
}
