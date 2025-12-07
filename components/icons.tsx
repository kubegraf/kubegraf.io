"use client";

import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const createProps = ({ size = 24, color = "currentColor", strokeWidth = 1.6 }: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
});

export function ArrowRightIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <polygon points="9 5 19 12 9 19 9 5" />
    </svg>
  );
}

export function DownloadCloudIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <path d="M16 16v6H8v-6" />
      <path d="M12 10v6" />
      <path d="M6 16h12" />
      <path d="M9 7a5 5 0 0 1 10 0c0 2.76-2.24 5-5 5h-1" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <path d="M21 14.4A9 9 0 1 1 9.6 3a7 7 0 0 0 11.4 11.4Z" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <polyline points="8 9 3 12 8 15" />
      <line x1="21" y1="6" x2="21" y2="18" />
      <line x1="9" y1="6" x2="21" y2="6" />
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="17" x2="12" y2="20" />
    </svg>
  );
}

export function DashboardIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  const squares = [
    { x: 5, y: 5 },
    { x: 11, y: 5 },
    { x: 17, y: 5 },
    { x: 5, y: 11 },
    { x: 11, y: 11 },
    { x: 17, y: 11 }
  ];
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      {squares.map((sq, index) => (
        <rect key={index} x={sq.x} y={sq.y} width="4" height="4" rx="1" />
      ))}
    </svg>
  );
}

export function RadarIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18" />
      <path d="m7 7 5 5" />
    </svg>
  );
}

export function ActivityIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <polyline points="4 12 9 12 11 7 14 17 20 12" />
    </svg>
  );
}

export function CommandIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <polyline points="6 6 18 18" />
      <polyline points="6 18 18 6" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17 12 22l10-5" />
      <path d="M2 12 12 17l10-5" />
    </svg>
  );
}

export function MapIcon(props: IconProps) {
  const { size, color, strokeWidth, ...rest } = props;
  return (
    <svg {...createProps({ size, color, strokeWidth })} {...rest}>
      <path d="M3 6 9 4l6 2 6-2v14l-6 2-6-2-6 2V6z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}
