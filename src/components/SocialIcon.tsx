import type { ReactNode } from "react";
import type { SocialName } from "../data/socialLinks";

export function SocialIcon({ name }: { name: SocialName }): ReactNode {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "whatsapp")
    return (
      <svg {...common}>
        <path d="M20.2 11.5a8.2 8.2 0 0 1-12.1 7.2L3.5 20l1.3-4.4A8.2 8.2 0 1 1 20.2 11.5Z" />
        <path d="M8.5 8.1c-.4.3-.7.9-.7 1.4 0 2.1 3.1 5.4 5.4 6 .6.2 1.3.1 1.8-.3l.8-.8-2.2-1.1-.9 1c-1.4-.7-2.5-1.8-3.2-3.2l.9-.9-1.1-2.1Z" />
      </svg>
    );
  if (name === "linkedin")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7.5 10v7m0-10v.1M11 17v-7m0 3.1a3 3 0 0 1 6 0V17" />
      </svg>
    );
  if (name === "github")
    return (
      <svg {...common}>
        <path
          d="M9 19.5c-4.2 1.2-4.2-2-5.9-2.4M15 21v-3.1c0-.9.2-1.5.6-2-4.2-.5-6.6-2.2-6.6-6.1 0-1.1.4-2.1 1.1-2.9-.1-.7-.2-1.8.2-2.9 0 0 1.2-.3 3.2 1.5a11 11 0 0 1 5.1 0c2-1.8 3.2-1.5 3.2-1.5.4 1.1.3 2.2.2 2.9.7.8 1.1 1.8 1.1 2.9 0 3.9-2.4 5.6-6.6 6.1.4.5.6 1.1.6 2V21"
          transform="translate(-3.1 0)"
        />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
