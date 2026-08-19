import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Track } from "../../core/types/domain";
import { audioService } from "../../services/audioService";

export type RepeatMode = "off" | "all" | "one";

interface PlayerContextValue {
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;

  isShuffleEnabled: boolean;
  repeatMode: RepeatMode;
  likedTrackIds: string[];

  playTrack: (track: Track) => Promise<void>;

  playQueue: (tracks: Track[], startIndex?: number) => Promise<void>;

  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;

  toggleShuffle: () => void;
  cycleRepeatMode: () => void;

  toggleFavorite: (trackId: string) => void;

  isTrackLiked: (trackId: string) => boolean;
}

interface PlayerProviderProps {
  children: ReactNode;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [queue, setQueue] = useState<Track[]>([]);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);

  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");

  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([]);

  const loadAndPlayTrack = useCallback(async (track: Track): Promise<void> => {
    audioService.pause();
    audioService.load(track.audioUrl);

    audioService.setMediaMetadata({
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
    });

    setCurrentTrack(track);

    await audioService.play();
  }, []);

  const playTrack = useCallback(
    async (track: Track): Promise<void> => {
      setQueue([track]);
      setCurrentIndex(0);

      await loadAndPlayTrack(track);
    },
    [loadAndPlayTrack],
  );

  const playQueue = useCallback(
    async (tracks: Track[], startIndex = 0): Promise<void> => {
      if (tracks.length === 0) {
        return;
      }

      const safeIndex = Math.min(Math.max(startIndex, 0), tracks.length - 1);

      const track = tracks[safeIndex];

      setQueue(tracks);
      setCurrentIndex(safeIndex);

      await loadAndPlayTrack(track);
    },
    [loadAndPlayTrack],
  );

  const getRandomIndex = useCallback(() => {
    if (queue.length <= 1) {
      return currentIndex;
    }

    let randomIndex = currentIndex;

    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * queue.length);
    }

    return randomIndex;
  }, [queue.length, currentIndex]);

  const playNext = useCallback(async (): Promise<void> => {
    if (queue.length === 0 || currentIndex < 0) {
      return;
    }

    let nextIndex: number;

    if (isShuffleEnabled) {
      nextIndex = getRandomIndex();
    } else {
      nextIndex = currentIndex + 1;

      if (nextIndex >= queue.length) {
        if (repeatMode !== "all") {
          return;
        }

        nextIndex = 0;
      }
    }

    const nextTrack = queue[nextIndex];

    if (!nextTrack) {
      return;
    }

    setCurrentIndex(nextIndex);

    await loadAndPlayTrack(nextTrack);
  }, [
    queue,
    currentIndex,
    isShuffleEnabled,
    repeatMode,
    getRandomIndex,
    loadAndPlayTrack,
  ]);

  const playPrevious = useCallback(async (): Promise<void> => {
    if (queue.length === 0 || currentIndex < 0) {
      return;
    }

    let previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
      if (repeatMode !== "all") {
        return;
      }

      previousIndex = queue.length - 1;
    }

    const previousTrack = queue[previousIndex];

    if (!previousTrack) {
      return;
    }

    setCurrentIndex(previousIndex);

    await loadAndPlayTrack(previousTrack);
  }, [queue, currentIndex, repeatMode, loadAndPlayTrack]);

  const toggleShuffle = useCallback(() => {
    setIsShuffleEnabled((previousValue) => !previousValue);
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((currentMode) => {
      switch (currentMode) {
        case "off":
          return "all";

        case "all":
          return "one";

        case "one":
        default:
          return "off";
      }
    });
  }, []);

  const toggleFavorite = useCallback((trackId: string) => {
    setLikedTrackIds((currentIds) => {
      const isAlreadyLiked = currentIds.includes(trackId);

      if (isAlreadyLiked) {
        return currentIds.filter((id) => id !== trackId);
      }

      return [...currentIds, trackId];
    });
  }, []);

  const isTrackLiked = useCallback(
    (trackId: string): boolean => {
      return likedTrackIds.includes(trackId);
    },
    [likedTrackIds],
  );

  useEffect(() => {
    const handleTrackEnded = () => {
      if (!currentTrack) {
        return;
      }

      if (repeatMode === "one") {
        audioService.seek(0);

        audioService.play().catch((error) => {
          console.error("Não foi possível repetir a música.", error);
        });

        return;
      }

      playNext().catch((error) => {
        console.error("Não foi possível avançar após o fim da música.", error);
      });
    };

    audioService.on("ended", handleTrackEnded);

    return () => {
      audioService.off("ended", handleTrackEnded);
    };
  }, [currentTrack, repeatMode, playNext]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        currentIndex,

        isShuffleEnabled,
        repeatMode,
        likedTrackIds,

        playTrack,
        playQueue,
        playNext,
        playPrevious,

        toggleShuffle,
        cycleRepeatMode,

        toggleFavorite,
        isTrackLiked,
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
