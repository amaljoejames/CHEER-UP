import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Heart,
  Pause,
  Play,
  RotateCcw,
  Send,
  Smile,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Router as WouterRouter, Switch } from "wouter";

const queryClient = new QueryClient();

/**
 * IMPORTANT MEDIA RULE
 *
 * These are REAL files from the existing reference-media folder that was
 * copied into the NEW project's public/media directory.
 *
 * The original reference project must remain untouched.
 *
 * Source/reference folder:
 *   D:\CODING\Muskan\Muskan
 *
 * New project media folder:
 *   D:\CODING\Muskan\artifacts\muskan-cheer-up\public\media
 */

type PhotoMedia = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  note: string;
  accent: string;
  className: string;
};

type VideoMedia = {
  id: string;
  src: string;
  title: string;
  eyebrow: string;
  caption: string;
  poster?: string;
};

const MEDIA = {
  images: {
    "photo-01": "/media/ajfahfhafh.jpeg",
    "photo-02": "/media/ajfsljalf.jpeg",
    "photo-03": "/media/aklfsnanfl.jpeg",
    "photo-04": "/media/akljslfalfh.jpeg",
    "photo-05": "/media/aklsflahflh.jpeg",
    "photo-06": "/media/akslfh.jpeg",
    "photo-07": "/media/asfjaflag.jpeg",
    "photo-08": "/media/asfjajfhashfh.jpeg",
    "photo-09": "/media/asjfashfhfa.jpeg",
    "photo-10": "/media/asjhfhasohfo.jpeg",
    "photo-11": "/media/askfhh.jpeg",
    "photo-12": "/media/askjfkajsfh.jpeg",
    "photo-13": "/media/aslkflalfs.jpeg",
    "photo-14": "/media/asnflaslfh.jpeg",
    "photo-15": "/media/kansflahfs.jpeg",
    "photo-16": "/media/klalsflasfhhfs.jpeg",
    "photo-17": "/media/sakjfkahsf.jpeg",
    "photo-18": "/media/shfjahsfasjfk.jpeg",
    "photo-19": "/media/sjafkhaksfh.jpeg",
    "photo-20": "/media/WhatsApp Image 2026-09-02 at 5.53.12 PM.jpeg",
    "photo-21": "/media/WhatsApp Image 2026-09-02 at 5.53.13 PM.jpeg",
  },
  videos: {
    "video-01": "/media/afsklaflh.mp4",
    "video-02": "/media/aksf.mp4",
    "video-03": "/media/aksjfkhafs.mp4",
    "video-04": "/media/asfkjhkasf.mp4",
    "video-05": "/media/ashfhashflha.mp4",
    "video-06": "/media/askfhkahsf.mp4",
    "video-07": "/media/aslkfhalkfsh.mp4",
    "video-08": "/media/asfkjhkasf.mp4",
  },
} as const;

/**
 * Because the source files have random names, we keep a curated presentation
 * layer here. The actual media files are real files from public/media.
 *
 * If you later identify a stronger image after visual review, change only the
 * src value in this list — the rest of the UI does not need to change.
 */
