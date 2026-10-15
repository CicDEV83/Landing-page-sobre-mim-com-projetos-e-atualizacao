import { useEffect, useState } from "react";

const sourceCode = [
  "const developer = {",
  '  name: "CicGhost",',
  '  role: "EonLabs Founder",',
  '  passion: "Build the Future",',
  "};",
  "",
  "function createFuture() {",
  "  return developer.passion;",
  "}",
  "",
  "export default createFuture;",
].join("\n");

/**
 * Cenário construído inteiramente com elementos HTML/CSS.
 * A digitação é real: o estado React revela os caracteres progressivamente.
 */
export function DeveloperWorkspace() {
  const [characters, setCharacters] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return sourceCode.length;
    }
    return 0;
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      return;
    }

    let current = 0;
    let pause = 0;
    const interval = window.setInterval(() => {
      if (current < sourceCode.length) {
        current += 1;
        setCharacters(current);
      } else if (pause < 35) {
        pause += 1;
      } else {
        current = 0;
        pause = 0;
        setCharacters(0);
      }
    }, 55);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="developer-workspace"
      role="img"
      aria-label="Estúdio futurista de desenvolvimento com três monitores e código sendo digitado automaticamente"
    >
      <div className="developer-workspace__ambient" aria-hidden="true" />
      <div
        className="developer-workspace__light developer-workspace__light--cyan"
        aria-hidden="true"
      />
      <div
        className="developer-workspace__light developer-workspace__light--violet"
        aria-hidden="true"
      />

      <div
        className="developer-workspace__monitor developer-workspace__monitor--left"
        aria-hidden="true"
      >
        <div className="developer-workspace__screen">
          <div className="developer-workspace__toolbar">
            <i />
            <i />
            <i />
            <span>system.log</span>
          </div>
          <div className="developer-workspace__metrics">
            <span>
              CPU <b>24%</b>
            </span>
            <span>
              RAM <b>48%</b>
            </span>
          </div>
          <div className="developer-workspace__graph">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="developer-workspace__screen-caption">
            ● BUILD SUCCESS
          </div>
        </div>
        <div className="developer-workspace__stand" />
      </div>

      <div
        className="developer-workspace__monitor developer-workspace__monitor--center"
        aria-hidden="true"
      >
        <div className="developer-workspace__screen">
          <div className="developer-workspace__toolbar">
            <i />
            <i />
            <i />
            <span>portfolio.tsx</span>
          </div>
          <pre className="developer-workspace__code">
            <code>
              {sourceCode.slice(0, characters)}
              <span className="developer-workspace__caret" />
            </code>
          </pre>
        </div>
        <div className="developer-workspace__stand" />
      </div>

      <div
        className="developer-workspace__monitor developer-workspace__monitor--right"
        aria-hidden="true"
      >
        <div className="developer-workspace__screen">
          <div className="developer-workspace__toolbar">
            <i />
            <i />
            <i />
            <span>preview.local</span>
          </div>
          <div className="developer-workspace__preview">
            <span className="developer-workspace__preview-mark">EL</span>
            <span>BUILDING</span>
            <strong>THE FUTURE</strong>
            <small>● ONLINE</small>
          </div>
        </div>
        <div className="developer-workspace__stand" />
      </div>

      <div className="developer-workspace__desk" aria-hidden="true" />
      <div className="developer-workspace__keyboard" aria-hidden="true" />
      <div className="developer-workspace__mouse" aria-hidden="true" />
      <div className="developer-workspace__chair" aria-hidden="true" />
      <div className="developer-workspace__person" aria-hidden="true">
        <div className="developer-workspace__head" />
        <div className="developer-workspace__body" />
        <div className="developer-workspace__arm" />
      </div>
    </div>
  );
}
