import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Code2,
  Linkedin,
  Mail,
  Database,
  TrendingUp,
  Lightbulb,
  MapPin,
  Sparkles,
  BadgeCheck,
  Maximize2
} from 'lucide-react';
import { Project } from './types';

// --- DATA & TRANSLATIONS ---
const content = {
  en: {
    nav: {
      work: "Projects",
      trajectory: "Experience",
      contact: "Contact",
      role: "BI Analyst"
    },
    hero: {
      available: "Available for Hire",
      titleStart: "Transforming",
      titleHighlight: "Data",
      titleEnd: "into Strategic Insights.",
      desc: "Bilingual (EN/ES) Business Intelligence Analyst. I build Power BI solutions and SQL models that help companies measure performance and optimize profitability.",
      btnWork: "View Projects",
      btnResume: "Resume",
      stack: "SQL & Power BI",
      focus: "Data Strategy",
      location: "Miami, FL"
    },
    expertise: {
      title: "Technical Focus",
      subtitle: "My core skillset: bridging the gap between raw data and business decisions.",
      cards: [
        {
          title: "Data Modeling & SQL",
          desc: "Cleaning and structuring data using SQL (CTEs, Views). Connecting ERP systems (Sage) to central repositories for accurate reporting.",
          tags: ["SQL Server", "Data Cleaning", "Data Modeling", "Azure"]
        },
        {
          title: "Power BI Development",
          desc: "Designing intuitive dashboards. Using DAX for complex calculations and ensuring reports are automated and easy to read.",
          tags: ["Power BI", "DAX", "Dashboard Design", "Automation"]
        },
        {
          title: "Business Analysis",
          desc: "Understanding what the business needs to measure. Defining KPIs for profitability, sales forecasting, and margin tracking.",
          tags: ["KPI Definition", "Sales Analysis", "Forecasting", "Reporting"]
        }
      ]
    },
    work: {
      title: "Relevant Projects",
      subtitle: "Practical applications of BI tools to solve real business problems.",
      viewReport: "View Details",
      readAnalysis: "Read Case"
    },
    experience: {
      title: "Work Experience",
      subtitle: "My professional background in IT and Business Intelligence.",
      download: "Download Resume",
      educationTitle: "Education",
      education: [
        {
          title: "Specialist in Artificial Intelligence",
          school: "Racks Academy, Spain (2025)",
          desc: "Focus: AI for Business Applications"
        },
        {
          title: "B.S Computer Info Systems & Comp Sci",
          school: "Missouri Valley College (2024)",
          desc: "Minor: Business Admin | GPA: 3.3"
        }
      ],
      certificationsTitle: "Certifications",
      certs: [
        { name: "SQL (Coursera)", status: "Completed" },
        { name: "PL-300", status: "In Progress" },
        { name: "BIDA CFI", status: "In Progress" }
      ]
    },
    footer: {
      tagline: "Making data intuitive and profitable.",
      built: "Built with React & TailwindCSS"
    },
    modal: {
      placeholder: "Project Preview",
      upload: "Visuals coming soon",
      problem: "The Challenge",
      execution: "What I Did",
      outcomes: "Results",
      tech: "Tools Used"
    },
    projects: [
      {
        id: 1,
        category: "DASHBOARDING & AUTOMATION",
        title: "Sales & Profitability Dashboard",
        client: "AMG Global Distribution",
        metrics: "Real-time Forecasting",
        impactBadges: ["Automated Reporting", "Margin Analysis", "SQL Integration"], 
        tags: ["Power BI", "SQL Server", "Sage ERP", "DAX"],
        gallery: [
           "/images/dashboard-main.png",      
           "/images/regional-map.png",        
           "/images/product-analysis.png",    
           "/images/customer-trends.png",     
           "/images/alerts.png",              
           "/images/data-model.png"           
        ],
        shortDesc: "Development of a central Power BI dashboard connecting directly to SQL to track domestic vs. international sales in real-time.",
        challenge: "The company relied on manual Excel reports, causing delays. There was no clear visibility into SKU-level profitability or consolidated international sales data.",
        solution: "I connected the Sage ERP to a SQL database to normalize the data, then built a Power BI dashboard with automated refresh. I implemented DAX measures to calculate real margins per SKU.",
        results: [
          "Enabled real-time forecasting for domestic vs. international segments.",
          "Improved data accuracy by 25%+ by removing manual entry errors.",
          "Reduced report generation time by 80% through automation."
        ],
        stack: ["SQL Server", "Power BI", "DAX", "Excel"]
      },
      {
        id: 2,
        category: "DATA GOVERNANCE",
        title: "BI Usage Tracking System",
        client: "Internal Initiative",
        metrics: "Adoption Metrics",
        impactBadges: ["Usage Analysis", "Report Optimization", "KQL"],
        tags: ["KQL", "Azure Logs", "Power BI Service"],
        gallery: [
             "/images/engagement-KQL.png",      
             "/images/adopcion-KQL.png",        
             "/images/code-KQL.png"           
        ],
        shortDesc: "Created a tracking system using KQL to measure how often reports were being used by the management team.",
        challenge: "We didn't know which reports were actually useful. It was hard to justify spending time on reports without knowing if they were being adopted.",
        solution: "I wrote KQL (Kusto Query Language) scripts to analyze Power BI Activity Logs. This allowed us to see who was viewing which report and how frequently.",
        results: [
          "Measured report engagement across different departments.",
          "Identified underutilized reports to stop maintaining them.",
          "Provided data to management to support BI adoption strategies."
        ],
        stack: ["KQL", "Azure Log Analytics", "Power BI Service"]
      },
      {
        id: 3,
        category: "PROCESS DOCUMENTATION",
        title: "Operations & Request Log",
        client: "Workflow Optimization",
        metrics: "Workflow Efficiency",
        impactBadges: ["Task Tracking", "SOPs", "Agile Basics"],
        tags: ["Notion", "Process", "Documentation"],
        gallery: [
             "/images/track-requests.png"           
        ],
        shortDesc: "Set up a structured system to track data requests and document standard operating procedures (SOPs).",
        challenge: "Ad-hoc requests were disorganized, making it hard to prioritize work or show the value of the BI function to leadership.",
        solution: "Implemented a simple Kanban-style intake process in Notion. I categorized tasks by 'Strategic' vs 'Maintenance' to visualize my workload.",
        results: [
          "Created a clear history of completed data requests.",
          "Helped justify time allocation for strategic projects.",
          "Built a knowledge base of SOPs for future reference."
        ],
        stack: ["Notion", "SOP Writing", "Task Management"]
      }
    ],
    experienceList: [
      {
        role: "Business & BI Analyst",
        company: "AMG Global Distribution",
        location: "Miami, FL",
        period: "Sep 2024 - Present",
        desc: "Leading the development of Power BI Dashboards and connecting SQL to ERP systems. Automated SKU-level profitability tracking (25% accuracy increase). Integrated international and domestic sales data for executive reporting."
      },
      {
        role: "IT Assistant & SQL Report Writer (Intern)",
        company: "Missouri Valley College",
        location: "Missouri, MO",
        period: "Jan 2024 - May 2024",
        desc: "Developed SQL-based reports for the Argos BI system. Improved data accuracy by 15% and optimized IT documentation, reducing troubleshooting time for users."
      }
    ]
  },
  es: {
    nav: {
      work: "Proyectos",
      trajectory: "Experiencia",
      contact: "Contacto",
      role: "Analista de BI"
    },
    hero: {
      available: "Disponible para contratar",
      titleStart: "Transformando",
      titleHighlight: "Datos",
      titleEnd: "en Estrategias Rentables.",
      desc: "Analista de Business Intelligence bilingüe (EN/ES). Construyo soluciones en Power BI y modelos SQL que ayudan a las empresas a medir su rendimiento y optimizar la rentabilidad.",
      btnWork: "Ver Proyectos",
      btnResume: "Currículum",
      stack: "SQL y Power BI",
      focus: "Estrategia de Datos",
      location: "Miami, FL"
    },
    expertise: {
      title: "Enfoque Técnico",
      subtitle: "Mi habilidad principal: cerrar la brecha entre datos brutos y decisiones de negocio.",
      cards: [
        {
          title: "Modelado de Datos y SQL",
          desc: "Limpieza y estructuración de datos usando SQL (CTEs, Vistas). Conexión de sistemas ERP (Sage) a repositorios centrales para reportes precisos.",
          tags: ["SQL Server", "Limpieza de Datos", "Modelado de Datos", "Azure"]
        },
        {
          title: "Desarrollo en Power BI",
          desc: "Diseño de dashboards intuitivos. Uso de DAX para cálculos complejos y aseguramiento de reportes automatizados y fáciles de leer.",
          tags: ["Power BI", "DAX", "Diseño de Dashboards", "Automatización"]
        },
        {
          title: "Análisis de Negocio",
          desc: "Entender qué necesita medir el negocio. Definición de KPIs para rentabilidad, previsión de ventas y seguimiento de márgenes.",
          tags: ["Definición de KPIs", "Análisis de Ventas", "Forecasting", "Reportes"]
        }
      ]
    },
    work: {
      title: "Proyectos Relevantes",
      subtitle: "Aplicaciones prácticas de herramientas de BI para resolver problemas reales de negocio.",
      viewReport: "Ver Detalles",
      readAnalysis: "Leer Caso"
    },
    experience: {
      title: "Experiencia Laboral",
      subtitle: "Mi trayectoria profesional en IT y Business Intelligence.",
      download: "Descargar CV",
      educationTitle: "Educación",
      education: [
        {
          title: "Especialista en Inteligencia Artificial",
          school: "Racks Academy, España (2025)",
          desc: "Enfoque: IA para Aplicaciones de Negocio"
        },
        {
          title: "Grado en Sistemas de Info. y Ciencias de la Comp.",
          school: "Missouri Valley College (2024)",
          desc: "Minor: Administración de Empresas | GPA: 3.3"
        }
      ],
      certificationsTitle: "Certificaciones",
      certs: [
        { name: "SQL (Coursera)", status: "Completado" },
        { name: "PL-300", status: "En Progreso" },
        { name: "BIDA CFI", status: "En Progreso" }
      ]
    },
    footer: {
      tagline: "Haciendo los datos intuitivos y rentables.",
      built: "Creado con React y TailwindCSS"
    },
    modal: {
      placeholder: "Vista Previa del Proyecto",
      upload: "Visuales próximamente",
      problem: "El Desafío",
      execution: "Lo que hice",
      outcomes: "Resultados",
      tech: "Herramientas"
    },
    projects: [
      {
        id: 1,
        category: "DASHBOARDING Y AUTOMATIZACIÓN",
        title: "Dashboard de Ventas y Rentabilidad",
        client: "AMG Global Distribution",
        metrics: "Forecasting en Tiempo Real",
        impactBadges: ["Reportes Automatizados", "Análisis de Margen", "Integración SQL"], 
        tags: ["Power BI", "SQL Server", "Sage ERP", "DAX"],
        gallery: [
           "/images/dashboard-main.png",      
           "/images/regional-map.png",        
           "/images/product-analysis.png",    
           "/images/customer-trends.png",     
           "/images/alerts.png",              
           "/images/data-model.png"           
        ],
        shortDesc: "Desarrollo de un dashboard central en Power BI conectado directamente a SQL para rastrear ventas domésticas vs internacionales en tiempo real.",
        challenge: "La empresa dependía de reportes manuales en Excel, causando retrasos. No había visibilidad clara sobre la rentabilidad a nivel de SKU ni datos consolidados de ventas internacionales.",
        solution: "Conecté el ERP Sage a una base de datos SQL para normalizar los datos, luego construí un dashboard en Power BI con actualización automática. Implementé medidas DAX para calcular márgenes reales por SKU.",
        results: [
          "Habilitó forecasting en tiempo real para segmentos domésticos e internacionales.",
          "Mejoró la precisión de los datos en más del 25% al eliminar errores manuales.",
          "Redujo el tiempo de generación de reportes en un 80% mediante automatización."
        ],
        stack: ["SQL Server", "Power BI", "DAX", "Excel"]
      },
      {
        id: 2,
        category: "GOBERNANZA DE DATOS",
        title: "Sistema de Rastreo de Uso de BI",
        client: "Iniciativa Interna",
        metrics: "Métricas de Adopción",
        impactBadges: ["Análisis de Uso", "Optimización de Reportes", "KQL"],
        tags: ["KQL", "Azure Logs", "Power BI Service"],
        gallery: [
             "/images/engagement-KQL.png",      
             "/images/adopcion-KQL.png",        
             "/images/code-KQL.png"           
        ],
        shortDesc: "Creación de un sistema de seguimiento usando KQL para medir con qué frecuencia el equipo directivo utilizaba los reportes.",
        challenge: "No sabíamos qué reportes eran realmente útiles. Era difícil justificar el tiempo dedicado a reportes sin saber si estaban siendo adoptados.",
        solution: "Escribí scripts en KQL (Kusto Query Language) para analizar los Logs de Actividad de Power BI. Esto nos permitió ver quién veía qué reporte y con qué frecuencia.",
        results: [
          "Midió el compromiso con los reportes en diferentes departamentos.",
          "Identificó reportes subutilizados para dejar de mantenerlos.",
          "Proporcionó datos a la gerencia para apoyar estrategias de adopción de BI."
        ],
        stack: ["KQL", "Azure Log Analytics", "Power BI Service"]
      },
      {
        id: 3,
        category: "DOCUMENTACIÓN DE PROCESOS",
        title: "Log de Operaciones y Solicitudes",
        client: "Optimización de Flujo de Trabajo",
        metrics: "Eficiencia de Flujo",
        impactBadges: ["Seguimiento de Tareas", "SOPs", "Conceptos Agile"],
        tags: ["Notion", "Procesos", "Documentación"],
        gallery: [
             "/images/track-requests.png"           
        ],
        shortDesc: "Implementación de un sistema estructurado para rastrear solicitudes de datos y documentar procedimientos operativos estándar (SOPs).",
        challenge: "Las solicitudes ad-hoc estaban desorganizadas, dificultando priorizar el trabajo o mostrar el valor de la función de BI al liderazgo.",
        solution: "Implementé un proceso de entrada simple tipo Kanban en Notion. Categoricé las tareas por 'Estratégicas' vs 'Mantenimiento' para visualizar mi carga de trabajo.",
        results: [
          "Creó un historial claro de solicitudes de datos completadas.",
          "Ayudó a justificar la asignación de tiempo para proyectos estratégicos.",
          "Construyó una base de conocimiento de SOPs para referencia futura."
        ],
        stack: ["Notion", "Escritura de SOPs", "Gestión de Tareas"]
      }
    ],
    experienceList: [
      {
        role: "Analista de Negocio y BI",
        company: "AMG Global Distribution",
        location: "Miami, FL",
        period: "Sep 2024 - Actualidad",
        desc: "Liderando el desarrollo de Dashboards en Power BI y conectando SQL a sistemas ERP. Automaticé el seguimiento de rentabilidad a nivel de SKU (aumento de precisión del 25%). Integré datos de ventas internacionales y domésticas para reportes ejecutivos."
      },
      {
        role: "Asistente de IT y Escritor de Reportes SQL (Pasante)",
        company: "Missouri Valley College",
        location: "Missouri, MO",
        period: "Ene 2024 - May 2024",
        desc: "Desarrollé reportes basados en SQL para el sistema Argos BI. Mejoré la precisión de los datos en un 15% y optimicé la documentación de IT, reduciendo el tiempo de resolución de problemas para los usuarios."
      }
    ]
  }
};

