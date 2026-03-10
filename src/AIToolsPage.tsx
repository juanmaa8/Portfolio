import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";

const LAST_UPDATED = "March 2026";

const SCORING_CRITERIA = [
  { id: "execution",   label: "File Execution",         desc: "Runs code or processes your actual data files" },
  { id: "context",     label: "Long-context Reasoning", desc: "Handles large docs, maintains coherence across sessions" },
  { id: "grounding",   label: "Source Grounding",       desc: "Cites sources, stays accurate to uploaded inputs" },
  { id: "integration", label: "Workflow Integration",   desc: "MCPs, connectors, local file access, tool chaining" },
  { id: "polish",      label: "Output Polish",          desc: "Writing quality, voice consistency, formatting" },
  { id: "value",       label: "Value for Money",        desc: "Cost vs practical utility for this task category" },
];

const TOOLS = {
  claude:      { name: "Claude Pro",   short: "Claude", price: "$20/mo" },
  chatgpt:     { name: "ChatGPT Plus", short: "Plus",   price: "$20/mo" },
  chatgptFree: { name: "ChatGPT Free", short: "Free",   price: "Free"   },
  notebooklm:  { name: "NotebookLM",  short: "NbLM",   price: "Free"   },
};

const TOOL_KEYS = ["claude", "chatgpt", "chatgptFree", "notebooklm"] as const;
type ToolKey = typeof TOOL_KEYS[number];

