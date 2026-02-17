export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon - Abstract growth/self symbol */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-600"
      >
        {/* Outer circle - represents wholeness */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner rising shape - represents growth from within */}
        <path
          d="M16 24C16 24 12 20 12 15C12 10 16 8 16 8C16 8 20 10 20 15C20 20 16 24 16 24Z"
          fill="currentColor"
          opacity="0.15"
        />
        <path
          d="M16 24C16 24 12 20 12 15C12 10 16 8 16 8C16 8 20 10 20 15C20 20 16 24 16 24Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Center dot - the self */}
        <circle
          cx="16"
          cy="15"
          r="2"
          fill="currentColor"
        />
      </svg>

      {/* Wordmark */}
      <span className="font-logo text-xl tracking-wide text-stone-700">
        self kudos
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 24C16 24 12 20 12 15C12 10 16 8 16 8C16 8 20 10 20 15C20 20 16 24 16 24Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M16 24C16 24 12 20 12 15C12 10 16 8 16 8C16 8 20 10 20 15C20 20 16 24 16 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="16"
        cy="15"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}
