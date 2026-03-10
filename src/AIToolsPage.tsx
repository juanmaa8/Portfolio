import { useState, useEffect } from "react";
import { ArrowLeft, BadgeCheck, ChevronDown, ChevronUp, Globe } from "lucide-react";

const LAST_UPDATED_EN = "March 2026";
const LAST_UPDATED_ES = "Marzo 2026";

const T = {
  en: {
    role: "BI Analyst", backToPortfolio: "Back to Portfolio", label: "Personal Research",
    h1a: "AI Stack for BI:", h1b: "An Honest Comparison",
    subtitle: "1+ year with ChatGPT, 2 months with Claude. I ran both through 20 real tasks I do as a BI analyst — SQL, reporting, writing, automation, research. Not a benchmark from a lab. Just what actually works when you use these tools daily.",
    insights: [
      { label: "Primary recommendation", value: "Claude Pro",   sub: "Writing, integrations, career, code" },
      { label: "Best free stack",        value: "Free + NbLM",  sub: "Second opinion + deep research"     },
      { label: "Best for execution",     value: "ChatGPT Plus", sub: "Code Interpreter on your data"      },
      { label: "Best for integration",   value: "Claude Pro",   sub: "MCPs, local files, Notion CRM"      },
    ],
    tasksCount: "tasks evaluated", categoriesCount: "categories", toolsCount: "tools compared",
    methodology: "Methodology", scoringCriteria: "Scoring Criteria",
    methodologyItems: [
      { label: "Scope",    value: "Individual plans only ($0–$20/mo). No Business or Enterprise tiers." },
      { label: "Profile",  value: "BI analyst using these tools daily for SQL, PowerBI, reporting, writing, and workflow automation. Not a software engineer." },
      { label: "Evidence", value: "Feature-based (documented), Workflow-based (I tested it), Observed in use (I use it regularly and noticed this)." },
      { label: "Updated",  value: `${LAST_UPDATED_EN}. AI moves fast — treat this as a snapshot, not gospel.` },
    ],
    scoringItems: [
      { label: "File Execution",         desc: "Runs code or processes your actual data files" },
      { label: "Long-context Reasoning", desc: "Handles large docs, maintains coherence across sessions" },
      { label: "Source Grounding",       desc: "Cites sources, stays accurate to uploaded inputs" },
      { label: "Workflow Integration",   desc: "MCPs, connectors, local file access, tool chaining" },
      { label: "Output Polish",          desc: "Writing quality, voice consistency, formatting" },
      { label: "Value for Money",        desc: "Cost vs practical utility for this task category" },
    ],
    analystNotes: "Analyst notes", generalVerdict: "General verdict",
    allTools: "All tools", allAreas: "All areas", analystNote: "Analyst note",
    evidence: { feature: "Feature-based", workflow: "Workflow-based", observed: "Observed in use" },
    winnerTypes: {
      bestExecution: "Best: file execution", bestContext: "Best: long-context",
      bestGrounding: "Best: source grounding", bestIntegration: "Best: integration",
      bestValue: "Best value pick", bestPolish: "Best: output polish",
    },
    summaryTitle: "Recommended stack · BI analyst profile",
    summaryRoles: ["Primary tool", "Secondary / check", "Deep research", "Add Plus only if…"],
    summaryTasks: [
      "Writing, analysis, Notion MCP, career context, vibe-coding, documents",
      "Second opinion, lightweight drafting, occasional image gen",
      "PDF synthesis, multi-source analysis, research audio",
      "Regular Code Interpreter use on your own data, or structured Deep Research reports",
    ],
    bottomLine: "Bottom line:",
    bottomLineText: "Claude Pro ($20) + ChatGPT Free + NotebookLM (free) covers the full stack for $20/mo. The marginal value of ChatGPT Plus over the free tier is limited for this workflow — unless Code Interpreter on your own data or structured Deep Research are regular needs.",
    disclaimer: "Framework for one analyst's workflow · Verify current features before purchasing",
    noResults: "No tasks match the active filters.",
    footer: "Back to portfolio",
    langSwitch: "ES",
  },
  es: {
    role: "Analista de BI", backToPortfolio: "Volver al Portfolio", label: "Investigación Personal",
    h1a: "Stack de IA para BI:", h1b: "Una Comparativa Honesta",
    subtitle: "Más de 1 año con ChatGPT, 2 meses con Claude. Los pasé por 20 tareas reales que hago como analista de BI — SQL, reporting, escritura, automatización, investigación. No es un benchmark de laboratorio. Es lo que funciona de verdad cuando los usas a diario.",
    insights: [
      { label: "Recomendación principal", value: "Claude Pro",   sub: "Escritura, integraciones, carrera, código" },
      { label: "Mejor stack gratuito",    value: "Free + NbLM",  sub: "Segunda opinión + investigación profunda"  },
      { label: "Mejor para ejecución",   value: "ChatGPT Plus", sub: "Code Interpreter con tus datos"             },
      { label: "Mejor para integración", value: "Claude Pro",   sub: "MCPs, archivos locales, CRM en Notion"      },
    ],
    tasksCount: "tareas evaluadas", categoriesCount: "categorías", toolsCount: "herramientas comparadas",
    methodology: "Metodología", scoringCriteria: "Criterios de Puntuación",
    methodologyItems: [
      { label: "Alcance",     value: "Solo planes individuales ($0–$20/mes). Sin Business ni Enterprise." },
      { label: "Perfil",      value: "Analista de BI usando estas herramientas a diario para SQL, PowerBI, reporting, escritura y automatización. No soy ingeniero de software." },
      { label: "Evidencia",   value: "Basada en funcionalidad (documentada), en flujo de trabajo (lo probé), observada en uso (lo uso regularmente y lo noté)." },
      { label: "Actualizado", value: `${LAST_UPDATED_ES}. La IA avanza rápido — trátalo como una foto del momento, no como verdad absoluta.` },
    ],
    scoringItems: [
      { label: "Ejecución de archivos",   desc: "Ejecuta código o procesa tus archivos de datos reales" },
      { label: "Razonamiento contextual", desc: "Maneja documentos largos, mantiene coherencia entre sesiones" },
      { label: "Fidelidad a las fuentes", desc: "Cita fuentes, se mantiene preciso con los inputs subidos" },
      { label: "Integración en flujo",    desc: "MCPs, conectores, acceso a archivos locales, encadenamiento" },
      { label: "Calidad del output",      desc: "Calidad de escritura, consistencia de voz, formato" },
      { label: "Relación calidad-precio", desc: "Coste vs utilidad práctica para esta categoría de tarea" },
    ],
    analystNotes: "Notas del analista", generalVerdict: "Veredicto general",
    allTools: "Todas las herramientas", allAreas: "Todas las áreas", analystNote: "Nota del analista",
    evidence: { feature: "Basado en funcionalidad", workflow: "Basado en flujo de trabajo", observed: "Observado en uso" },
    winnerTypes: {
      bestExecution: "Mejor: ejecución de archivos", bestContext: "Mejor: contexto largo",
      bestGrounding: "Mejor: fidelidad a fuentes", bestIntegration: "Mejor: integración",
      bestValue: "Mejor relación calidad-precio", bestPolish: "Mejor: calidad de output",
    },
    summaryTitle: "Stack recomendado · Perfil analista BI",
    summaryRoles: ["Herramienta principal", "Secundaria / verificación", "Investigación profunda", "Añade Plus solo si…"],
    summaryTasks: [
      "Escritura, análisis, Notion MCP, contexto de carrera, vibe-coding, documentos",
      "Segunda opinión, borradores rápidos, generación de imágenes ocasional",
      "Síntesis de PDFs, análisis multifuente, audio de investigación",
      "Uso frecuente de Code Interpreter con tus propios datos, o reportes Deep Research estructurados",
    ],
    bottomLine: "Conclusión:",
    bottomLineText: "Claude Pro ($20) + ChatGPT Free + NotebookLM (gratis) cubre todo el stack por $20/mes. El valor adicional de ChatGPT Plus sobre el plan gratuito es limitado para este flujo — salvo que uses Code Interpreter con tus datos o Deep Research de forma regular.",
    disclaimer: "Framework para el flujo de trabajo de un analista · Verifica las funcionalidades actuales antes de comprar",
    noResults: "Ninguna tarea coincide con los filtros activos.",
    footer: "Volver al portfolio",
    langSwitch: "EN",
  },
};