const photos: PhotoMedia[] = [
  {
    id: "photo-01",
    src: MEDIA.images["photo-01"],
    alt: "A personal photo of Muskan",
    caption: "still the same girl",
    note: "One email cannot change who you are.",
    accent: "coral",
    className: "photo-tall",
  },
  {
    id: "photo-02",
    src: MEDIA.images["photo-02"],
    alt: "A personal photo of Muskan",
    caption: "you got this",
    note: "This is one chapter, not the whole story.",
    accent: "mustard",
    className: "photo-medium",
  },
  {
    id: "photo-03",
    src: MEDIA.images["photo-03"],
    alt: "A personal photo of Muskan",
    caption: "main character energy",
    note: "One opportunity does not get to define your potential.",
    accent: "teal",
    className: "photo-large",
  },
  {
    id: "photo-04",
    src: MEDIA.images["photo-04"],
    alt: "A personal photo of Muskan",
    caption: "cutie detected",
    note: "Certified capable. Also certified adorable.",
    accent: "lavender",
    className: "photo-large",
  },
  {
    id: "photo-05",
    src: MEDIA.images["photo-05"],
    alt: "A personal photo of Muskan",
    caption: "sunshine energy",
    note: "Your comeback is going to be better than you expect.",
    accent: "rust",
    className: "photo-tall",
  },
  {
    id: "photo-06",
    src: MEDIA.images["photo-06"],
    alt: "A personal photo of Muskan",
    caption: "smile for me",
    note: "I believe in you, even on the days you don't feel like it.",
    accent: "blue",
    className: "photo-medium",
  },
  {
    id: "photo-07",
    src: MEDIA.images["photo-07"],
    alt: "A personal photo of Muskan",
    caption: "pretty human",
    note: "You are doing better than you think.",
    accent: "pink",
    className: "photo-tall",
  },
  {
    id: "photo-08",
    src: MEDIA.images["photo-08"],
    alt: "A personal photo of Muskan",
    caption: "soft reminder",
    note: "You are allowed to be disappointed and still believe in yourself.",
    accent: "gold",
    className: "photo-medium",
  },
  {
    id: "photo-09",
    src: MEDIA.images["photo-09"],
    alt: "A personal photo of Muskan",
    caption: "one more smile",
    note: "Tomorrow is allowed to be better than today.",
    accent: "coral",
    className: "photo-large",
  },
  {
    id: "photo-10",
    src: MEDIA.images["photo-10"],
    alt: "A personal photo of Muskan",
    caption: "just you",
    note: "No job title can measure all the good things about you.",
    accent: "teal",
    className: "photo-medium",
  },
  {
    id: "photo-11",
    src: MEDIA.images["photo-11"],
    alt: "A personal photo of Muskan",
    caption: "keep going",
    note: "Little steps still count.",
    accent: "lavender",
    className: "photo-tall",
  },
  {
    id: "photo-12",
    src: MEDIA.images["photo-12"],
    alt: "A personal photo of Muskan",
    caption: "that face",
    note: "A gentle reminder to be kinder to yourself.",
    accent: "rust",
    className: "photo-large",
  },
  {
    id: "photo-13",
    src: MEDIA.images["photo-13"],
    alt: "A personal photo of Muskan",
    caption: "future star",
    note: "There are still so many doors you haven't even reached yet.",
    accent: "blue",
    className: "photo-medium",
  },
  {
    id: "photo-14",
    src: MEDIA.images["photo-14"],
    alt: "A personal photo of Muskan",
    caption: "pookie moment",
    note: "This website's unofficial job is making you smile.",
    accent: "pink",
    className: "photo-tall",
  },
  {
    id: "photo-15",
    src: MEDIA.images["photo-15"],
    alt: "A personal photo of Muskan",
    caption: "you, being you",
    note: "And honestly, that is already pretty wonderful.",
    accent: "mustard",
    className: "photo-medium",
  },
  {
    id: "photo-16",
    src: MEDIA.images["photo-16"],
    alt: "A personal photo of Muskan",
    caption: "good days are coming",
    note: "You don't have to know the exact route yet.",
    accent: "coral",
    className: "photo-large",
  },
  {
    id: "photo-17",
    src: MEDIA.images["photo-17"],
    alt: "A personal photo of Muskan",
    caption: "tiny proof",
    note: "This is your reminder that there is more ahead.",
    accent: "teal",
    className: "photo-tall",
  },
  {
    id: "photo-18",
    src: MEDIA.images["photo-18"],
    alt: "A personal photo of Muskan",
    caption: "still cheering",
    note: "Quietly, loudly, awkwardly — I'm still rooting for you.",
    accent: "lavender",
    className: "photo-medium",
  },
  {
    id: "photo-19",
    src: MEDIA.images["photo-19"],
    alt: "A personal photo of Muskan",
    caption: "one for the memories",
    note: "Keep the good bits. Leave the bad email behind.",
    accent: "pink",
    className: "photo-large",
  },
  {
    id: "photo-20",
    src: MEDIA.images["photo-20"],
    alt: "A recent photo of Muskan",
    caption: "recent little moment",
    note: "Right now is not the final version of your story.",
    accent: "gold",
    className: "photo-medium",
  },
  {
    id: "photo-21",
    src: MEDIA.images["photo-21"],
    alt: "A recent photo of Muskan",
    caption: "and another smile",
    note: "Save this one for a day when you need a tiny lift.",
    accent: "rust",
    className: "photo-tall",
  },
];

const videos: VideoMedia[] = [
  {
    id: "video-01",
    src: MEDIA.videos["video-01"],
    poster: MEDIA.images["photo-01"],
    title: "tiny moments",
    eyebrow: "moving memory / 01",
    caption: "A little moving proof that bad news is not the whole story.",
  },
  {
    id: "video-02",
    src: MEDIA.videos["video-02"],
    poster: MEDIA.images["photo-03"],
    title: "replay this smile",
    eyebrow: "moving memory / 02",
    caption: "Some moments deserve another look.",
  },
  {
    id: "video-03",
    src: MEDIA.videos["video-03"],
    poster: MEDIA.images["photo-05"],
    title: "main character clip",
    eyebrow: "moving memory / 03",
    caption: "Your comeback montage needed at least one dramatic scene.",
  },
  {
    id: "video-04",
    src: MEDIA.videos["video-04"],
    poster: MEDIA.images["photo-07"],
    title: "keep this one",
    eyebrow: "moving memory / 04",
    caption: "For the days when you need a softer reminder.",
  },
  {
    id: "video-05",
    src: MEDIA.videos["video-05"],
    poster: MEDIA.images["photo-09"],
    title: "proof of sunshine",
    eyebrow: "moving memory / 05",
    caption: "You still get to have bright little moments.",
  },
  {
    id: "video-06",
    src: MEDIA.videos["video-06"],
    poster: MEDIA.images["photo-12"],
    title: "okay, one more",
    eyebrow: "moving memory / 06",
    caption: "Because obviously two videos were never going to be enough.",
  },
];

const siteConfig = {
  accessCode: "0209",
  date: "02.09.26",
};

const compliments = [
  "You're smarter than you give yourself credit for.",
  "Certified cutie. Also certified capable.",
  "Your comeback arc is going to be ridiculous.",
  "Someone's future company is about to get very lucky.",
  "You are allowed to be sad and still be ambitious.",
  "You have more potential than one HR email can measure.",
  "Honestly pookie, one missed opportunity is not beating you.",
];

