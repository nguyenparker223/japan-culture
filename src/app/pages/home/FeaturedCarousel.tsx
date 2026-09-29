import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";

/* ---------- Types ---------- */

export interface FeaturedItem {
  id: string | number;
  title: string;
  description: string;
  /** Poster image. Shown while the video loads, or on its own if there is no video. */
  poster: string;
  /** Video URL (mp4/webm). Optional: falls back to the poster image. */
  videoSrc?: string;
  /** e.g. ["Nature", "Crowd-free", "Train"] */
  tags?: string[];
  /** Optional price block, e.g. "¥1,200" or "Free entry" */
  price?: string;
  discount?: string;
  originalPrice?: string;
  href?: string;
  ctaLabel?: string;
}

export interface FeaturedCarouselProps {
  items: FeaturedItem[];
  /** Milliseconds each slide stays up. 0 turns auto-rotation off. Default 8000. */
  autoPlayInterval?: number;
  /** Which side the video sits on. Default "left". */
  mediaPosition?: "left" | "right";
  /** Small heading at the top of the text panel. Pass "" to hide it. */
  heading?: string;
  /**
   * Height of the menu bar above the component. The component fills the rest of the
   * viewport (100dvh minus this), so your header stays visible.
   * Number = px, or any CSS length such as "6rem". Default 97.
   */
  topOffset?: number | string;
  /** Fill the parent element's height instead of the viewport. Default false. */
  fillParent?: boolean;
  onSelect?: (item: FeaturedItem) => void;
}

/* ---------- Component ---------- */

