import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, CheckCircle } from "lucide-react";
import { Question } from "@/types/General";
import LinkPrefetch from "./LinkPrefetch";

const QuestionCard = (props: { question: Question; progress: number }) => {
  const question: Question = props.question;
  const progress: number = props.progress;

  return (
    <Card key={question.id} className="bg-black border-gray-1000 shadow-xl ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
          {question.title}
          {question.no < progress && <CheckCircle className="text-halloween-orange" />}
          {question.no > progress && <Lock className="text-gray-500" />}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {question.score} points
        </CardDescription>
      </CardHeader>
      <CardContent>
        {question.no < progress && <p className="text-halloween-orange">Solved!</p>}
        {question.no == progress && (
          <LinkPrefetch questionNumber={question.no} />
        )}
        {question.no > progress && (
          <p className="text-gray-500">Solve previous questions to unlock</p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