const reminders = [
  "One rejection doesn't define you.",
  "Your effort still counts.",
  "You are allowed to feel disappointed.",
  "You can take a breath before taking the next step.",
  "Your worth is bigger than a hiring decision.",
  "There are more opportunities ahead.",
  "You don't have to figure everything out today.",
];

const beliefs = [
  "I believe you're capable.",
  "I believe you'll figure it out.",
  "I believe this isn't your ending.",
  "I believe you'll surprise yourself.",
  "I believe your next chapter can be better.",
  "And yes… I believe in you.",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={`reveal delay-${delay} ${className}`}>{children}</div>;
}

function SectionHeading({
  kicker,
  title,
  copy,
  light = false,
}: {
  kicker: string;
  title: ReactNode;
  copy?: string;
  light?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${light ? "text-[#f8edda]" : ""}`}>
      <p className="font-mono-display text-[10px] uppercase tracking-[.28em] opacity-65">
        {kicker}
      </p>
      <h2 className="font-display mt-4 text-4xl leading-[.98] sm:text-6xl">{title}</h2>
      {copy && (
        <p className="mt-5 max-w-xl text-sm leading-7 opacity-75 sm:text-base">{copy}</p>
      )}
    </div>
  );
}

function StepButton({
  children,
  onClick,
  light = false,
  icon = <ChevronRight size={15} />,
}: {
  children: ReactNode;
  onClick: () => void;
  light?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] ${
        light
          ? "bg-[#f8edda] text-[#321e29]"
          : "bg-[#ffb2a9] text-[#321e29]"
      }`}
    >
      {children}
      {icon}
    </button>
  );
}

