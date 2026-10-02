import React from 'react';

export const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Degradê de Fundo em Preto Fosco Premium */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #18181c 0%, #111114 25%, #09090b 60%, #040405 100%)',
        }}
      />

      {/* 2. Efeito de Reflexo de Luz (Sheen / Specular Light) */}
      {/* Reflexo superior centralizado (luz suave de estúdio sobre a superfície fosca) */}
      <div 
        className="absolute top-0 inset-x-0 h-[450px]"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.045) 0%, rgba(245, 158, 11, 0.03) 40%, transparent 80%)',
        }}
      />

      {/* Reflexo diagonal sutil (brilho de ângulo que dá profundidade e volume) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 35%, rgba(245, 158, 11, 0.018) 60%, transparent 85%)',
        }}
      />

      {/* Reflexo quente de brasa no canto inferior */}
      <div 
        className="absolute -bottom-24 right-0 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle at 80% 80%, rgba(234, 88, 12, 0.03) 0%, rgba(245, 158, 11, 0.015) 45%, transparent 75%)',
        }}
      />

      {/* 3. Textura Fosca Granulada (Noise Grain Texture) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-overlay">
        <filter id="matte-noise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#matte-noise)" />
      </svg>

      {/* 4. Mini Hambúrgueres Espalhados Transparentes (Bem pequenos mesmo) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern 
            id="mini-burgers-pattern" 
            width="140" 
            height="140" 
            patternUnits="userSpaceOnUse"
          >
            {/* Mini Hambúrguer 1 - Inclinado à esquerda (-15°), pequeno (~17px), tom âmbar discreto */}
            <g transform="translate(24, 20) rotate(-15)">
              {/* Pão de cima */}
              <path 
                d="M2 7.5C2 3.8 5.2 1.5 9.5 1.5C13.8 1.5 17 3.8 17 7.5H2Z" 
                stroke="#f59e0b" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.055"
              />
              {/* Gergelim */}
              <circle cx="6.5" cy="4.2" r="0.5" fill="#f59e0b" opacity="0.055" />
              <circle cx="10" cy="3.2" r="0.5" fill="#f59e0b" opacity="0.055" />
              <circle cx="13" cy="4.5" r="0.5" fill="#f59e0b" opacity="0.055" />
              {/* Queijo ondulado */}
              <path 
                d="M1.5 9.5C3 8.8 4.5 10.2 6.5 9.5C8.5 8.8 10.5 10.2 12.5 9.5C14.5 8.8 16 10 17.5 9.5" 
                stroke="#fbbf24" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                fill="none" 
                opacity="0.05"
              />
              {/* Hambúrguer carne */}
              <rect 
                x="2" 
                y="11" 
                width="15" 
                height="2.2" 
                rx="1.1" 
                fill="#f59e0b" 
                opacity="0.045"
              />
              {/* Pão de baixo */}
              <path 
                d="M3 14.5H16C16 16.5 13.5 17.5 9.5 17.5C5.5 17.5 3 16.5 3 14.5Z" 
                stroke="#f59e0b" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.055"
              />
            </g>

            {/* Mini Hambúrguer 2 - Inclinado à direita (+20°), ainda menor (~14px), tom prata/branco translúcido */}
            <g transform="translate(95, 45) rotate(20) scale(0.85)">
              <path 
                d="M2 7.5C2 3.8 5.2 1.5 9.5 1.5C13.8 1.5 17 3.8 17 7.5H2Z" 
                stroke="#ffffff" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.038"
              />
              <circle cx="6.5" cy="4.2" r="0.5" fill="#ffffff" opacity="0.038" />
              <circle cx="10" cy="3.2" r="0.5" fill="#ffffff" opacity="0.038" />
              <circle cx="13" cy="4.5" r="0.5" fill="#ffffff" opacity="0.038" />
              <path 
                d="M1.5 9.5C3 8.8 4.5 10.2 6.5 9.5C8.5 8.8 10.5 10.2 12.5 9.5C14.5 8.8 16 10 17.5 9.5" 
                stroke="#ffffff" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                fill="none" 
                opacity="0.035"
              />
              <rect 
                x="2" 
                y="11" 
                width="15" 
                height="2.2" 
                rx="1.1" 
                fill="#ffffff" 
                opacity="0.03"
              />
              <path 
                d="M3 14.5H16C16 16.5 13.5 17.5 9.5 17.5C5.5 17.5 3 16.5 3 14.5Z" 
                stroke="#ffffff" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.038"
              />
            </g>

            {/* Mini Hambúrguer 3 - Posição alternada inferior (55, 95), leve inclinação (+6°), tom âmbar/laranja */}
            <g transform="translate(55, 95) rotate(6) scale(0.9)">
              <path 
                d="M2 7.5C2 3.8 5.2 1.5 9.5 1.5C13.8 1.5 17 3.8 17 7.5H2Z" 
                stroke="#f59e0b" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.045"
              />
              <circle cx="7" cy="4.2" r="0.5" fill="#f59e0b" opacity="0.045" />
              <circle cx="11" cy="3.5" r="0.5" fill="#f59e0b" opacity="0.045" />
              <path 
                d="M1.5 9.5C3 8.8 4.5 10.2 6.5 9.5C8.5 8.8 10.5 10.2 12.5 9.5C14.5 8.8 16 10 17.5 9.5" 
                stroke="#f97316" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                fill="none" 
                opacity="0.04"
              />
              <rect 
                x="2" 
                y="11" 
                width="15" 
                height="2.2" 
                rx="1.1" 
                fill="#f59e0b" 
                opacity="0.038"
              />
              <path 
                d="M3 14.5H16C16 16.5 13.5 17.5 9.5 17.5C5.5 17.5 3 16.5 3 14.5Z" 
                stroke="#f59e0b" 
                strokeWidth="1.1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                opacity="0.045"
              />
            </g>

            {/* Ponto sutil de brilho / estrela na brasa bem tênue */}
            <circle cx="125" cy="115" r="1" fill="#f59e0b" opacity="0.04" />
            <circle cx="18" cy="85" r="0.8" fill="#ffffff" opacity="0.03" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#mini-burgers-pattern)" />
      </svg>
    </div>
  );
};
