import { useRef } from "react";

import type { Track } from "../../core/types/domain";
import { localMusicService } from "../../services/localMusicService";
import { usePlayerContext } from "../player/PlayerContext";

import { LocalMusicPicker } from "../local-music/LocalMusicPicker";

export function DeviceLibrary() {
  const { playTrack } = usePlayerContext();

  const currentLocalTrackRef = useRef<Track | null>(null);

  const handleTrackSelected = async (track: Track) => {
    const previousTrack = currentLocalTrackRef.current;

    currentLocalTrackRef.current = track;

    if (previousTrack && previousTrack.audioUrl !== track.audioUrl) {
      localMusicService.revokeTrackUrl(previousTrack);
    }

    try {
      await playTrack(track);
    } catch (error) {
      console.error("Não foi possível reproduzir a música selecionada.", error);
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
              Escolha uma música armazenada no seu dispositivo e reproduza
              diretamente no EON MUSIC.
            </p>

            <small>O arquivo permanece somente no seu dispositivo.</small>
          </div>
        </div>

        <LocalMusicPicker onTrackSelected={handleTrackSelected} />
      </article>
    </section>
  );
}
