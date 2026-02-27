import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BarChart3, Menu, X, ChevronRight, ChevronLeft, ArrowUpRight,
  Briefcase, CheckCircle2, Download, FileText, Layers, Code2,
  Linkedin, Mail, Database, TrendingUp, Lightbulb, MapPin,
  Sparkles, BadgeCheck, Maximize2, Send, Clock, Globe
} from "lucide-react";
import { Project } from "./types";

// ============================================================
// DATA
// ============================================================
const content = {
  en: {
    nav: { work: "Projects", trajectory: "Experience", contact: "Contact", role: "BI Analyst" },
    hero: {
      available: "Available for Hire",
      titleStart: "Transforming",
      titleHighlight: "Data",
      titleEnd: "into Strategic Insights.",
      desc: "Bilingual (EN/ES) Business Intelligence Analyst. I build Power BI solutions and SQL models that help companies measure performance and optimize profitability.",
      btnWork: "View Projects", btnResume: "Resume",
      stack: "SQL & Power BI", focus: "Data Strategy", location: "Miami, FL"
    },
    metrics: {
      title: "By the Numbers", subtitle: "Measurable impact from day one.",
      items: [
        { value: 80, suffix: "%",    label: "Reduction in report generation time through automation" },
        { value: 25, suffix: "%",    label: "Increase in data accuracy by eliminating manual errors" },
        { value: 3,  suffix: "+",    label: "Production dashboards deployed and actively used" },
        { value: 2,  suffix: " yrs", label: "STEM OPT authorization remaining (valid through 2027)" }
      ]
    },
    expertise: {
      title: "Technical Focus",
      subtitle: "My core skillset: bridging the gap between raw data and business decisions.",
      cards: [
        { title: "Data Modeling & SQL",    desc: "Cleaning and structuring data using SQL (CTEs, Views). Connecting ERP systems (Sage) to central repositories for accurate reporting.", tags: ["SQL Server","Data Cleaning","Data Modeling","Azure"] },
        { title: "Power BI Development",   desc: "Designing intuitive dashboards. Using DAX for complex calculations and ensuring reports are automated and easy to read.", tags: ["Power BI","DAX","Dashboard Design","Automation"] },
        { title: "Business Analysis",      desc: "Understanding what the business needs to measure. Defining KPIs for profitability, sales forecasting, and margin tracking.", tags: ["KPI Definition","Sales Analysis","Forecasting","Reporting"] }
      ]
    },
    work: { title: "Relevant Projects", subtitle: "Practical applications of BI tools to solve real business problems.", viewReport: "View Details", readAnalysis: "Read Case" },
    experience: {
      title: "Work Experience", subtitle: "My professional background in IT and Business Intelligence.",
      download: "Download Resume", educationTitle: "Education",
      education: [
        { title: "Specialist in Artificial Intelligence", school: "Racks Academy, Spain (2025)", desc: "Focus: AI for Business Applications" },
        { title: "B.S Computer Info Systems & Comp Sci",  school: "Missouri Valley College (2024)", desc: "Minor: Business Admin | GPA: 3.3" }
      ],
      certificationsTitle: "Certifications",
      certs: [{ name: "SQL (Coursera)", status: "Completed" },{ name: "PL-300", status: "In Progress" },{ name: "BIDA CFI", status: "In Progress" }]
    },
    contactSection: {
      title: "Let's Work Together",
      subtitle: "Open to full-time BI Analyst roles, contract projects, and freelance engagements in Miami or remote.",
      emailLabel: "Send me an email", linkedinLabel: "Connect on LinkedIn",
      availability: "Currently available", responseTime: "Typically responds within 24h", timezone: "Miami, FL (EST)"
    },
    footer: { tagline: "Making data intuitive and profitable.", built: "Built with React & TailwindCSS" },
    modal: { placeholder: "Project Preview", upload: "Visuals coming soon", problem: "The Challenge", execution: "What I Did", outcomes: "Results", tech: "Tools Used" },
    projects: [
      { id:1, category:"DASHBOARDING & AUTOMATION", title:"Sales & Profitability Dashboard", client:"AMG Global Distribution", metrics:"Real-time Forecasting",
        impactBadges:["Automated Reporting","Margin Analysis","SQL Integration"], tags:["Power BI","SQL Server","Sage ERP","DAX"],
        gallery:["/images/dashboard-main.png","/images/regional-map.png","/images/product-analysis.png","/images/customer-trends.png","/images/alerts.png","/images/data-model.png"],
        shortDesc:"Development of a central Power BI dashboard connecting directly to SQL to track domestic vs. international sales in real-time.",
        challenge:"The company relied on manual Excel reports, causing delays. There was no clear visibility into SKU-level profitability or consolidated international sales data.",
        solution:"I connected the Sage ERP to a SQL database to normalize the data, then built a Power BI dashboard with automated refresh. I implemented DAX measures to calculate real margins per SKU.",
        results:["Enabled real-time forecasting for domestic vs. international segments.","Improved data accuracy by 25%+ by removing manual entry errors.","Reduced report generation time by 80% through automation."],
        stack:["SQL Server","Power BI","DAX","Excel"] },
      { id:2, category:"DATA GOVERNANCE", title:"BI Usage Tracking System", client:"Internal Initiative", metrics:"Adoption Metrics",
        impactBadges:["Usage Analysis","Report Optimization","KQL"], tags:["KQL","Azure Logs","Power BI Service"],
        gallery:["/images/engagement-KQL.png","/images/adopcion-KQL.png","/images/code-KQL.png"],
        shortDesc:"Created a tracking system using KQL to measure how often reports were being used by the management team.",
        challenge:"We didn't know which reports were actually useful. It was hard to justify spending time on reports without knowing if they were being adopted.",
        solution:"I wrote KQL (Kusto Query Language) scripts to analyze Power BI Activity Logs. This allowed us to see who was viewing which report and how frequently.",
        results:["Measured report engagement across different departments.","Identified underutilized reports to stop maintaining them.","Provided data to management to support BI adoption strategies."],
        stack:["KQL","Azure Log Analytics","Power BI Service"] },
      { id:3, category:"PROCESS DOCUMENTATION", title:"Operations & Request Log", client:"Workflow Optimization", metrics:"Workflow Efficiency",
        impactBadges:["Task Tracking","SOPs","Agile Basics"], tags:["Notion","Process","Documentation"],
        gallery:["/images/track-requests.png"],
        shortDesc:"Set up a structured system to track data requests and document standard operating procedures (SOPs).",
        challenge:"Ad-hoc requests were disorganized, making it hard to prioritize work or show the value of the BI function to leadership.",
        solution:"Implemented a simple Kanban-style intake process in Notion. I categorized tasks by 'Strategic' vs 'Maintenance' to visualize my workload.",
        results:["Created a clear history of completed data requests.","Helped justify time allocation for strategic projects.","Built a knowledge base of SOPs for future reference."],
        stack:["Notion","SOP Writing","Task Management"] }
    ],
    experienceList: [
      { role:"Business & BI Analyst", company:"AMG Global Distribution", location:"Miami, FL", period:"Sep 2024 - Present", desc:"Leading the development of Power BI Dashboards and connecting SQL to ERP systems. Automated SKU-level profitability tracking (25% accuracy increase). Integrated international and domestic sales data for executive reporting." },
      { role:"IT Assistant & SQL Report Writer (Intern)", company:"Missouri Valley College", location:"Missouri, MO", period:"Jan 2024 - May 2024", desc:"Developed SQL-based reports for the Argos BI system. Improved data accuracy by 15% and optimized IT documentation, reducing troubleshooting time for users." }
    ]
  },
  es: {
    nav: { work:"Proyectos", trajectory:"Experiencia", contact:"Contacto", role:"Analista de BI" },
    hero: {
      available: "Disponible para contratar",
      titleStart: "Transformando", titleHighlight: "Datos", titleEnd: "en Estrategias Rentables.",
      desc: "Analista de Business Intelligence bilingüe (EN/ES). Construyo soluciones en Power BI y modelos SQL que ayudan a las empresas a medir su rendimiento y optimizar la rentabilidad.",
      btnWork:"Ver Proyectos", btnResume:"Currículum",
      stack:"SQL y Power BI", focus:"Estrategia de Datos", location:"Miami, FL"
    },
    metrics: {
      title:"En Números", subtitle:"Impacto medible desde el primer día.",
      items:[
        { value:80, suffix:"%",      label:"Reducción en el tiempo de generación de reportes mediante automatización" },
        { value:25, suffix:"%",      label:"Aumento en la precisión de datos al eliminar errores manuales" },
        { value:3,  suffix:"+",      label:"Dashboards en producción activamente utilizados" },
        { value:2,  suffix:" años",  label:"Autorización STEM OPT restante (válida hasta 2027)" }
      ]
    },
    expertise: {
      title:"Enfoque Técnico", subtitle:"Mi habilidad principal: cerrar la brecha entre datos brutos y decisiones de negocio.",
      cards:[
        { title:"Modelado de Datos y SQL",   desc:"Limpieza y estructuración de datos usando SQL (CTEs, Vistas). Conexión de sistemas ERP (Sage) a repositorios centrales para reportes precisos.", tags:["SQL Server","Limpieza de Datos","Modelado de Datos","Azure"] },
        { title:"Desarrollo en Power BI",    desc:"Diseño de dashboards intuitivos. Uso de DAX para cálculos complejos y aseguramiento de reportes automatizados y fáciles de leer.", tags:["Power BI","DAX","Diseño de Dashboards","Automatización"] },
        { title:"Análisis de Negocio",       desc:"Entender qué necesita medir el negocio. Definición de KPIs para rentabilidad, previsión de ventas y seguimiento de márgenes.", tags:["Definición de KPIs","Análisis de Ventas","Forecasting","Reportes"] }
      ]
    },
    work:{ title:"Proyectos Relevantes", subtitle:"Aplicaciones prácticas de herramientas de BI para resolver problemas reales de negocio.", viewReport:"Ver Detalles", readAnalysis:"Leer Caso" },
    experience:{
      title:"Experiencia Laboral", subtitle:"Mi trayectoria profesional en IT y Business Intelligence.",
      download:"Descargar CV", educationTitle:"Educación",
      education:[
        { title:"Especialista en Inteligencia Artificial", school:"Racks Academy, España (2025)", desc:"Enfoque: IA para Aplicaciones de Negocio" },
        { title:"Grado en Sistemas de Info. y Ciencias de la Comp.", school:"Missouri Valley College (2024)", desc:"Minor: Administración de Empresas | GPA: 3.3" }
      ],
      certificationsTitle:"Certificaciones",
      certs:[{ name:"SQL (Coursera)", status:"Completado" },{ name:"PL-300", status:"En Progreso" },{ name:"BIDA CFI", status:"En Progreso" }]
    },
    contactSection:{
      title:"Trabajemos Juntos",
      subtitle:"Abierto a posiciones full-time de Analista BI, proyectos por contrato y freelance en Miami o remoto.",
      emailLabel:"Envíame un email", linkedinLabel:"Conecta en LinkedIn",
      availability:"Actualmente disponible", responseTime:"Responde en menos de 24h", timezone:"Miami, FL (EST)"
    },
    footer:{ tagline:"Haciendo los datos intuitivos y rentables.", built:"Creado con React y TailwindCSS" },
    modal:{ placeholder:"Vista Previa del Proyecto", upload:"Visuales próximamente", problem:"El Desafío", execution:"Lo que hice", outcomes:"Resultados", tech:"Herramientas" },
    projects:[
      { id:1, category:"DASHBOARDING Y AUTOMATIZACIÓN", title:"Dashboard de Ventas y Rentabilidad", client:"AMG Global Distribution", metrics:"Forecasting en Tiempo Real",
        impactBadges:["Reportes Automatizados","Análisis de Margen","Integración SQL"], tags:["Power BI","SQL Server","Sage ERP","DAX"],
        gallery:["/images/dashboard-main.png","/images/regional-map.png","/images/product-analysis.png","/images/customer-trends.png","/images/alerts.png","/images/data-model.png"],
        shortDesc:"Desarrollo de un dashboard central en Power BI conectado directamente a SQL para rastrear ventas domésticas vs internacionales en tiempo real.",
        challenge:"La empresa dependía de reportes manuales en Excel, causando retrasos. No había visibilidad clara sobre la rentabilidad a nivel de SKU ni datos consolidados de ventas internacionales.",
        solution:"Conecté el ERP Sage a una base de datos SQL para normalizar los datos, luego construí un dashboard en Power BI con actualización automática. Implementé medidas DAX para calcular márgenes reales por SKU.",
        results:["Habilitó forecasting en tiempo real para segmentos domésticos e internacionales.","Mejoró la precisión de los datos en más del 25% al eliminar errores manuales.","Redujo el tiempo de generación de reportes en un 80% mediante automatización."],
        stack:["SQL Server","Power BI","DAX","Excel"] },
      { id:2, category:"GOBERNANZA DE DATOS", title:"Sistema de Rastreo de Uso de BI", client:"Iniciativa Interna", metrics:"Métricas de Adopción",
        impactBadges:["Análisis de Uso","Optimización de Reportes","KQL"], tags:["KQL","Azure Logs","Power BI Service"],
        gallery:["/images/engagement-KQL.png","/images/adopcion-KQL.png","/images/code-KQL.png"],
        shortDesc:"Creación de un sistema de seguimiento usando KQL para medir con qué frecuencia el equipo directivo utilizaba los reportes.",
        challenge:"No sabíamos qué reportes eran realmente útiles. Era difícil justificar el tiempo dedicado a reportes sin saber si estaban siendo adoptados.",
        solution:"Escribí scripts en KQL (Kusto Query Language) para analizar los Logs de Actividad de Power BI. Esto nos permitió ver quién veía qué reporte y con qué frecuencia.",
        results:["Midió el compromiso con los reportes en diferentes departamentos.","Identificó reportes subutilizados para dejar de mantenerlos.","Proporcionó datos a la gerencia para apoyar estrategias de adopción de BI."],
        stack:["KQL","Azure Log Analytics","Power BI Service"] },
      { id:3, category:"DOCUMENTACIÓN DE PROCESOS", title:"Log de Operaciones y Solicitudes", client:"Optimización de Flujo de Trabajo", metrics:"Eficiencia de Flujo",
        impactBadges:["Seguimiento de Tareas","SOPs","Conceptos Agile"], tags:["Notion","Procesos","Documentación"],
        gallery:["/images/track-requests.png"],
        shortDesc:"Implementación de un sistema estructurado para rastrear solicitudes de datos y documentar procedimientos operativos estándar (SOPs).",
        challenge:"Las solicitudes ad-hoc estaban desorganizadas, dificultando priorizar el trabajo o mostrar el valor de la función de BI al liderazgo.",
        solution:"Implementé un proceso de entrada simple tipo Kanban en Notion. Categoricé las tareas por 'Estratégicas' vs 'Mantenimiento' para visualizar mi carga de trabajo.",
        results:["Creó un historial claro de solicitudes de datos completadas.","Ayudó a justificar la asignación de tiempo para proyectos estratégicos.","Construyó una base de conocimiento de SOPs para referencia futura."],
        stack:["Notion","Escritura de SOPs","Gestión de Tareas"] }
    ],
    experienceList:[
      { role:"Analista de Negocio y BI", company:"AMG Global Distribution", location:"Miami, FL", period:"Sep 2024 - Actualidad", desc:"Liderando el desarrollo de Dashboards en Power BI y conectando SQL a sistemas ERP. Automaticé el seguimiento de rentabilidad a nivel de SKU (aumento de precisión del 25%). Integré datos de ventas internacionales y domésticas para reportes ejecutivos." },
      { role:"Asistente de IT y Escritor de Reportes SQL (Pasante)", company:"Missouri Valley College", location:"Missouri, MO", period:"Ene 2024 - May 2024", desc:"Desarrollé reportes basados en SQL para el sistema Argos BI. Mejoré la precisión de los datos en un 15% y optimicé la documentación de IT, reduciendo el tiempo de resolución de problemas para los usuarios." }
    ]
  }
};

