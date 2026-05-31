import { useState } from "react";

const WEIGHTS = [
  { label: "Normal",    value: 1.0, hint: "Baseline" },
  { label: "Important", value: 1.5, hint: "×1.5" },
  { label: "Critical",  value: 2.0, hint: "×2" },
];

const DEFAULT_WEIGHTS = { decision: 1, ownership: 1, time: 1, skill: 1, impact: 1 };

const dimensions = [
  {
    id: "decision",
    name: "Decision agency",
    icon: "◆",
    color: "var(--of-success-500)",
    colorLight: "var(--of-bg-success-tint)",
    textColor: "var(--of-fg-success)",
    description: "Can you make meaningful decisions without escalation?",
    questions: [
      {
        q: "When you identify a better approach to your current project, what happens?",
        options: [
          { text: "I adjust course immediately", score: 4 },
          { text: "I discuss with my team and we decide together", score: 3 },
          { text: "I propose it to my manager for approval", score: 2 },
          { text: "I add it to a backlog and wait for prioritization", score: 1 },
        ],
      },
      {
        q: "How are the tools and methods you use determined?",
        options: [
          { text: "I choose what works best for the problem", score: 4 },
          { text: "Team decides collectively", score: 3 },
          { text: "There's an approved list, but I can request additions", score: 2 },
          { text: "Tools are mandated. I use what I'm given", score: 1 },
        ],
      },
      {
        q: "When scope or requirements conflict, who resolves it?",
        options: [
          { text: "I make the tradeoff call based on my judgment", score: 4 },
          { text: "The team works it out together", score: 3 },
          { text: "I escalate with a recommendation", score: 2 },
          { text: "I escalate and wait for a decision", score: 1 },
        ],
      },
    ],
  },
  {
    id: "ownership",
    name: "Ownership agency",
    icon: "●",
    color: "var(--of-fg-brand)",
    colorLight: "var(--of-bg-brand-tint)",
    textColor: "var(--of-fg-brand)",
    description: "Do you own outcomes or tasks?",
    questions: [
      {
        q: "What is your name attached to?",
        options: [
          { text: "Business outcomes (revenue, retention, adoption)", score: 4 },
          { text: "Product areas or user segments", score: 3 },
          { text: "Projects with defined scope and timelines", score: 2 },
          { text: "Tickets and assigned deliverables", score: 1 },
        ],
      },
      {
        q: "When something you shipped succeeds or fails, what happens?",
        options: [
          { text: "I own the result and decide next steps", score: 4 },
          { text: "The team reviews together and adjusts", score: 3 },
          { text: "My manager discusses it in our 1:1", score: 2 },
          { text: "I rarely hear about outcomes after shipping", score: 1 },
        ],
      },
      {
        q: "How is your work scoped?",
        options: [
          { text: "I identify problems and define the scope myself", score: 4 },
          { text: "I collaborate on scoping with cross-functional partners", score: 3 },
          { text: "Scope is defined by PM/leadership, I refine details", score: 2 },
          { text: "I receive fully scoped tickets to execute", score: 1 },
        ],
      },
    ],
  },
  {
    id: "time",
    name: "Time agency",
    icon: "▲",
    color: "var(--of-danger-500)",
    colorLight: "var(--of-bg-danger-tint)",
    textColor: "var(--of-fg-danger)",
    description: "Can you choose when and how deeply you work?",
    questions: [
      {
        q: "How much of your calendar do you control?",
        options: [
          { text: "Most of it. I schedule my own deep work and meetings", score: 4 },
          { text: "About half. Some recurring meetings, but I protect blocks", score: 3 },
          { text: "Little. Most days are wall-to-wall meetings I didn't schedule", score: 2 },
          { text: "Almost none. My calendar is managed by others", score: 1 },
        ],
      },
      {
        q: "When you're in flow on something important, what happens?",
        options: [
          { text: "I stay in flow. People know not to interrupt", score: 4 },
          { text: "I can usually protect the time, with some interruptions", score: 3 },
          { text: "I get pulled into meetings or Slack regularly", score: 2 },
          { text: "Flow state is rare. Context-switching is constant", score: 1 },
        ],
      },
      {
        q: "Is there an expectation to be available after hours?",
        options: [
          { text: "No. I choose when to work beyond normal hours", score: 4 },
          { text: "Rarely. Only during launches or incidents", score: 3 },
          { text: "Sometimes. Evening Slack messages expect responses", score: 2 },
          { text: "Frequently. The culture assumes always-on availability", score: 1 },
        ],
      },
    ],
  },
  {
    id: "skill",
    name: "Skill agency",
    icon: "■",
    color: "var(--of-info-500)",
    colorLight: "var(--of-bg-info-tint)",
    textColor: "var(--of-fg-info)",
    description: "Can you learn and grow in directions you choose?",
    questions: [
      {
        q: "How do you learn new skills at work?",
        options: [
          { text: "I have protected time and budget to learn what I want", score: 4 },
          { text: "Learning is encouraged, and we have Growth Weeks or similar", score: 3 },
          { text: "I learn on my own time, but can apply new skills at work", score: 2 },
          { text: "Training is mandated curriculum. I learn what I'm told to", score: 1 },
        ],
      },
      {
        q: "Can you experiment with new tools or approaches?",
        options: [
          { text: "Yes. Experimentation is part of the culture", score: 4 },
          { text: "Sometimes. I need to frame it as solving a real problem", score: 3 },
          { text: "Occasionally, if there's downtime between projects", score: 2 },
          { text: "No. We use approved tools and established processes", score: 1 },
        ],
      },
      {
        q: "Can you grow beyond your current job description?",
        options: [
          { text: "Yes. I'm encouraged to expand into adjacent areas", score: 4 },
          { text: "Somewhat. I can take on stretch projects", score: 3 },
          { text: "Only within my defined role and ladder", score: 2 },
          { text: "Growth means doing my current job better, not expanding", score: 1 },
        ],
      },
    ],
  },
  {
    id: "impact",
    name: "Impact agency",
    icon: "⬡",
    color: "var(--of-warning-500)",
    colorLight: "var(--of-bg-warning-tint)",
    textColor: "var(--of-fg-warning)",
    description: "Can you see and measure the impact of your work?",
    questions: [
      {
        q: "After you ship something, do you know what happened?",
        options: [
          { text: "Yes. I track outcomes and adjust based on data", score: 4 },
          { text: "Usually. Metrics are available if I look for them", score: 3 },
          { text: "Sometimes. I hear about results secondhand", score: 2 },
          { text: "Rarely. I ship into a void", score: 1 },
        ],
      },
      {
        q: "Can you connect your work to business outcomes?",
        options: [
          { text: "Directly. I know the revenue/cost/risk impact", score: 4 },
          { text: "Indirectly. I can make a reasonable argument", score: 3 },
          { text: "Loosely. My work contributes, but the chain is unclear", score: 2 },
          { text: "Not really. My work is several steps removed from outcomes", score: 1 },
        ],
      },
      {
        q: "Do retrospectives at your company focus on learning or blame?",
        options: [
          { text: "Learning. We track what changed and what we'd do differently", score: 4 },
          { text: "Mostly learning, with some accountability", score: 3 },
          { text: "Mixed. Depends on who's running it", score: 2 },
          { text: "We don't do retrospectives, or they're performative", score: 1 },
        ],
      },
    ],
  },
];

