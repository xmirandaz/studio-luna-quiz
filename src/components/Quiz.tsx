import { useState, useEffect, useCallback } from "react";
import QuizLogo from "@/components/QuizLogo";
import QuizProgressBar from "@/components/QuizProgressBar";
import QuizOptionCard from "@/components/QuizOptionCard";
import QuizButton from "@/components/QuizButton";
import PricingCards from "@/components/PricingCards";
import { Check } from "lucide-react";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [courseInput, setCourseInput] = useState("");
  const [selected, setSelected] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const [pain, setPain] = useState<"ead" | "preco" | "tempo" | "vergonha" | "">("");

  const goTo = useCallback((s: number) => {
    setSelected("");
    setAnimKey((k) => k + 1);
    setStep(s);
  }, []);

  const autoAdvance = (option: string, nextStep: number) => {
    setSelected(option);
    setTimeout(() => goTo(nextStep), 300);
  };

  const showProgress = step >= 2 && step <= 17;
  // Steps 2-17 map to progress 1-16 out of 16
  const progressStep = step - 1;
  const progressTotal = 16;

  return (
    <div className="quiz-gradient min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[480px] px-4 pb-10">
        <QuizLogo />
        {showProgress && <QuizProgressBar current={progressStep} total={progressTotal} />}

        <div key={animKey} className="animate-slide-in">
          {step === 1 && <Step1 onNext={() => goTo(2)} />}
          {step === 2 && (
            <StepTextInput
              question="Qual é o seu nome?"
              placeholder="Digite seu nome aqui"
              value={nameInput}
              onChange={setNameInput}
              onNext={() => { setUserName(nameInput.trim()); goTo(3); }}
            />
          )}
          {step === 3 && (
            <StepOptions
              question="Qual é a sua idade?"
              options={["18 a 22 anos", "23 a 30 anos", "31 a 40 anos", "Mais de 40 anos"]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 4)}
            />
          )}
          {step === 4 && (
            <StepTextInput
              question="Em qual curso você está se formando ou já se formou?"
              placeholder="Ex: Medicina, Direito, Engenharia..."
              value={courseInput}
              onChange={setCourseInput}
              onNext={() => { setCourse(courseInput.trim()); goTo(5); }}
            />
          )}
          {step === 5 && (
            <StepOptions
              question="O quanto você conhece sobre a tecnologia de Fotorrealismo Digital (a nova era dos ensaios de luxo)?"
              options={[
                "🙋 Já vi resultados e fiquei impressionado(a).",
                "😕 Já tentei fazer mas não gostei do resultado",
                "🤔 Vi agora e quero saber se o realismo é tudo isso mesmo.",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 6)}
            />
          )}
          {step === 6 && (
            <StepOptions
              question="Você já viu como os ensaios com IA viraram uma nova tendência?"
              options={[
                "✨ Sim, tá todo mundo fazendo!",
                "👀 Já vi alguns no meu feed.",
                "🤔 Ainda não... Me mostra?",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 7)}
            />
          )}
          {step === 7 && <Step7 onNext={() => goTo(8)} />}
          {step === 8 && (
            <StepOptions
              question="Para te entender e personalizar o seu ensaio, qual dessas situações melhor descreve seu momento?"
              options={[
                "🎓 Fiz EAD e não quero que minha conquista passe em branco.",
                "💸 Acho os ensaios tradicionais caros e quero um preço justo.",
                "⏳ Não tenho tempo para ensaios longos e cansativos.",
                "🥰 Tenho vergonha de posar e quero me sentir bem na foto.",
              ]}
              selected={selected}
              onSelect={(o) => {
                const map: Record<string, "ead" | "preco" | "tempo" | "vergonha"> = {
                  "🎓 Fiz EAD e não quero que minha conquista passe em branco.": "ead",
                  "💸 Acho os ensaios tradicionais caros e quero um preço justo.": "preco",
                  "⏳ Não tenho tempo para ensaios longos e cansativos.": "tempo",
                  "🥰 Tenho vergonha de posar e quero me sentir bem na foto.": "vergonha",
                };
                setPain(map[o]);
                autoAdvance(o, 9);
              }}
            />
          )}
          {step === 9 && <Step9 pain={pain} userName={userName} onNext={() => goTo(10)} />}
          {step === 10 && (
            <StepOptions
              question="Quando você imagina seu ensaio de formatura, o que mais importa?"
              options={[
                "💎 Status e Impacto: Fotos que param o feed do Instagram.",
                "🎓 Legado: Um registro à altura do esforço que foi chegar até aqui.",
                "✨ Praticidade: Ter o ensaio dos sonhos sem perder dinheiro e horas do meu dia.",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 11)}
            />
          )}
          {step === 11 && (
            <StepOptions
              question="Você acredita que um ensaio de formatura bem feito é:"
              options={[
                "💎 Essencial pois se faz poucas vezes na vida",
                "⚖️ Importante mas depende do preço",
                "🙂 Algo simples já resolve",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 12)}
            />
          )}
          {step === 12 && (
            <StepOptions
              question="Na sua cidade, quanto você acha que custa um ensaio de formatura profissional?"
              options={[
                "💲 R$ 300 a R$ 600",
                "💲💲 R$ 600 a R$ 1.000",
                "💲💲💲 R$ 1.000 a R$ 2.000",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 13)}
            />
          )}
          {step === 13 && (
            <StepOptions
              question="Quando você receber o seu ensaio, você vai querer ver:"
              options={[
                "🌟 Um realismo absoluto, mesmo que tenha investido um pouco mais",
                "👍 Uma qualidade boa, visando o custo-benefício",
                "💸 Um resultado condizente com o que coube no meu bolso",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 14)}
            />
          )}
          {step === 14 && <Step12 onNext={() => goTo(15)} />}
          {step === 15 && (
            <StepOptions
              question="Qual estilo de ensaio combina mais com você?"
              options={[
                "✨ Elegante e sofisticado",
                "🌿 Natural e leve",
                "🎨 Criativo e diferente",
                "🎓 Clássico tradicional",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 16)}
            />
          )}
          {step === 16 && <Step14 onNext={() => goTo(17)} />}
          {step === 17 && (
            <StepOptions
              question="Quando será sua formatura?"
              options={[
                "⏰ Ainda esse mês",
                "📅 Nos próximos 3 meses",
                "🗓️ Final do ano / ano que vem",
                "🎉 Já aconteceu",
              ]}
              selected={selected}
              onSelect={(o) => autoAdvance(o, 18)}
            />
          )}
          {step === 18 && <Step16 userName={userName} course={course} onNext={() => goTo(19)} />}
          {step === 19 && <PricingCards userName={userName} />}
        </div>

        <footer className="mt-10 text-center text-[10px] text-muted-foreground leading-relaxed">
          2026 © CNPJ: 65.135.920/0001-62
          <br />
          Studio Luna. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

