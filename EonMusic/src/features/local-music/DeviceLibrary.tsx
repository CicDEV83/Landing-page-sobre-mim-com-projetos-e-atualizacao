import { useRef } from "react";

import type { Track } from "../../core/types/domain";
import { localMusicService } from "../../services/localMusicService";
import { usePlayerContext } from "../player/PlayerContext";

import { LocalMusicPicker } from "./LocalMusicPicker";

export function DeviceLibrary() {
  const { playQueue } = usePlayerContext();

  const currentLocalTracksRef = useRef<Track[]>([]);

  const handleTracksSelected = async (tracks: Track[]) => {
    const previousTracks = currentLocalTracksRef.current;

    currentLocalTracksRef.current = tracks;

    previousTracks.forEach((previousTrack) => {
      const isStillInCurrentSelection = tracks.some(
        (track) => track.audioUrl === previousTrack.audioUrl,
      );

      if (!isStillInCurrentSelection) {
        localMusicService.revokeTrackUrl(previousTrack);
      }
    });

    try {
      await playQueue(tracks);
    } catch (error) {
      console.error(
        "Não foi possível iniciar a fila de músicas selecionadas.",
        error,
      );
    }
  };

  return (
    <section
      className="local-library"
      id="dispositivo"
      aria-labelledby="local-library-title"
    >
      <header className="section-heading">
        <div>
          <p className="section-heading__eyebrow">Sua biblioteca</p>

          <h2 id="local-library-title">Músicas deste dispositivo</h2>
        </div>
      </header>

      <article className="device-card">
        <div className="device-card__content">
          <span className="device-card__icon" aria-hidden="true">
            ♪
          </span>

          <div>
            <h3>Suas músicas. Um toque.</h3>

            <p>
              Escolha uma ou várias músicas armazenadas no seu dispositivo e
              reproduza diretamente no EON MUSIC.
            </p>

            <small>Os arquivos permanecem somente no seu dispositivo.</small>
          </div>
        </div>

        <LocalMusicPicker onTracksSelected={handleTracksSelected} />
      </article>
    </section>
  );
}
