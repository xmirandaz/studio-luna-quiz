import { Crown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

interface Pkg {
  id: string;
  name: string;
  emoji: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const packages: Pkg[] = [
  {
    id: "basico",
    name: "PACOTE BÁSICO",
    emoji: "🥉",
    price: "R$14,90",
    features: ["📸 1 Foto em Alta Definição", "❌ Sem adição de pessoas", "⏱️ Entrega em 3 dias úteis"],
    cta: "Escolher este",
  },
  {
    id: "essencial",
    name: "PACOTE ESSENCIAL",
    emoji: "🥈",
    price: "R$29,90",
    features: ["📸 3 Fotos em Alta Definição", "👤 +1 Pessoa Adicionada", "⏱️ Entrega em 3 dias úteis"],
    cta: "Escolher este",
  },
  {
    id: "premium",
    name: "PACOTE PREMIUM",
    emoji: "🥇",
    price: "R$49,90",
    features: ["📸 5 Fotos em Alta Definição", "👥 +2 Pessoas Adicionadas", "⚡ Entrega VIP (24 Horas)"],
    cta: "Escolher este",
    highlight: true,
  },
  {
    id: "diamante",
    name: "PACOTE DELUXE",
    emoji: "💎",
    price: "R$69,90",
    features: ["📸 10 Fotos em Alta Definição", "👨‍👩‍👧‍👦 +3 Pessoas (Família completa)", "⚡ Entrega VIP (24 Horas)"],
    cta: "Escolher este",
  },
];

const PricingCards = ({ userName }: { userName: string }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const colors = ["#9b30ff", "#3b82f6", "#10b981", "#fbbf24"];
    const fire = (originX: number) =>
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 45,
        origin: { x: originX, y: 0.3 },
        colors,
      });
    fire(0.2);
    fire(0.5);
    fire(0.8);
    const t = setTimeout(() => {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 }, colors });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const selectedPkg = packages.find((p) => p.id === selectedId) || null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const whatsappLink = selectedPkg
    ? `https://wa.me/5511980783213?text=${encodeURIComponent(
        `Olá, meu nome é ${userName || "[seu nome]"}! Fiz o quiz e escolhi o ${selectedPkg.name}`
      )}`
    : "#";

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground leading-tight">
          Escolha o pacote ideal para o seu ensaio ✨
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          Oferta exclusiva e por tempo limitado para você, {userName || "formando(a)"}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {packages.map((p) => {
          const isSelected = selectedId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`relative text-left rounded-2xl p-5 backdrop-blur-xl bg-white/5 border transition-all duration-300 hover:-translate-y-1 ${
                isSelected
                  ? "border-quiz-purple shadow-[0_0_30px_rgba(155,48,255,0.5)] ring-2 ring-quiz-purple"
                  : p.highlight
                  ? "border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.25)]"
                  : "border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
              }`}
            >
              {p.highlight && !isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-gradient-to-r from-amber-300 to-amber-500 text-black shadow-md whitespace-nowrap">
                  <Crown className="w-3 h-3" />
                  MELHOR ESCOLHA
                </div>
              )}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "var(--quiz-purple)" }}
                >
                  <Check className="w-4 h-4 text-foreground" />
                </div>
              )}

              <div className="text-center">
                <div className="text-3xl mb-1">{p.emoji}</div>
                <h3 className="text-sm font-bold text-foreground tracking-wide">{p.name}</h3>
                <div className={`mt-3 text-3xl font-extrabold ${p.highlight ? "text-amber-300" : "text-foreground"}`}>
                  {p.price}
                </div>
              </div>

              <ul className="mt-5 flex flex-col gap-2.5 text-sm text-foreground/90">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 items-start leading-snug">
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-5 block text-center w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  p.highlight
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black"
                    : "text-foreground"
                }`}
                style={!p.highlight ? { background: "var(--quiz-purple)" } : undefined}
              >
                {isSelected ? "Selecionado ✓" : p.cta}
              </div>
            </button>
          );
        })}
      </div>

      <div ref={ctaRef} className="min-h-[80px] flex items-center justify-center">
        {selectedPkg && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-slide-in block w-full text-center py-4 px-5 rounded-xl font-bold text-foreground text-base leading-tight shadow-[0_0_30px_rgba(155,48,255,0.5)] hover:brightness-110 transition-all"
            style={{ background: "var(--quiz-purple)" }}
          >
            CONVERSAR SOBRE IDEIAS DO MEU ENSAIO COM O ESPECIALISTA →
          </a>
        )}
      </div>
    </div>
  );
};

export default PricingCards;
