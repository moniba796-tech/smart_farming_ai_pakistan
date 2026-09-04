import { PlayCircle } from "lucide-react";

interface Props {
  youtubeId?: string;
  titleEn: string;
  titleUr: string;
}

/**
 * Embeds a YouTube tutorial video once you have one recorded and uploaded.
 * Until then, shows a friendly placeholder pointing to the in-app
 * step-by-step guide instead, so the page is never a dead end.
 *
 * To activate: record the video using the script in
 * docs/urdu-tutorial-script.md, upload it (e.g. unlisted on YouTube),
 * and pass its video ID as VITE_TUTORIAL_YOUTUBE_ID in your .env.
 */
export default function VideoPlayer({ youtubeId, titleEn, titleUr }: Props) {
  if (!youtubeId) {
    return (
      <div className="aspect-video rounded-2xl bg-farm-800 flex flex-col items-center justify-center text-center p-8 text-white">
        <PlayCircle className="w-14 h-14 text-farm-300 mb-3" />
        <p className="font-semibold">{titleEn}</p>
        <p className="urdu-text text-farm-200 mt-1">{titleUr}</p>
        <p className="text-xs text-farm-300 mt-4 max-w-sm">
          Video coming soon — in the meantime, follow the step-by-step guide below.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-2xl overflow-hidden shadow-card">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={titleEn}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
