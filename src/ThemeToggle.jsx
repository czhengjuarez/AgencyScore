const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2"  x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="2"  y1="12" x2="5"  y2="12" />
    <line x1="19" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const THEMES = [
  { value: "light",  label: "Light",  Icon: SunIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "dark",   label: "Dark",   Icon: MoonIcon },
];

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div
      role="group"
      aria-label="Color theme"
      style={{
        position: "fixed",
        top: 14,
        right: 16,
        display: "flex",
        gap: 2,
        background: "var(--of-bg-elevated)",
        border: "1px solid var(--of-border-line)",
        borderRadius: "var(--of-radius-pill)",
        padding: 3,
        zIndex: 100,
        boxShadow: "var(--of-shadow-sm)",
      }}
    >
      {THEMES.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-pressed={active}
            title={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: active ? "var(--of-bg-recessed)" : "transparent",
              border: `1px solid ${active ? "var(--of-border-subtle)" : "transparent"}`,
              borderRadius: "var(--of-radius-pill)",
              padding: "4px 9px",
              fontSize: 11,
              fontWeight: active ? 600 : 400,
              fontFamily: "var(--of-font-sans)",
              color: active ? "var(--of-fg-default)" : "var(--of-fg-subtle)",
              cursor: "pointer",
              lineHeight: 1,
              transition: "all var(--of-dur-fast) var(--of-ease-out)",
            }}
          >
            <Icon />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
