import { useState, type ReactNode } from "react";

/* ---------- Types ---------- */

export interface Category {
  id: string;
  label: string;
  /** Small grey line under the title, e.g. "autumn, spring, summer" */
  description?: string;
  icon?: ReactNode;
  /** If set, the card renders as a link; otherwise as a button. */
  href?: string;
}

export interface CategoryPickerProps {
  heading?: string;
  categories?: Category[];
  /** Controlled selected id. Omit to let the component keep its own selection. */
  value?: string;
  defaultValue?: string;
  onSelect?: (category: Category) => void;
}

/* ---------- Icons (inline SVG, 48x48) ---------- */

const INK = "#202939";
const stroke = {
  fill: "none",
  stroke: INK,
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const MountainIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <path d="M3 38 L24 8 L45 38 Z" fill="#404857" />
    <path d="M24 8 L30 17 L24 14.5 L18.5 17.5 Z" fill="#ebedef" />
    <rect x="2" y="38" width="44" height="3" rx="1" fill={INK} />
  </svg>
);

export const BowlIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <g {...stroke}>
      <path d="M16 4 q-2 2 0 4 M24 3 q-2 2 0 4 M32 4 q-2 2 0 4" strokeWidth={2} />
      <path d="M10 33 a14 14 0 0 1 28 0 Z" />
      <circle cx="24" cy="17.5" r="2.2" />
      <path d="M5 40 h38" />
    </g>
  </svg>
);

export const FoodIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <g {...stroke}>
      <ellipse cx="24" cy="29" rx="19" ry="12" />
      <ellipse cx="24" cy="30" rx="11" ry="5" strokeWidth={2} />
      <path d="M22 17 c0-5 5-7 9-6" />
    </g>
  </svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <rect x="12" y="6" width="24" height="36" rx="4" fill="none" stroke={INK} strokeWidth={3} />
    <rect x="16" y="11" width="16" height="12" fill="#d2d4d7" />
    <rect x="16" y="26" width="6" height="5" fill="#d2d4d7" />
    <rect x="24" y="26" width="8" height="5" fill="#b08884" />
    <circle cx="24" cy="37" r="1.5" fill={INK} />
  </svg>
);

export const ToriiIcon = () => (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <rect x="5" y="8" width="38" height="3.5" rx="1" fill={INK} />
    <rect x="8" y="12" width="32" height="2.5" fill="#763732" />
    <rect x="11" y="20" width="26" height="3" fill={INK} />
    <rect x="14" y="20" width="3.5" height="22" fill={INK} />
    <rect x="30.5" y="20" width="3.5" height="22" fill={INK} />
  </svg>
);

/* ---------- Default content (matches the screenshot) ---------- */

export const defaultCategories: Category[] = [
  { id: "anime_pop", label: "anime_pop", icon: <MountainIcon /> },
  { id: "nature", label: "nature", description: "autumn, spring, summer", icon: <MountainIcon /> },
  { id: "culture", label: "culture", icon: <BowlIcon /> },
  {
    id: "food",
    label: "food",
    description: "curry, Donburi, grilled hamburger steak",
    icon: <FoodIcon />,
  },
  { id: "dailylife", label: "Dailylife", icon: <PhoneIcon /> },
  { id: "history", label: "History", description: "Shinto shrines, Temples", icon: <ToriiIcon /> },
];

/* ---------- Component ---------- */

export default function CategoryPicker({
  heading = "What is the heart of your journey?",
  categories = defaultCategories,
  value,
  defaultValue,
  onSelect,
}: CategoryPickerProps) {
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const selected = value ?? internal;

  const pick = (c: Category) => {
    setInternal(c.id);
    onSelect?.(c);
  };

  return (
    <section className="cp" aria-labelledby="cp-heading">
      <style>{css}</style>

      <h2 id="cp-heading" className="cp-heading">
        {heading}
      </h2>

      <ul className="cp-grid">
        {categories.map((c) => {
          const content = (
            <>
              {c.icon && <span className="cp-icon">{c.icon}</span>}
              <span className="cp-label">{c.label}</span>
              {c.description && <span className="cp-desc">{c.description}</span>}
            </>
          );
          const isSelected = selected === c.id;

          return (
            <li key={c.id} className="cp-item">
              {c.href ? (
                <a
                  className="cp-card"
                  href={c.href}
                  data-selected={isSelected}
                  onClick={() => pick(c)}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className="cp-card"
                  data-selected={isSelected}
                  aria-pressed={isSelected}
                  onClick={() => pick(c)}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Styles (scoped by the "cp" prefix) ---------- */

const css = `
.cp {
  --cp-bg: #efede6;
  --cp-card: #ffffff;
  --cp-border: #d7d4cb;
  --cp-hover-bg: #f6f8fc;
  --cp-ink: #202939;
  --cp-muted: #6b686b;
  --cp-font-body: "Lora", "Noto Serif JP", Georgia, serif;
  --cp-font-title: "Playfair Display", "Noto Serif JP", Georgia, serif;

  box-sizing: border-box;
  width: 100%;
  padding: 56px 20px 64px;
  background: var(--cp-bg);
  color: var(--cp-ink);
  font-family: var(--cp-font-body);
}
.cp *, .cp *::before, .cp *::after { box-sizing: inherit; }

.cp-heading {
  margin: 0 0 30px;
  text-align: center;
  font-family: var(--cp-font-title);
  font-weight: 700;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.25;
}

.cp-grid {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 18px;
  max-width: 950px; margin: 0 auto; padding: 0; list-style: none;
}
.cp-item { display: flex; width: 170px; min-height: 188px; }

.cp-card {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 26px 14px 18px;
  text-align: center; text-decoration: none; font: inherit; color: inherit; cursor: pointer;
  background: var(--cp-card);
  border: 1px solid var(--cp-border); border-radius: 6px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}
.cp-card:hover,
.cp-card:focus-visible,
.cp-card[data-selected="true"] {
  background: var(--cp-hover-bg);
  border-color: var(--cp-ink);
  box-shadow: 0 8px 22px rgba(32, 41, 57, 0.14);
  transform: translateY(-3px);
}
.cp-card:focus-visible { outline: 2px solid var(--cp-ink); outline-offset: 3px; }

.cp-icon { display: flex; height: 48px; margin-bottom: 4px; }
.cp-label { font-family: var(--cp-font-title); font-weight: 700; font-size: 17px; line-height: 1.2; }
.cp-desc { font-size: 13.5px; line-height: 1.3; color: var(--cp-muted); }

@media (max-width: 520px) {
  .cp-grid { gap: 12px; }
  .cp-item { width: calc(50% - 6px); }
}
@media (prefers-reduced-motion: reduce) {
  .cp-card { transition: none; }
  .cp-card:hover, .cp-card:focus-visible, .cp-card[data-selected="true"] { transform: none; }
}
`;
