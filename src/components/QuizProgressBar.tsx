interface Props {
  current: number;
  total: number;
}

const QuizProgressBar = ({ current, total }: Props) => (
  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-6">
    <div
      className="h-full rounded-full transition-all duration-500 ease-out"
      style={{
        width: `${(current / total) * 100}%`,
        background: "var(--quiz-purple)",
      }}
    />
  </div>
);

export default QuizProgressBar;