/* ---- Sub-components ---- */

const Step1 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center gap-5 text-center">
    <h1 className="text-2xl font-bold text-foreground leading-tight">
      Sua conquista merece mais do que fotos básicas!
    </h1>
    <p className="text-muted-foreground text-sm">
      Responda esse rápido quiz e descubra o estilo de ensaio que melhor eterniza essa sua linda trajetória.
    </p>
    <img
      src="https://i.ibb.co/SXqNXmry/foto1.webp"
      alt="Ensaio"
      className="w-full aspect-[3/4] object-cover rounded-2xl"
    />
    <p className="text-muted-foreground text-xs">⏱ Leva menos de 2 minutos.</p>
    <QuizButton onClick={onNext}>Quero descobrir meu estilo →</QuizButton>
  </div>
);

const StepTextInput = ({
  question, placeholder, value, onChange, onNext,
}: {
  question: string; placeholder: string; value: string; onChange: (v: string) => void; onNext: () => void;
}) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-xl font-bold text-foreground">{question}</h2>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 rounded-xl bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-quiz-purple transition-colors"
    />
    <QuizButton onClick={onNext} disabled={!value.trim()}>
      Continuar →
    </QuizButton>
  </div>
);

const StepOptions = ({
  question, options, selected, onSelect,
}: {
  question: string; options: string[]; selected: string; onSelect: (o: string) => void;
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-foreground mb-2">{question}</h2>
    {options.map((o) => (
      <QuizOptionCard key={o} label={o} selected={selected === o} onClick={() => onSelect(o)} />
    ))}
  </div>
);

const Step7 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col gap-5 text-center">
    <h2 className="text-xl font-bold text-foreground">
      Consegue acreditar que essas fotos produzidas pelo Studio Luna não precisaram de um estúdio físico? 👇
    </h2>
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        <img src="https://i.ibb.co/mVScv8Q8/1.webp" alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
        <img src="https://i.ibb.co/p6mKYfcR/3.webp" alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
      </div>
      <div className="flex flex-col gap-2">
        <img src="https://i.ibb.co/dwsM6j87/2.webp" alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
        <img src="https://i.ibb.co/yjBjYmn/4.webp" alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
      </div>
    </div>
    <p className="text-muted-foreground text-sm">
      Nossos resultados impressionam as pessoas que, assim como você, entenderam que essa conquista merece ser eternizada com estilo.
    </p>
    <QuizButton onClick={onNext}>Personalizar meu ensaio agora →</QuizButton>
  </div>
);