// ── Scoring helpers ──────────────────────────────────────────────────────────

const getLevel = (score) => {
  if (score >= 10) return { label: "High",   badgeVariant: "green", color: "var(--of-fg-success)" };
  if (score >= 7)  return { label: "Medium", badgeVariant: "amber", color: "var(--of-fg-warning)" };
  return                 { label: "Low",    badgeVariant: "red",   color: "var(--of-fg-danger)" };
};

// Min possible weighted score (every question answered 1)
const getMinScore = (weights) =>
  dimensions.reduce((sum, d) => sum + 3 * weights[d.id], 0);

// Max possible weighted score across all dimensions
const getMaxScore = (weights) =>
  dimensions.reduce((sum, d) => sum + 12 * weights[d.id], 0);

// Total weighted score from answers
const getTotalScore = (answers, weights) =>
  dimensions.reduce((sum, d, i) => {
    const raw = [0, 1, 2].reduce((s, q) => s + (answers[`${i}-${q}`] || 0), 0);
    return sum + raw * weights[d.id];
  }, 0);

const getOverall = (total, maxScore) => {
  const pct = total / maxScore;
  if (pct >= 0.80)
    return {
      title: "High agency",
      framework: "Work-life choice",
      message:
        "Your conditions support choosing how deep to go. You have meaningful decision-making power, ownership over outcomes, and control over your time. If you're still burning out, the issue isn't agency. It's boundaries you're choosing not to set.",
      color: "var(--of-fg-success)",
    };
  if (pct >= 0.55)
    return {
      title: "Mixed agency",
      framework: "Hybrid approach",
      message:
        "You have partial conditions for choice. Some dimensions give you real ownership, others constrain you. Identify your lowest-scoring dimensions. Some are within your control (skill agency). Others require organizational change (decision agency). Focus on what you can shift first.",
      color: "var(--of-fg-warning)",
    };
  return {
    title: "Low agency",
    framework: "Work-life balance",
    message:
      "Work-life balance is the right framework for you right now. Protect yourself. Set bounds. Don't feel guilty about clocking out at 5pm. You don't have the conditions for work-life choice, and pretending you do leads to burnout without ownership.",
    color: "var(--of-fg-danger)",
  };
};

