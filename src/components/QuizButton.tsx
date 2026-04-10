interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

const QuizButton = ({ children, onClick, disabled, href }: Props) => {
  const cls =
    "w-full py-4 rounded-xl font-bold text-foreground text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

  if (href) {
    return (
      <a
        href={href}
        className={`${cls} block text-center`}
        style={{ background: "var(--quiz-purple)" }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={{ background: disabled ? undefined : "var(--quiz-purple)" }}
    >
      {children}
    </button>
  );
};

export default QuizButton;