// Sub-componente para manejar el estado de error de imagen individualmente
const ProjectCard: React.FC<{ project: Project; onClick: () => void; t: any }> = ({ project, onClick, t }) => {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full relative"
    >
      {/* Colored Top Bar */}
      <div className={`h-1 w-full ${project.id === 1 ? 'bg-blue-900' : project.id === 2 ? 'bg-slate-500' : 'bg-slate-300'}`}></div>

      {/* Thumbnail */}
      <div className="h-52 bg-[#F8F9FB] relative overflow-hidden flex items-center justify-center border-b border-slate-100">
        {!imgError && project.gallery && project.gallery.length > 0 ? (
          <img 
            src={project.gallery[0]} 
            alt={project.title} 
            onError={handleImageError}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100" 
          />
        ) : (
          <div className="text-center p-6 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="w-12 h-12 border border-slate-200 bg-white flex items-center justify-center rounded-sm mx-auto mb-4">
              {project.id === 1 ? <BarChart3 className="text-slate-900"/> : project.id === 2 ? <Code2 className="text-slate-900"/> : <FileText className="text-slate-900"/>}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.viewReport}</span>
          </div>
        )}
        
        {/* Floating Tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-200 shadow-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-serif text-2xl text-slate-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors">{project.title}</h3>
        <p className="font-sans text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3 font-light">
          {project.shortDesc}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
           <span className="text-xs font-bold text-slate-900 border-b border-transparent group-hover:border-slate-900 transition-all pb-0.5">{t.readAnalysis}</span>
           <ArrowUpRight size={16} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false); // Nuevo estado para el Zoom
  const [scrolled, setScrolled] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const t = content[lang];

  useEffect(() => {
    document.title = "Juan Manuel Garcia | BI Analyst - Commercial Strategy & Automation";
    const addMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    addMetaTag('description', "Business Intelligence Analyst specializing in commercial strategy, SQL-based automation, and Power BI systems.");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Bloquear el scroll del body cuando el modal está abierto ---
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsZoomOpen(false); // Asegurarse de que el zoom esté cerrado al abrir un proyecto
    setModalImgError(false); 
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsZoomOpen(false); // Cerrar zoom si cerramos el modal
  };

  // Función unificada para navegar
  const navigateGallery = (direction: 'next' | 'prev') => {
    if (!selectedProject?.gallery) return;
    setModalImgError(false);
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === 'ArrowRight') {
        navigateGallery('next');
      } else if (e.key === 'ArrowLeft') {
        navigateGallery('prev');
      } else if (e.key === 'Escape') {
        if (isZoomOpen) {
           setIsZoomOpen(false);
        } else {
           handleCloseModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isZoomOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigateGallery('next');
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigateGallery('prev');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-200">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors flex items-center gap-2">
              Juan M. Garcia <BadgeCheck size={18} className="text-blue-900" />
            </span>
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-slate-500 uppercase">{t.nav.role}</span>
          </div>

          <div className="hidden md:flex gap-10 items-center text-xs font-bold tracking-widest uppercase text-slate-500">
            <button onClick={() => scrollToSection('work')} className="hover:text-blue-900 transition-colors">{t.nav.work}</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-blue-900 transition-colors">{t.nav.trajectory}</button>
            
            {/* Language Switcher Desktop */}
            <button onClick={toggleLang} aria-label="Switch language" className="flex items-center gap-2 hover:text-blue-900 transition-colors px-2">
               <span className={lang === 'en' ? 'text-slate-900' : 'text-slate-400'}>EN</span>
               <span className="text-slate-300">/</span>
               <span className={lang === 'es' ? 'text-slate-900' : 'text-slate-400'}>ES</span>
            </button>

            <a href="mailto:jgnogues99@gmail.com" className="px-6 py-3 bg-slate-900 text-white hover:bg-blue-900 transition-all duration-300 rounded-sm">
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             {/* Language Switcher Mobile */}
             <button onClick={toggleLang} aria-label="Switch language mobile" className="text-xs font-bold uppercase tracking-widest">
               <span className={lang === 'en' ? 'text-slate-900' : 'text-slate-400'}>EN</span>
               <span className="text-slate-300 mx-1">/</span>
               <span className={lang === 'es' ? 'text-slate-900' : 'text-slate-400'}>ES</span>
            </button>
            <button className="text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden animate-fade-in">
          <div className="flex flex-col gap-8 text-xl font-serif font-bold text-slate-900">
            <button onClick={() => scrollToSection('work')} className="text-left border-b border-slate-100 pb-4">{t.nav.work}</button>
            <button onClick={() => scrollToSection('experience')} className="text-left border-b border-slate-100 pb-4">{t.nav.trajectory}</button>
            <a href="mailto:jgnogues99@gmail.com" className="text-left text-blue-900">{t.nav.contact}</a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="hero" className="pt-48 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60 mix-blend-multiply"></div>
        
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1 animate-fade-in-up">
              <div className="inline-block border-b border-slate-900 pb-1 mb-8">
                 <span className="text-xs font-bold tracking-widest uppercase text-slate-900">{t.hero.available}</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-slate-900 mb-8">
                {t.hero.titleStart} <br/>
                <span className="italic text-slate-600">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
              </h1>
              
              <p className="font-sans text-lg text-slate-600 leading-relaxed max-w-xl mb-10 font-light">
                {t.hero.desc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('work')} className="px-8 py-4 bg-slate-900 text-white text-sm font-bold tracking-wide uppercase hover:bg-blue-900 transition-all rounded-sm shadow-xl shadow-slate-200">
                  {t.hero.btnWork}
                </button>
                
                <a 
                  href="/files/Juan_Manuel_Garcia_Resume.pdf" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-slate-900 text-slate-900 text-sm font-bold tracking-wide uppercase hover:bg-slate-900 hover:text-white transition-all rounded-sm flex items-center gap-2"
                >
                  <Download size={16}/> {t.hero.btnResume}
                </a>

                <a href="https://www.linkedin.com/in/juanmanuelgarcia-bi" target="_blank" rel="noreferrer" className="px-8 py-4 border border-slate-200 bg-white text-slate-900 text-sm font-bold tracking-wide uppercase hover:border-slate-400 transition-all rounded-sm flex items-center gap-2">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-3 bg-green-50 text-green-800 px-4 py-2 rounded-full border border-green-200 shadow-sm">
                 <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-widest">STEM OPT Valid until 2027</span>
              </div>
            </div>
            
            <div className="hidden md:block w-72 pt-12 opacity-80">
               <div className="border-l border-slate-200 pl-8 space-y-8">
                  <div className="group">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                       <Database size={14} className="text-blue-900" /> Stack
                    </div>
                    <div className="font-serif text-2xl text-slate-900 group-hover:text-blue-900 transition-colors">{t.hero.stack}</div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                       <Sparkles size={14} className="text-yellow-600" /> Focus
                    </div>
                    <div className="font-serif text-2xl text-slate-900 group-hover:text-blue-900 transition-colors">{t.hero.focus}</div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                       <MapPin size={14} className="text-red-500" /> Location
                    </div>
                    <div className="font-serif text-2xl text-slate-900 group-hover:text-blue-900 transition-colors">{t.hero.location}</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION (NEW) */}
      <section className="py-12 bg-white border-y border-slate-100">
         <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <div className="mb-12">
               <h2 className="font-serif text-3xl text-slate-900 mb-2">{t.expertise.title}</h2>
               <p className="font-sans text-slate-500 font-light max-w-2xl">{t.expertise.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {t.expertise.cards.map((card, idx) => (
                 <div key={idx} className="bg-[#FAFAFA] p-8 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 group">
                    <div className="mb-6 w-12 h-12 bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                       {idx === 0 ? <Database size={20} strokeWidth={1.5}/> : idx === 1 ? <TrendingUp size={20} strokeWidth={1.5}/> : <Lightbulb size={20} strokeWidth={1.5}/>}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 font-light">{card.desc}</p>
                    <div className="flex flex-wrap gap-2">
                       {card.tags.map((tag, i) => (
                         <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-slate-400 border border-slate-200 px-2 py-1 bg-white">{tag}</span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-6">
            <div>
              <h2 className="font-serif text-4xl text-slate-900 mb-2">{t.work.title}</h2>
              <p className="font-sans text-slate-500 font-light">{t.work.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => handleOpenProject(project)}
                t={t.work} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            <div className="md:col-span-4">
               <h2 className="font-serif text-3xl text-slate-900 mb-4" dangerouslySetInnerHTML={{__html: t.experience.title.replace(' ', '<br/>')}}></h2>
               <p className="font-sans text-sm text-slate-500 leading-relaxed mb-8">
                 {t.experience.subtitle}
               </p>
               <a 
                 href="/files/Juan_Manuel_Garcia_Resume.pdf" 
                 download
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 hover:border-slate-900 transition-all"
                >
                 <Download size={14}/> {t.experience.download}
               </a>
            </div>

            <div className="md:col-span-8 space-y-12 border-l border-slate-200 pl-8 md:pl-12 py-2">
              {t.experienceList.map((exp, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-3 h-3 bg-slate-200 rounded-full border-2 border-[#FAFAFA] group-hover:bg-slate-900 transition-colors"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{exp.role}</h3>
                    <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-wide">{exp.period}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-blue-900" />
                    <span className="font-sans text-sm font-bold text-slate-700">{exp.company}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-sans text-sm text-slate-500">{exp.location}</span>
                  </div>
                  
                  <p className="font-sans text-sm text-slate-600 leading-relaxed font-light">{exp.desc}</p>
                </div>
              ))}

              <div className="relative pt-8">
                 <div className="absolute -left-[41px] md:-left-[57px] top-10 w-3 h-3 bg-slate-200 rounded-full border-2 border-[#FAFAFA]"></div>
                 <div className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                   {t.experience.educationTitle}
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {t.experience.education.map((edu, idx) => (
                      <div key={idx} className="bg-white p-4 border border-slate-100 shadow-sm">
                        <div className="font-bold text-slate-900 text-sm mb-1">{edu.title}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wide">{edu.school}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{edu.desc}</div>
                      </div>
                   ))}
                 </div>
                 
                 <div className="mt-4 bg-white p-4 border border-slate-100 shadow-sm">
                     <div className="font-bold text-slate-900 text-sm mb-2">{t.experience.certificationsTitle}</div>
                     <div className="flex flex-wrap gap-2">
                        {t.experience.certs.map((cert, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                            {cert.name} / {cert.status}
                          </span>
                        ))}
                     </div>
                 </div>
              </div>
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
            <a href="mailto:jgnogues99@gmail.com" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-blue-400 transition-colors">
               <Mail size={16} /> Email
            </a>
            <a href="https://www.linkedin.com/in/juanmanuelgarcia-bi" className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-blue-400 transition-colors">
               <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-8 text-center md:text-left">
           <p className="text-xs text-slate-500">© {new Date().getFullYear()} Juan Manuel Garcia — {t.footer.built}</p>
        </div>
      </footer>

      {/* FULL SCREEN ZOOM MODAL (NEW) */}
      {selectedProject && isZoomOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in">
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors z-50"
          >
            <X size={24} />
          </button>

          {/* Navigation in Zoom Mode */}
          {selectedProject.gallery && selectedProject.gallery.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-50">
                <ChevronLeft size={32}/>
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-50">
                <ChevronRight size={32}/>
              </button>
            </>
          )}

          <div className="w-full h-full p-4 flex items-center justify-center">
             <img 
               src={selectedProject.gallery[currentImageIndex]} 
               className="max-w-full max-h-full object-contain shadow-2xl" 
               alt="Full screen view"
             />
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-bold uppercase tracking-widest">
             {currentImageIndex + 1} / {selectedProject.gallery.length}
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[95vh] overflow-y-auto shadow-2xl flex flex-col lg:flex-row relative animate-fade-in rounded-none md:rounded-sm">
            
            <button 
              onClick={handleCloseModal}
              aria-label="Close modal"
              className="fixed top-4 right-4 md:absolute md:top-4 md:right-4 z-50 p-2 bg-white/90 md:bg-white/80 hover:bg-slate-100 rounded-full transition-colors text-slate-900 shadow-lg md:shadow-none border md:border-transparent border-slate-200"
            >
              <X size={20} />
            </button>

            {/* Gallery Column */}
            <div className="lg:w-3/5 bg-[#F0F2F5] relative h-[40vh] md:h-auto md:min-h-[400px] flex-shrink-0 flex items-center justify-center p-8">
               <div 
                 className="w-full h-full flex items-center justify-center relative shadow-2xl bg-white rounded-sm overflow-hidden border border-slate-200 group cursor-zoom-in"
                 onClick={() => setIsZoomOpen(true)}
               >
                  {/* Overlay on hover to indicate zoom */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10 flex items-center justify-center pointer-events-none">
                     <div className="opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 bg-white/90 p-3 rounded-full text-slate-900 shadow-lg">
                        <Maximize2 size={24} />
                     </div>
                  </div>

                  {!modalImgError && selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                    <img 
                      src={selectedProject.gallery[currentImageIndex]} 
                      className="w-full h-full object-contain" 
                      alt="Project detail"
                      onError={() => setModalImgError(true)} 
                    />
                  ) : (
                    <div className="text-center p-12">
                      <div className="mb-4 text-slate-300"><Layers size={48} strokeWidth={1}/></div>
                      <p className="font-serif text-xl text-slate-400 italic">{t.modal.placeholder}</p>
                      <p className="font-sans text-xs text-slate-400 mt-2 uppercase tracking-widest">{t.modal.upload}</p>
                    </div>
                  )}

                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage} 
                        aria-label="Previous image" 
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 shadow-sm transition-all z-20"
                      >
                        <ChevronLeft size={18}/>
                      </button>
                      <button 
                        onClick={nextImage} 
                        aria-label="Next image" 
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 shadow-sm transition-all z-20"
                      >
                        <ChevronRight size={18}/>
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm z-20">
                        {currentImageIndex + 1} / {selectedProject.gallery.length}
                      </div>
                    </>
                  )}
               </div>
            </div>

            {/* Report Content */}
            <div className="lg:w-2/5 p-10 md:p-12 bg-white overflow-y-auto">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] mb-3">{selectedProject.client}</div>
                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">{selectedProject.title}</h2>
                
                {selectedProject.impactBadges && (
                   <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.impactBadges.map((badge, idx) => (
                        <span key={idx} className="text-[10px] bg-blue-50 text-blue-900 px-3 py-1 rounded-sm font-bold uppercase tracking-widest border border-blue-100">
                          {badge}
                        </span>
                      ))}
                   </div>
                )}
                
                <p className="font-sans text-sm text-slate-500 leading-relaxed font-light">{selectedProject.shortDesc}</p>
              </div>
              
              <div className="space-y-10">
                 <div>
                    <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.problem}</h4>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed bg-slate-50 p-5 border-l-2 border-slate-300">{selectedProject.challenge}</p>
                 </div>
                 
                 <div>
                    <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.execution}</h4>
                    <p className="font-sans text-sm text-slate-600 leading-relaxed">{selectedProject.solution}</p>
                 </div>
                 
                 <div>
                    <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.outcomes}</h4>
                    <ul className="space-y-3">
                      {selectedProject.results.map((res, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium">
                          <CheckCircle2 size={16} className="text-blue-900 flex-shrink-0 mt-0.5" /> 
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                 </div>
                 
                 <div>
                   <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">{t.modal.tech}</h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedProject.stack.map((s, i) => (
                       <span key={i} className="text-xs border border-slate-200 px-3 py-1 text-slate-600 bg-white">{s}</span>
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
