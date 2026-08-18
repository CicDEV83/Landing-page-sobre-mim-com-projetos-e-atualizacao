import { parseBlob } from "music-metadata";

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

  async importFiles(files: FileList | File[]): Promise<Track[]> {
    const fileArray = Array.from(files);

    const audioFiles = fileArray.filter((file) => this.isAudioFile(file));

    return Promise.all(audioFiles.map((file) => this.createTrack(file)));
  }

  revokeTrackUrl(track: Track): void {
    if (track.sourceType !== "local") {
      return;
    }

    URL.revokeObjectURL(track.audioUrl);

    const coverUrl = track.album.cover.medium;

    if (coverUrl.startsWith("blob:")) {
      URL.revokeObjectURL(coverUrl);
    }
  }

  private isAudioFile(file: File): boolean {
    return file.type.startsWith("audio/");
  }

  private async createTrack(file: File): Promise<Track> {
    const audioUrl = URL.createObjectURL(file);

    try {
      const metadata = await parseBlob(file);

      console.log("Metadados encontrados:", metadata);

      const artist = this.createArtist(metadata.common.artist);

      const coverUrl = this.createCoverUrl(metadata.common.picture?.[0]);

      const album = this.createAlbum({
        title: metadata.common.album,
        artist,
        coverUrl,
        year: metadata.common.year,
      });

      return {
        id: this.createTrackId(file),
        title: metadata.common.title ?? this.getTrackTitle(file.name),
        durationMs: Math.round((metadata.format.duration ?? 0) * 1000),
        artist,
        album,
        audioUrl,
        sourceType: "local",
        trackNumber: metadata.common.track.no ?? undefined,
        isExplicit: false,
        isLiked: false,
      };
    } catch (error) {
      console.error("Não foi possível ler os metadados da música.", error);

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
  }

  private createArtist(artistName?: string): Artist {
    if (!artistName) {
      return this.unknownArtist;
    }

    return {
      id: `local-artist-${this.slugify(artistName)}`,
      name: artistName,
      isVerified: false,
    };
  }

  private createAlbum({
    title,
    artist,
    coverUrl,
    year,
  }: {
    title?: string;
    artist: Artist;
    coverUrl: string;
    year?: number;
  }): Album {
    const albumTitle = title ?? "Músicas do dispositivo";

    return {
      id: `local-album-${this.slugify(`${artist.name}-${albumTitle}`)}`,
      title: albumTitle,
      artist,
      cover: {
        thumbnail: coverUrl,
        medium: coverUrl,
        large: coverUrl,
      },
      releaseYear: year ?? new Date().getFullYear(),
    };
  }

  private createCoverUrl(
    picture:
      | {
          format: string;
          data: Uint8Array;
        }
      | undefined,
  ): string {
    if (!picture) {
      return "";
    }

    const imageBlob = new Blob([new Uint8Array(picture.data)], {
      type: picture.format,
    });

    return URL.createObjectURL(imageBlob);
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

  private slugify(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
}

export const localMusicService = new LocalMusicService();
