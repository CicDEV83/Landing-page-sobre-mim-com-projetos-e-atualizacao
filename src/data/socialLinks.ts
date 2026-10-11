export type SocialName = "whatsapp" | "linkedin" | "github" | "email";

interface SocialLink {
  label: string;
  href: string;
  icon: SocialName;
}

export const socialLinks: SocialLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5565998024631",
    icon: "whatsapp",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cicero-silva-056253362/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/CicDEV83",
    icon: "github",
  },
  {
    label: "E-mail",
    href: "mailto:csilvaw9.3@gmail.com",
    icon: "email",
  },
];
