import { useEffect, useState } from "react";
import { audioService } from "../services/audioService";

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: audioService.isPlaying,
    currentTime: audioService.currentTime,
    duration: audioService.duration,
    volume: audioService.volume,
  });

  useEffect(() => {
    const updatePlaybackState = () => {
      setState((previousState) => ({
        ...previousState,
        isPlaying: audioService.isPlaying,
      }));
    };

    const updateTime = () => {
      setState((previousState) => ({
        ...previousState,
        currentTime: audioService.currentTime,
      }));
    };

    const updateMetadata = () => {
      setState((previousState) => ({
        ...previousState,
        duration: audioService.duration,
      }));
    };

    const updateVolume = () => {
      setState((previousState) => ({
        ...previousState,
        volume: audioService.volume,
      }));
    };

    audioService.on("play", updatePlaybackState);
    audioService.on("pause", updatePlaybackState);
    audioService.on("timeupdate", updateTime);
    audioService.on("loadedmetadata", updateMetadata);
    audioService.on("volumechange", updateVolume);

    return () => {
      audioService.off("play", updatePlaybackState);
      audioService.off("pause", updatePlaybackState);
      audioService.off("timeupdate", updateTime);
      audioService.off("loadedmetadata", updateMetadata);
      audioService.off("volumechange", updateVolume);
    };
  }, []);

  const togglePlay = async () => {
    await audioService.togglePlay();
  };

  const seek = (time: number) => {
    audioService.seek(time);
  };

  const setVolume = (volume: number) => {
    audioService.setVolume(volume);
  };

  return {
    ...state,
    togglePlay,
    seek,
    setVolume,
  };
}