const TOOLS = {
  claude:      { name: "Claude Pro",   short: "Claude", price: "$20/mo" },
  chatgpt:     { name: "ChatGPT Plus", short: "Plus",   price: "$20/mo" },
  chatgptFree: { name: "ChatGPT Free", short: "Free",   price: "Free"   },
  notebooklm:  { name: "NotebookLM",  short: "NbLM",   price: "Free"   },
};
const TOOL_KEYS = ["claude","chatgpt","chatgptFree","notebooklm"] as const;
type ToolKey = typeof TOOL_KEYS[number];
type EvidenceKey = "feature"|"workflow"|"observed";
type WinnerTypeKey = "bestExecution"|"bestContext"|"bestGrounding"|"bestIntegration"|"bestValue"|"bestPolish";

const EVIDENCE_STYLE = {
  feature:  { color:"text-blue-600",    bg:"bg-blue-50",    border:"border-blue-200"   },
  workflow: { color:"text-amber-600",   bg:"bg-amber-50",   border:"border-amber-200"  },
  observed: { color:"text-emerald-600", bg:"bg-emerald-50", border:"border-emerald-200"},
};

interface TaskRating { score:number; noteEn:string; noteEs:string }
interface Task {
  nameEn:string; nameEs:string;
  winnerType:WinnerTypeKey; winner:ToolKey; evidence:EvidenceKey;
  generalVerdictEn:string; generalVerdictEs:string;
  analystNoteEn:string; analystNoteEs:string;
  ratings: Record<ToolKey, TaskRating>;
}
interface Category { categoryEn:string; categoryEs:string; emoji:string; tasks:Task[] }

