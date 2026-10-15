import { useEffect, useRef, useState } from "react";
import type { TeamMember } from "../data/teamMembers";
import { teamMembers } from "../data/teamMembers";
import founderPhoto from "../assets/images/profile.png";
import "../styles/team.css";
import luisPhoto from "../assets/images/Retrato Neon de Desenvolvedor Tech.png";

const memberPhotos: Record<string, string> = {
  founder: founderPhoto,
  luis: luisPhoto,
};

function getMemberPhoto(member: TeamMember): string | null {
  if (!member.image) return null;

  return memberPhotos[member.image] ?? null;
}

function TeamCard({
  member,
  onOpen,
}: {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
}) {
  const photo = getMemberPhoto(member);

  return (
    <article className="team__card">
      <div className="team__photo">
        {photo ? (
          <img src={photo} alt={member.imageAlt} loading="lazy" />
        ) : (
          <div className="team__placeholder" aria-hidden="true">
            <span className="team__placeholder-icon">✧</span>
            <span className="team__placeholder-initial">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="team__card-content">
        <span className="team__card-eyebrow">EONLABS • TEAM</span>

        <h3>{member.name}</h3>

        <p className="team__role">{member.role}</p>

        {member.specialties.length > 0 && (
          <div className="team__skills-group">
            <h4>Especialidades</h4>

            <ul className="team__specialties">
              {member.specialties.map((specialty) => (
                <li key={specialty}>{specialty}</li>
              ))}
            </ul>
          </div>
        )}

        {member.technologies.length > 0 && (
          <div className="team__skills-group">
            <h4>Tecnologias</h4>

            <ul className="team__specialties team__technologies">
              {member.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          className="team__button"
          onClick={() => onOpen(member)}
          aria-label={`Conhecer perfil de ${member.name}`}
        >
          Ver perfil
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  function openProfile(member: TeamMember) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedMember(member);
  }

  function closeProfile() {
    setSelectedMember(null);
  }

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedMember(null);
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(".team__modal-panel");

        if (!modal) return;

        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [selectedMember]);

  return (
    <section id="equipe" className="team" aria-labelledby="team-title">
      <div className="container team__container">
        <header className="team__heading">
          <span className="team__eyebrow">✧ TALENTOS & INOVAÇÃO</span>

          <h2 id="team-title">
            Nossa <span>Equipe</span>
          </h2>

          <p>
            Pessoas, conhecimentos e novas ideias que contribuem para a
            construção da EonLabs.
          </p>
        </header>

        <div className="team__grid">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} onOpen={openProfile} />
          ))}
        </div>
      </div>

      {selectedMember && (
        <div
          className="team__modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProfile();
            }
          }}
        >
          <div
            className="team__modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            aria-describedby="team-modal-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="team__modal-close"
              onClick={closeProfile}
              aria-label="Fechar perfil"
            >
              ×
            </button>

            <div className="team__modal-photo">
              {getMemberPhoto(selectedMember) ? (
                <img
                  src={getMemberPhoto(selectedMember)!}
                  alt={selectedMember.imageAlt}
                />
              ) : (
                <div className="team__placeholder" aria-hidden="true">
                  <span className="team__placeholder-initial">
                    {selectedMember.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="team__modal-content">
              <span className="team__modal-eyebrow">PROFISSIONAIS EONLABS</span>

              <h3 id="team-modal-title">{selectedMember.name}</h3>

              <p className="team__modal-role">{selectedMember.role}</p>

              <p
                className="team__modal-description"
                id="team-modal-description"
              >
                {selectedMember.description}
              </p>

              {selectedMember.specialties.length > 0 && (
                <div className="team__modal-group">
                  <h4>Especialidades e competências</h4>

                  <ul className="team__specialties">
                    {selectedMember.specialties.map((specialty) => (
                      <li key={specialty}>{specialty}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
