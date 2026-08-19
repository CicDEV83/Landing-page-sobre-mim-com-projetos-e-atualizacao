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
  const {
    currentTrack,
    queue,
    currentIndex,
    isShuffleEnabled,
    repeatMode,
    playNext,
    playPrevious,
    toggleShuffle,
    cycleRepeatMode,
    toggleFavorite,
    isTrackLiked,
  } = usePlayerContext();

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

  const isCurrentTrackLiked =
    currentTrack !== null ? isTrackLiked(currentTrack.id) : false;

  const canPlayPrevious =
    hasTrack &&
    currentIndex >= 0 &&
    (currentIndex > 0 || repeatMode === "all");

  const canPlayNext =
    hasTrack &&
    currentIndex >= 0 &&
    queue.length > 1 &&
    (isShuffleEnabled || currentIndex < queue.length - 1 || repeatMode === "all");

  const repeatIndicator =
    repeatMode === "one" ? "1" : repeatMode === "all" ? "ALL" : "";

  const handleTogglePlay = async () => {
    if (!hasTrack) {
      return;
    }

    try {
      await togglePlay();
    } catch (error) {
      console.error("Não foi possível alterar o estado de reprodução.", error);
    }
  };

  const handlePlayPrevious = async () => {
    if (!canPlayPrevious) {
      return;
    }

    try {
      await playPrevious();
    } catch (error) {
      console.error("Não foi possível reproduzir a música anterior.", error);
    }
  };

  const handlePlayNext = async () => {
    if (!canPlayNext) {
      return;
    }

    try {
      await playNext();
    } catch (error) {
      console.error("Não foi possível reproduzir a próxima música.", error);
    }
  };

  const handleToggleShuffle = () => {
    if (!hasTrack || queue.length <= 1) {
      return;
    }

    toggleShuffle();
  };

  const handleCycleRepeatMode = () => {
    if (!hasTrack) {
      return;
    }

    cycleRepeatMode();
  };

  const handleToggleFavorite = () => {
    if (!currentTrack) {
      return;
    }

    toggleFavorite(currentTrack.id);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value) / 100;
    setVolume(newVolume);
  };

  return (
    <footer className="player" aria-label="Controles do player">
      {/* =========================
          FAIXA ATUAL
      ========================== */}
      <section className="player__track" aria-label="Música atual">
        <div className="player__cover">
          {hasCover ? (
            <img
              src={coverUrl}
              alt={currentTrack ? `Capa do álbum ${currentTrack.album.title}` : ""}
            />
          ) : (
            <span aria-hidden="true">♪</span>
          )}
        </div>

        <div className="player__metadata">
          <strong>{currentTrack?.title ?? "Nenhuma música tocando"}</strong>
          <span>{currentTrack?.artist.name ?? "Escolha algo para começar"}</span>
        </div>

        <button
          className={`player__favorite ${
            isCurrentTrackLiked ? "player__favorite--active" : ""
          }`}
          type="button"
          aria-label={
            isCurrentTrackLiked
              ? "Remover música atual dos favoritos"
              : "Adicionar música atual aos favoritos"
          }
          aria-pressed={isCurrentTrackLiked}
          onClick={handleToggleFavorite}
          disabled={!hasTrack}
        >
          {isCurrentTrackLiked ? "♥" : "♡"}
        </button>
      </section>

      {/* =========================
          CONTROLES CENTRAIS
      ========================== */}
      <section className="player__center" aria-label="Reprodução">
        <div className="player__controls">
          <button
            type="button"
            className={`player__control ${
              isShuffleEnabled ? "player__control--active" : ""
            }`}
            aria-label={
              isShuffleEnabled
                ? "Desativar reprodução aleatória"
                : "Ativar reprodução aleatória"
            }
            aria-pressed={isShuffleEnabled}
            onClick={handleToggleShuffle}
            disabled={!hasTrack || queue.length <= 1}
          >
            <span aria-hidden="true">⤨</span>
          </button>

          <button
            type="button"
            className="player__control"
            aria-label="Música anterior"
            onClick={handlePlayPrevious}
            disabled={!canPlayPrevious}
          >
            ◀
          </button>

          <button
            className="player__play"
            type="button"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            onClick={handleTogglePlay}
            disabled={!hasTrack}
          >
            {isPlaying ? "Ⅱ" : "▶"}
          </button>

          <button
            type="button"
            className="player__control"
            aria-label="Próxima música"
            onClick={handlePlayNext}
            disabled={!canPlayNext}
          >
            ▶
          </button>

          <button
            type="button"
            className={`player__control player__repeat ${
              repeatMode !== "off" ? "player__control--active" : ""
            }`}
            aria-label={
              repeatMode === "off"
                ? "Ativar repetição"
                : repeatMode === "all"
                ? "Repetindo todas as músicas"
                : "Repetindo música atual"
            }
            aria-pressed={repeatMode !== "off"}
            onClick={handleCycleRepeatMode}
            disabled={!hasTrack}
          >
            <span aria-hidden="true">↻</span>

            {repeatIndicator && (
              <span className="player__repeat-indicator">
                {repeatIndicator}
              </span>
            )}
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
            value={Math.min(currentTime, duration || 0)}
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
      <section className="player__volume" aria-label="Volume">
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