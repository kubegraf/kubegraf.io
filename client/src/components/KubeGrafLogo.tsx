import * as React from "react";

type KubeGrafLogoProps = {
  /** Pixel size for a square logo (width/height). */
  size?: number;
  className?: string;
  title?: string;
};

/**
 * KubeGraf logo mark (non-monogram).
 *
 * Theme switching:
 * - Uses CSS variables derived from the app's `:root` theme tokens (see `src/index.css`)
 * - Works in both system theme + manual `data-theme` overrides.
 */
export function KubeGrafLogo({
  size = 40,
  className,
  title = "KubeGraf",
}: KubeGrafLogoProps) {
  const uid = React.useId();
  const titleId = `kg-title-${uid}`;
  const gradId = `kg-grad-${uid}`;
  const glowId = `kg-glow-${uid}`;

  return (
    <svg
      role="img"
      aria-labelledby={titleId}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>

      <defs>
        <linearGradient id={gradId} x1="14" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--kg-logo-accent-1)" />
          <stop offset="1" stopColor="var(--kg-logo-accent-2)" />
        </linearGradient>
        <radialGradient
          id={glowId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(32 32) rotate(90) scale(28)"
        >
          <stop offset="0" stopColor="var(--kg-logo-accent-2)" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="var(--kg-logo-accent-1)" stopOpacity="0.10" />
          <stop offset="1" stopColor="var(--kg-logo-accent-1)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow to feel "devtools / futuristic" without being loud */}
      <circle cx="32" cy="32" r="28" fill={`url(#${glowId})`} />

      {/* Outer hex frame (graph boundary / cluster boundary) */}
      <path
        d="M32 7.5L52.5 19.5V44.5L32 56.5L11.5 44.5V19.5L32 7.5Z"
        stroke="var(--kg-logo-muted)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Inner "evidence graph" connections */}
      <path
        d="M22 27.5L32 22L42 27.5L40.5 39.5L32 44.5L23.5 39.5L22 27.5Z"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 22V44.5"
        stroke="var(--kg-logo-stroke)"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Nodes */}
      <circle cx="32" cy="22" r="3.2" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="22" cy="27.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="42" cy="27.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="23.5" cy="39.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="40.5" cy="39.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="32" cy="44.5" r="3.2" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />

      {/* Tiny "signal" dot (diagnosis / insight) */}
      <circle cx="48.5" cy="18.5" r="1.8" fill="var(--kg-logo-accent-1)" />
    </svg>
  );
}

