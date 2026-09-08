// Modified by Main Street Media Co. on 2026-09-08 for MSM-BidMeasure.
// Derived from OpenTakeoff by Kentucky AI and the OpenTakeoff contributors.
// Apache-2.0 license and upstream attribution are preserved in LICENSE and NOTICE.

// MSM-BidMeasure brand marks. The geometric mark is retained from the upstream
// OpenTakeoff design language; the wordmark identifies this derivative fork.
export function Wordmark({ size = 96, color = "var(--ink)", weight = 800, letterSpacing = "-0.03em" }) {
  return (
    <span
      style={{
        fontFamily: "var(--f-display)",
        fontWeight: weight,
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing,
        color,
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.12em",
        fontOpticalSizing: "auto",
      }}
    >
      MSM<span style={{ fontStyle: "italic", color: "var(--cobalt)" }}>BidMeasure</span>
    </span>
  );
}

export function Pip({ size = 7, color = "var(--cobalt)" }) {
  return <span style={{ display: "inline-block", width: size, height: size, background: color, verticalAlign: "middle" }} />;
}

// Square mark: an ink tile with a measured corner notch + cobalt vertex pips —
// reads as "trace a room from a corner." Geometry retained from upstream.
export function Mark({ size = 100, ink = "var(--ink)", paper = "var(--paper-cream)", accent = "var(--cobalt)", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style} aria-label="MSM-BidMeasure mark">
      <rect width="100" height="100" fill={paper} />
      <path d="M22 26 H66 L78 38 V74 H22 Z" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="22" cy="26" r="4" fill={accent} />
      <circle cx="66" cy="26" r="4" fill={accent} />
      <circle cx="78" cy="74" r="4" fill={accent} />
      <circle cx="22" cy="74" r="4" fill={accent} />
    </svg>
  );
}
