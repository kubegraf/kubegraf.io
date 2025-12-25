import * as React from "react";

type KubeGrafLogoProps = {
  /** Pixel size for a square logo (width/height). */
  size?: number;
  className?: string;
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
}: KubeGrafLogoProps) {
  const uid = React.useId();
  const gradId = `kg-grad-${uid}`;
  const glowId = `kg-glow-${uid}`;
  const ringId = `kg-ring-${uid}`;

  return (
    <svg
      role="presentation"
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--kg-logo-accent-1)" />
          <stop offset="1" stopColor="var(--kg-logo-accent-2)" />
        </linearGradient>
        <linearGradient id={ringId} x1="10" y1="32" x2="54" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--kg-logo-accent-2)" />
          <stop offset="1" stopColor="var(--kg-logo-accent-1)" />
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

      {/* Minimal, modern "signal graph" mark (no letters / monogram) */}
      <circle cx="32" cy="32" r="28" fill={`url(#${glowId})`} />

      {/* Gradient ring */}
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke={`url(#${ringId})`}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Quiet inner ring to add depth */}
      <circle cx="32" cy="32" r="13.5" stroke="var(--kg-logo-muted)" strokeWidth="2" />

      {/* Central hub + three satellites (cluster -> evidence graph) */}
      <path
        d="M32 32L23.5 22.5M32 32L40.5 22.5M32 32L32 45"
        stroke="var(--kg-logo-stroke)"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="32" cy="32" r="3.4" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="23.5" cy="22.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="40.5" cy="22.5" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />
      <circle cx="32" cy="45" r="3.0" fill="var(--kg-logo-surface)" stroke={`url(#${gradId})`} strokeWidth="2" />

      {/* Small "signal" bead on the ring */}
      <circle cx="49.2" cy="28.8" r="2.0" fill="var(--kg-logo-accent-1)" />
    </svg>
  );
}

