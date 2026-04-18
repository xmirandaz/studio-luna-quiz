import { Crown } from "lucide-react";

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
    features: ["📸 5 Fotos em Alta Definição", "👥 +2 Pessoas Adicionadas", "⏳ Entrega Expressa (48 Horas)"],
    cta: "QUERO ESTE AGORA",
    highlight: true,
  },
  {
    id: "diamante",
    name: "PACOTE DIAMANTE",
    emoji: "💎",
    price: "R$69,90",
    features: ["📸 10 Fotos em Alta Definição", "👨‍👩‍👧‍👦 +3 Pessoas (Família completa)", "⚡ Entrega VIP (24 Horas)"],
    cta: "QUERO ESTE AGORA",
  },
];

const PricingCards = ({ userName }: { userName: string }) => {
  const buildLink = (pkgName: string) => {
    const msg = `Olá, meu nome é ${userName || "[seu nome]"}! Fiz o quiz e escolhi o ${pkgName}`;
    return `https://wa.me/5511921824150?text=${encodeURIComponent(msg)}`;
  };

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
        {packages.map((p) => (
          <div
            key={p.id}
            className={`relative rounded-2xl p-5 backdrop-blur-xl bg-white/5 border transition-all duration-300 hover:-translate-y-1 ${
              p.highlight
                ? "border-amber-400/60 shadow-[0_0_30px_rgba(251,191,36,0.25)]"
                : "border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-gradient-to-r from-amber-300 to-amber-500 text-black shadow-md whitespace-nowrap">
                <Crown className="w-3 h-3" />
                MELHOR ESCOLHA
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

            <a
              href={buildLink(p.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 block text-center w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                p.highlight
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110"
                  : "text-foreground hover:brightness-110"
              }`}
              style={!p.highlight ? { background: "var(--quiz-purple)" } : undefined}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
