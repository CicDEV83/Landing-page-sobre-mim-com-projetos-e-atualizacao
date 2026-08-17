import type { Album, Artist, Track } from "../core/types/domain";

class LocalMusicService {
  private readonly unknownArtist: Artist = {
    id: "local-unknown-artist",
    name: "Artista desconhecido",
    isVerified: false,
  };

  private readonly unknownAlbum: Album = {
    id: "local-unknown-album",
    title: "Músicas do dispositivo",
    artist: this.unknownArtist,
    cover: {
      thumbnail: "",
      medium: "",
      large: "",
    },
    releaseYear: new Date().getFullYear(),
  };

  importFiles(files: FileList | File[]): Track[] {
    const fileArray = Array.from(files);

    return fileArray
      .filter((file) => this.isAudioFile(file))
      .map((file) => this.createTrack(file));
  }

  revokeTrackUrl(track: Track): void {
    if (track.sourceType !== "local") {
      return;
    }

    URL.revokeObjectURL(track.audioUrl);
  }

  private isAudioFile(file: File): boolean {
    return file.type.startsWith("audio/");
  }

  private createTrack(file: File): Track {
    const audioUrl = URL.createObjectURL(file);

    return {
      id: this.createTrackId(file),
      title: this.getTrackTitle(file.name),
      durationMs: 0,
      artist: this.unknownArtist,
      album: this.unknownAlbum,
      audioUrl,
      sourceType: "local",
      isExplicit: false,
      isLiked: false,
    };
  }

  private createTrackId(file: File): string {
    return ["local", file.name, file.size, file.lastModified].join("-");
  }

  private getTrackTitle(fileName: string): string {
    const extensionIndex = fileName.lastIndexOf(".");

    if (extensionIndex <= 0) {
      return fileName;
    }

    return fileName.slice(0, extensionIndex);
  }
}

export const localMusicService = new LocalMusicService();