function PhotoTile({
  photo,
  index,
  liked,
  onOpen,
  onLike,
}: {
  photo: PhotoMedia;
  index: number;
  liked: boolean;
  onOpen: () => void;
  onLike: () => void;
}) {
  const style = {
    ["--tilt" as string]: `${index % 2 === 0 ? -1.1 : 1.2}deg`,
  } as CSSProperties;

  return (
    <article
      className={`photo-card ${photo.className} reveal ${
        index % 4 === 1 ? "delay-1" : index % 4 === 2 ? "delay-2" : ""
      }`}
      style={style}
      data-testid={`card-memory-${photo.id}`}
    >
      <button
        type="button"
        className="absolute inset-0 z-10 text-left"
        onClick={onOpen}
        aria-label={`Open ${photo.caption}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading={index > 3 ? "lazy" : "eager"}
          className="h-full w-full object-cover"
        />
        <span className="photo-shade absolute inset-0 bg-[#321e29]/20" />
      </button>

      <span className={`tape tape-${photo.accent}`} aria-hidden="true" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-[#321e29]/80 via-[#321e29]/10 to-transparent p-4 pt-14 text-[#fff7eb]">
        <div>
          <p className="font-mono-display text-[9px] uppercase tracking-[.18em] opacity-75">
            {String(index + 1).padStart(2, "0")} / memory
          </p>
          <p className="mt-1 font-display text-xl">{photo.caption}</p>
        </div>

        <button
          type="button"
          className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-[#fff7eb]/45 bg-[#321e29]/30"
          onClick={(event) => {
            event.stopPropagation();
            onLike();
          }}
          aria-label={liked ? `Unlike ${photo.caption}` : `Like ${photo.caption}`}
        >
          <Heart
            size={16}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-[#ffb2a9]" : ""}
          />
        </button>
      </div>
    </article>
  );
}

function VideoMemoryCard({ video }: { video: VideoMedia }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!ref.current) return;

    if (ref.current.paused) {
      void ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  return (
    <article
      className="video-shell overflow-hidden rounded-[1.4rem] border border-[#f8edda]/15 shadow-[0_18px_40px_rgba(26,17,22,.22)]"
      data-testid={`card-video-${video.id}`}
    >
      <div className="relative bg-[#201820]">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          muted={muted}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="aspect-[9/16] w-full object-cover sm:aspect-video"
          aria-label={video.title}
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-[#f8edda]">
          <span className="rounded-full border border-[#f8edda]/30 bg-[#261b22]/55 px-3 py-1 font-mono-display text-[9px] uppercase tracking-[.18em]">
            {video.eyebrow}
          </span>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#f8edda]/30 bg-[#261b22]/55"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f8edda] text-[#321e29] shadow-lg transition-transform hover:scale-105"
          aria-label={playing ? `Pause ${video.title}` : `Play ${video.title}`}
        >
          {playing ? <Pause size={19} /> : <Play size={19} fill="currentColor" />}
        </button>
      </div>

      <div className="p-5 text-[#f8edda] sm:p-6">
        <h3 className="font-display text-2xl">{video.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#f8edda]/65">{video.caption}</p>
      </div>
    </article>
  );
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (code === siteConfig.accessCode) {
      setShowConfirm(true);
    } else {
      setWrong(true);
      setCode("");
      window.setTimeout(() => setWrong(false), 1800);
    }
  };

  const handleUnlock = () => {
    setIsUnlocking(true);
    window.setTimeout(onUnlock, 1300);
  };

  if (showConfirm) {
    return (
      <main className="paper-grain flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#321e29] px-5 py-10 text-[#f8edda]">
        <div className="absolute left-[8%] top-[12%] font-display text-5xl text-[#ffb2a9] opacity-80">
          ✶
        </div>
        <div className="absolute bottom-[15%] right-[10%] font-display text-7xl text-[#e8b45c] opacity-80">
          ♡
        </div>

        <div className="relative w-full max-w-2xl text-center">
          {isUnlocking ? (
            <div className="space-y-6">
              <Sparkles className="mx-auto animate-pulse text-[#ffb2a9]" size={32} />
              <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
                unlocking...
              </p>
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#ffb2a9] border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-8">
              <Sparkles className="mx-auto text-[#e8b45c]" size={24} />
              <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#f8edda]/55">
                access code verified
              </p>
              <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
                Are you ready
                <br />
                to unlock?
              </h2>
              <p className="font-display text-lg text-[#f8edda]/70">
                This is made just for you, pookie. 💗
              </p>

              <button
                type="button"
                onClick={handleUnlock}
                className="inline-flex items-center gap-3 rounded-full bg-[#ffb2a9] px-8 py-4 text-sm font-semibold text-[#321e29] transition-transform hover:scale-105"
              >
                <Sparkles size={16} /> Yes, unlock it <ChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="block mx-auto mt-4 font-mono-display text-[9px] uppercase tracking-[.15em] text-[#f8edda]/35 hover:text-[#f8edda]"
              >
                go back
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="paper-grain flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#321e29] px-5 py-10 text-[#f8edda]">
      <div className="absolute left-[8%] top-[12%] font-display text-5xl text-[#ffb2a9] opacity-80">
        ✶
      </div>
      <div className="absolute bottom-[15%] right-[10%] font-display text-7xl text-[#e8b45c] opacity-80">
        ♡
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="mb-10 flex items-center justify-between gap-4 font-mono-display text-[10px] uppercase tracking-[.25em] text-[#f8edda]/55">
          <span>private message / 01</span>
          <span className="text-right">for one special pookie</span>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-7 flex items-center gap-3 text-[#f5bdc0]">
              <Sparkles size={16} />
              <span className="font-mono-display text-[10px] uppercase tracking-[.22em]">
                a tiny surprise awaits
              </span>
            </div>

            <h1 className="font-display text-[clamp(4.5rem,12vw,9rem)] leading-[.78] tracking-[-.06em]">
              Hey
              <br />
              <em className="text-[#ffb2a9]">Muskan</em>
              <br />
              ♡
            </h1>

            <p className="mt-9 max-w-md font-display text-xl leading-snug text-[#f8edda]/75">
              I made a tiny thing for you. Because you deserve a smile today.
            </p>

            <p className="mt-8 font-mono-display text-[10px] uppercase tracking-[.2em] text-[#f8edda]/45">
              {siteConfig.date}
            </p>
          </div>

          <form
            onSubmit={submit}
            className="relative rounded-[1.5rem] border border-[#f8edda]/15 bg-[#f8edda]/[.07] p-6 backdrop-blur-sm sm:p-8"
          >
            <span className="tape -top-3 right-5 rotate-6" aria-hidden="true" />

            <p className="font-mono-display text-[10px] uppercase tracking-[.2em] text-[#f8edda]/55">
              enter our little code
            </p>
            <p className="mt-3 font-display text-2xl">What date is today?</p>

            <label htmlFor="access-code" className="sr-only">
              Private access code
            </label>

            <input
              id="access-code"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              autoComplete="off"
              placeholder="••••"
              className={`mt-7 w-full border-b bg-transparent py-3 text-center font-mono-display text-3xl tracking-[.35em] outline-none placeholder:text-[#f8edda]/20 ${
                wrong
                  ? "border-[#ff8e8e] text-[#ffb2a9]"
                  : "border-[#f8edda]/35 focus:border-[#ffb2a9]"
              }`}
            />

            <button
              type="submit"
              className="mt-7 flex w-full items-center justify-between rounded-full bg-[#f8edda] px-5 py-3 text-left text-sm font-semibold text-[#321e29] transition-transform hover:-translate-y-0.5"
            >
              <span>{wrong ? "not quite — try again" : "show me what you made"}</span>
              <ChevronRight size={16} />
            </button>

            <p className="mt-5 text-center font-mono-display text-[9px] uppercase tracking-[.15em] text-[#f8edda]/35">
              hint: today&apos;s date (ddmm)
            </p>
          </form>
        </div>

        <p className="mt-16 text-center font-mono-display text-[9px] uppercase tracking-[.2em] text-[#f8edda]/35">
          made with care / no rush
        </p>
      </div>
    </main>
  );
}

function UnlockMoment({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 grid place-items-center p-5 text-[#f8edda]">
      <div className="unlock-card relative max-w-md text-center">
        <Sparkles className="mx-auto mb-5 text-[#e8b45c]" size={22} />
        <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#f8edda]/55">
          access granted
        </p>
        <h2 className="font-display mt-5 text-6xl leading-[.9] sm:text-8xl">Hey Pookie</h2>
        <p className="mx-auto mt-6 max-w-xs text-sm leading-6 text-[#f8edda]/70">
          I know things didn&apos;t go the way you wanted. But you&apos;re still amazing.
          This is just a tiny corner to make you smile.
        </p>
        <StepButton onClick={onContinue} icon={<ArrowDown size={16} />}>
          let&apos;s start
        </StepButton>
      </div>
    </div>
  );
}

function NoteModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 grid place-items-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label="A note for you"
    >
      <div className="relative max-h-[85dvh] w-full max-w-lg rotate-[-1deg] overflow-auto bg-[#f8edda] p-7 text-[#321e29] shadow-2xl sm:p-10">
        <span className="tape -top-2 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#321e29]/15"
          aria-label="Close note"
        >
          <X size={16} />
        </button>

        <p className="font-mono-display text-[10px] uppercase tracking-[.25em] text-[#a44a55]">
          personal note / 01
        </p>
        <h2 className="font-display mt-8 text-4xl">For my favorite sunshine.</h2>

        <div className="mt-8 space-y-4 font-display text-lg leading-8 text-[#321e29]/80">
          <p>Muskan, I know you wanted this one. So it&apos;s completely okay to be disappointed.</p>
          <p>
            But please don&apos;t start doubting yourself because of it. You are still the
            same smart, funny, cute, capable girl you were yesterday.
          </p>
          <p>
            Nothing changed. And if things get a little heavy sometimes, you don&apos;t
            have to solve everything all at once.
          </p>
          <p>
            There will be another interview, another opportunity, another yes. Maybe it
            looks different from what you expected — but that doesn&apos;t make it any
            less yours.
          </p>
          <p>I&apos;ll be here cheering for you. Always. 💗</p>
        </div>

        <p className="mt-10 font-display text-2xl text-[#a44a55]">
          forever rooting for you, <span className="italic">me</span> <span aria-hidden="true">♡</span>
        </p>
      </div>
    </div>
  );
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
  liked,
  onLike,
}: {
  photo: PhotoMedia;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <div className="relative z-10 grid max-h-[92dvh] w-full max-w-5xl items-center gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative flex max-h-[75dvh] justify-center overflow-hidden rounded-xl bg-[#201820]">
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[75dvh] w-auto max-w-full object-contain"
          />

          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#f8edda]/90 text-[#321e29]"
            aria-label="Previous memory"
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#f8edda]/90 text-[#321e29]"
            aria-label="Next memory"
          >
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="relative z-10 text-[#f8edda]">
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-12 right-0 grid h-9 w-9 place-items-center rounded-full border border-[#f8edda]/30"
            aria-label="Close lightbox"
          >
            <X size={17} />
          </button>

          <p className="font-mono-display text-[10px] uppercase tracking-[.25em] text-[#f8edda]/55">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-none">{photo.caption}</h2>
          <p className="mt-4 text-sm leading-6 text-[#f8edda]/65">{photo.note}</p>

          <button
            type="button"
            onClick={onLike}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#f8edda]/30 px-4 py-2 text-sm"
          >
            <Heart
              size={15}
              fill={liked ? "currentColor" : "none"}
              className={liked ? "text-[#ffb2a9]" : ""}
            />
            {liked ? "kept close" : "keep this one"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniHeartGame() {
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);

  const spawn = () => {
    if (active) return;
    setActive(true);
    setScore((value) => value + 1);
    window.setTimeout(() => setActive(false), 900);
  };

  return (
    <div className="relative mx-auto mt-10 h-44 w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-[#f8edda]/15 bg-[#f8edda]/[.06]">
      <div className="absolute left-5 top-5 font-mono-display text-[9px] uppercase tracking-[.18em] text-[#f8edda]/50">
        tiny mood rescue
      </div>

      {active && (
        <div className="heart-pop absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
          💗
        </div>
      )}

      <button
        type="button"
        onClick={spawn}
        className="absolute inset-0 grid place-items-center font-display text-2xl"
      >
        {score === 0 ? "tap here for a tiny smile ♡" : `${score} tiny smiles collected`}
      </button>
    </div>
  );
}

function ComebackMeter() {
  const [value, setValue] = useState(0);

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="font-mono-display text-[9px] uppercase tracking-[.2em] text-[#f8edda]/45">
            comeback energy
          </p>
          <p className="mt-2 font-display text-3xl">
            {value < 100 ? "loading..." : "okay, THAT'S more like it."}
          </p>
        </div>
        <span className="font-mono-display text-sm text-[#ffb2a9]">{value}%</span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f8edda]/10">
        <div
          className="h-full rounded-full bg-[#ffb2a9] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setValue((current) => Math.min(100, current + 20))}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#f8edda]/25 px-5 py-2.5 text-sm"
      >
        <Zap size={14} />
        add a little confidence
      </button>
    </div>
  );
}

function AppHome() {
  const [unlocked, setUnlocked] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [currentScreen, setCurrentScreen] = useState(0);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [rejectionDestroyed, setRejectionDestroyed] = useState(false);

  const likedCount = useMemo(
    () => Object.values(liked).filter(Boolean).length,
    [liked]
  );

  const toggleLike = (id: string) => {
    setLiked((current) => ({ ...current, [id]: !current[id] }));
  };

  useEffect(() => {
    if (!unlocked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [unlocked, currentScreen]);

  useEffect(() => {
    if (selectedPhoto === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
      if (event.key === "ArrowRight") {
        setSelectedPhoto((value) => (value === null ? 0 : (value + 1) % photos.length));
      }
      if (event.key === "ArrowLeft") {
        setSelectedPhoto((value) =>
          value === null ? 0 : (value - 1 + photos.length) % photos.length
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPhoto]);

  const goTo = (screen: number) => {
    setCurrentScreen(Math.max(0, Math.min(13, screen)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!unlocked) {
    return (
      <LockScreen
        onUnlock={() => {
          setUnlocked(true);
          setShowUnlock(true);
        }}
      />
    );
  }

  const screens = [
    // 0
    <section
      key="screen-01"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="max-w-3xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
            a tiny message / 01
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-7 font-display text-[clamp(4rem,10vw,8rem)] leading-[.78] tracking-[-.06em]">
            Hey
            <br />
            <span className="text-[#ffb2a9]">Muskan</span>…
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-9 font-display text-2xl leading-7 text-[#f8edda]/75">
            come here for a second 🫵🏻
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <StepButton onClick={() => goTo(1)}>Okay… show me 👀</StepButton>
            <button
              type="button"
              onClick={() => goTo(8)}
              className="inline-flex items-center gap-2 rounded-full border border-[#f8edda]/20 px-5 py-3 text-sm text-[#f8edda]/75"
            >
              skip to smiles <Smile size={15} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>,

    // 1
    <section
      key="screen-02"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="max-w-2xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
            real talk / 02
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Okay, first things first…
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 font-display text-2xl leading-7">
            You didn&apos;t get the offer letter.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-4 font-display text-2xl leading-7 text-[#ffb2a9]">
            And yeah… that sucks.
          </p>
        </Reveal>
        <Reveal delay={4}>
          <p className="mt-6 font-display text-3xl leading-7">But…</p>
        </Reveal>
        <Reveal delay={5}>
          <p className="mt-4 font-display text-2xl leading-7">
            That doesn&apos;t mean <span className="text-[#ffb2a9]">YOU</span> suck.
          </p>
        </Reveal>
        <Reveal delay={6}>
          <StepButton onClick={() => goTo(2)} light>
            tell me more
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 2
    <section
      key="screen-03"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal delay={1}>
          <div className="photo-card photo-large rotate-[-2deg] border-[8px] border-[#f8edda] shadow-xl">
            <img
              src={MEDIA.images["photo-04"]}
              alt="A personal photo of Muskan"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#f8edda] px-3 py-2 font-display text-lg text-[#321e29] shadow-md">
              sending you warmth
            </span>
          </div>
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal>
            <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
              virtual hug / 03
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
              Need a hug?
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-md font-display text-lg leading-7 text-[#f8edda]/70">
              Come here, cutie. No fixing things for five minutes. Just breathe.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <button
              type="button"
              onClick={() => goTo(3)}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#ffb2a9] px-6 py-3 text-sm font-semibold text-[#321e29]"
            >
              Yes, please 🫂
              <Heart size={15} fill="currentColor" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>,

    // 3
    <section
      key="screen-04"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-3xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
            reminders / 04
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Things to remember:
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3 text-left">
          {reminders.map((reminder, index) => (
            <Reveal key={reminder} delay={Math.min(index + 2, 7)}>
              <div className="rounded-xl border border-[#f8edda]/15 bg-[#f8edda]/[.06] p-4 transition-transform hover:-translate-y-0.5">
                <p className="font-display text-lg text-[#f8edda]">
                  <span className="mr-3 text-[#ffb2a9]">0{index + 1}</span>
                  {reminder}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={8}>
          <StepButton onClick={() => goTo(4)} light>
            I&apos;ll remember that
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 4
    <section
      key="screen-05"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
              tiny reminder / 05
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-7 font-display text-[clamp(3rem,8vw,6rem)] leading-[.78] tracking-[-.06em]">
              You are still
              <br />
              <span className="text-[#ffb2a9]">THAT</span> girl.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 font-display text-xl leading-7 text-[#f8edda]/70">
              The offer letter missed out on you.
              <br />
              Not the other way around.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <StepButton onClick={() => goTo(5)}>Continue</StepButton>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="photo-card photo-large rotate-[2deg] border-[8px] border-[#f8edda] shadow-xl">
            <img
              src={MEDIA.images["photo-01"]}
              alt="A personal photo of Muskan"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#f8edda] px-3 py-2 font-display text-lg text-[#321e29] shadow-md">
              still you ♡
            </span>
          </div>
        </Reveal>
      </div>
    </section>,

    // 5
    <section
      key="screen-06"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
            official diagnosis / 06
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Severe case of being too awesome for one company.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-lg font-display text-lg leading-7 text-[#f8edda]/65">
            Symptoms include excessive potential, unnecessary cuteness and a suspicious
            amount of resilience.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <StepButton onClick={() => goTo(6)}>
            prescribe me something
            <Zap size={15} />
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 6
    <section
      key="screen-07"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
            prescription / 07
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Here&apos;s what you need:
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3 text-left">
          {[
            "1 cup chai ☕",
            "2 hours of ranting",
            "3 stupid jokes",
            "Unlimited confidence",
          ].map((item, index) => (
            <Reveal key={item} delay={index + 2}>
              <div className="rounded-xl border border-[#f8edda]/15 bg-[#f8edda]/[.06] p-5">
                <p className="font-display text-xl">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={6}>
          <StepButton onClick={() => goTo(7)} light>
            that sounds perfect
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 7
    <section
      key="screen-08"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
            little game / 08
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Let&apos;s collect some tiny smiles.
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 text-sm leading-7 text-[#f8edda]/65 sm:text-base">
            No scoring system. No competition. Just click the big silly thing.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <MiniHeartGame />
        </Reveal>
        <Reveal delay={4}>
          <StepButton onClick={() => goTo(8)} light>
            okay, i smiled
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 8
    <section
      key="screen-09"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
            compliment generator / 09
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
            Tell me something nice.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div className="mx-auto mt-10 min-h-36 max-w-xl rounded-[1.5rem] border border-[#f8edda]/15 bg-[#f8edda]/[.06] p-8">
            <p className="font-display text-2xl leading-tight text-[#f8edda] sm:text-3xl">
              “{compliments[complimentIndex]}”
            </p>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() =>
                setComplimentIndex((value) => (value + 1) % compliments.length)
              }
              className="inline-flex items-center gap-2 rounded-full bg-[#ffb2a9] px-6 py-3 text-sm font-semibold text-[#321e29]"
            >
              another one
              <Sparkles size={15} />
            </button>

            <button
              type="button"
              onClick={() => setComplimentIndex(0)}
              className="inline-flex items-center gap-2 rounded-full border border-[#f8edda]/25 px-5 py-3 text-sm text-[#f8edda]/75"
            >
              reset
              <RotateCcw size={14} />
            </button>
          </div>
        </Reveal>

        <Reveal delay={4}>
          <StepButton onClick={() => goTo(9)} light>
            keep going
          </StepButton>
        </Reveal>
      </div>
    </section>,

    // 9
    <section
      key="screen-10"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
              beliefs / 10
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-7 font-display text-4xl leading-[.9] sm:text-6xl">
              Things I believe about you:
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3 text-left">
            {beliefs.map((belief, index) => (
              <Reveal key={belief} delay={Math.min(index + 2, 7)}>
                <div className="rounded-xl border border-[#f8edda]/15 bg-[#f8edda]/[.06] p-4">
                  <p className="font-display text-lg text-[#f8edda]">{belief}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={8}>
            <StepButton onClick={() => goTo(10)} light>
              one more thing
            </StepButton>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <div className="photo-card photo-large rotate-[3deg] border-[8px] border-[#f8edda] shadow-xl">
            <img
              src={MEDIA.images["photo-05"]}
              alt="A personal photo of Muskan"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-[#f8edda] px-3 py-2 font-display text-lg text-[#321e29] shadow-md">
              i believe this
            </span>
          </div>
        </Reveal>
      </div>
    </section>,

    // 10
    <section
      key="screen-11"
      className="min-h-[100dvh] flex items-center justify-center bg-[#f8edda] px-5 py-10 text-[#321e29]"
    >
      <div className="w-full max-w-6xl">
        <Reveal>
          <SectionHeading
            kicker="personal memory / 11"
            title={
              <>
                Look at you.
                <br />
                <span className="text-[#a44a55]">Seriously.</span>
              </>
            }
            copy="A bad day is still just a bad day. The rest of you is still here."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[photos[1], photos[7], photos[12]].map((photo, index) => (
            <Reveal key={photo.id} delay={index + 1}>
              <button
                type="button"
                onClick={() => setSelectedPhoto(photos.findIndex((item) => item.id === photo.id))}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#321e29] text-left shadow-xl"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#321e29]/85 to-transparent p-5 pt-20 text-[#f8edda]">
                  <span className="font-display text-2xl">{photo.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={4}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono-display text-[9px] uppercase tracking-[.2em] opacity-55">
              three tiny proofs that you are still you
            </span>
            <StepButton onClick={() => goTo(11)}>
              show me the moving memories
            </StepButton>
          </div>
        </Reveal>
      </div>
    </section>,

    // 11
    <section
      key="screen-12"
      className="min-h-[100dvh] bg-[#21767b] px-5 py-12 text-[#f8edda]"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            light
            kicker="moving memories / 12"
            title={
              <>
                You in motion.
                <br />
                <span className="text-[#ffb2a9]">Keep going.</span>
              </>
            }
            copy="Use the controls, pick a clip, replay a tiny moment. This section is here to make the website feel alive."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={(index % 3) + 1}>
              <VideoMemoryCard video={video} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={4}>
          <div className="mt-10 flex justify-end">
            <StepButton onClick={() => goTo(12)} light>
              okay, next chapter
            </StepButton>
          </div>
        </Reveal>
      </div>
    </section>,

    // 12
    <section
      key="screen-13"
      className="min-h-[100dvh] flex items-center justify-center bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="w-full max-w-3xl text-center">
        <Reveal>
          <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#e8b45c]">
            comeback / 13
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-7 font-display text-[clamp(3rem,8vw,6rem)] leading-[.78] tracking-[-.06em]">
            Your comeback
            <br />
            <span className="text-[#ffb2a9]">starts here.</span> ✨
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-xl font-display text-xl leading-7 text-[#f8edda]/70">
            Not because everything magically becomes perfect tomorrow.
            <br />
            Just because you keep going.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <ComebackMeter />
        </Reveal>
        <Reveal delay={4}>
          <button
            type="button"
            onClick={() => {
              setRejectionDestroyed(false);
              goTo(13);
            }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ffb2a9] px-6 py-3 text-sm font-semibold text-[#321e29]"
          >
            deal with that email <Send size={15} />
          </button>
        </Reveal>
      </div>
    </section>,

    // 13
    <section
      key="screen-14"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#321e29] px-5 py-10 text-[#f8edda]"
    >
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute text-[#ffb2a9]/40"
            style={{
              left: `${5 + (index * 17) % 90}%`,
              top: `${8 + (index * 23) % 82}%`,
              transform: `rotate(${index * 19 - 30}deg)`,
              fontSize: `${16 + (index % 4) * 8}px`,
            }}
          >
            {index % 2 === 0 ? "♡" : "✦"}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {!rejectionDestroyed ? (
          <>
            <Reveal>
              <p className="font-mono-display text-[10px] uppercase tracking-[.3em] text-[#ffb2a9]">
                final message / 14
              </p>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="mt-6 font-display text-4xl leading-[.9] sm:text-6xl">
                Okay.
                <br />
                That email has had enough attention.
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <div className="mx-auto mt-10 max-w-xl rotate-[-1deg] border border-[#f8edda]/15 bg-[#f8edda] p-6 text-left text-[#321e29] shadow-2xl sm:p-8">
                <p className="font-mono-display text-[9px] uppercase tracking-[.18em] text-[#a44a55]">
                  inbox / one extremely unnecessary email
                </p>
                <h3 className="mt-5 font-display text-3xl">HCLTech</h3>
                <p className="mt-3 text-sm leading-6 opacity-70">
                  Unfortunately, this opportunity did not work out this time.
                </p>
                <div className="mt-6 h-px bg-[#321e29]/10" />
                <p className="mt-6 font-display text-lg">
                  verdict:
                  <br />
                  <span className="text-[#a44a55]">not the end of the story.</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <button
                type="button"
                onClick={() => setRejectionDestroyed(true)}
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ffb2a9] px-7 py-3.5 text-sm font-semibold text-[#321e29]"
              >
                destroy the bad mood <Zap size={15} />
              </button>
            </Reveal>
          </>
        ) : (
          <div className="space-y-7">
            <div className="text-6xl sm:text-8xl">💥💗✨</div>
            <h2 className="font-display text-5xl leading-[.85] sm:text-8xl">
              Gone.
              <br />
              Next chapter.
            </h2>
            <p className="mx-auto max-w-xl font-display text-xl leading-8 text-[#f8edda]/70">
              The email is over. You are not.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setRejectionDestroyed(false)}
                className="inline-flex items-center gap-2 rounded-full border border-[#f8edda]/25 px-5 py-3 text-sm"
              >
                bring it back <RotateCcw size={14} />
              </button>
              <StepButton onClick={() => setShowNote(true)} light>
                read my note
              </StepButton>
            </div>
          </div>
        )}

        <div className="mt-14">
          <p className="font-mono-display text-[9px] uppercase tracking-[.2em] text-[#f8edda]/30">
            one missed opportunity ≠ one missed future
          </p>
        </div>
      </div>
    </section>,
  ];

  return (
    <div className="paper-grain site-shell min-h-[100dvh] overflow-x-hidden">
      {showUnlock && <UnlockMoment onContinue={() => setShowUnlock(false)} />}
      {showNote && <NoteModal onClose={() => setShowNote(false)} />}

      {selectedPhoto !== null && (
        <Lightbox
          photo={photos[selectedPhoto]}
          index={selectedPhoto}
          total={photos.length}
          onClose={() => setSelectedPhoto(null)}
          onPrevious={() =>
            setSelectedPhoto((value) =>
              value === null ? 0 : (value - 1 + photos.length) % photos.length
            )
          }
          onNext={() =>
            setSelectedPhoto((value) =>
              value === null ? 0 : (value + 1) % photos.length
            )
          }
          liked={!!liked[photos[selectedPhoto].id]}
          onLike={() => toggleLike(photos[selectedPhoto].id)}
        />
      )}

      <main>
        {screens[currentScreen]}

        {currentScreen > 0 && (
          <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-3 rounded-full border border-[#321e29]/10 bg-[#f8edda]/85 p-1.5 shadow-xl backdrop-blur">
            <button
              type="button"
              onClick={() => goTo(currentScreen - 1)}
              className="inline-flex items-center gap-2 rounded-full bg-[#321e29]/[.06] px-4 py-2 text-sm font-semibold text-[#321e29]"
            >
              <ArrowLeft size={15} />
              Back
            </button>

            {currentScreen < screens.length - 1 && (
              <button
                type="button"
                onClick={() => goTo(currentScreen + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-[#ffb2a9] px-4 py-2 text-sm font-semibold text-[#321e29]"
              >
                Next
                <ChevronRight size={15} />
              </button>
            )}
          </div>
        )}

        <div className="pointer-events-none fixed bottom-2 left-1/2 z-30 -translate-x-1/2 text-[8px] font-mono-display uppercase tracking-[.2em] text-[#321e29]/35">
          {likedCount > 0 ? `${likedCount} memories kept` : ""}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ErrorBoundary>
            <Switch>
              <Route path="/" component={AppHome} />
              <Route component={NotFound} />
            </Switch>
            <Toaster />
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}
//new commit ke liye