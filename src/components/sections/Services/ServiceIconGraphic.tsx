import type { ReactNode } from "react";
import type { ServiceIcon } from "../../../data/services";

type ServiceIconGraphicProps = {
  name: ServiceIcon;
};

export function ServiceIconGraphic({ name }: ServiceIconGraphicProps) {
  const icons: Record<ServiceIcon, ReactNode> = {
    code: (
      <>
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </>
    ),

    mobile: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M10 18h4" />
      </>
    ),

    cloud: (
      <path d="M7 18h10a4 4 0 0 0 1-7.9A6 6 0 0 0 6.2 9 4.5 4.5 0 0 0 7 18Z" />
    ),

    design: (
      <>
        <path d="M4 20h4l11-11-4-4L4 16v4Z" />
        <path d="m13 7 4 4" />
      </>
    ),

    automation: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <circle cx="12" cy="12" r="5" />
        <path d="m10 12 2 2 3-4" />
      </>
    ),

    integration: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="m8 8 3 7M16 8l-3 7M9 6h6" />
      </>
    ),
  };

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
