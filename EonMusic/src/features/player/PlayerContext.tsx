import { createContext, useContext, useState, type ReactNode } from "react";

import type { Track } from "../../core/types/domain";
import { audioService } from "../../services/audioService";

interface PlayerContextValue {
  currentTrack: Track | null;
  playTrack: (track: Track) => Promise<void>;
}

interface PlayerProviderProps {
  children: ReactNode;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const playTrack = async (track: Track) => {
    audioService.pause();

    audioService.load(track.audioUrl);

    audioService.setMediaMetadata({
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
    });

    setCurrentTrack(track);

    await audioService.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext(): PlayerContextValue {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayerContext deve ser usado dentro de PlayerProvider.",
    );
  }

  return context;
}
