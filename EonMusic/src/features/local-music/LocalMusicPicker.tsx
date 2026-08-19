import { useRef, type ChangeEvent } from "react";

import type { Track } from "../../core/types/domain";
import { localMusicService } from "../../services/localMusicService";

interface LocalMusicPickerProps {
  onTracksSelected: (tracks: Track[]) => void;
}

export function LocalMusicPicker({ onTracksSelected }: LocalMusicPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFilesSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      const tracks = await localMusicService.importFiles(files);

      if (tracks.length === 0) {
        return;
      }

      onTracksSelected(tracks);
    } catch (error) {
      console.error(
        "Não foi possível importar as músicas selecionadas.",
        error,
      );
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
        multiple
        onChange={handleFilesSelected}
      />

      <button
        className="button button--primary"
        type="button"
        onClick={openFilePicker}
      >
        <span aria-hidden="true">＋</span>
        <span>Escolher músicas</span>
      </button>
    </>
  );
}
