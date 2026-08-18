import type { ChangeEvent } from "react";

import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { usePlayerContext } from "./PlayerContext";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function GlobalPlayer() {
  const { currentTrack } = usePlayerContext();

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
  } = useAudioPlayer();

  const hasTrack = currentTrack !== null;

  const coverUrl = currentTrack?.album.cover.medium ?? "";
  const hasCover = coverUrl.length > 0;

  const handleTogglePlay = async () => {
    if (!hasTrack) {
      return;
    }

    try {
      await togglePlay();
    } catch (error) {
      console.error(
        "Não foi possível alterar o estado de reprodução.",
        error,
      );
    }
  };

  const handleSeek = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newTime = Number(event.target.value);

    seek(newTime);
  };

  const handleVolumeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = Number(event.target.value) / 100;

    setVolume(newVolume);
  };

  return (
    <footer
      className="player"
      aria-label="Controles do player"
    >
      {/* =========================
          FAIXA ATUAL
      ========================== */}
      <section
        className="player__track"
        aria-label="Música atual"
      >
        <div className="player__cover">
          {hasCover ? (
            <img
              src={coverUrl}
              alt={
                currentTrack
                  ? `Capa do álbum ${currentTrack.album.title}`
                  : ""
              }
            />
          ) : (
            <span aria-hidden="true">♪</span>
          )}
        </div>

        <div className="player__metadata">
          <strong>
            {currentTrack?.title ??
              "Nenhuma música tocando"}
          </strong>

          <span>
            {currentTrack?.artist.name ??
              "Escolha algo para começar"}
          </span>
        </div>

        <button
          className="player__favorite"
          type="button"
          aria-label="Adicionar música atual aos favoritos"
          disabled={!hasTrack}
        >
          ♡
        </button>
      </section>

      {/* =========================
          CONTROLES CENTRAIS
      ========================== */}
      <section
        className="player__center"
        aria-label="Reprodução"
      >
        <div className="player__controls">
          <button
            type="button"
            aria-label="Ativar reprodução aleatória"
            disabled
          >
            ⤨
          </button>

          <button
            type="button"
            aria-label="Música anterior"
            disabled
          >
            ◀
          </button>

          <button
            className="player__play"
            type="button"
            aria-label={
              isPlaying ? "Pausar" : "Reproduzir"
            }
            onClick={handleTogglePlay}
            disabled={!hasTrack}
          >
            {isPlaying ? "Ⅱ" : "▶"}
          </button>

          <button
            type="button"
            aria-label="Próxima música"
            disabled
          >
            ▶
          </button>

          <button
            type="button"
            aria-label="Ativar repetição"
            disabled
          >
            ↻
          </button>
        </div>

        {/* =========================
            PROGRESSO
        ========================== */}
        <div className="player__progress">
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(
              currentTime,
              duration || 0,
            )}
            aria-label="Progresso da música"
            onChange={handleSeek}
            disabled={!hasTrack}
          />

          <span>{formatTime(duration)}</span>
        </div>
      </section>

      {/* =========================
          VOLUME
      ========================== */}
      <section
        className="player__volume"
        aria-label="Volume"
      >
        <span aria-hidden="true">♪</span>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(volume * 100)}
          aria-label="Volume"
          onChange={handleVolumeChange}
          disabled={!hasTrack}
        />
      </section>
    </footer>
  );
}