const Step9 = ({ pain, userName, onNext }: { pain: string; userName: string; onNext: () => void }) => {
  const variants: Record<string, { title: string; body: string; img: string }> = {
    ead: {
      title: `${userName}, nós te entendemos: sua conquista merece ser celebrada.`,
      body: "A Claudia também sentia que faltava o registro oficial por ter feito EAD. Veja a reação dela e de sua mãe ao ver que o Studio Luna realizou esse sonho sem ela sair de casa!",
      img: "https://i.ibb.co/TMHS7XF8/ead.webp",
    },
    preco: {
      title: `${userName}, nós te entendemos: você não precisa pagar uma fortuna por uma foto incrível.`,
      body: "A Anelise estava indignada com os preços abusivos das agências tradicionais. Olha só o alívio dela ao descobrir nossa tecnologia!",
      img: "https://i.ibb.co/ccw5n443/caro.webp",
    },
    tempo: {
      title: `${userName}, nós te entendemos: seu tempo é valioso demais para ser perdido em estúdios.`,
      body: "O Rogério vive na correria e não podia perder um dia inteiro com fotos. Confira o feedback dele sobre a praticidade do nosso processo!",
      img: "https://i.ibb.co/PzG5DN1f/tempo.webp",
    },
    vergonha: {
      title: `${userName}, nós te entendemos: a foto perfeita é aquela em que você se sente confiante.`,
      body: "A Andréia sempre travava na frente das câmeras e odiava fazer poses. Veja como a nossa IA devolveu a autoestima dela com naturalidade!",
      img: "https://i.ibb.co/Y7sqBhmm/vergonha.webp",
    },
  };
  const v = variants[pain] ?? variants.ead;
  return (
    <div className="flex flex-col gap-5 text-center">
      <h2 className="text-xl font-bold text-foreground leading-tight">{v.title}</h2>
      <p className="text-muted-foreground text-sm">{v.body}</p>
      <img src={v.img} alt="Print de conversa" className="w-full h-auto rounded-2xl" />
      <QuizButton onClick={onNext}>Explicar minhas preferências →</QuizButton>
    </div>
  );
};

const Step12 = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col gap-5 text-center">
    <h2 className="text-xl font-bold text-foreground">
      O Studio Luna se destaca nessa nova tendência que já até virou notícia no Brasil todo! 👇
    </h2>
    <img
      src="https://i.ibb.co/NdqbKDJw/noticia.webp"
      alt="Notícia"
      className="w-full aspect-[9/16] object-cover rounded-2xl"
    />
    <p className="text-foreground text-sm">E é exatamente isso que você vai descobrir agora!</p>
    <QuizButton onClick={onNext}>Quero ver minha transformação →</QuizButton>
  </div>
);

const Step14 = ({ onNext }: { onNext: () => void }) => {
  const [sel, setSel] = useState<string | null>(null);

  const handleSelect = (v: string) => {
    setSel(v);
    setTimeout(() => onNext(), 300);
  };

  const Card = ({ id, src, label, sub }: { id: string; src: string; label: string; sub: string }) => (
    <button
      onClick={() => handleSelect(id)}
      className={`relative flex-1 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
        sel === id
          ? "border-quiz-purple shadow-[0_0_20px_rgba(155,48,255,0.5)]"
          : "border-border hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(155,48,255,0.3)]"
      }`}
    >
      {sel === id && (
        <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--quiz-purple)" }}>
          <Check className="w-4 h-4 text-foreground" />
        </div>
      )}
      <img src={src} alt={label} className="w-full aspect-[3/4] object-cover rounded-t-xl" />
      <div className="p-3 text-center">
        <p className="font-bold text-foreground text-sm">{label}</p>
        <p className="text-muted-foreground text-xs mt-1">{sub}</p>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-foreground">Como você prefere que seja o seu ensaio?</h2>
      <div className="flex gap-3">
        <Card id="estudio" src="https://i.ibb.co/qYqQMQfQ/estudio.webp" label="Estúdio 📸" sub="Ambiente controlado e elegante" />
        <Card id="externo" src="https://i.ibb.co/Y4B8wPNw/externo.webp" label="Externo 🌳" sub="Luz natural e cenários reais" />
      </div>
    </div>
  );
};

const Step16 = ({ userName, course, onNext }: { userName: string; course: string; onNext: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState(`Mapeando traços de ${userName}...`);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / 4000) * 100, 100);
      setProgress(pct);
      if (elapsed >= 2000) setMsg(`Personalizando ensaio para ${course}...`);
      if (elapsed >= 4000) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [userName, course]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <p className="text-foreground font-semibold text-center animate-pulse">{msg}</p>
        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%`, background: "var(--quiz-purple)" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in flex flex-col gap-5 text-center">
      <img
        src="https://i.ibb.co/5g9PJ2FZ/resultado.webp"
        alt="Resultado"
        className="w-full aspect-[3/4] object-cover rounded-2xl"
      />
      <h2 className="text-xl font-bold text-foreground leading-tight">
        <span className="glow-text">{userName}</span>, seu perfil é de: Estética Sofisticada ✨
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        <span className="glow-text">{userName}</span>, sua vaga está segura por <strong className="font-bold text-foreground">APENAS UMA HORA</strong>. Converse o quanto antes com o Especialista para garantir sua vaga com essas ofertas!
      </p>
      <QuizButton onClick={onNext}>Resgatar meu ensaio exclusivo →</QuizButton>
    </div>
  );
};

export default Quiz;