const TASKS:Category[] = [
  { categoryEn:"BI & Data Analysis", categoryEs:"BI & Análisis de Datos", emoji:"📊", tasks:[
    { nameEn:"Analyse CSV / Excel datasets", nameEs:"Analizar datasets CSV / Excel",
      winnerType:"bestExecution", winner:"chatgpt", evidence:"feature",
      generalVerdictEn:"ChatGPT Plus runs Python on your actual files via Code Interpreter — the strongest option when you need real data execution, not just code generation.",
      generalVerdictEs:"ChatGPT Plus ejecuta Python en tus archivos reales mediante Code Interpreter — la opción más potente cuando necesitas ejecución real de datos, no solo generación de código.",
      analystNoteEn:"If you live in PowerBI and Excel already, you may not need this daily. But for ad-hoc EDA on raw files, Code Interpreter is the clearest concrete advantage Plus has over Claude Pro.",
      analystNoteEs:"Si ya vives en PowerBI y Excel, puede que no lo necesites a diario. Pero para EDA ad-hoc sobre archivos crudos, Code Interpreter es la ventaja concreta más clara que tiene Plus sobre Claude Pro.",
      ratings:{ claude:{score:3,noteEn:"Generates strong analysis code and explains the logic well — but doesn't execute against your files directly.",noteEs:"Genera código de análisis sólido y explica la lógica bien — pero no ejecuta contra tus archivos directamente."}, chatgpt:{score:5,noteEn:"Code Interpreter runs real Python on uploaded files. Charts, stats, iterations — all in one session.",noteEs:"Code Interpreter ejecuta Python real en archivos subidos. Gráficos, estadísticas, iteraciones — todo en una sesión."}, chatgptFree:{score:3,noteEn:"No Code Interpreter. Text-only analysis.",noteEs:"Sin Code Interpreter. Análisis solo de texto."}, notebooklm:{score:1,noteEn:"Not designed for data execution.",noteEs:"No está diseñado para ejecución de datos."} } },
    { nameEn:"Write SQL queries", nameEs:"Escribir consultas SQL",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude Pro handles complex SQL — CTEs, window functions, multi-join logic — with strong accuracy when schema context is provided upfront.",
      generalVerdictEs:"Claude Pro maneja SQL complejo — CTEs, window functions, lógica multi-join — con alta precisión cuando el contexto del esquema se proporciona de antemano.",
      analystNoteEn:"Load your schema into a Claude Project once. Query quality across the entire session improves significantly versus starting fresh each time.",
      analystNoteEs:"Carga tu esquema en un Proyecto de Claude una vez. La calidad de las consultas mejora significativamente en toda la sesión frente a empezar desde cero cada vez.",
      ratings:{ claude:{score:5,noteEn:"Excellent on multi-step SQL logic when schema context is in the project. Explains reasoning clearly.",noteEs:"Excelente en lógica SQL multi-paso cuando el contexto del esquema está en el proyecto."}, chatgpt:{score:4,noteEn:"Strong SQL, especially with extended thinking mode for complex cases.",noteEs:"SQL sólido, especialmente con el modo de razonamiento extendido para casos complejos."}, chatgptFree:{score:4,noteEn:"Handles standard queries reliably.",noteEs:"Maneja consultas estándar de forma fiable."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"Interpret dashboards & reports", nameEs:"Interpretar dashboards e informes",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude's long context window lets you paste full datasets or screenshots for deep business-level interpretation, not just surface description.",
      generalVerdictEs:"La ventana de contexto larga de Claude permite pegar datasets completos o capturas para una interpretación profunda a nivel de negocio.",
      analystNoteEn:"Claude tends to connect numbers to business implications rather than just describing them. Works well for 'what does this mean for the team' type questions.",
      analystNoteEs:"Claude tiende a conectar los números con las implicaciones de negocio en lugar de solo describirlos. Funciona bien para preguntas del tipo 'qué significa esto para el equipo'.",
      ratings:{ claude:{score:4,noteEn:"Strong with screenshots and pasted data. Business narrative depth is a clear strength.",noteEs:"Potente con capturas y datos pegados. La profundidad narrativa de negocio es una fortaleza clara."}, chatgpt:{score:4,noteEn:"Good visual analysis. Slightly less depth on business framing.",noteEs:"Buen análisis visual. Ligeramente menos profundidad en el encuadre de negocio."}, chatgptFree:{score:3,noteEn:"Context limits show on complex, multi-visual dashboards.",noteEs:"Los límites de contexto se notan en dashboards complejos con múltiples visualizaciones."}, notebooklm:{score:2,noteEn:"Useful only if you upload the file as a source first.",noteEs:"Útil solo si subes el archivo como fuente primero."} } },
    { nameEn:"Sales forecasting / predictive models", nameEs:"Previsión de ventas / modelos predictivos",
      winnerType:"bestExecution", winner:"chatgpt", evidence:"feature",
      generalVerdictEn:"Code Interpreter can run actual statistical models on your data — regression, ARIMA, trend analysis — and iterate on results within the same conversation.",
      generalVerdictEs:"Code Interpreter puede ejecutar modelos estadísticos reales en tus datos — regresión, ARIMA, análisis de tendencias — e iterar sobre los resultados en la misma conversación.",
      analystNoteEn:"High value if you want to prototype models without a local Python setup. Otherwise, Claude generates clean code you can run in your own environment.",
      analystNoteEs:"Alto valor si quieres prototipar modelos sin un entorno Python local. De lo contrario, Claude genera código limpio que puedes ejecutar en tu propio entorno.",
      ratings:{ claude:{score:3,noteEn:"Excellent code generation and methodology guidance. No in-chat execution layer.",noteEs:"Excelente generación de código y orientación metodológica. Sin capa de ejecución dentro del chat."}, chatgpt:{score:5,noteEn:"Runs models, produces charts, iterates on outputs — all within the session.",noteEs:"Ejecuta modelos, produce gráficos, itera sobre los resultados — todo dentro de la sesión."}, chatgptFree:{score:2,noteEn:"Code generation only. No execution.",noteEs:"Solo generación de código. Sin ejecución."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
  ]},
  { categoryEn:"Writing & Content", categoryEs:"Escritura & Contenido", emoji:"✍️", tasks:[
    { nameEn:"Writing for personal brand / X", nameEs:"Escritura para marca personal / X",
      winnerType:"bestPolish", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude maintains voice consistency across long sessions. Strongest for writers with an established tone who don't want to re-prompt style guidelines every time.",
      generalVerdictEs:"Claude mantiene la consistencia de voz en sesiones largas. La opción más sólida para escritores con un tono establecido que no quieren re-instruir el estilo cada vez.",
      analystNoteEn:"With a loaded Project, Claude picks up a specific voice — critical, direct, no filler. ChatGPT tends toward safer phrasing without heavy re-prompting.",
      analystNoteEs:"Con un Proyecto cargado, Claude capta una voz específica — crítica, directa, sin relleno. ChatGPT tiende a frases más seguras sin prompts de estilo intensivos.",
      ratings:{ claude:{score:4,noteEn:"Persistent project context helps maintain tone. Most consistent option for voice-sensitive writing.",noteEs:"El contexto persistente del proyecto ayuda a mantener el tono. La opción más consistente para escritura con voz propia."}, chatgpt:{score:3,noteEn:"Capable, but defaults to generic professional phrasing without explicit style guidance.",noteEs:"Capaz, pero por defecto usa frases profesionales genéricas sin guía de estilo explícita."}, chatgptFree:{score:3,noteEn:"No persistent context. Starts fresh each conversation.",noteEs:"Sin contexto persistente. Empieza desde cero en cada conversación."}, notebooklm:{score:1,noteEn:"Not designed for original writing.",noteEs:"No está diseñado para escritura original."} } },
    { nameEn:"Long-form reports & analysis docs", nameEs:"Informes largos y documentos de análisis",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude Pro handles multi-section documents with strong coherence from start to finish.",
      generalVerdictEs:"Claude Pro maneja documentos multi-sección con gran coherencia de principio a fin.",
      analystNoteEn:"For anything over 1,500 words that needs to sound like you, Claude is the clearer choice. For shorter docs, the gap narrows and free tools are often sufficient.",
      analystNoteEs:"Para cualquier cosa de más de 1.500 palabras que tenga que sonar a ti, Claude es la opción más clara. Para docs más cortos, la diferencia se reduce y las herramientas gratuitas suelen ser suficientes.",
      ratings:{ claude:{score:5,noteEn:"Long context + consistent prose quality across full documents.",noteEs:"Contexto largo + calidad de prosa consistente en documentos completos."}, chatgpt:{score:4,noteEn:"Has improved significantly on long-form coherence with recent model updates.",noteEs:"Ha mejorado significativamente en coherencia de textos largos con las actualizaciones recientes."}, chatgptFree:{score:3,noteEn:"Works for shorter docs. Consistency limits appear on longer ones.",noteEs:"Funciona para docs más cortos. Los límites de consistencia aparecen en los más largos."}, notebooklm:{score:3,noteEn:"Can synthesise sources well — but doesn't generate in your voice.",noteEs:"Puede sintetizar fuentes bien — pero no genera en tu voz."} } },
    { nameEn:"Professional emails & communications", nameEs:"Emails y comunicaciones profesionales",
      winnerType:"bestValue", winner:"chatgptFree", evidence:"observed",
      generalVerdictEn:"Any current free tier handles professional emails reliably. Paying specifically for this task is not justified on its own.",
      generalVerdictEs:"Cualquier plan gratuito actual maneja emails profesionales de forma fiable. Pagar específicamente para esta tarea no está justificado por sí solo.",
      analystNoteEn:"Don't use a $20/mo tool for a standalone email unless you're combining it with other tasks in the same session anyway.",
      analystNoteEs:"No uses una herramienta de $20/mes solo para un email suelto a menos que lo combines con otras tareas en la misma sesión.",
      ratings:{ claude:{score:4,noteEn:"High quality, but free tools are fully sufficient for this.",noteEs:"Alta calidad, pero las herramientas gratuitas son completamente suficientes para esto."}, chatgpt:{score:4,noteEn:"Solid. Free tier covers this comfortably.",noteEs:"Sólido. El plan gratuito lo cubre cómodamente."}, chatgptFree:{score:5,noteEn:"More than sufficient. Best value option for this specific task.",noteEs:"Más que suficiente. La mejor opción en relación calidad-precio para esta tarea específica."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"Image generation", nameEs:"Generación de imágenes",
      winnerType:"bestExecution", winner:"chatgpt", evidence:"feature",
      generalVerdictEn:"Claude does not currently generate images. ChatGPT Plus (with DALL-E) is the strongest option for image-first tasks.",
      generalVerdictEs:"Claude no genera imágenes actualmente. ChatGPT Plus (con DALL-E) es la opción más potente para tareas centradas en imágenes.",
      analystNoteEn:"If image generation is a regular workflow need, this is the clearest practical advantage of ChatGPT Plus over Claude Pro for a non-developer profile.",
      analystNoteEs:"Si la generación de imágenes es una necesidad habitual en tu flujo, esta es la ventaja práctica más clara de ChatGPT Plus sobre Claude Pro para un perfil no técnico.",
      ratings:{ claude:{score:1,noteEn:"No image generation in current plan.",noteEs:"Sin generación de imágenes en el plan actual."}, chatgpt:{score:5,noteEn:"DALL-E integration. Plus gives broader access and higher output quality.",noteEs:"Integración DALL-E. Plus ofrece mayor acceso y mejor calidad de output."}, chatgptFree:{score:3,noteEn:"Limited DALL-E access.",noteEs:"Acceso limitado a DALL-E."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
  ]},
  { categoryEn:"Research & Synthesis", categoryEs:"Investigación & Síntesis", emoji:"🔬", tasks:[
    { nameEn:"Synthesising PDFs & long documents", nameEs:"Sintetizar PDFs y documentos largos",
      winnerType:"bestGrounding", winner:"notebooklm", evidence:"observed",
      generalVerdictEn:"NotebookLM is purpose-built for multi-source synthesis with precise citations. Free, focused, and the strongest option for this job.",
      generalVerdictEs:"NotebookLM está diseñado específicamente para síntesis multifuente con citas precisas. Gratuito, enfocado, y la opción más potente para este trabajo.",
      analystNoteEn:"Load industry reports, competitor filings, or course materials as sources. The audio overview feature alone makes it worth using for dense research material.",
      analystNoteEs:"Carga informes del sector, documentos de competidores o material de curso como fuentes. La función de resumen de audio por sí sola justifica usarlo para material de investigación denso.",
      ratings:{ claude:{score:4,noteEn:"Long context handles entire books. Strong synthesis quality — less citation-precise than NotebookLM.",noteEs:"El contexto largo maneja libros enteros. Buena calidad de síntesis — menos preciso en citas que NotebookLM."}, chatgpt:{score:4,noteEn:"Good, but more limited on very long or multi-document inputs.",noteEs:"Bueno, pero más limitado en inputs muy largos o multi-documento."}, chatgptFree:{score:2,noteEn:"Context limits affect quality on dense or lengthy documents.",noteEs:"Los límites de contexto afectan la calidad en documentos densos o extensos."}, notebooklm:{score:5,noteEn:"Designed exactly for this. Multi-source, citation-accurate, free.",noteEs:"Diseñado exactamente para esto. Multifuente, preciso en citas, gratuito."} } },
    { nameEn:"Market & industry research", nameEs:"Investigación de mercado e industria",
      winnerType:"bestExecution", winner:"chatgpt", evidence:"feature",
      generalVerdictEn:"ChatGPT Plus Deep Research produces structured, sourced reports with clear methodology.",
      generalVerdictEs:"Deep Research de ChatGPT Plus produce informes estructurados y con fuentes con metodología clara.",
      analystNoteEn:"For competitive analysis or market sizing, Deep Research saves significant manual search time. Worth testing before deciding whether Plus justifies the cost.",
      analystNoteEs:"Para análisis competitivo o estimación de mercado, Deep Research ahorra mucho tiempo de búsqueda manual. Vale la pena probarlo antes de decidir si Plus justifica el coste.",
      ratings:{ claude:{score:4,noteEn:"Web search active in Pro. Research feature maturing but not yet at Deep Research depth.",noteEs:"Búsqueda web activa en Pro. La función de investigación está madurando pero aún no alcanza la profundidad de Deep Research."}, chatgpt:{score:5,noteEn:"Deep Research produces structured, sourced reports. Strongest for formal research outputs.",noteEs:"Deep Research produce informes estructurados y con fuentes. El más potente para outputs de investigación formal."}, chatgptFree:{score:3,noteEn:"Basic search. No deep research capability.",noteEs:"Búsqueda básica. Sin capacidad de investigación profunda."}, notebooklm:{score:3,noteEn:"Excellent if you upload your own sources — doesn't search the web.",noteEs:"Excelente si subes tus propias fuentes — no busca en internet."} } },
    { nameEn:"Second opinion & idea validation", nameEs:"Segunda opinión y validación de ideas",
      winnerType:"bestValue", winner:"chatgptFree", evidence:"workflow",
      generalVerdictEn:"A different model gives a genuinely different perspective. ChatGPT Free is entirely sufficient for this — no payment required.",
      generalVerdictEs:"Un modelo diferente da una perspectiva genuinamente diferente. ChatGPT Free es completamente suficiente para esto — sin necesidad de pagar.",
      analystNoteEn:"Claude as primary thinker, ChatGPT Free as the contrarian check. The value here is the model difference, not the plan tier.",
      analystNoteEs:"Claude como pensador principal, ChatGPT Free como contrapunto crítico. El valor aquí está en la diferencia de modelo, no en el nivel de plan.",
      ratings:{ claude:{score:5,noteEn:"Strong pushback when explicitly requested. Ask for steelman or critique directly.",noteEs:"Buen contrapunto cuando se pide explícitamente. Pide el argumento contrario o la crítica directamente."}, chatgpt:{score:4,noteEn:"Different architecture = different default assumptions. Useful as a check.",noteEs:"Arquitectura diferente = suposiciones por defecto diferentes. Útil como verificación."}, chatgptFree:{score:4,noteEn:"Best value for second opinions. Paying for this purpose alone is unnecessary.",noteEs:"La mejor relación calidad-precio para segundas opiniones. Pagar solo para este propósito es innecesario."}, notebooklm:{score:2,noteEn:"Contrasts only within your uploaded sources — not a general second opinion.",noteEs:"Contrasta solo dentro de tus fuentes subidas — no es una segunda opinión general."} } },
  ]},
  { categoryEn:"Automation & Code", categoryEs:"Automatización & Código", emoji:"⚙️", tasks:[
    { nameEn:"Vibe-coding & rapid prototypes", nameEs:"Vibe-coding y prototipos rápidos",
      winnerType:"bestIntegration", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude Pro's ecosystem — Claude Code, Cowork, and MCP connectors — provides the most integrated environment for non-developer builders.",
      generalVerdictEs:"El ecosistema de Claude Pro — Claude Code, Cowork y conectores MCP — ofrece el entorno más integrado para builders no desarrolladores.",
      analystNoteEn:"For a BI-adjacent profile building real tools without full-time engineering, Claude Pro's ecosystem fits better than Codex.",
      analystNoteEs:"Para un perfil adyacente a BI que construye herramientas reales sin ingeniería a tiempo completo, el ecosistema de Claude Pro encaja mejor que Codex.",
      ratings:{ claude:{score:5,noteEn:"Claude Code + Cowork = most integrated ecosystem for knowledge-worker builders.",noteEs:"Claude Code + Cowork = el ecosistema más integrado para builders de knowledge work."}, chatgpt:{score:4,noteEn:"Codex is powerful but optimised for engineers working with existing codebases.",noteEs:"Codex es potente pero optimizado para ingenieros trabajando con bases de código existentes."}, chatgptFree:{score:3,noteEn:"No Codex access. Works for simple, contained prototypes.",noteEs:"Sin acceso a Codex. Funciona para prototipos simples y contenidos."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"Notion automation via MCP", nameEs:"Automatización de Notion vía MCP",
      winnerType:"bestIntegration", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude Pro is the strongest individual-tier option for direct Notion database read/write workflows.",
      generalVerdictEs:"Claude Pro es la opción individual más potente para flujos de lectura/escritura directa en bases de datos de Notion.",
      analystNoteEn:"Direct read/write to a Notion CRM without copy-paste is a genuine workflow advantage. No equivalent individual-tier workflow found in the other tools.",
      analystNoteEs:"La lectura/escritura directa en un CRM de Notion sin copiar y pegar es una ventaja real de flujo. No se encontró un flujo equivalente en el nivel individual de las otras herramientas.",
      ratings:{ claude:{score:5,noteEn:"Native MCP with Notion: reads, creates, and modifies records directly in your databases.",noteEs:"MCP nativo con Notion: lee, crea y modifica registros directamente en tus bases de datos."}, chatgpt:{score:2,noteEn:"Limited Notion integration at individual plan.",noteEs:"Integración limitada con Notion en el plan individual."}, chatgptFree:{score:1,noteEn:"No MCP connectors.",noteEs:"Sin conectores MCP."}, notebooklm:{score:2,noteEn:"Can use Notion pages as sources — doesn't act on them.",noteEs:"Puede usar páginas de Notion como fuentes — no actúa sobre ellas."} } },
    { nameEn:"Autonomous task execution", nameEs:"Ejecución autónoma de tareas",
      winnerType:"bestIntegration", winner:"claude", evidence:"feature",
      generalVerdictEn:"Cowork in Claude Pro enables autonomous multi-step task execution with local folder access.",
      generalVerdictEs:"Cowork en Claude Pro permite la ejecución autónoma de tareas multi-paso con acceso a carpetas locales.",
      analystNoteEn:"Currently the closest thing to a personal AI operator for knowledge work at $20/mo.",
      analystNoteEs:"Actualmente, lo más parecido a un operador de IA personal para knowledge work a $20/mes.",
      ratings:{ claude:{score:5,noteEn:"Cowork delegates multi-step tasks with direct local folder access.",noteEs:"Cowork delega tareas multi-paso con acceso directo a carpetas locales."}, chatgpt:{score:3,noteEn:"Agent mode exists. Less local-file integration at individual tier.",noteEs:"El modo agente existe. Menos integración de archivos locales en el nivel individual."}, chatgptFree:{score:1,noteEn:"No meaningful agent capabilities.",noteEs:"Sin capacidades de agente significativas."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"Debugging code", nameEs:"Depuración de código",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Both Claude Pro and ChatGPT Plus perform at a high level. Claude edges ahead when project-level code context is available across turns.",
      generalVerdictEs:"Claude Pro y ChatGPT Plus rinden a un alto nivel. Claude supera ligeramente cuando hay contexto de código a nivel de proyecto disponible entre turnos.",
      analystNoteEn:"For multi-session vibe-coding, persistent project context means accumulated understanding of your codebase.",
      analystNoteEs:"Para vibe-coding de múltiples sesiones, el contexto persistente del proyecto significa comprensión acumulada de tu base de código.",
      ratings:{ claude:{score:5,noteEn:"Strong reasoning and explanation depth. Benefits significantly from project-level code context.",noteEs:"Razonamiento sólido y profundidad de explicación. Se beneficia significativamente del contexto de código a nivel de proyecto."}, chatgpt:{score:5,noteEn:"Extended thinking mode is excellent for complex debugging. Comparable quality.",noteEs:"El modo de razonamiento extendido es excelente para depuración compleja. Calidad comparable."}, chatgptFree:{score:4,noteEn:"Sufficient for most standard debugging tasks.",noteEs:"Suficiente para la mayoría de tareas estándar de depuración."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
  ]},
  { categoryEn:"Documents & Organisation", categoryEs:"Documentos & Organización", emoji:"📁", tasks:[
    { nameEn:"Generate structured documents (Excel, Word)", nameEs:"Generar documentos estructurados (Excel, Word)",
      winnerType:"bestIntegration", winner:"claude", evidence:"feature",
      generalVerdictEn:"Claude Pro includes Claude in Excel and expanding document creation features that produce actual downloadable files.",
      generalVerdictEs:"Claude Pro incluye Claude en Excel y funciones de creación de documentos en expansión que producen archivos descargables reales.",
      analystNoteEn:"Verified: Claude in Excel is included in Pro. PowerPoint is in research preview for Max plans — confirm current pricing before relying on PPT.",
      analystNoteEs:"Verificado: Claude en Excel está incluido en Pro. PowerPoint está en vista previa de investigación para planes Max — confirma el precio actual antes de depender de PPT.",
      ratings:{ claude:{score:4,noteEn:"Claude in Excel in Pro. Word generation generally available.",noteEs:"Claude en Excel en Pro. Generación de Word disponible en general."}, chatgpt:{score:3,noteEn:"Canvas editor for live document editing. Less focused on downloadable files.",noteEs:"Editor Canvas para edición de documentos en vivo. Menos enfocado en archivos descargables."}, chatgptFree:{score:2,noteEn:"Text output only in most cases.",noteEs:"Solo output de texto en la mayoría de los casos."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"Local folder & file organisation", nameEs:"Organización de carpetas y archivos locales",
      winnerType:"bestIntegration", winner:"claude", evidence:"feature",
      generalVerdictEn:"Cowork in Claude Pro provides direct local file system access — read, write, reorganise.",
      generalVerdictEs:"Cowork en Claude Pro proporciona acceso directo al sistema de archivos local — leer, escribir, reorganizar.",
      analystNoteEn:"Delegate folder cleanup, file renaming, and document organisation tasks. Meaningful time-saver once set up.",
      analystNoteEs:"Delega la limpieza de carpetas, el renombrado de archivos y las tareas de organización de documentos. Un ahorro de tiempo real una vez configurado.",
      ratings:{ claude:{score:5,noteEn:"Cowork reads and writes local folders. Genuinely autonomous file management.",noteEs:"Cowork lee y escribe carpetas locales. Gestión de archivos genuinamente autónoma."}, chatgpt:{score:2,noteEn:"No direct local file system access at individual plan level.",noteEs:"Sin acceso directo al sistema de archivos local en el nivel de plan individual."}, chatgptFree:{score:1,noteEn:"No local access.",noteEs:"Sin acceso local."}, notebooklm:{score:1,noteEn:"Not applicable.",noteEs:"No aplica."} } },
    { nameEn:"CRM & Notion database management", nameEs:"Gestión de CRM y bases de datos en Notion",
      winnerType:"bestIntegration", winner:"claude", evidence:"observed",
      generalVerdictEn:"Claude Pro is the strongest individual-tier option for direct Notion CRM read/write workflows.",
      generalVerdictEs:"Claude Pro es la opción individual más potente para flujos de lectura/escritura directa en CRM de Notion.",
      analystNoteEn:"With a multi-database CRM in Notion, Claude can create, update, and query records directly — eliminating manual copy-paste.",
      analystNoteEs:"Con un CRM de múltiples bases de datos en Notion, Claude puede crear, actualizar y consultar registros directamente — eliminando el copiar y pegar manual.",
      ratings:{ claude:{score:5,noteEn:"MCP Notion: reads, creates, and modifies records directly.",noteEs:"MCP Notion: lee, crea y modifica registros directamente."}, chatgpt:{score:2,noteEn:"Limited Notion integration at individual plan.",noteEs:"Integración limitada con Notion en el plan individual."}, chatgptFree:{score:1,noteEn:"No MCP.",noteEs:"Sin MCP."}, notebooklm:{score:2,noteEn:"Can use Notion pages as sources — doesn't act on them.",noteEs:"Puede usar páginas de Notion como fuentes — no actúa sobre ellas."} } },
  ]},
  { categoryEn:"Career & Portfolio", categoryEs:"Carrera & Portfolio", emoji:"🎯", tasks:[
    { nameEn:"Interview prep & role-play", nameEs:"Preparación de entrevistas y simulacros",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Persistent project context lets Claude simulate interviews with your actual background, target roles, and likely objections.",
      generalVerdictEs:"El contexto persistente del proyecto permite a Claude simular entrevistas con tu background real, los roles objetivo y las objeciones probables.",
      analystNoteEn:"Load your CV, a target JD, and career context. The quality difference versus a cold conversation is significant and immediately noticeable.",
      analystNoteEs:"Carga tu CV, una descripción de trabajo objetivo y el contexto de carrera. La diferencia de calidad frente a una conversación en frío es significativa e inmediatamente perceptible.",
      ratings:{ claude:{score:5,noteEn:"With career project loaded, role-play is highly specific and directly useful.",noteEs:"Con el proyecto de carrera cargado, el simulacro es muy específico y directamente útil."}, chatgpt:{score:4,noteEn:"Custom GPTs for interview practice can be strong. Less personalised without prior context.",noteEs:"Los GPTs personalizados para práctica de entrevistas pueden ser potentes. Menos personalizado sin contexto previo."}, chatgptFree:{score:3,noteEn:"Works for generic practice. No persistent context.",noteEs:"Funciona para práctica genérica. Sin contexto persistente."}, notebooklm:{score:3,noteEn:"Useful if you load JDs and your CV as sources — good for Q&A prep.",noteEs:"Útil si cargas descripciones de trabajo y tu CV como fuentes — bueno para preparar preguntas y respuestas."} } },
    { nameEn:"Career strategy & decisions", nameEs:"Estrategia de carrera y decisiones",
      winnerType:"bestContext", winner:"claude", evidence:"observed",
      generalVerdictEn:"Personalised career advice requires knowing the person. Claude Pro with loaded context outperforms any cold conversation on this type of reasoning.",
      generalVerdictEs:"El asesoramiento de carrera personalizado requiere conocer a la persona. Claude Pro con contexto cargado supera a cualquier conversación en frío en este tipo de razonamiento.",
      analystNoteEn:"Advice that reflects your actual roadmap, timeline, and constraints beats generic frameworks.",
      analystNoteEs:"El asesoramiento que refleja tu roadmap real, tu timeline y tus restricciones supera a los frameworks genéricos.",
      ratings:{ claude:{score:4,noteEn:"Knows your roadmap and constraints when project is loaded. Genuinely personalised.",noteEs:"Conoce tu roadmap y tus restricciones cuando el proyecto está cargado. Genuinamente personalizado."}, chatgpt:{score:3,noteEn:"Generic without prior context. Custom GPTs with your career info can improve this.",noteEs:"Genérico sin contexto previo. Los GPTs personalizados con tu info de carrera pueden mejorar esto."}, chatgptFree:{score:2,noteEn:"No persistence between sessions.",noteEs:"Sin persistencia entre sesiones."}, notebooklm:{score:2,noteEn:"Only if you load your career documents as sources.",noteEs:"Solo si cargas tus documentos de carrera como fuentes."} } },
    { nameEn:"LinkedIn & portfolio optimisation", nameEs:"Optimización de LinkedIn y portfolio",
      winnerType:"bestPolish", winner:"claude", evidence:"observed",
      generalVerdictEn:"Voice-consistent editing across your professional presence requires a tool that knows how you write.",
      generalVerdictEs:"La edición consistente en voz en toda tu presencia profesional requiere una herramienta que sepa cómo escribes.",
      analystNoteEn:"Claude Pro edits profile sections without genericising your voice. ChatGPT Plus Deep Research is separately useful for benchmarking against target roles.",
      analystNoteEs:"Claude Pro edita secciones del perfil sin genericizar tu voz. Deep Research de ChatGPT Plus es útil por separado para comparar con los roles objetivo.",
      ratings:{ claude:{score:4,noteEn:"Knows your voice and positioning when project is loaded.",noteEs:"Conoce tu voz y posicionamiento cuando el proyecto está cargado."}, chatgpt:{score:4,noteEn:"Deep Research useful for competitive benchmarking. Less voice-consistent without loaded context.",noteEs:"Deep Research útil para benchmarking competitivo. Menos consistente en voz sin contexto cargado."}, chatgptFree:{score:3,noteEn:"Works for copy editing. Generic without prior context.",noteEs:"Funciona para edición de texto. Genérico sin contexto previo."}, notebooklm:{score:2,noteEn:"Useful only if you load your current profiles as sources.",noteEs:"Útil solo si cargas tus perfiles actuales como fuentes."} } },
  ]},
];

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} className={`w-3 md:w-4 h-1 rounded-full ${i <= score ? "bg-slate-900" : "bg-slate-200"}`} />
      ))}
      <span className="text-xs text-slate-400 ml-1">{score}/5</span>
    </div>
  );
}

export default function AIToolsPage() {
  const [lang, setLang] = useState<"en"|"es">(() => {
    const p = new URLSearchParams(window.location.search).get("lang");
    return p === "es" ? "es" : "en";
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.toString());
  }, [lang]);

  const t = T[lang];
  const [filterWinner, setFilterWinner]       = useState("all");
  const [filterCategory, setFilterCategory]   = useState("all");
  const [expanded, setExpanded]               = useState<Record<string,boolean>>({});
  const [showCriteria, setShowCriteria]       = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [viewMode, setViewMode]               = useState<"analyst"|"general">("analyst");

  const toggle = (k: string) => setExpanded(e => ({ ...e, [k]: !e[k] }));

  const filtered = TASKS
    .map(cat => ({
      ...cat,
      tasks: cat.tasks.filter(task => filterWinner === "all" || task.winner === filterWinner)
    }))
    .filter(cat => {
      const catName = lang==="es" ? cat.categoryEs : cat.categoryEn;
      return (filterCategory==="all" || catName===filterCategory) && cat.tasks.length > 0;
    });

  const totalTasks = TASKS.reduce((a,c) => a + c.tasks.length, 0);
  const backHref = lang==="es" ? "/?lang=es#work" : "/#work";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans">

      {/* Nav */}
      <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 md:py-4">
        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
          <a href={backHref} className="flex flex-col group">
            <span className="font-serif text-base md:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors flex items-center gap-1.5">
              Juan M. Garcia <BadgeCheck size={15} className="text-blue-900" />
            </span>
            <span className="text-[9px] font-medium tracking-[0.2em] text-slate-500 uppercase">{t.role}</span>
          </a>
          <div className="flex items-center gap-2 md:gap-5">
            <button
              onClick={() => setLang(l => l==="en" ? "es" : "en")}
              className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-blue-900 transition-colors border border-slate-200 hover:border-blue-900 px-2 py-1.5 rounded-sm"
            >
              <Globe size={11} /> {t.langSwitch}
            </button>
            <a href={backHref} className="hidden sm:flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-blue-900 transition-colors">
              <ArrowLeft size={13} /> {t.backToPortfolio}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-12 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-5xl">
          <div className="inline-block border-b border-slate-900 pb-1 mb-5 md:mb-8">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
              {t.label} · {lang==="es" ? LAST_UPDATED_ES : LAST_UPDATED_EN}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-tight text-slate-900 mb-4 md:mb-6">
            {t.h1a}<br/><span className="italic text-slate-500">{t.h1b}</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-2xl mb-7 md:mb-10 font-light">
            {t.subtitle}
          </p>

          {/* Insights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 mb-5 md:mb-8">
            {t.insights.map(ins => (
              <div key={ins.label} className="bg-white p-3 md:p-6">
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{ins.label}</div>
                <div className="font-serif text-base md:text-xl font-bold text-slate-900 leading-tight mb-0.5">{ins.value}</div>
                <div className="text-[9px] md:text-xs text-slate-400 font-light">{ins.sub}</div>
              </div>
            ))}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 md:gap-6 text-xs text-slate-400 font-light">
            <span><span className="font-bold text-slate-600">{totalTasks}</span> {t.tasksCount}</span>
            <span><span className="font-bold text-slate-600">6</span> {t.categoriesCount}</span>
            <span><span className="font-bold text-slate-600">4</span> {t.toolsCount}</span>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {(["feature","workflow","observed"] as EvidenceKey[]).map(k => (
                <span key={k} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${EVIDENCE_STYLE[k].bg} border ${EVIDENCE_STYLE[k].border}`}/>
                  <span className={`${EVIDENCE_STYLE[k].color} text-[9px] md:text-[10px]`}>{t.evidence[k]}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-12 max-w-5xl py-7 md:py-12">

        {/* Collapsibles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7 md:mb-10">
          {[
            { label: t.methodology,     show: showMethodology, toggle: () => setShowMethodology(s=>!s), content: t.methodologyItems },
            { label: t.scoringCriteria, show: showCriteria,    toggle: () => setShowCriteria(s=>!s),    content: t.scoringItems.map(c => ({ label: c.label, value: c.desc })) },
          ].map(sec => (
            <div key={sec.label} className="border border-slate-200 bg-white">
              <button onClick={sec.toggle} className="w-full flex items-center justify-between px-4 md:px-6 py-3 md:py-4 text-left hover:bg-[#FAFAFA] transition-colors">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-600">{sec.label}</span>
                {sec.show ? <ChevronUp size={13} className="text-slate-400"/> : <ChevronDown size={13} className="text-slate-400"/>}
              </button>
              {sec.show && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  {sec.content.map(item => (
                    <div key={item.label}>
                      <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.label}</div>
                      <div className="text-xs text-slate-500 font-light leading-relaxed">{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8">
          {/* Row 1: view toggle */}
          <div className="flex border border-slate-200 bg-white overflow-hidden self-start">
            {([{id:"analyst" as const, label:t.analystNotes},{id:"general" as const, label:t.generalVerdict}]).map(v => (
              <button key={v.id} onClick={() => setViewMode(v.id)}
                className={`px-3 md:px-4 py-2 text-[9px] md:text-xs font-bold uppercase tracking-widest transition-colors ${viewMode===v.id?"bg-slate-900 text-white":"text-slate-500 hover:text-slate-900"}`}>
                {v.label}
              </button>
            ))}
          </div>
          {/* Row 2: winner + category filters */}
          <div className="flex flex-wrap gap-1.5">
            {[{id:"all",label:t.allTools}, ...TOOL_KEYS.map(k => ({id:k,label:TOOLS[k].short}))].map(opt => (
              <button key={opt.id} onClick={() => setFilterWinner(opt.id)}
                className={`px-2.5 py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest border transition-colors ${filterWinner===opt.id?"bg-slate-900 text-white border-slate-900":"bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>
                {opt.label}
              </button>
            ))}
            <div className="w-px h-auto bg-slate-200 mx-0.5" />
            {[{id:"all",label:t.allAreas}, ...TASKS.map(c => ({id:lang==="es"?c.categoryEs:c.categoryEn, label:`${c.emoji} ${(lang==="es"?c.categoryEs:c.categoryEn).split(" ")[0]}`}))].map(opt => (
              <button key={opt.id} onClick={() => setFilterCategory(opt.id)}
                className={`px-2.5 py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-widest border transition-colors ${filterCategory===opt.id?"bg-blue-900 text-white border-blue-900":"bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-7 md:space-y-10">
          {filtered.map(cat => {
            const catName = lang==="es" ? cat.categoryEs : cat.categoryEn;
            return (
              <div key={catName}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">{cat.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{catName}</span>
                  <div className="flex-1 h-px bg-slate-200"/>
                </div>
                <div className="space-y-2">
                  {cat.tasks.map(task => {
                    const taskName = lang==="es" ? task.nameEs : task.nameEn;
                    const key = catName + taskName;
                    const isOpen = expanded[key];
                    const ev = EVIDENCE_STYLE[task.evidence];
                    return (
                      <div key={taskName} className={`border transition-colors ${isOpen?"border-slate-300 bg-white shadow-sm":"border-slate-200 bg-white hover:border-slate-300"}`}>
                        <button onClick={() => toggle(key)} className="w-full text-left px-3 md:px-6 py-3 md:py-5 flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-serif text-sm md:text-lg text-slate-900 mb-1.5">{taskName}</div>
                            <div className="flex flex-wrap items-center gap-1 md:gap-2">
                              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200 px-1.5 py-0.5">{t.winnerTypes[task.winnerType]}</span>
                              <span className="text-[9px] md:text-xs font-bold text-slate-900">→ {TOOLS[task.winner].name}</span>
                              <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 border ${ev.color} ${ev.bg} ${ev.border}`}>{t.evidence[task.evidence]}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 md:gap-5 flex-shrink-0 mt-0.5">
                            {TOOL_KEYS.map(k => (
                              <div key={k} className="text-center min-w-[18px]">
                                <div className="text-[7px] md:text-[9px] text-slate-400 uppercase mb-0.5">{TOOLS[k].short.slice(0,4)}</div>
                                <div className={`text-xs md:text-sm font-bold ${task.ratings[k].score>=4?"text-slate-900":"text-slate-300"}`}>{task.ratings[k].score}</div>
                              </div>
                            ))}
                            <div className="text-slate-400 ml-1">{isOpen?<ChevronUp size={13}/>:<ChevronDown size={13}/>}</div>
                          </div>
                        </button>
                        {isOpen && (
                          <div className="border-t border-slate-100 px-3 md:px-6 py-4 md:py-6">
                            <div className={`mb-4 p-3 md:p-4 border-l-2 ${viewMode==="analyst"?"border-blue-900 bg-blue-50/50":"border-slate-300 bg-[#FAFAFA]"}`}>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mr-2">
                                {viewMode==="analyst" ? t.analystNote : t.generalVerdict}
                              </span>
                              <span className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                                {viewMode==="analyst"
                                  ? (lang==="es" ? task.analystNoteEs : task.analystNoteEn)
                                  : (lang==="es" ? task.generalVerdictEs : task.generalVerdictEn)}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                              {TOOL_KEYS.map(k => {
                                const r = task.ratings[k];
                                return (
                                  <div key={k} className={`p-3 md:p-4 border border-slate-100 ${r.score<=1?"opacity-30":""}`}>
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-wide">{TOOLS[k].name}</span>
                                      <span className="text-[9px] text-slate-400">{TOOLS[k].price}</span>
                                    </div>
                                    <ScoreDots score={r.score}/>
                                    <p className="text-[10px] md:text-xs text-slate-500 font-light leading-relaxed mt-1.5">
                                      {lang==="es" ? r.noteEs : r.noteEn}
                                    </p>
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
            );
          })}
          {filtered.length===0 && (
            <div className="text-center text-slate-400 py-12 font-light">{t.noResults}</div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-10 md:mt-16 border border-slate-200 bg-white p-5 md:p-12">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5 md:mb-8">{t.summaryTitle}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 mb-5 md:mb-8">
            {([
              {tool:"claude" as ToolKey, roleIdx:0},
              {tool:"chatgptFree" as ToolKey, roleIdx:1},
              {tool:"notebooklm" as ToolKey, roleIdx:2},
              {tool:"chatgpt" as ToolKey, roleIdx:3},
            ]).map(item => (
              <div key={item.tool} className="bg-white p-4 md:p-6">
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">{t.summaryRoles[item.roleIdx]}</div>
                <div className="font-serif text-base md:text-xl text-slate-900 mb-2">{TOOLS[item.tool].name}</div>
                <div className="text-xs text-slate-500 font-light leading-relaxed">{t.summaryTasks[item.roleIdx]}</div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFA] border border-slate-100 p-4 md:p-6">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-widest">{t.bottomLine} </span>
            <span className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">{t.bottomLineText}</span>
          </div>
          <div className="mt-3 text-[9px] md:text-xs text-slate-300 text-right">{t.disclaimer} · {lang==="es"?LAST_UPDATED_ES:LAST_UPDATED_EN}</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-5 md:py-8 mt-4">
        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
          <span className="font-serif text-base md:text-lg">Juan M. Garcia</span>
          <a href={backHref} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft size={11}/> {t.footer}
          </a>
        </div>
      </footer>
    </div>
  );
}
