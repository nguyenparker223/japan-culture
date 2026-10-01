/* ---------- Types ---------- */

export interface Article {
  id: string;
  /** Small grey label above the title, e.g. "sashimi" */
  category: string;
  title: string;
  href: string;
  /** Thumbnail URL. If omitted, a neutral placeholder block is shown. */
  image?: string;
  imageAlt?: string;
  /** e.g. "Train". Shown as "Accessibility: Train" with a train icon. */
  accessibility?: string;
}

export interface ArticleSection {
  id: string;
  /** Sub-heading above the cards, e.g. "food" */
  label: string;
  articles: Article[];
}

export interface ArticleListProps {
  title?: string;
  sections?: ArticleSection[];
  /** Text before the accessibility value. Default "Accessibility". */
  accessibilityLabel?: string;
}

/* ---------- Icon ---------- */

const TrainIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="3" y="1.5" width="10" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="4" width="6" height="3.5" fill="currentColor" />
    <circle cx="5.5" cy="10.2" r="0.9" fill="currentColor" />
    <circle cx="10.5" cy="10.2" r="0.9" fill="currentColor" />
    <path d="M5 14.8 L6.6 12.5 M11 14.8 L9.4 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/* ---------- Default content (matches the screenshot; add your own image URLs) ---------- */

export const defaultSections: ArticleSection[] = [
  {
    id: "food",
    label: "food",
    articles: [
      { id: "sashimi", category: "sashimi", title: "What Is Sashimi? Japan’s Art of Raw Fish Explained", href: "#", accessibility: "Train" },
      { id: "unagi", category: "unagi(eel)", title: "What Is Unagi? Japan’s Grilled Eel Explained", href: "#", accessibility: "Train" },
      { id: "tempura", category: "tempura", title: "What Is Tempura? Japan’s Light, Crispy Fried Food Explained", href: "#", accessibility: "Train" },
      { id: "gyoza", category: "gyoza", title: "What Is Gyoza? Japan’s Crispy Pan-Fried Dumpling Explained", href: "#", accessibility: "Train" },
      { id: "ramen", category: "ramen", title: "The Evolution of Ramen and Tsukemen: Exploring Japan’s Deep Noodle Culture", href: "#", accessibility: "Train" },
      { id: "curry", category: "curry", title: "The Flavor of Home: How Curry Evolved into Japan’s True National Comfort Food", href: "#", accessibility: "Train" },
      { id: "sukiyaki", category: "sukiyaki", title: "The Art of Sukiyaki: Japan’s Celebratory Hotpot of Harmony and Tradition", href: "#", accessibility: "Train" },
      { id: "tonkatsu", category: "tonkatsu", title: "The Anatomy of Tonkatsu: Understanding Japan’s Beloved Golden Cutlet", href: "#", accessibility: "Train" },
    ],
  },
];

/* ---------- Component ---------- */

export default function ArticleList({
  title = "Japan's Geography, History & Custom System",
  sections = defaultSections,
  accessibilityLabel = "Accessibility",
}: ArticleListProps) {
  return (
    <section className="al">
      <style>{css}</style>

      <h2 className="al-title">{title}</h2>

      {sections.map((section) => (
        <div key={section.id} className="al-section">
          <h3 className="al-label">{section.label}</h3>

          <ul className="al-grid">
            {section.articles.map((a) => (
              <li key={a.id} className="al-item">
                <a className="al-card" href={a.href}>
                  <span className="al-thumb">
                    {a.image ? (
                      <img src={a.image} alt={a.imageAlt ?? ""} loading="lazy" />
                    ) : (
                      <span className="al-placeholder" aria-hidden="true" />
                    )}
                  </span>

                  <span className="al-body">
                    <span className="al-category">{a.category}</span>
                    <span className="al-heading">{a.title}</span>
                    {a.accessibility && (
                      <span className="al-meta">
                        <TrainIcon />
                        {accessibilityLabel}: {a.accessibility}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/* ---------- Styles (scoped by the "al" prefix) ---------- */

const css = `
.al {
  --al-bg: #efede6;
  --al-card: #f9f8f4;
  --al-border: #d8d5cc;
  --al-ink: #202939;
  --al-muted: #7e7e7d;
  --al-faint: #8e8e8d;
  --al-font-body: "Lora", "Noto Serif JP", Georgia, serif;
  --al-font-title: "Playfair Display", "Noto Serif JP", Georgia, serif;

  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px 48px;
  background: var(--al-bg);
  color: var(--al-ink);
  font-family: var(--al-font-body);
}
.al *, .al *::before, .al *::after { box-sizing: inherit; }

.al-title {
  margin: 0; padding: 0 0 12px;
  font-family: var(--al-font-title); font-weight: 700;
  font-size: clamp(20px, 1.8vw, 24px); line-height: 1.3;
  border-bottom: 1px solid var(--al-border);
}
.al-section { margin-top: 24px; }
.al-label {
  margin: 0; padding: 0 0 8px;
  font-family: var(--al-font-title); font-weight: 700; font-size: 18px; line-height: 1.3;
  border-bottom: 1px solid var(--al-border);
}

.al-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;
  margin: 16px 0 0; padding: 0; list-style: none;
}
.al-item { display: flex; }

.al-card {
  flex: 1; display: flex; min-width: 0; min-height: 140px;
  overflow: hidden; text-decoration: none; color: inherit;
  background: var(--al-card);
  border: 1px solid var(--al-border); border-radius: 6px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.al-card:hover, .al-card:focus-visible {
  border-color: var(--al-ink);
  box-shadow: 0 8px 22px rgba(32, 41, 57, 0.12);
  transform: translateY(-2px);
}
.al-card:focus-visible { outline: 2px solid var(--al-ink); outline-offset: 3px; }

.al-thumb { flex: 0 0 140px; position: relative; background: var(--al-border); }
.al-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.al-placeholder { position: absolute; inset: 0; background: linear-gradient(135deg, #dcd9d0, #cfcbc1); }

.al-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 22px 16px 22px 16px; }
.al-category { font-size: 13px; line-height: 1.2; color: var(--al-muted); }
.al-heading { font-family: var(--al-font-title); font-weight: 700; font-size: 16px; line-height: 1.35; }
.al-meta {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: auto; padding-top: 6px;
  font-size: 13.5px; line-height: 1.2; color: var(--al-faint);
}

@media (max-width: 860px) {
  .al-grid { grid-template-columns: 1fr; gap: 14px; }
}
@media (max-width: 480px) {
  .al-thumb { flex-basis: 104px; }
  .al-body { padding: 16px 12px; }
  .al-heading { font-size: 15px; }
}
@media (prefers-reduced-motion: reduce) {
  .al-card { transition: none; }
  .al-card:hover, .al-card:focus-visible { transform: none; }
}
`;
