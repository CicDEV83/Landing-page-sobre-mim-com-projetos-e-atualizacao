export type ID = string;

export interface ImageSizes {
  thumbnail: string;
  medium: string;
  large: string;
}

export interface Artist {
  id: ID;
  name: string;
  avatarUrl?: ImageSizes;
  isVerified?: boolean;
}

export interface Album {
  id: ID;
  title: string;
  artist: Artist;
  cover: ImageSizes;
  releaseYear: number;
  totalTracks?: number;
}

export interface Track {
  id: ID;
  title: string;
  durationMs: number;
  artist: Artist;
  album: Album;
  audioUrl: string;
  sourceType?: "local" | "remote";
  trackNumber?: number;
  isExplicit: boolean;
  isLiked?: boolean;
}