const isCustomWeights = (weights) =>
  Object.values(weights).some((w) => w !== 1);

// ── Spider / Radar chart ─────────────────────────────────────────────────────

const VB_W = 400, VB_H = 300;
const CX = 188, CY = 148;
const R = 88;
const LABEL_R = R + 26;
const MAX_RAW = 12;
const GRID_SCORES = [3, 6, 9, 12]; // rings at 25 / 50 / 75 / 100 %

const spiderAngle = (i) => -Math.PI / 2 + (2 * Math.PI / 5) * i;

const spiderXY = (score, i, radius = R) => {
  const a = spiderAngle(i);
  const r = (score / MAX_RAW) * radius;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};

function SpiderChart({ scores }) {
  const scorePoly = scores.map((s, i) => spiderXY(s, i).join(",")).join(" ");

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      aria-label="Radar chart of agency dimension scores"
      style={{ width: "100%", display: "block" }}
    >
      {/* Grid rings */}
      {GRID_SCORES.map((gs, ri) => (
        <polygon
          key={ri}
          points={[0, 1, 2, 3, 4].map((i) => spiderXY(gs, i).join(",")).join(" ")}
          fill="none"
          style={{ stroke: "var(--of-border-subtle)", strokeWidth: ri === 3 ? 1.5 : 1 }}
        />
      ))}

      {/* Axis spokes */}
      {dimensions.map((_, i) => {
        const [ox, oy] = spiderXY(MAX_RAW, i);
        return (
          <line
            key={i}
            x1={CX} y1={CY} x2={ox} y2={oy}
            style={{ stroke: "var(--of-border-subtle)", strokeWidth: 1 }}
          />
        );
      })}

      {/* Score polygon */}
      <polygon
        points={scorePoly}
        style={{
          fill: "var(--of-bg-brand-tint)",
          stroke: "var(--of-fg-brand)",
          strokeWidth: 2,
          strokeLinejoin: "round",
          fillOpacity: 0.85,
        }}
      />

      {/* Score dots + labels */}
      {dimensions.map((d, i) => {
        const [sx, sy] = spiderXY(scores[i], i);
        const a = spiderAngle(i);
        const lx = CX + LABEL_R * Math.cos(a);
        const ly = CY + LABEL_R * Math.sin(a);
        const anchor =
          Math.abs(lx - CX) < 8 ? "middle" : lx > CX ? "start" : "end";
        // Classify vertical region so name always appears before score
        const sinA = Math.sin(a);
        let dyName, dyScore;
        if (sinA < -0.5) {       // top vertex: both lines above anchor point
          dyName = -18; dyScore = -5;
        } else if (sinA > 0.5) { // bottom vertices: both lines below anchor point
          dyName = 5;  dyScore = 18;
        } else {                  // side vertices: centered on anchor point
          dyName = -8; dyScore = 5;
        }

        return (
          <g key={i}>
            {/* Dot */}
            <circle
              cx={sx} cy={sy} r={5}
              style={{
                fill: d.color,
                stroke: "var(--of-bg-base)",
                strokeWidth: 2,
              }}
            />
            {/* Dimension name */}
            <text
              x={lx} y={ly + dyName}
              textAnchor={anchor}
              style={{
                fontSize: 11,
                fill: "var(--of-fg-muted)",
                fontFamily: "var(--of-font-sans)",
              }}
            >
              {d.name.split(" ")[0]}
            </text>
            {/* Score */}
            <text
              x={lx} y={ly + dyScore}
              textAnchor={anchor}
              style={{
                fontSize: 11,
                fontWeight: 700,
                fill: d.textColor,
                fontFamily: "var(--of-font-sans)",
              }}
            >
              {scores[i]}/12
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AgencyAudit() {
  const [phase, setPhase] = useState("intro");
  const [currentDim, setCurrentDim] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [weights, setWeights] = useState({ ...DEFAULT_WEIGHTS });

  const totalQuestions = 15;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const transition = (callback) => {
    setFadeIn(false);
    setTimeout(() => { callback(); setFadeIn(true); }, 200);
  };

  const handleAnswer = (score) => {
    setSelectedOption(score);
    const key = `${currentDim}-${currentQ}`;
    const newAnswers = { ...answers, [key]: score };
    setAnswers(newAnswers);
    setTimeout(() => {
      transition(() => {
        setSelectedOption(null);
        if (currentQ < 2) {
          setCurrentQ(currentQ + 1);
        } else if (currentDim < 4) {
          setCurrentDim(currentDim + 1);
          setCurrentQ(0);
        } else {
          setPhase("results");
        }
      });
    }, 400);
  };

  const getDimensionScore = (dimIndex) => {
    let total = 0;
    for (let q = 0; q < 3; q++) total += answers[`${dimIndex}-${q}`] || 0;
    return total;
  };

  const restart = () => {
    transition(() => {
      setPhase("intro");
      setCurrentDim(0);
      setCurrentQ(0);
      setAnswers({});
      setSelectedOption(null);
      setWeights({ ...DEFAULT_WEIGHTS });
    });
  };

  const dim = dimensions[currentDim];
  const question = dim?.questions[currentQ];
  const maxScore = getMaxScore(weights);

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: "var(--of-bg-base)", color: "var(--of-fg-default)", fontFamily: "var(--of-font-sans)" }}
    >
      <div
        className="max-w-xl mx-auto px-6"
        style={{ opacity: fadeIn ? 1 : 0, transition: "opacity 0.2s ease" }}
      >

        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {phase === "intro" && (
          <div>
            <div className="of-eyebrow mb-3">Ops Forward</div>
            <h1
              className="mb-4"
              style={{
                fontFamily: "var(--of-font-display)",
                fontSize: "var(--of-text-3xl)",
                fontWeight: 600,
                lineHeight: "var(--of-leading-tight)",
                letterSpacing: "var(--of-tracking-tight)",
              }}
            >
              The agency audit
            </h1>
            <p className="of-lead mb-8">
              Work-life balance protects people when they lack agency. Work-life
              choice becomes possible when they have it. But how much agency do
              you actually have?
            </p>
            <p className="mb-6" style={{ fontSize: "var(--of-text-base)", color: "var(--of-fg-muted)" }}>
              This audit measures your agency across five dimensions:
            </p>

            <div className="mb-10">
              {dimensions.map((d, i) => (
                <div key={d.id}>
                  <div className="flex items-center gap-3 py-3">
                    <span
                      className="flex items-center justify-center shrink-0 text-sm font-semibold"
                      style={{
                        width: 28, height: 28,
                        borderRadius: "var(--of-radius-sm)",
                        background: d.colorLight,
                        color: d.textColor,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-xs" style={{ color: "var(--of-fg-subtle)" }}>{d.description}</div>
                    </div>
                  </div>
                  {i < 4 && <hr className="audit-divider" />}
                </div>
              ))}
            </div>

            <p className="mb-6 text-xs" style={{ color: "var(--of-fg-subtle)", lineHeight: "var(--of-leading-relaxed)" }}>
              15 questions. Takes about 4 minutes. Your answers are not stored or sent anywhere.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="of-btn of-btn--primary of-btn--lg"
                onClick={() => transition(() => setPhase("questions"))}
              >
                Start the audit
              </button>
              <button
                className="of-btn of-btn--ghost of-btn--md"
                onClick={() => transition(() => setPhase("configure"))}
              >
                Customize scoring for your org →
              </button>
            </div>
          </div>
        )}

        {/* ── CONFIGURE ─────────────────────────────────────────────────── */}
        {phase === "configure" && (
          <div>
            <button
              className="of-btn of-btn--ghost of-btn--sm mb-6"
              style={{ marginLeft: -8 }}
              onClick={() => transition(() => setPhase("intro"))}
            >
              ← Back
            </button>

            <div className="of-eyebrow mb-3">Scoring configuration</div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--of-font-display)",
                fontSize: "var(--of-text-2xl)",
                fontWeight: 600,
                lineHeight: "var(--of-leading-snug)",
              }}
            >
              Customize for your org
            </h2>

            {/* How scoring works */}
            <div
              className="mb-8 p-4"
              style={{
                background: "var(--of-bg-recessed)",
                border: "1px solid var(--of-border-subtle)",
                borderRadius: "var(--of-radius-md)",
              }}
            >
              <div
                className="mb-2 font-semibold"
                style={{ fontSize: "var(--of-text-sm)", color: "var(--of-fg-default)" }}
              >
                How scoring works
              </div>
              <ul
                className="flex flex-col gap-1.5"
                style={{ fontSize: "var(--of-text-sm)", color: "var(--of-fg-muted)", lineHeight: "var(--of-leading-relaxed)" }}
              >
                <li>Each dimension has <strong style={{ color: "var(--of-fg-default)" }}>3 questions</strong>, scored <strong style={{ color: "var(--of-fg-default)" }}>4 → 1</strong> (most → least autonomous). Raw max per dimension: <strong style={{ color: "var(--of-fg-default)" }}>12 pts</strong>.</li>
                <li>Your answers are <strong style={{ color: "var(--of-fg-default)" }}>always scored 4→1</strong> — weights don't change how individual questions are graded.</li>
                <li>Weight controls <strong style={{ color: "var(--of-fg-default)" }}>how much a dimension's raw score contributes to your total</strong>. At ×2, that dimension adds twice as many points to the final tally — making it twice as influential in determining your overall result.</li>
              </ul>

              {/* Visual example */}
              <div
                className="mt-3 pt-3 grid grid-cols-2 gap-2"
                style={{ borderTop: "1px solid var(--of-border-subtle)" }}
              >
                <div
                  className="p-2.5"
                  style={{
                    background: "var(--of-bg-elevated)",
                    borderRadius: "var(--of-radius-sm)",
                    border: "1px solid var(--of-border-subtle)",
                  }}
                >
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--of-fg-subtle)" }}>
                    Example · Normal ×1
                  </div>
                  <div className="text-xs" style={{ color: "var(--of-fg-muted)" }}>
                    Raw score 8/12 → contributes <strong style={{ color: "var(--of-fg-default)" }}>8 pts</strong> to total
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--of-fg-subtle)" }}>
                    = 20% of max (60 pts default)
                  </div>
                </div>
                <div
                  className="p-2.5"
                  style={{
                    background: "var(--of-bg-brand-tint)",
                    borderRadius: "var(--of-radius-sm)",
                    border: "1px solid var(--of-border-brand)",
                  }}
                >
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--of-fg-brand)" }}>
                    Example · Critical ×2
                  </div>
                  <div className="text-xs" style={{ color: "var(--of-fg-muted)" }}>
                    Raw score 8/12 → contributes <strong style={{ color: "var(--of-fg-default)" }}>16 pts</strong> to total
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--of-fg-subtle)" }}>
                    = 33% of max (72 pts in this case)
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension weight rows */}
            <div className="mb-6">
              {dimensions.map((d, i) => {
                const share = Math.round((12 * weights[d.id] / maxScore) * 100);
                return (
                  <div key={d.id}>
                    <div className="py-4">
                      <div className="flex items-start gap-3">
                        <span
                          className="flex items-center justify-center shrink-0 font-semibold"
                          style={{
                            width: 28, height: 28,
                            borderRadius: "var(--of-radius-sm)",
                            background: d.colorLight,
                            color: d.textColor,
                            fontSize: "var(--of-text-xs)",
                            marginTop: 1,
                          }}
                        >
                          {d.icon}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm font-medium">{d.name}</span>
                            <span
                              className="text-xs font-semibold"
                              style={{ color: weights[d.id] !== 1 ? d.textColor : "var(--of-fg-subtle)" }}
                            >
                              {share}% of total
                            </span>
                          </div>
                          <div className="text-xs mb-3" style={{ color: "var(--of-fg-subtle)" }}>
                            {d.description} · raw max {12 * weights[d.id]} pts
                          </div>

                          {/* Weight selector */}
                          <div className="flex gap-2">
                            {WEIGHTS.map(({ label, value }) => {
                              const selected = weights[d.id] === value;
                              return (
                                <button
                                  key={value}
                                  onClick={() => setWeights((w) => ({ ...w, [d.id]: value }))}
                                  style={{
                                    background: selected ? d.colorLight : "var(--of-bg-elevated)",
                                    color: selected ? d.textColor : "var(--of-fg-muted)",
                                    border: `1px solid ${selected ? d.color : "var(--of-border-line)"}`,
                                    borderRadius: "var(--of-radius-sm)",
                                    padding: "5px 12px",
                                    fontSize: "var(--of-text-xs)",
                                    fontWeight: selected ? 600 : 400,
                                    fontFamily: "var(--of-font-sans)",
                                    cursor: "pointer",
                                    transition: "all var(--of-dur-fast)",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {label}
                                  {value !== 1 && (
                                    <span style={{ opacity: selected ? 0.7 : 0.5, marginLeft: 4 }}>
                                      ×{value}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {i < 4 && <hr className="audit-divider" />}
                  </div>
                );
              })}
            </div>

            {/* Max score summary */}
            <div
              className="flex items-center justify-between mb-8 px-4 py-3"
              style={{
                background: "var(--of-bg-recessed)",
                borderRadius: "var(--of-radius-md)",
                border: "1px solid var(--of-border-subtle)",
              }}
            >
              <span className="text-sm" style={{ color: "var(--of-fg-muted)" }}>
                {isCustomWeights(weights) ? "Custom scoring active" : "Default scoring · all equal"}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--of-fg-default)" }}>
                Max possible:{" "}
                <span style={{ color: isCustomWeights(weights) ? "var(--of-fg-brand)" : undefined }}>
                  {maxScore} pts
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="of-btn of-btn--primary of-btn--lg"
                onClick={() => transition(() => setPhase("questions"))}
              >
                Start the audit
              </button>
              {isCustomWeights(weights) && (
                <button
                  className="of-btn of-btn--ghost of-btn--sm"
                  onClick={() => setWeights({ ...DEFAULT_WEIGHTS })}
                >
                  Reset to defaults
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── QUESTIONS ─────────────────────────────────────────────────── */}
        {phase === "questions" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: "var(--of-fg-subtle)" }}>
                {answeredCount + 1} of {totalQuestions}
              </span>
              <span className="text-xs" style={{ color: "var(--of-fg-subtle)" }}>
                {dim.name}
                {weights[dim.id] !== 1 && (
                  <span style={{ color: "var(--of-fg-brand)", marginLeft: 4 }}>×{weights[dim.id]}</span>
                )}
              </span>
            </div>

            <div
              className="mb-10 overflow-hidden"
              style={{ height: 3, background: "var(--of-bg-sunken)", borderRadius: "var(--of-radius-xs)" }}
            >
              <div
                style={{
                  height: "100%", width: `${progress}%`,
                  background: dim.color, borderRadius: "var(--of-radius-xs)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            <div className="flex gap-1.5 mb-8">
              {dimensions.map((d, i) => (
                <div
                  key={d.id}
                  className="flex-1"
                  style={{
                    height: 4, borderRadius: "var(--of-radius-xs)",
                    background: i <= currentDim ? d.color : "var(--of-bg-sunken)",
                    opacity: i < currentDim ? 0.4 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <p
              className="mb-8"
              style={{
                fontFamily: "var(--of-font-display)",
                fontSize: "var(--of-text-xl)",
                fontWeight: 600,
                lineHeight: "var(--of-leading-snug)",
              }}
            >
              {question.q}
            </p>

            <div className="flex flex-col gap-2.5">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className="audit-option"
                  onClick={() => handleAnswer(opt.score)}
                  disabled={selectedOption !== null}
                  style={{
                    background: selectedOption === opt.score ? dim.colorLight : undefined,
                    borderColor: selectedOption === opt.score ? dim.color : undefined,
                    opacity: selectedOption !== null && selectedOption !== opt.score ? 0.45 : 1,
                  }}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ───────────────────────────────────────────────────── */}
        {phase === "results" && (() => {
          const total = getTotalScore(answers, weights);
          const minScore = getMinScore(weights);
          const overall = getOverall(total, maxScore);
          const custom = isCustomWeights(weights);

          // Position of score within the min–max range (for the bar)
          const rangePct = ((total - minScore) / (maxScore - minScore)) * 100;
          // Threshold markers mapped onto the same min–max range
          const highThreshold  = Math.round(maxScore * 0.80);
          const mixedThreshold = Math.round(maxScore * 0.55);
          const highPct  = ((highThreshold  - minScore) / (maxScore - minScore)) * 100;
          const mixedPct = ((mixedThreshold - minScore) / (maxScore - minScore)) * 100;
          // Average pts per question (raw, unweighted)
          const avgPtsPerQ = (Object.values(answers).reduce((a, b) => a + b, 0) / 15).toFixed(1);

          return (
            <div>
              <div className="of-eyebrow mb-3">Your results</div>

              <div className="mb-10">
                <h2
                  className="mb-1"
                  style={{
                    fontFamily: "var(--of-font-display)",
                    fontSize: "var(--of-text-2xl)",
                    fontWeight: 600,
                    lineHeight: "var(--of-leading-snug)",
                    color: overall.color,
                  }}
                >
                  {overall.title}
                </h2>
                <div className="mb-1 text-sm" style={{ color: "var(--of-fg-subtle)" }}>
                  Recommended framework:{" "}
                  <strong style={{ color: "var(--of-fg-default)" }}>{overall.framework}</strong>
                </div>

                {/* Score + range bar */}
                <div
                  className="my-5 p-4"
                  style={{
                    background: "var(--of-bg-recessed)",
                    border: "1px solid var(--of-border-subtle)",
                    borderRadius: "var(--of-radius-md)",
                  }}
                >
                  {/* Numeric summary */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      style={{
                        fontFamily: "var(--of-font-display)",
                        fontSize: "var(--of-text-xl)",
                        fontWeight: 700,
                        color: overall.color,
                      }}
                    >
                      {total} pts
                    </span>
                    <span className="text-sm" style={{ color: "var(--of-fg-subtle)" }}>
                      out of {maxScore} · {Math.round(rangePct)}% of range
                    </span>
                  </div>

                  {/* Plain-language what the number means */}
                  <p className="text-xs mb-4" style={{ color: "var(--of-fg-muted)", lineHeight: "var(--of-leading-relaxed)" }}>
                    Each of the 15 questions is scored <strong style={{ color: "var(--of-fg-default)" }}>1–4</strong> (1 = least autonomous, 4 = most). You averaged <strong style={{ color: "var(--of-fg-default)" }}>{avgPtsPerQ} / 4</strong> per question.{" "}
                    {custom
                      ? `Your weights shift the range: the lowest possible score is ${minScore} pts, the highest is ${maxScore} pts.`
                      : `The lowest possible score is ${minScore} pts (all 1s); the highest is ${maxScore} pts (all 4s).`
                    }
                  </p>

                  {/* Visual range bar with threshold markers */}
                  <div className="relative mb-1" style={{ height: 8, background: "var(--of-bg-sunken)", borderRadius: "var(--of-radius-pill)" }}>
                    {/* Filled segment up to score */}
                    <div
                      style={{
                        position: "absolute", top: 0, left: 0,
                        height: "100%", width: `${Math.max(2, rangePct)}%`,
                        background: overall.color,
                        borderRadius: "var(--of-radius-pill)",
                        transition: "width 0.6s ease",
                      }}
                    />
                    {/* Mixed threshold tick */}
                    <div
                      title={`Mixed agency threshold: ${mixedThreshold} pts`}
                      style={{
                        position: "absolute", top: -2, bottom: -2,
                        left: `${mixedPct}%`, width: 2,
                        background: "var(--of-fg-warning)",
                        borderRadius: 1,
                        opacity: 0.7,
                      }}
                    />
                    {/* High threshold tick */}
                    <div
                      title={`High agency threshold: ${highThreshold} pts`}
                      style={{
                        position: "absolute", top: -2, bottom: -2,
                        left: `${highPct}%`, width: 2,
                        background: "var(--of-fg-success)",
                        borderRadius: 1,
                        opacity: 0.7,
                      }}
                    />
                  </div>

                  {/* Min / max labels */}
                  <div className="flex justify-between mb-4" style={{ fontSize: 10, color: "var(--of-fg-subtle)" }}>
                    <span>Min {minScore} pts</span>
                    <span>Max {maxScore} pts</span>
                  </div>

                  {/* Threshold table */}
                  <div
                    className="pt-3"
                    style={{ borderTop: "1px solid var(--of-border-subtle)" }}
                  >
                    <div className="text-xs font-semibold mb-2" style={{ color: "var(--of-fg-subtle)", letterSpacing: "var(--of-tracking-wide)", textTransform: "uppercase" }}>
                      Thresholds at your settings
                    </div>
                    {[
                      { label: "High agency",  framework: "Work-life choice",  pts: highThreshold,  color: "var(--of-fg-success)", achieved: total >= highThreshold },
                      { label: "Mixed agency", framework: "Hybrid approach",   pts: mixedThreshold, color: "var(--of-fg-warning)", achieved: total >= mixedThreshold && total < highThreshold },
                      { label: "Low agency",   framework: "Work-life balance", pts: null,           color: "var(--of-fg-danger)",  achieved: total < mixedThreshold },
                    ].map(({ label, framework, pts, color, achieved }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between py-1"
                        style={{ opacity: achieved ? 1 : 0.5 }}
                      >
                        <div className="flex items-center gap-2">
                          <span style={{ color, fontSize: 10 }}>{achieved ? "●" : "○"}</span>
                          <span className="text-xs font-medium" style={{ color: achieved ? "var(--of-fg-default)" : "var(--of-fg-subtle)" }}>
                            {label}
                          </span>
                          <span className="text-xs" style={{ color: "var(--of-fg-subtle)" }}>· {framework}</span>
                        </div>
                        <span className="text-xs" style={{ color: "var(--of-fg-subtle)" }}>
                          {pts != null ? `${pts}+ pts` : `< ${mixedThreshold} pts`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: "var(--of-text-base)", lineHeight: "var(--of-leading-relaxed)", color: "var(--of-fg-muted)" }}>
                  {overall.message}
                </p>
              </div>

              {/* Spider chart */}
              <div
                className="mb-10"
                style={{
                  background: "var(--of-bg-elevated)",
                  border: "1px solid var(--of-border-line)",
                  borderRadius: "var(--of-radius-lg)",
                  padding: "16px 8px 8px",
                }}
              >
                <div
                  className="mb-1 px-4"
                  style={{
                    fontSize: "var(--of-text-xs)",
                    fontWeight: 600,
                    letterSpacing: "var(--of-tracking-wide)",
                    textTransform: "uppercase",
                    color: "var(--of-fg-subtle)",
                  }}
                >
                  Agency profile
                </div>
                <SpiderChart scores={dimensions.map((_, i) => getDimensionScore(i))} />
              </div>

              <div className="mb-10">
                <h3
                  className="mb-4"
                  style={{
                    fontSize: "var(--of-text-xs)",
                    fontWeight: 600,
                    letterSpacing: "var(--of-tracking-wide)",
                    textTransform: "uppercase",
                    color: "var(--of-fg-subtle)",
                  }}
                >
                  Breakdown by dimension
                </h3>
                {dimensions.map((d, i) => {
                  const score = getDimensionScore(i);
                  const level = getLevel(score);
                  const pct = (score / 12) * 100;
                  const w = weights[d.id];
                  return (
                    <div key={d.id}>
                      <div className="py-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium">{d.name}</span>
                              {w !== 1 && (
                                <span
                                  className="of-badge"
                                  style={{
                                    background: d.colorLight,
                                    color: d.textColor,
                                    border: `1px solid ${d.color}`,
                                    fontSize: 10,
                                  }}
                                >
                                  ×{w}
                                </span>
                              )}
                            </div>
                            <span className="text-xs hidden sm:inline" style={{ color: "var(--of-fg-subtle)" }}>
                              {d.description}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            <span className={`of-badge of-badge--${level.badgeVariant}`}>
                              {level.label}
                            </span>
                            <span className="text-sm font-semibold" style={{ minWidth: 36, textAlign: "right" }}>
                              {score}/12
                            </span>
                          </div>
                        </div>
                        <div
                          className="overflow-hidden"
                          style={{ height: 6, background: "var(--of-bg-sunken)", borderRadius: "var(--of-radius-sm)" }}
                        >
                          <div
                            style={{
                              height: "100%", width: `${pct}%`,
                              background: d.color, borderRadius: "var(--of-radius-sm)",
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                      </div>
                      {i < 4 && <hr className="audit-divider" />}
                    </div>
                  );
                })}
              </div>

              <div className="mb-10">
                <h3
                  className="mb-4"
                  style={{
                    fontSize: "var(--of-text-xs)",
                    fontWeight: 600,
                    letterSpacing: "var(--of-tracking-wide)",
                    textTransform: "uppercase",
                    color: "var(--of-fg-subtle)",
                  }}
                >
                  What you can control vs. what requires org change
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="audit-control-card">
                    <div
                      className="mb-2.5"
                      style={{
                        fontSize: "var(--of-text-xs)", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "var(--of-tracking-wide)",
                        color: "var(--of-fg-success)",
                      }}
                    >
                      Within your control
                    </div>
                    <ul className="flex flex-col gap-1" style={{ fontSize: "var(--of-text-sm)", color: "var(--of-fg-muted)", lineHeight: "var(--of-leading-relaxed)" }}>
                      <li>Skill agency: propose learning time, build side projects</li>
                      <li>Time agency: block deep work, decline unnecessary meetings</li>
                      <li>Impact agency: create your own feedback loops, track outcomes</li>
                    </ul>
                  </div>
                  <div className="audit-control-card">
                    <div
                      className="mb-2.5"
                      style={{
                        fontSize: "var(--of-text-xs)", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "var(--of-tracking-wide)",
                        color: "var(--of-fg-danger)",
                      }}
                    >
                      Requires org change
                    </div>
                    <ul className="flex flex-col gap-1" style={{ fontSize: "var(--of-text-sm)", color: "var(--of-fg-muted)", lineHeight: "var(--of-leading-relaxed)" }}>
                      <li>Decision agency: approval processes, reporting lines</li>
                      <li>Ownership agency: how work is scoped, who owns outcomes</li>
                      <li>Time agency (fully): meeting culture, on-call expectations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="of-card of-card--brand-elevated mb-8">
                <p className="mb-1" style={{ fontSize: "var(--of-text-base)", lineHeight: "var(--of-leading-relaxed)" }}>
                  The first step to creating better conditions is knowing which conditions you're actually in.
                </p>
                <p style={{ fontSize: "var(--of-text-sm)", opacity: 0.65 }}>
                  Share this audit with your team. Run it as a workshop exercise. Compare dimensions across roles.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="of-btn of-btn--secondary of-btn--md" onClick={restart}>
                  Retake the audit
                </button>
                <button
                  className="of-btn of-btn--ghost of-btn--sm"
                  onClick={() => transition(() => setPhase("configure"))}
                >
                  Adjust scoring →
                </button>
              </div>

              <div
                className="mt-10 pt-5"
                style={{
                  borderTop: "1px solid var(--of-border-subtle)",
                  fontSize: "var(--of-text-xs)",
                  color: "var(--of-fg-subtle)",
                }}
              >
                Agency Audit — Ops Forward by Z
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
