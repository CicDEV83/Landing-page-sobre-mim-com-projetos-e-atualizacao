
import type { ReactNode } from "react";

interface CaseBrandIconProps {
  brandName: string;
}

export function CaseBrandIcon({
  brandName,
}: CaseBrandIconProps) {
  const icons: Record<string, ReactNode> = {
    ZenitPay: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="3" />
        <path d="M3 10h18" />
        <path d="M16 15h2" />
        <path d="M7 6V4a1 1 0 0 1 1-1h10" />
      </>
    ),

    AgroLink: (
      <>
        <path d="M20 4C9 4 4 9 4 16a4 4 0 0 0 4 4c7 0 12-5 12-16Z" />
        <path d="M4 20c3-6 7-9 12-12" />
      </>
    ),

    VitaCare: (
      <>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
        <path d="M4.8 12h4l1.5-3 3.1 6 1.5-3h4.2" />
      </>
    ),

    FlowOps: (
      <>
        <rect x="2" y="9" width="5" height="6" rx="1" />
        <rect x="17" y="2" width="5" height="6" rx="1" />
        <rect x="17" y="16" width="5" height="6" rx="1" />
        <path d="M7 12h5a4 4 0 0 0 4-4" />
        <path d="M12 12a4 4 0 0 1 4 4" />
        <path d="m14 6 2 2 2-2" />
        <path d="m14 18 2-2 2 2" />
      </>
    ),
  };

  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[brandName] ?? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M8 12h8M12 8v8" />
        </>
      )}
    </svg>
  );
}