const EVIDENCE = {
  feature:  { label: "Feature-based",   color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200"  },
  workflow: { label: "Workflow-based",  color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200" },
  observed: { label: "Observed in use", color: "text-emerald-600",bg: "bg-emerald-50",border: "border-emerald-200"},
};

const WINNER_TYPES = {
  bestExecution:   { label: "Best: file execution"  },
  bestContext:     { label: "Best: long-context"     },
  bestGrounding:   { label: "Best: source grounding" },
  bestIntegration: { label: "Best: integration"      },
  bestValue:       { label: "Best value pick"        },
  bestPolish:      { label: "Best: output polish"    },
};

const INSIGHTS = [
  { label: "Primary recommendation", value: "Claude Pro",   sub: "Writing, integration, career, code"  },
  { label: "Best free stack",        value: "Free + NbLM",  sub: "Second opinion + deep research"      },
  { label: "Best for execution",     value: "ChatGPT Plus", sub: "Code Interpreter on your data"       },
  { label: "Best for integration",   value: "Claude Pro",   sub: "MCPs, local files, Notion CRM"       },
];

const TASKS = [
  {
    category: "BI & Data Analysis", emoji: "📊",
    tasks: [
      {
        name: "Analyse CSV / Excel datasets",
        winnerType: "bestExecution", winner: "chatgpt" as ToolKey, evidence: "feature" as const,
        generalVerdict: "ChatGPT Plus runs Python on your actual files via Code Interpreter — the strongest option when you need real data execution, not just code generation.",
        analystNote: "If you live in PowerBI and Excel already, you may not need this daily. But for ad-hoc EDA on raw files, Code Interpreter is the clearest concrete advantage Plus has over Claude Pro.",
        ratings: {
          claude:      { score: 3, note: "Generates strong analysis code and explains the logic well — but doesn't execute against your files directly." },
          chatgpt:     { score: 5, note: "Code Interpreter runs real Python on uploaded files. Charts, stats, iterations — all in one session." },
          chatgptFree: { score: 3, note: "No Code Interpreter. Text-only analysis." },
          notebooklm:  { score: 1, note: "Not designed for data execution." },
        },
      },
      {
        name: "Write SQL queries",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude Pro handles complex SQL — CTEs, window functions, multi-join logic — with strong accuracy when schema context is provided upfront.",
        analystNote: "Load your schema into a Claude Project once. Query quality across the entire session improves significantly versus starting fresh each time.",
        ratings: {
          claude:      { score: 5, note: "Excellent on multi-step SQL logic when schema context is in the project. Explains reasoning clearly." },
          chatgpt:     { score: 4, note: "Strong SQL, especially with extended thinking mode for complex cases." },
          chatgptFree: { score: 4, note: "Handles standard queries reliably." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "Interpret dashboards & reports",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude's long context window lets you paste full datasets or screenshots for deep business-level interpretation, not just surface description.",
        analystNote: "Claude tends to connect numbers to business implications rather than just describing them. Works well for 'what does this mean for the team' type questions.",
        ratings: {
          claude:      { score: 4, note: "Strong with screenshots and pasted data. Business narrative depth is a clear strength." },
          chatgpt:     { score: 4, note: "Good visual analysis. Slightly less depth on business framing." },
          chatgptFree: { score: 3, note: "Context limits show on complex, multi-visual dashboards." },
          notebooklm:  { score: 2, note: "Useful only if you upload the file as a source first." },
        },
      },
      {
        name: "Sales forecasting / predictive models",
        winnerType: "bestExecution", winner: "chatgpt" as ToolKey, evidence: "feature" as const,
        generalVerdict: "Code Interpreter can run actual statistical models on your data — regression, ARIMA, trend analysis — and iterate on results within the same conversation.",
        analystNote: "High value if you want to prototype models without a local Python setup. Otherwise, Claude generates clean code you can run in your own environment.",
        ratings: {
          claude:      { score: 3, note: "Excellent code generation and methodology guidance. No in-chat execution layer." },
          chatgpt:     { score: 5, note: "Runs models, produces charts, iterates on outputs — all within the session." },
          chatgptFree: { score: 2, note: "Code generation only. No execution." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
    ],
  },
  {
    category: "Writing & Content", emoji: "✍️",
    tasks: [
      {
        name: "Writing for personal brand / X",
        winnerType: "bestPolish", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude maintains voice consistency across long sessions. Strongest for writers with an established tone who don't want to re-prompt style guidelines every time.",
        analystNote: "With a loaded Project, Claude picks up a specific voice — critical, direct, no filler. ChatGPT tends toward safer phrasing without heavy re-prompting.",
        ratings: {
          claude:      { score: 4, note: "Persistent project context helps maintain tone. Most consistent option for voice-sensitive writing." },
          chatgpt:     { score: 3, note: "Capable, but defaults to generic professional phrasing without explicit style guidance." },
          chatgptFree: { score: 3, note: "No persistent context. Starts fresh each conversation." },
          notebooklm:  { score: 1, note: "Not designed for original writing." },
        },
      },
      {
        name: "Long-form reports & analysis docs",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude Pro handles multi-section documents with strong coherence from start to finish.",
        analystNote: "For anything over 1,500 words that needs to sound like you, Claude is the clearer choice. For shorter docs, the gap narrows and free tools are often sufficient.",
        ratings: {
          claude:      { score: 5, note: "Long context + consistent prose quality across full documents." },
          chatgpt:     { score: 4, note: "Has improved significantly on long-form coherence with recent model updates." },
          chatgptFree: { score: 3, note: "Works for shorter docs. Consistency limits appear on longer ones." },
          notebooklm:  { score: 3, note: "Can synthesise sources well — but doesn't generate in your voice." },
        },
      },
      {
        name: "Professional emails & communications",
        winnerType: "bestValue", winner: "chatgptFree" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Any current free tier handles professional emails reliably. Paying specifically for this task is not justified on its own.",
        analystNote: "Don't use a $20/mo tool for a standalone email unless you're combining it with other tasks in the same session anyway.",
        ratings: {
          claude:      { score: 4, note: "High quality, but free tools are fully sufficient for this." },
          chatgpt:     { score: 4, note: "Solid. Free tier covers this comfortably." },
          chatgptFree: { score: 5, note: "More than sufficient. Best value option for this specific task." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "Image generation",
        winnerType: "bestExecution", winner: "chatgpt" as ToolKey, evidence: "feature" as const,
        generalVerdict: "Claude does not currently generate images. ChatGPT Plus (with DALL-E) is the strongest option in this comparison for image-first tasks.",
        analystNote: "If image generation is a regular workflow need, this is the clearest practical advantage of ChatGPT Plus over Claude Pro for a non-developer profile.",
        ratings: {
          claude:      { score: 1, note: "No image generation in current plan." },
          chatgpt:     { score: 5, note: "DALL-E integration. Plus gives broader access and higher output quality." },
          chatgptFree: { score: 3, note: "Limited DALL-E access." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
    ],
  },
  {
    category: "Research & Synthesis", emoji: "🔬",
    tasks: [
      {
        name: "Synthesising PDFs & long documents",
        winnerType: "bestGrounding", winner: "notebooklm" as ToolKey, evidence: "observed" as const,
        generalVerdict: "NotebookLM is purpose-built for multi-source synthesis with precise citations. Free, focused, and the strongest option in this comparison for this job.",
        analystNote: "Load industry reports, competitor filings, or course materials as sources. The audio overview feature alone makes it worth using for dense research material.",
        ratings: {
          claude:      { score: 4, note: "Long context handles entire books. Strong synthesis quality — less citation-precise than NotebookLM." },
          chatgpt:     { score: 4, note: "Good, but more limited on very long or multi-document inputs." },
          chatgptFree: { score: 2, note: "Context limits affect quality on dense or lengthy documents." },
          notebooklm:  { score: 5, note: "Designed exactly for this. Multi-source, citation-accurate, free." },
        },
      },
      {
        name: "Market & industry research",
        winnerType: "bestExecution", winner: "chatgpt" as ToolKey, evidence: "feature" as const,
        generalVerdict: "ChatGPT Plus Deep Research produces structured, sourced reports with clear methodology.",
        analystNote: "For competitive analysis or market sizing, Deep Research saves significant manual search time. Worth testing before deciding whether Plus justifies the cost.",
        ratings: {
          claude:      { score: 4, note: "Web search active in Pro. Research feature maturing but not yet at Deep Research depth." },
          chatgpt:     { score: 5, note: "Deep Research produces structured, sourced reports. Strongest for formal research outputs." },
          chatgptFree: { score: 3, note: "Basic search. No deep research capability." },
          notebooklm:  { score: 3, note: "Excellent if you upload your own sources — doesn't search the web." },
        },
      },
      {
        name: "Second opinion & idea validation",
        winnerType: "bestValue", winner: "chatgptFree" as ToolKey, evidence: "workflow" as const,
        generalVerdict: "A different model gives a genuinely different perspective. ChatGPT Free is entirely sufficient for this — no payment required.",
        analystNote: "Claude as primary thinker, ChatGPT Free as the contrarian check. The value here is the model difference, not the plan tier.",
        ratings: {
          claude:      { score: 5, note: "Strong pushback when explicitly requested. Ask for steelman or critique directly." },
          chatgpt:     { score: 4, note: "Different architecture = different default assumptions. Useful as a check." },
          chatgptFree: { score: 4, note: "Best value for second opinions. Paying for this purpose alone is unnecessary." },
          notebooklm:  { score: 2, note: "Contrasts only within your uploaded sources — not a general second opinion." },
        },
      },
    ],
  },
  {
    category: "Automation & Code", emoji: "⚙️",
    tasks: [
      {
        name: "Vibe-coding & rapid prototypes",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude Pro's ecosystem — Claude Code, Cowork, and MCP connectors — provides the most integrated environment for non-developer builders prototyping knowledge tools.",
        analystNote: "For a BI-adjacent profile building real tools without full-time engineering, Claude Pro's ecosystem fits better than Codex.",
        ratings: {
          claude:      { score: 5, note: "Claude Code + Cowork = most integrated ecosystem for knowledge-worker builders." },
          chatgpt:     { score: 4, note: "Codex is powerful but optimised for engineers working with existing codebases." },
          chatgptFree: { score: 3, note: "No Codex access. Works for simple, contained prototypes." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "Notion automation via MCP",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude Pro is the strongest individual-tier option for direct Notion database read/write workflows.",
        analystNote: "Direct read/write to a Notion CRM without copy-paste is a genuine workflow advantage. No equivalent individual-tier workflow found in the other tools.",
        ratings: {
          claude:      { score: 5, note: "Native MCP with Notion: reads, creates, and modifies records directly in your databases." },
          chatgpt:     { score: 2, note: "Integrations exist but are more limited at the individual plan level." },
          chatgptFree: { score: 1, note: "No MCP support." },
          notebooklm:  { score: 1, note: "Can use Notion pages as a source — doesn't act on them." },
        },
      },
      {
        name: "Multi-step task delegation",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "feature" as const,
        generalVerdict: "Cowork in Claude Pro enables autonomous multi-step task execution with local folder access.",
        analystNote: "Currently the closest thing to a personal AI operator for knowledge work at $20/mo.",
        ratings: {
          claude:      { score: 5, note: "Cowork delegates multi-step tasks with direct local folder access." },
          chatgpt:     { score: 3, note: "Agent mode exists. Less local-file integration at individual tier." },
          chatgptFree: { score: 1, note: "No meaningful agent capabilities." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "Debugging code",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Both Claude Pro and ChatGPT Plus perform at a high level. Claude edges ahead when project-level code context is available across turns.",
        analystNote: "For multi-session vibe-coding, persistent project context means accumulated understanding of your codebase.",
        ratings: {
          claude:      { score: 5, note: "Strong reasoning and explanation depth. Benefits significantly from project-level code context." },
          chatgpt:     { score: 5, note: "Extended thinking mode is excellent for complex debugging. Comparable quality." },
          chatgptFree: { score: 4, note: "Sufficient for most standard debugging tasks." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
    ],
  },
  {
    category: "Documents & Organisation", emoji: "📁",
    tasks: [
      {
        name: "Generate structured documents (Excel, Word)",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "feature" as const,
        generalVerdict: "Claude Pro includes Claude in Excel and expanding document creation features that produce actual downloadable files.",
        analystNote: "Verified: Claude in Excel is included in Pro. PowerPoint in research preview for Max plans — confirm current pricing before relying on PPT.",
        ratings: {
          claude:      { score: 4, note: "Claude in Excel in Pro. Word generation generally available." },
          chatgpt:     { score: 3, note: "Canvas editor for live document editing. Less focused on downloadable files." },
          chatgptFree: { score: 2, note: "Text output only in most cases." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "Local folder & file organisation",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "feature" as const,
        generalVerdict: "Cowork in Claude Pro provides direct local file system access — read, write, reorganise.",
        analystNote: "Delegate folder cleanup, file renaming, and document organisation tasks. Meaningful time-saver once set up.",
        ratings: {
          claude:      { score: 5, note: "Cowork reads and writes local folders. Genuinely autonomous file management." },
          chatgpt:     { score: 2, note: "No direct local file system access at individual plan level." },
          chatgptFree: { score: 1, note: "No local access." },
          notebooklm:  { score: 1, note: "Not applicable." },
        },
      },
      {
        name: "CRM & Notion database management",
        winnerType: "bestIntegration", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Claude Pro is the strongest individual-tier option for direct Notion CRM read/write workflows.",
        analystNote: "With a multi-database CRM in Notion, Claude can create, update, and query records directly — eliminating manual copy-paste.",
        ratings: {
          claude:      { score: 5, note: "MCP Notion: reads, creates, and modifies records directly." },
          chatgpt:     { score: 2, note: "Limited Notion integration at individual plan." },
          chatgptFree: { score: 1, note: "No MCP." },
          notebooklm:  { score: 2, note: "Can use Notion pages as sources — doesn't act on them." },
        },
      },
    ],
  },
  {
    category: "Career & Portfolio", emoji: "🎯",
    tasks: [
      {
        name: "Interview prep & role-play",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Persistent project context lets Claude simulate interviews with your actual background, target roles, and likely objections.",
        analystNote: "Load your CV, a target JD, and career context. The quality difference versus a cold conversation is significant and immediately noticeable.",
        ratings: {
          claude:      { score: 5, note: "With career project loaded, role-play is highly specific and directly useful." },
          chatgpt:     { score: 4, note: "Custom GPTs for interview practice can be strong. Less personalised without prior context." },
          chatgptFree: { score: 3, note: "Works for generic practice. No persistent context." },
          notebooklm:  { score: 3, note: "Useful if you load JDs and your CV as sources — good for Q&A prep." },
        },
      },
      {
        name: "Career strategy & decisions",
        winnerType: "bestContext", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Personalised career advice requires knowing the person. Claude Pro with loaded context outperforms any cold conversation on this type of reasoning.",
        analystNote: "Advice that reflects your actual roadmap, timeline, and constraints beats generic frameworks.",
        ratings: {
          claude:      { score: 4, note: "Knows your roadmap and constraints when project is loaded. Genuinely personalised." },
          chatgpt:     { score: 3, note: "Generic without prior context. Custom GPTs with your career info can improve this." },
          chatgptFree: { score: 2, note: "No persistence between sessions." },
          notebooklm:  { score: 2, note: "Only if you load your career documents as sources." },
        },
      },
      {
        name: "LinkedIn & portfolio optimisation",
        winnerType: "bestPolish", winner: "claude" as ToolKey, evidence: "observed" as const,
        generalVerdict: "Voice-consistent editing across your professional presence requires a tool that knows how you write.",
        analystNote: "Claude Pro edits profile sections without genericising your voice. ChatGPT Plus Deep Research is separately useful for benchmarking against target roles.",
        ratings: {
          claude:      { score: 4, note: "Knows your voice and positioning when project is loaded." },
          chatgpt:     { score: 4, note: "Deep Research useful for competitive benchmarking. Less voice-consistent without loaded context." },
          chatgptFree: { score: 3, note: "Works for copy editing. Generic without prior context." },
          notebooklm:  { score: 2, note: "Useful only if you load your current profiles as sources." },
        },
      },
    ],
  },
];

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`w-4 h-1 rounded-full ${i <= score ? "bg-slate-900" : "bg-slate-200"}`} />
      ))}
      <span className="text-xs text-slate-400 ml-1 font-sans">{score}/5</span>
    </div>
  );
}

export default function AIToolsPage() {
  const [filterWinner, setFilterWinner] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState<Record<string,boolean>>({});
  const [showCriteria, setShowCriteria] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [viewMode, setViewMode] = useState<"analyst"|"general">("analyst");

  const toggle = (k: string) => setExpanded(e => ({ ...e, [k]: !e[k] }));

  const filtered = TASKS
    .map(cat => ({ ...cat, tasks: cat.tasks.filter(t => filterWinner === "all" || t.winner === filterWinner) }))
    .filter(cat => (filterCategory === "all" || cat.category === filterCategory) && cat.tasks.length > 0);

  const totalTasks = TASKS.reduce((a, c) => a + c.tasks.length, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-200">

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 h-0.5 bg-blue-900 z-50 transition-all" style={{width:"100%", transformOrigin:"left", opacity:0.3}} />

      {/* Nav */}
      <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="flex flex-col cursor-pointer group">
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors flex items-center gap-2">
              Juan M. Garcia <BadgeCheck size={18} className="text-blue-900" />
            </span>
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-slate-500 uppercase">BI Analyst</span>
          </a>
          <a href="/#work" className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-blue-900 transition-colors">
            <ArrowLeft size={14} /> Back to Portfolio
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-block border-b border-slate-900 pb-1 mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Personal Research · {LAST_UPDATED}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] text-slate-900 mb-6 max-w-3xl">
            Evaluating AI Tools<br/><span className="italic text-slate-500">for Knowledge Work</span>
          </h1>
          <p className="font-sans text-lg text-slate-500 leading-relaxed max-w-2xl mb-10 font-light">
            A structured scoring framework for BI, research, writing, and automation. Benchmarked for a BI analyst / knowledge-worker profile — not a universal benchmark.
          </p>

          {/* Insights strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 mb-8">
            {INSIGHTS.map(ins => (
              <div key={ins.label} className="bg-white p-6 hover:bg-[#FAFAFA] transition-colors">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{ins.label}</div>
                <div className="font-serif text-xl font-bold text-slate-900 mb-1">{ins.value}</div>
                <div className="text-xs text-slate-400 font-light">{ins.sub}</div>
              </div>
            ))}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-xs text-slate-400 font-light">
            <span><span className="font-bold text-slate-600">{totalTasks} tasks</span> evaluated</span>
            <span><span className="font-bold text-slate-600">6 categories</span></span>
            <span><span className="font-bold text-slate-600">4 tools</span> compared</span>
            <div className="flex gap-4">
              {Object.entries(EVIDENCE).map(([k, e]) => (
                <span key={k} className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${e.bg} border ${e.border}`} />
                  <span className={e.color}>{e.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl py-12">

        {/* Collapsibles */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            {
              label: "Methodology", show: showMethodology, toggle: () => setShowMethodology(s => !s),
              content: [
                { label: "Scope", value: "Individual plans only ($0–$20/mo). No Business or Enterprise tiers." },
                { label: "Profile", value: "BI analyst / knowledge worker. Not full-time software engineering." },
                { label: "Evidence", value: "Feature-based (documented), Workflow-based (tested), Observed in use (personal)." },
                { label: "Updated", value: `${LAST_UPDATED}. AI features change frequently — treat as a snapshot.` },
              ]
            },
            {
              label: "Scoring Criteria", show: showCriteria, toggle: () => setShowCriteria(s => !s),
              content: SCORING_CRITERIA.map(c => ({ label: c.label, value: c.desc }))
            }
          ].map(section => (
            <div key={section.label} className="border border-slate-200 bg-white">
              <button onClick={section.toggle} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#FAFAFA] transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-600">{section.label}</span>
                {section.show ? <ChevronUp size={14} className="text-slate-400"/> : <ChevronDown size={14} className="text-slate-400"/>}
              </button>
              {section.show && (
                <div className="px-6 pb-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  {section.content.map(item => (
                    <div key={item.label}>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                      <div className="text-xs text-slate-500 font-light leading-relaxed">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {/* View toggle */}
          <div className="flex border border-slate-200 bg-white overflow-hidden">
            {([{id:"analyst", label:"Analyst notes"},{id:"general",label:"General verdict"}] as const).map(v => (
              <button key={v.id} onClick={() => setViewMode(v.id)} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${viewMode===v.id?"bg-slate-900 text-white":"text-slate-500 hover:text-slate-900"}`}>
                {v.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200" />

          {/* Winner filter */}
          <div className="flex gap-2 flex-wrap">
            {[{id:"all",label:"All tools"}, ...TOOL_KEYS.map(k => ({id:k, label:TOOLS[k].short}))].map(opt => (
              <button key={opt.id} onClick={() => setFilterWinner(opt.id)} className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${filterWinner===opt.id?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200" />

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {[{id:"all",label:"All areas"}, ...TASKS.map(c => ({id:c.category, label:`${c.emoji} ${c.category.split(" ")[0]}`}))].map(opt => (
              <button key={opt.id} onClick={() => setFilterCategory(opt.id)} className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-colors ${filterCategory===opt.id?"bg-blue-900 text-white border-blue-900":"bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-10">
          {filtered.map(cat => (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{cat.category}</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-2">
                {cat.tasks.map(task => {
                  const key = cat.category + task.name;
                  const isOpen = expanded[key];
                  const ev = EVIDENCE[task.evidence];
                  const wt = WINNER_TYPES[task.winnerType];
                  const winner = TOOLS[task.winner];

                  return (
                    <div key={task.name} className={`border transition-colors ${isOpen?"border-slate-300 bg-white shadow-sm":"border-slate-200 bg-white hover:border-slate-300"}`}>
                      <button onClick={() => toggle(key)} className="w-full text-left px-6 py-5 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-serif text-lg text-slate-900 mb-2">{task.name}</div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 px-2 py-0.5">{wt.label}</span>
                            <span className="text-xs font-bold text-slate-900">→ {winner.name}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border ${ev.color} ${ev.bg} ${ev.border}`}>{ev.label}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 flex-shrink-0">
                          {TOOL_KEYS.map(k => (
                            <div key={k} className="text-center min-w-[28px]">
                              <div className="text-[9px] text-slate-400 uppercase mb-1">{TOOLS[k].short.slice(0,4)}</div>
                              <div className={`text-sm font-bold ${task.ratings[k].score >= 4 ? "text-slate-900" : "text-slate-300"}`}>{task.ratings[k].score}</div>
                            </div>
                          ))}
                          <div className="text-slate-400 ml-2">{isOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-100 px-6 py-6">
                          {/* Verdict/note */}
                          <div className={`mb-6 p-4 border-l-2 ${viewMode==="analyst"?"border-blue-900 bg-blue-50/50":"border-slate-300 bg-[#FAFAFA]"}`}>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2">
                              {viewMode==="analyst" ? "Analyst note" : "General verdict"}
                            </span>
                            <span className="text-sm text-slate-600 font-light leading-relaxed">
                              {viewMode==="analyst" ? task.analystNote : task.generalVerdict}
                            </span>
                          </div>

                          {/* Per-tool breakdown */}
                          <div className="grid md:grid-cols-2 gap-4">
                            {TOOL_KEYS.map(k => {
                              const r = task.ratings[k];
                              const t = TOOLS[k];
                              return (
                                <div key={k} className={`p-4 border border-slate-100 ${r.score <= 1 ? "opacity-30" : ""}`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">{t.name}</span>
                                    <span className="text-[10px] text-slate-400">{t.price}</span>
                                  </div>
                                  <ScoreDots score={r.score} />
                                  <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">{r.note}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-slate-400 py-16 font-light">
              No tasks match the active filters.
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-16 border border-slate-200 bg-white p-8 md:p-12">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Recommended stack · BI analyst profile</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 mb-8">
            {[
              { tool: "claude" as ToolKey,      role: "Primary tool",      tasks: "Writing, analysis, Notion MCP, career context, vibe-coding, documents" },
              { tool: "chatgptFree" as ToolKey, role: "Secondary / check", tasks: "Second opinion, lightweight drafting, occasional image gen" },
              { tool: "notebooklm" as ToolKey,  role: "Deep research",     tasks: "PDF synthesis, multi-source analysis, research audio" },
              { tool: "chatgpt" as ToolKey,     role: "Add Plus only if…", tasks: "Regular Code Interpreter use on your own data, or structured Deep Research reports" },
            ].map(item => (
              <div key={item.tool} className="bg-white p-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{item.role}</div>
                <div className="font-serif text-xl text-slate-900 mb-3">{TOOLS[item.tool].name}</div>
                <div className="text-xs text-slate-500 font-light leading-relaxed">{item.tasks}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFA] border border-slate-100 p-6">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">Bottom line: </span>
            <span className="text-sm text-slate-500 font-light leading-relaxed">
              Claude Pro ($20) + ChatGPT Free + NotebookLM (free) covers the full stack for $20/mo.
              The marginal value of ChatGPT Plus over the free tier appears limited for this workflow —
              unless Code Interpreter on your own data or structured Deep Research are regular needs.
            </span>
          </div>
          <div className="mt-4 text-xs text-slate-300 text-right">Framework for one analyst's workflow · {LAST_UPDATED} · Verify current features before purchasing</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-4">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <span className="font-serif text-lg">Juan M. Garcia</span>
          <a href="/#work" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={12} /> Back to portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}