// ============================================================
// HOOKS
// ============================================================
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    const hover  = () => { dotRef.current?.classList.add("hovering");    ringRef.current?.classList.add("hovering"); };
    const unhover= () => { dotRef.current?.classList.remove("hovering"); ringRef.current?.classList.remove("hovering"); };
    const down   = () => dotRef.current?.classList.add("clicking");
    const up     = () => dotRef.current?.classList.remove("clicking");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup",   up);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", unhover);
    });
    raf.current = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup",   up);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

// ============================================================
// SCROLL PROGRESS
// ============================================================
const ScrollProgress: React.FC = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setW((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${w}%` }} />;
};

// ============================================================
// HERO TITLE — word by word reveal
// ============================================================
const HeroTitle: React.FC<{ s: string; h: string; e: string }> = ({ s, h, e }) => {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 150); return () => clearTimeout(t); }, []);
  const w1 = s.split(" "); const w3 = e.split(" ");
  return (
    <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-slate-900 mb-8">
      {w1.map((w, i) => (
        <span key={i} className={`hero-word${on ? " revealed" : ""}`}
          style={{ transitionDelay:`${i*80}ms`, marginRight:"0.25em" }}>
          <span>{w}</span>
        </span>
      ))}
      <br />
      <span className={`hero-word italic text-slate-600${on ? " revealed" : ""}`}
        style={{ transitionDelay:`${w1.length*80}ms`, marginRight:"0.25em" }}>
        <span>{h}</span>
      </span>
      {" "}
      {w3.map((w, i) => (
        <span key={i} className={`hero-word${on ? " revealed" : ""}`}
          style={{ transitionDelay:`${(w1.length+1+i)*80}ms`, marginRight:"0.25em" }}>
          <span>{w}</span>
        </span>
      ))}
    </h1>
  );
};

// ============================================================
// MAGNETIC BUTTON
// ============================================================
const MagBtn: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className="", onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const mv  = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  * 0.22;
    const dy = (e.clientY - r.top  - r.height/2) * 0.22;
    ref.current.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const lv  = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <button ref={ref} className={`magnetic ${className}`} onMouseMove={mv} onMouseLeave={lv} onClick={onClick}>{children}</button>;
};

// ============================================================
// METRIC CARD
// ============================================================
const MetricCard: React.FC<{ value:number; suffix:string; label:string; delay:number; inView:boolean }> = ({ value,suffix,label,delay,inView }) => {
  const c = useCountUp(value, 1800, inView);
  return (
    <div className={`reveal text-center p-8 border border-slate-700 bg-white/5
        hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 group
        ${inView?"visible":""}`}
      style={{ transitionDelay:`${delay}ms` }}>
      <div className="font-serif text-5xl md:text-6xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors tabular-nums">
        {c}{suffix}
      </div>
      <p className="text-sm text-slate-400 font-light leading-relaxed">{label}</p>
    </div>
  );
};

// ============================================================
// PROJECT CARD
// ============================================================
const ProjectCard: React.FC<{ project:Project; onClick:()=>void; t:any; delay:number; inView:boolean }> = ({ project,onClick,t,delay,inView }) => {
  const [err, setErr] = useState(false);
  return (
    <div onClick={onClick} data-cursor
      className={`reveal card-lift group cursor-pointer bg-white border border-slate-200
        hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60
        transition-all duration-500 flex flex-col h-full relative ${inView?"visible":""}`}
      style={{ transitionDelay:`${delay}ms` }}>
      <div className={`h-1 w-full ${project.id===1?"bg-blue-900":project.id===2?"bg-slate-500":"bg-slate-300"}`} />
      <div className="h-52 bg-[#F8F9FB] relative overflow-hidden flex items-center justify-center border-b border-slate-100">
        {!err && project.gallery?.length ? (
          <img src={project.gallery[0]} alt={project.title} onError={()=>setErr(true)}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105" />
        ) : (
          <div className="text-center p-6 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="w-12 h-12 border border-slate-200 bg-white flex items-center justify-center rounded-sm mx-auto mb-4">
              {project.id===1?<BarChart3 className="text-slate-900"/>:project.id===2?<Code2 className="text-slate-900"/>:<FileText className="text-slate-900"/>}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.viewReport}</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200 shadow-sm">
          {project.category}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-serif text-2xl text-slate-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors">{project.title}</h3>
        <p className="font-sans text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3 font-light">{project.shortDesc}</p>
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 border-b border-transparent group-hover:border-slate-900 transition-all pb-0.5">{t.readAnalysis}</span>
          <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PORTFOLIO
// ============================================================
const Portfolio: React.FC = () => {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [project,     setProject]     = useState<Project|null>(null);
  const [imgIdx,      setImgIdx]      = useState(0);
  const [zoom,        setZoom]        = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [modalErr,    setModalErr]    = useState(false);
  const [lang,        setLang]        = useState<"en"|"es">("en");
  const [metVis,      setMetVis]      = useState(false);
  const metRef = useRef<HTMLDivElement>(null);

  const heroR    = useReveal(0.05);
  const expR     = useReveal(0.1);
  const workR    = useReveal(0.1);
  const xpR      = useReveal(0.1);
  const contactR = useReveal(0.1);

  const t = content[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setMetVis(true); },{ threshold:0.2 });
    if (metRef.current) obs.observe(metRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  const go = (id:string) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  const openProject = (p:Project) => { setProject(p); setImgIdx(0); setZoom(false); setModalErr(false); };
  const closeModal  = () => { setProject(null); setZoom(false); };

  const nav = useCallback((dir:"next"|"prev") => {
    if (!project?.gallery) return;
    setModalErr(false);
    const len = project.gallery.length;
    setImgIdx(prev => dir==="next"?(prev+1)%len:(prev-1+len)%len);
  }, [project]);

  useEffect(() => {
    const fn = (e:KeyboardEvent) => {
      if (!project) return;
      if (e.key==="ArrowRight") nav("next");
      if (e.key==="ArrowLeft")  nav("prev");
      if (e.key==="Escape") { if(zoom) setZoom(false); else closeModal(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [project, zoom, nav]);

  const nextImg = (e?:React.MouseEvent) => { e?.stopPropagation(); nav("next"); };
  const prevImg = (e?:React.MouseEvent) => { e?.stopPropagation(); nav("prev"); };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-200">
      <CustomCursor />
      <ScrollProgress />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled?"bg-white/95 backdrop-blur-md border-b border-slate-200 py-4":"bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={()=>go("hero")}>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors flex items-center gap-2">
              Juan M. Garcia <BadgeCheck size={18} className="text-blue-900" />
            </span>
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-slate-500 uppercase">{t.nav.role}</span>
          </div>

          <div className="hidden md:flex gap-10 items-center text-xs font-bold tracking-widest uppercase text-slate-500">
            {(["work","experience","contact"] as const).map((id,i)=>(
              <button key={id} onClick={()=>go(id)}
                className="nav-link hover:text-blue-900 transition-colors">
                {[t.nav.work,t.nav.trajectory,t.nav.contact][i]}
              </button>
            ))}
            <button onClick={()=>setLang(p=>p==="en"?"es":"en")} className="flex items-center gap-2 hover:text-blue-900 transition-colors px-2">
              <span className={lang==="en"?"text-slate-900":"text-slate-400"}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={lang==="es"?"text-slate-900":"text-slate-400"}>ES</span>
            </button>
            <MagBtn onClick={()=>go("contact")}
              className="px-6 py-3 bg-slate-900 text-white hover:bg-blue-900 transition-all duration-300 rounded-sm text-xs font-bold tracking-widest uppercase">
              {t.nav.contact}
            </MagBtn>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={()=>setLang(p=>p==="en"?"es":"en")} className="text-xs font-bold uppercase tracking-widest">
              <span className={lang==="en"?"text-slate-900":"text-slate-400"}>EN</span>
              <span className="text-slate-300 mx-1">/</span>
              <span className={lang==="es"?"text-slate-900":"text-slate-400"}>ES</span>
            </button>
            <button onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-8 text-xl font-serif font-bold text-slate-900">
            <button onClick={()=>go("work")}       className="text-left border-b border-slate-100 pb-4">{t.nav.work}</button>
            <button onClick={()=>go("experience")} className="text-left border-b border-slate-100 pb-4">{t.nav.trajectory}</button>
            <button onClick={()=>go("contact")}    className="text-left text-blue-900">{t.nav.contact}</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="pt-48 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-100 rounded-full blur-[80px] -z-10 opacity-40" />

        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1">
              <div className="inline-block border-b border-slate-900 pb-1 mb-8 opacity-0 animate-fade-in" style={{animationDelay:"100ms",animationFillMode:"forwards"}}>
                <span className="text-xs font-bold tracking-widest uppercase text-slate-900">{t.hero.available}</span>
              </div>

              <HeroTitle s={t.hero.titleStart} h={t.hero.titleHighlight} e={t.hero.titleEnd} />

              <p className="font-sans text-lg text-slate-600 leading-relaxed max-w-xl mb-10 font-light opacity-0 animate-fade-in"
                style={{animationDelay:"900ms",animationFillMode:"forwards"}}>
                {t.hero.desc}
              </p>

              <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{animationDelay:"1100ms",animationFillMode:"forwards"}}>
                <MagBtn onClick={()=>go("work")}
                  className="px-8 py-4 bg-slate-900 text-white text-sm font-bold tracking-wide uppercase hover:bg-blue-900 transition-all rounded-sm shadow-xl shadow-slate-200">
                  {t.hero.btnWork}
                </MagBtn>
                <a href="/files/Juan_Manuel_Garcia_Resume.pdf" download target="_blank" rel="noopener noreferrer"
                  className="magnetic px-8 py-4 border border-slate-900 text-slate-900 text-sm font-bold tracking-wide uppercase hover:bg-slate-900 hover:text-white transition-all rounded-sm flex items-center gap-2">
                  <Download size={16}/> {t.hero.btnResume}
                </a>
                <a href="https://www.linkedin.com/in/juanmanuelgarcia-bi" target="_blank" rel="noreferrer"
                  className="magnetic px-8 py-4 border border-slate-200 bg-white text-slate-900 text-sm font-bold tracking-wide uppercase hover:border-slate-400 transition-all rounded-sm flex items-center gap-2">
                  <Linkedin size={16}/> LinkedIn
                </a>
              </div>

              <div className="mt-8 inline-flex items-center gap-3 bg-green-50 text-green-800 px-4 py-2 rounded-full border border-green-200 shadow-sm opacity-0 animate-fade-in"
                style={{animationDelay:"1300ms",animationFillMode:"forwards"}}>
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"/>
                <span className="text-xs font-bold uppercase tracking-widest">STEM OPT Valid until 2027</span>
              </div>
            </div>

            <div className="hidden md:block w-72 pt-12 opacity-0 animate-fade-in" style={{animationDelay:"1400ms",animationFillMode:"forwards"}}>
              <div className="border-l border-slate-200 pl-8 space-y-8">
                {[
                  { icon:<Database size={14} className="text-blue-900"/>,  label:"Stack",    val:t.hero.stack },
                  { icon:<Sparkles size={14} className="text-yellow-600"/>, label:"Focus",    val:t.hero.focus },
                  { icon:<MapPin   size={14} className="text-red-500"/>,    label:"Location", val:t.hero.location }
                ].map((item,i)=>(
                  <div key={i} className="group">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{item.icon} {item.label}</div>
                    <div className="font-serif text-2xl text-slate-900 group-hover:text-blue-900 transition-colors">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section ref={metRef} className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage:"linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative">
          <div className="mb-12 text-center">
            <h2 className={`reveal font-serif text-3xl text-white mb-2 ${metVis?"visible":""}`}>{t.metrics.title}</h2>
            <p  className={`reveal font-sans text-slate-400 font-light ${metVis?"visible":""}`} style={{transitionDelay:"100ms"}}>{t.metrics.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700/50">
            {t.metrics.items.map((item:any,i:number)=>(
              <MetricCard key={i} value={item.value} suffix={item.suffix} label={item.label} delay={i*150} inView={metVis} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-16 bg-white border-y border-slate-100" ref={expR.ref}>
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="mb-12">
            <h2 className={`reveal font-serif text-3xl text-slate-900 mb-2 ${expR.visible?"visible":""}`}>{t.expertise.title}</h2>
            <p  className={`reveal font-sans text-slate-500 font-light max-w-2xl ${expR.visible?"visible":""}`} style={{transitionDelay:"100ms"}}>{t.expertise.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.expertise.cards.map((card:any,i:number)=>(
              <div key={i}
                className={`reveal card-lift bg-[#FAFAFA] p-8 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 group ${expR.visible?"visible":""}`}
                style={{transitionDelay:`${i*120}ms`}}>
                <div className="mb-6 w-12 h-12 bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  {i===0?<Database size={20} strokeWidth={1.5}/>:i===1?<TrendingUp size={20} strokeWidth={1.5}/>:<Lightbulb size={20} strokeWidth={1.5}/>}
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-light">{card.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag:string,j:number)=>(
                    <span key={j} className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-200 px-2 py-1 bg-white hover:border-blue-900 hover:text-blue-900 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-16 bg-white border-b border-slate-200" ref={workR.ref}>
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-6">
            <div>
              <h2 className={`reveal font-serif text-4xl text-slate-900 mb-2 ${workR.visible?"visible":""}`}>{t.work.title}</h2>
              <p  className={`reveal font-sans text-slate-500 font-light ${workR.visible?"visible":""}`} style={{transitionDelay:"100ms"}}>{t.work.subtitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.projects.map((p:Project,i:number)=>(
              <ProjectCard key={p.id} project={p} onClick={()=>openProject(p)} t={t.work} delay={i*150} inView={workR.visible} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-16 bg-[#FAFAFA]" ref={xpR.ref}>
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className={`reveal-left font-serif text-3xl text-slate-900 mb-4 ${xpR.visible?"visible":""}`}>
                {t.experience.title.split(" ")[0]}<br/>{t.experience.title.split(" ").slice(1).join(" ")}
              </h2>
              <p className={`reveal-left font-sans text-sm text-slate-500 leading-relaxed mb-8 ${xpR.visible?"visible":""}`} style={{transitionDelay:"100ms"}}>{t.experience.subtitle}</p>
              <a href="/files/Juan_Manuel_Garcia_Resume.pdf" download target="_blank" rel="noopener noreferrer"
                className={`reveal-left inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 hover:border-slate-900 transition-all ${xpR.visible?"visible":""}`}
                style={{transitionDelay:"200ms"}}>
                <Download size={14}/> {t.experience.download}
              </a>
            </div>

            <div className="md:col-span-8 space-y-12 border-l border-slate-200 pl-8 md:pl-12 py-2">
              {t.experienceList.map((exp:any,i:number)=>(
                <div key={i}
                  className={`reveal relative group ${xpR.visible?"visible":""}`}
                  style={{transitionDelay:`${i*150}ms`}}>
                  <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-3 h-3 bg-slate-200 rounded-full border-2 border-[#FAFAFA] group-hover:bg-blue-900 group-hover:scale-125 transition-all duration-300"/>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{exp.role}</h3>
                    <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wide">{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-blue-900"/>
                    <span className="font-sans text-sm font-bold text-slate-700">{exp.company}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans text-sm text-slate-500">{exp.location}</span>
                  </div>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed font-light">{exp.desc}</p>
                </div>
              ))}
              <div className={`reveal relative pt-8 group ${xpR.visible?"visible":""}`} style={{transitionDelay:"300ms"}}>
                <div className="absolute -left-[41px] md:-left-[57px] top-10 w-3 h-3 bg-slate-200 rounded-full border-2 border-[#FAFAFA] group-hover:bg-blue-900 group-hover:scale-125 transition-all duration-300"/>
                <div className="font-serif text-xl font-bold text-slate-900 mb-4">{t.experience.educationTitle}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.experience.education.map((edu:any,i:number)=>(
                    <div key={i} className="card-lift bg-white p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="font-bold text-slate-900 text-sm mb-1">{edu.title}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">{edu.school}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{edu.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 card-lift bg-white p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="font-bold text-slate-900 text-sm mb-2">{t.experience.certificationsTitle}</div>
                  <div className="flex flex-wrap gap-2">
                    {t.experience.certs.map((c:any,i:number)=>(
                      <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-100 hover:border-blue-200 hover:text-blue-900 transition-colors">
                        {c.name} / {c.status}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white border-t border-slate-100" ref={contactR.ref}>
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`reveal inline-block border-b border-slate-900 pb-1 mb-8 ${contactR.visible?"visible":""}`}>
                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{t.contactSection.availability}</span>
              </div>
              <h2 className={`reveal font-serif text-4xl md:text-5xl text-slate-900 mb-6 leading-tight ${contactR.visible?"visible":""}`} style={{transitionDelay:"100ms"}}>{t.contactSection.title}</h2>
              <p  className={`reveal font-sans text-slate-500 leading-relaxed font-light mb-8 ${contactR.visible?"visible":""}`} style={{transitionDelay:"200ms"}}>{t.contactSection.subtitle}</p>
              <div className={`reveal flex flex-col gap-3 ${contactR.visible?"visible":""}`} style={{transitionDelay:"300ms"}}>
                <div className="flex items-center gap-3 text-sm text-slate-500"><Clock  size={14} className="text-blue-900"/><span>{t.contactSection.responseTime}</span></div>
                <div className="flex items-center gap-3 text-sm text-slate-500"><Globe  size={14} className="text-blue-900"/><span>{t.contactSection.timezone}</span></div>
              </div>
            </div>
            <div className={`reveal flex flex-col gap-4 ${contactR.visible?"visible":""}`} style={{transitionDelay:"200ms"}}>
              <a href="mailto:jgnogues99@gmail.com"
                className="group card-lift flex items-center justify-between px-8 py-6 bg-slate-900 text-white hover:bg-blue-900 transition-all duration-300 rounded-sm">
                <div className="flex items-center gap-4"><Mail size={20}/>
                  <div><div className="font-bold text-sm uppercase tracking-widest">{t.contactSection.emailLabel}</div><div className="text-slate-400 text-xs mt-1 font-light">jgnogues99@gmail.com</div></div>
                </div>
                <Send size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
              </a>
              <a href="https://www.linkedin.com/in/juanmanuelgarcia-bi" target="_blank" rel="noreferrer"
                className="group card-lift flex items-center justify-between px-8 py-6 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-sm">
                <div className="flex items-center gap-4"><Linkedin size={20}/>
                  <div><div className="font-bold text-sm uppercase tracking-widest">{t.contactSection.linkedinLabel}</div><div className="text-slate-400 text-xs mt-1 font-light">linkedin.com/in/juanmanuelgarcia-bi</div></div>
                </div>
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-white transition-colors"/>
              </a>
              <a href="/files/Juan_Manuel_Garcia_Resume.pdf" download target="_blank" rel="noopener noreferrer"
                className="group card-lift flex items-center justify-between px-8 py-6 border border-slate-200 text-slate-700 hover:border-slate-400 bg-[#FAFAFA] transition-all duration-300 rounded-sm">
                <div className="flex items-center gap-4"><Download size={20}/>
                  <div><div className="font-bold text-sm uppercase tracking-widest">{t.experience.download}</div><div className="text-slate-400 text-xs mt-1 font-light">PDF · Updated 2025</div></div>
                </div>
                <ArrowUpRight size={18} className="text-slate-400 group-hover:text-slate-700 transition-colors"/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl mb-2">Juan M. Garcia</h3>
            <p className="font-sans text-slate-400 text-sm font-light">{t.footer.tagline}</p>
          </div>
          <div className="flex gap-8 items-center">
            <a href="mailto:jgnogues99@gmail.com" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-blue-400 transition-colors group">
              <Mail size={16} className="group-hover:scale-110 transition-transform"/> Email
            </a>
            <a href="https://www.linkedin.com/in/juanmanuelgarcia-bi" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-blue-400 transition-colors group">
              <Linkedin size={16} className="group-hover:scale-110 transition-transform"/> LinkedIn
            </a>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-8 text-center md:text-left">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Juan Manuel Garcia — {t.footer.built}</p>
        </div>
      </footer>

      {/* ZOOM MODAL */}
      {project && zoom && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
          <button onClick={()=>setZoom(false)} className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors z-50"><X size={24}/></button>
          {project.gallery && project.gallery.length>1 && (
            <><button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white z-50"><ChevronLeft size={32}/></button>
              <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white z-50"><ChevronRight size={32}/></button></>
          )}
          <div className="w-full h-full p-4 flex items-center justify-center">
            <img src={project.gallery?.[imgIdx]} className="max-w-full max-h-full object-contain shadow-2xl" alt="Full screen"/>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-bold uppercase tracking-widest">
            {imgIdx+1} / {project.gallery?.length??0}
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col lg:flex-row relative animate-fade-in rounded-none md:rounded-sm">
            <button onClick={closeModal} className="fixed top-4 right-4 md:absolute md:top-4 md:right-4 z-50 p-2 bg-white/90 hover:bg-slate-100 rounded-full transition-colors text-slate-900 shadow-lg border border-slate-200 md:border-transparent"><X size={20}/></button>

            <div className="lg:w-3/5 bg-[#F0F2F5] relative h-[40vh] md:h-auto md:min-h-[400px] flex-shrink-0 flex items-center justify-center p-8">
              <div className="w-full h-full flex items-center justify-center relative shadow-2xl bg-white rounded-sm overflow-hidden border border-slate-200 group cursor-zoom-in"
                onClick={()=>setZoom(true)}>
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10 flex items-center justify-center pointer-events-none">
                  <div className="opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 bg-white/90 p-3 rounded-full shadow-lg"><Maximize2 size={24}/></div>
                </div>
                {!modalErr && project.gallery?.length ? (
                  <img src={project.gallery[imgIdx]} className="w-full h-full object-contain" alt="Project detail" onError={()=>setModalErr(true)}/>
                ) : (
                  <div className="text-center p-12">
                    <div className="mb-4 text-slate-300"><Layers size={48} strokeWidth={1}/></div>
                    <p className="font-serif text-xl text-slate-400 italic">{t.modal.placeholder}</p>
                    <p className="font-sans text-xs text-slate-400 mt-2 uppercase tracking-widest">{t.modal.upload}</p>
                  </div>
                )}
                {project.gallery && project.gallery.length>1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all z-20"><ChevronLeft size={18}/></button>
                    <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all z-20"><ChevronRight size={18}/></button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm z-20">
                      {imgIdx+1} / {project.gallery.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:w-2/5 p-10 md:p-12 bg-white overflow-y-auto">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] mb-3">{project.client}</div>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">{project.title}</h2>
                {project.impactBadges && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.impactBadges.map((b,i)=>(
                      <span key={i} className="text-[10px] bg-blue-50 text-blue-900 px-3 py-1 rounded-sm font-bold uppercase tracking-widest border border-blue-100">{b}</span>
                    ))}
                  </div>
                )}
                <p className="font-sans text-sm text-slate-500 leading-relaxed font-light">{project.shortDesc}</p>
              </div>
              <div className="space-y-10">
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.problem}</h4>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 border-l-2 border-slate-300">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.execution}</h4>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.outcomes}</h4>
                  <ul className="space-y-3">
                    {project.results.map((r,i)=>(
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium">
                        <CheckCircle2 size={16} className="text-blue-900 flex-shrink-0 mt-0.5"/><span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.tech}</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s,i)=>(
                      <span key={i} className="text-xs border border-slate-200 px-3 py-1 text-slate-600 bg-white hover:border-blue-900 hover:text-blue-900 transition-colors">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