export default function FeaturedCarousel({
  items,
  autoPlayInterval = 8000,
  mediaPosition = "left",
  heading = "Featured & Recommended",
  topOffset = 97,
  fillParent = false,
  onSelect,
}: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = items.length;
  const item = items[index];

  // Respect the OS "reduce motion" setting: no auto-rotation, no autoplaying video.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count]
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  if (!item) return null;

  const autoRotate = autoPlayInterval > 0 && count > 1 && !reducedMotion;

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section
      className="fc"
      data-fill-parent={fillParent}
      style={
        { "--fc-top": typeof topOffset === "number" ? `${topOffset}px` : topOffset } as CSSProperties
      }
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{css}</style>

      <div
        key={item.id}
        className="fc-slide"
        data-media={mediaPosition}
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${count}`}
        aria-live={autoRotate ? "off" : "polite"}
      >
        {/* Media side */}
        <div className="fc-media">
          {item.videoSrc && !reducedMotion ? (
            <video
              className="fc-video"
              src={item.videoSrc}
              poster={item.poster}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="metadata"
            />
          ) : (
            <img className="fc-video" src={item.poster} alt="" />
          )}

          {/* {item.videoSrc && !reducedMotion && (
            <button
              type="button"
              className="fc-mute"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute video" : "Mute video"}
              aria-pressed={!muted}
            >
              {muted ? "Sound off" : "Sound on"}
            </button>
          )} */}
        </div>

        {/* Text side */}
        <div className="fc-info">

          <h2 className="fc-title">{item.title}</h2>
          <p className="fc-desc">{item.description}</p>

          {item.tags && item.tags.length > 0 && (
            <ul className="fc-tags">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          <div className="fc-buy">
            {item.discount && <span className="fc-discount">{item.discount}</span>}
            {(item.originalPrice || item.price) && (
              <div className="fc-prices">
                {item.originalPrice && <s className="fc-original">{item.originalPrice}</s>}
                {item.price && <span className="fc-price">{item.price}</span>}
              </div>
            )}
            <a
              className="fc-cta"
              href={item.href ?? "#"}
              onClick={() => onSelect?.(item)}
            >
              {item.ctaLabel ?? "View details"}
            </a>
          </div>
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="fc-arrow fc-arrow-prev"
            onClick={prev}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className="fc-arrow fc-arrow-next"
            onClick={next}
            aria-label="Next"
          >
            ›
          </button>

          <div className="fc-dots" role="tablist" aria-label="Choose slide">
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={it.title}
                className="fc-dot"
                data-active={i === index}
                data-timed={i === index && autoRotate}
                onClick={() => go(i)}
              >
                {/* The active dot fills over the slide duration; hover/focus pauses it. */}
                {i === index && autoRotate && (
                  <span
                    key={index}
                    className="fc-fill"
                    style={{
                      animationDuration: `${autoPlayInterval}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={next}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Styles (scoped by the "fc" prefix) ---------- */

const css = `
.fc {
  /* ---- Theme (sampled from japans-hiddenspots.com): edit these to fine-tune ---- */
  --fc-ink: #0f100d;          /* near-black, warm (panel background) */
  --fc-ink-2: #1e1f1a;        /* slightly lighter (panel gradient) */
  --fc-paper: #ffffff;        /* titles */
  --fc-text: #e4dfd5;         /* body text */
  --fc-muted: #a9a59a;        /* secondary text */
  --fc-red: #8b3030;          /* brick red, same as the "Discover Your Own Japan" button */
  --fc-red-hover: #a33a3a;
  --fc-accent: #efe6d2;       /* soft cream for small accents and the progress bar */
  --fc-font-body: "Lora", "Noto Serif JP", "Hiragino Mincho ProN", Georgia, serif;
  --fc-font-title: "Playfair Display", "Noto Serif JP", "Hiragino Mincho ProN", Georgia, serif;

  font-family: var(--fc-font-body);
  color: var(--fc-text);
  background: var(--fc-ink);
  overflow: hidden;
  box-sizing: border-box;
}
.fc *, .fc *::before, .fc *::after { box-sizing: inherit; }
.fc {
  position: relative; width: 100%; min-height: 420px;
}
.fc[data-fill-parent="true"] { height: 100%; }

.fc-slide {
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(340px, 1fr);
  animation: fc-in 0.6s ease both;
}
.fc-slide[data-media="right"] .fc-media { order: 2; }
@keyframes fc-in { from { opacity: 0; } to { opacity: 1; } }

.fc-media { position: relative; background: #000; min-height: 0; }
.fc-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
/* Soft fade from the video into the text panel */
.fc-media::after {
  content: ""; position: absolute; top: 0; bottom: 0; width: 22%; pointer-events: none;
}
.fc-slide[data-media="left"] .fc-media::after {
  right: 0; background: linear-gradient(to right, transparent, var(--fc-ink));
}
.fc-slide[data-media="right"] .fc-media::after {
  left: 0; background: linear-gradient(to left, transparent, var(--fc-ink));
}
.fc-mute {
  position: absolute; left: 20px; bottom: 20px; z-index: 2;
  padding: 6px 12px; font: inherit; font-size: 12px; color: #fff; cursor: pointer;
  background: rgba(0, 0, 0, 0.55); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 3px;
}
.fc-mute:hover { background: rgba(0, 0, 0, 0.8); }

.fc-info {
  display: flex; flex-direction: column; justify-content: center; gap: 18px;
  min-width: 0; min-height: 0; overflow-y: auto;
  padding: clamp(24px, 5vw, 72px);
  background: linear-gradient(160deg, var(--fc-ink-2) 0%, var(--fc-ink) 65%);
}
.fc-heading { margin: 0; font-size: 14px; color: var(--fc-accent); }
.fc-title {
  margin: 0; font-family: var(--fc-font-title); font-weight: 700;
  font-size: clamp(30px, 3.8vw, 58px); line-height: 1.15; color: var(--fc-paper);
}
.fc-desc { margin: 0; max-width: 46ch; font-size: clamp(15px, 1.2vw, 18px); line-height: 1.7; }
.fc-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.fc-tags li {
  padding: 3px 10px; font-size: 13px; color: var(--fc-paper);
  border: 1px solid rgba(244, 237, 224, 0.3); border-radius: 999px;
}
.fc-buy { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 10px; }
.fc-discount {
  padding: 4px 8px; font-size: 18px; font-weight: 700;
  color: #fff; background: var(--fc-red); border-radius: 2px;
}
.fc-prices { display: flex; flex-direction: column; line-height: 1.25; }
.fc-original { font-size: 13px; color: var(--fc-muted); }
.fc-price { font-size: 20px; color: var(--fc-accent); }
.fc-cta {
  padding: 14px 30px; font-size: 15px; font-weight: 600; letter-spacing: 0.05em; text-decoration: none; color: #fff;
  background: var(--fc-red); border-radius: 3px; transition: background 0.15s ease;
}
.fc-cta:hover { background: var(--fc-red-hover); }

.fc-arrow {
  position: absolute; top: 50%; z-index: 3; transform: translateY(-50%);
  width: 48px; height: 88px; padding: 0; font-size: 40px; line-height: 1; color: #fff; cursor: pointer;
  background: rgba(0, 0, 0, 0.5); border: 0; transition: background 0.15s ease;
}
.fc-arrow:hover { background: rgba(139, 48, 48, 0.9); }
.fc-arrow-prev { left: 0; border-radius: 0 4px 4px 0; }
.fc-arrow-next { right: 0; border-radius: 4px 0 0 4px; }

.fc-dots {
  position: absolute; left: 0; right: 0; bottom: 22px; z-index: 3;
  display: flex; justify-content: center; gap: 8px; pointer-events: none;
}
.fc-dot {
  position: relative; width: 14px; height: 8px; padding: 0; overflow: hidden; cursor: pointer; pointer-events: auto;
  background: rgba(255, 255, 255, 0.35); border: 0; border-radius: 4px;
  transition: width 0.2s ease, background 0.2s ease;
}
.fc-dot:hover { background: rgba(255, 255, 255, 0.6); }
.fc-dot[data-active="true"] { width: 44px; background: rgba(255, 255, 255, 0.35); }
.fc-dot[data-active="true"][data-timed="false"] { background: var(--fc-accent); }
.fc-fill {
  position: absolute; inset: 0; background: var(--fc-accent);
  transform-origin: left; transform: scaleX(0);
  animation: fc-fill linear forwards;
}
@keyframes fc-fill { to { transform: scaleX(1); } }

.fc button:focus-visible, .fc a:focus-visible { outline: 2px solid var(--fc-accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .fc-slide { animation: none; }
}

@media (max-width: 800px) {
  .fc-slide { grid-template-columns: 1fr; grid-template-rows: 42% minmax(0, 1fr); }
  .fc-slide[data-media="right"] .fc-media { order: 0; }
  .fc-slide[data-media="left"] .fc-media::after,
  .fc-slide[data-media="right"] .fc-media::after {
    left: 0; right: 0; top: auto; bottom: 0; width: auto; height: 30%;
    background: linear-gradient(to bottom, transparent, var(--fc-ink-2));
  }
  .fc-info { justify-content: flex-start; gap: 12px; padding: 20px 20px 64px; }
  .fc-arrow { top: 21%; height: 64px; width: 36px; font-size: 30px; }
}
`;
