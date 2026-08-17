type AudioEvent =
  | "play"
  | "pause"
  | "timeupdate"
  | "loadedmetadata"
  | "ended"
  | "volumechange"
  | "error";

type AudioEventCallback = () => void;

interface MediaMetadataData {
  title: string;
  artist: string;
  album: string;
  artwork?: MediaImage[];
}

class AudioService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.preload = "metadata";

    this.configureMediaSession();
  }

  load(source: string): void {
    this.audio.src = source;
    this.audio.load();
  }

  async play(): Promise<void> {
    await this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  async togglePlay(): Promise<void> {
    if (this.audio.paused) {
      await this.play();
      return;
    }

    this.pause();
  }

  setVolume(volume: number): void {
    const safeVolume = Math.min(Math.max(volume, 0), 1);

    this.audio.volume = safeVolume;
  }

  seek(time: number): void {
    if (!Number.isFinite(time)) {
      return;
    }

    const safeTime = Math.max(0, Math.min(time, this.duration));

    this.audio.currentTime = safeTime;
  }

  setMediaMetadata(metadata: MediaMetadataData): void {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: metadata.title,
      artist: metadata.artist,
      album: metadata.album,
      artwork: metadata.artwork,
    });
  }

  clearMediaMetadata(): void {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.metadata = null;
  }

  on(event: AudioEvent, callback: AudioEventCallback): void {
    this.audio.addEventListener(event, callback);
  }

  off(event: AudioEvent, callback: AudioEventCallback): void {
    this.audio.removeEventListener(event, callback);
  }

  get currentTime(): number {
    return this.audio.currentTime;
  }

  get duration(): number {
    return Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
  }

  get volume(): number {
    return this.audio.volume;
  }

  get isPaused(): boolean {
    return this.audio.paused;
  }

  get isPlaying(): boolean {
    return !this.audio.paused;
  }

  private configureMediaSession(): void {
    if (!("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.setActionHandler("play", async () => {
      await this.play();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      this.pause();
    });

    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      const skipTime = details.seekOffset ?? 10;

      this.seek(this.currentTime - skipTime);
    });

    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      const skipTime = details.seekOffset ?? 10;

      this.seek(this.currentTime + skipTime);
    });

    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime === undefined) {
        return;
      }

      this.seek(details.seekTime);
    });
  }
}

export const audioService = new AudioService();
