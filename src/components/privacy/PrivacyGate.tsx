import { useEffect, useRef, useState } from "react";

import styles from "../../components/privacy/PrivacyGate.module.css";

const PRIVACY_NOTICE_VERSION = "2026-10-28-v1.0";

const PRIVACY_STORAGE_KEY = "eonlabs:privacy-notice";

interface PrivacyAcknowledgement {
  version: string;
  acknowledgedAt: string;
}

function hasAcknowledgedCurrentNotice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const stored = window.localStorage.getItem(PRIVACY_STORAGE_KEY);

    if (!stored) {
      return false;
    }

    const acknowledgement = JSON.parse(
      stored,
    ) as Partial<PrivacyAcknowledgement>;

    return acknowledgement.version === PRIVACY_NOTICE_VERSION;
  } catch {
    return false;
  }
}

function savePrivacyAcknowledgement(): void {
  const acknowledgement: PrivacyAcknowledgement = {
    version: PRIVACY_NOTICE_VERSION,
    acknowledgedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      PRIVACY_STORAGE_KEY,
      JSON.stringify(acknowledgement),
    );
  } catch {
    // Caso o armazenamento esteja indisponível,
    // a confirmação permanecerá válida nesta sessão.
  }
}

function PrivacyIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />

      <path d="M8 10V7a4 4 0 0 1 8 0v3" />

      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PrivacyGate() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [hasAcknowledged, setHasAcknowledged] = useState<boolean>(
    hasAcknowledgedCurrentNotice,
  );

  useEffect(() => {
    if (hasAcknowledged) {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [hasAcknowledged]);

  function handleAcknowledge() {
    savePrivacyAcknowledgement();

    dialogRef.current?.close();

    setHasAcknowledged(true);
  }

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    // Impede o fechamento por Escape.
    // A confirmação registra ciência, não consentimento.
    event.preventDefault();
  }

  if (hasAcknowledged) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="privacy-title"
      aria-describedby="privacy-description"
      onCancel={handleCancel}
    >
      <div className={styles.content}>
        {/* MARCA INSTITUCIONAL */}

        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            E
          </span>

          <div className={styles.brandText}>
            <strong>
              Eon<span>Labs</span>
            </strong>

            <small>PRIVACIDADE E TRANSPARÊNCIA</small>
          </div>
        </div>

        {/* ÍCONE DE PRIVACIDADE */}

        <div className={styles.iconWrapper} aria-hidden="true">
          <PrivacyIcon />
        </div>

        {/* APRESENTAÇÃO */}

        <div className={styles.heading}>
          <span className={styles.eyebrow}>SUA PRIVACIDADE IMPORTA</span>

          <h2 id="privacy-title" className={styles.title}>
            Transparência e <span>proteção de dados.</span>
          </h2>

          <p id="privacy-description" className={styles.description}>
            Antes de conhecer nossas soluções, disponibilizamos informações
            sobre privacidade e tratamento de dados pessoais na EonLabs.
          </p>
        </div>

        {/* INFORMAÇÕES ESSENCIAIS */}

        <div className={styles.information}>
          <div className={styles.informationItem}>
            <span className={styles.informationIcon} aria-hidden="true">
              ✓
            </span>

            <span>
              Os dados fornecidos voluntariamente serão utilizados para atender
              às suas solicitações.
            </span>
          </div>

          <div className={styles.informationItem}>
            <span className={styles.informationIcon} aria-hidden="true">
              ✓
            </span>

            <span>
              Você pode solicitar informações sobre seus dados e exercer os
              direitos previstos na LGPD.
            </span>
          </div>

          <div className={styles.informationItem}>
            <span className={styles.informationIcon} aria-hidden="true">
              ✓
            </span>

            <span>
              Esta confirmação registra apenas sua ciência do aviso, sem
              autorizar tratamentos opcionais.
            </span>
          </div>
        </div>

        {/* AVISO EXPANSÍVEL */}

        <details className={styles.details}>
          <summary className={styles.detailsSummary}>
            <span>Consultar aviso inicial de privacidade</span>

            <span className={styles.chevron} aria-hidden="true">
              ↓
            </span>
          </summary>

          <div className={styles.detailsContent}>
            <h3>Aviso inicial de privacidade</h3>

            <p>
              A EonLabs disponibiliza este aviso para informar sobre o
              tratamento de dados pessoais relacionado à navegação e às
              solicitações de contato.
            </p>

            <h4>Dados fornecidos pelo visitante</h4>

            <p>
              O formulário permite informar nome, endereço de e-mail, empresa,
              país e descrição da solicitação.
            </p>

            <h4>Finalidade do contato</h4>

            <p>
              As informações são utilizadas para preparar solicitações
              comerciais e permitir o atendimento ao visitante.
            </p>

            <h4>Envio da mensagem</h4>

            <p>
              O formulário atual prepara uma mensagem no aplicativo de e-mail. O
              envio depende de confirmação pelo próprio visitante.
            </p>

            <h4>Registro de ciência</h4>

            <p>
              Após a confirmação, o navegador poderá armazenar localmente a
              versão do aviso e a data do registro.
            </p>

            <h4>Direitos dos titulares</h4>

            <p>
              A LGPD prevê direitos como acesso, correção e outras solicitações
              relacionadas aos dados pessoais, conforme aplicável.
            </p>

            <p>Para esclarecimentos, utilize o canal de contato da EonLabs.</p>

            <p className={styles.noticeDisclaimer}>
              Este documento é um aviso inicial. A política institucional
              completa, incluindo informações sobre fornecedores, retenção de
              dados e eventuais cookies opcionais, ainda está em elaboração.
            </p>

            <a
              href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.legalLink}
            >
              Conhecer os direitos dos titulares na ANPD
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
        </details>

        {/* BOTÃO PRINCIPAL */}

        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleAcknowledge}
        >
          <span aria-hidden="true">✓</span>

          <span>Li e estou ciente — Acessar EonLabs</span>

          <span aria-hidden="true">→</span>
        </button>

        {/* OBSERVAÇÃO JURÍDICA */}

        <p className={styles.footerNote}>
          Esta confirmação não representa consentimento para cookies opcionais
          ou publicidade.
        </p>

        <span className={styles.version}>
          Aviso inicial · Versão {PRIVACY_NOTICE_VERSION}
        </span>
      </div>
    </dialog>
  );
}
