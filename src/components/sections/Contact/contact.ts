/**
 * EONLABS — CONFIGURACAO DE CONTATOS
 *
 * Centraliza os canais comerciais.
 * Atualize aqui caso o numero ou email mude.
 */

export const contactConfig = {
  whatsappNumber: "5565998024631",
  email: "csilvaw9.3@gmail.com",
} as const;

const defaultWhatsAppMessage =
  "Olá, equipe EonLabs! Conheci as soluções da empresa " +
  "e gostaria de conversar sobre um projeto. " +
  "Podemos falar?";

/**
 * Abre o WhatsApp com uma mensagem preenchida.
 */
export function getWhatsAppLink(
  message: string = defaultWhatsAppMessage,
): string {
  return (
    `https://wa.me/${contactConfig.whatsappNumber}` +
    `?text=${encodeURIComponent(message)}`
  );
}

export interface ProjectRequest {
  name: string;
  email: string;
  company: string;
  country: string;
  description: string;
}

/**
 * Prepara uma mensagem para o aplicativo de email.
 *
 * ATENCAO:
 * mailto: abre o aplicativo de email do visitante.
 * Nao envia a mensagem automaticamente.
 */
export function getProjectEmailLink(project: ProjectRequest): string {
  const subject = "Solicitação de projeto - EonLabs";

  const body = [
    "Olá, equipe EonLabs!",
    "",
    "Gostaria de solicitar uma avaliação para meu projeto.",
    "",
    `Nome: ${project.name}`,
    `E-mail: ${project.email}`,
    `Empresa: ${project.company || "Não informada"}`,
    `País: ${project.country}`,
    "",
    "Descrição do projeto:",
    project.description,
    "",
    "Aguardo contato para conversarmos sobre os próximos passos.",
    "",
    "Atenciosamente,",
    project.name,
  ].join("\n");

  return (
    `mailto:${contactConfig.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}
