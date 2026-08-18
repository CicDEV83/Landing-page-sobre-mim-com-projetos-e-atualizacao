import { useRef, type ChangeEvent } from "react";

import type { Track } from "../../core/types/domain";
import { localMusicService } from "../../services/localMusicService";

interface LocalMusicPickerProps {
  onTrackSelected: (track: Track) => void;
}

export function LocalMusicPicker({ onTrackSelected }: LocalMusicPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      const [track] = await localMusicService.importFiles(files);

      if (!track) {
        return;
      }

      onTrackSelected(track);
    } catch (error) {
      console.error("Não foi possível importar a música selecionada.", error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="audio/*"
        onChange={handleFileSelected}
      />

      <button
        className="button button--primary"
        type="button"
        onClick={openFilePicker}
      >
        <span aria-hidden="true">＋</span>
        <span>Escolher música</span>
      </button>
    </>
  );
}
