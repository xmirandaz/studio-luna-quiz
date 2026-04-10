import { Check } from "lucide-react";

interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const QuizOptionCard = ({ label, selected, onClick }: Props) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-foreground text-sm font-medium ${
      selected
        ? "border-quiz-purple shadow-[0_0_16px_rgba(155,48,255,0.4)] bg-secondary"
        : "border-border bg-card hover:border-quiz-purple/50"
    }`}
  >
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {selected && (
        <Check className="w-5 h-5 shrink-0 ml-2" style={{ color: "var(--quiz-purple)" }} />
      )}
    </div>
  </button>
);

export default QuizOptionCard;
