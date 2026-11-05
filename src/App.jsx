import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Code2, Mail, Menu, X, Monitor, Layers3, Download, MessageCircle } from "lucide-react";

const projects = [
  { number: "01", title: "BrandForge – Brand Design Studio", category: "Web Development / Abschlussprojekt", year: "2026", description: "Eine interaktive Webanwendung zur Entwicklung und Gestaltung individueller Markenidentitäten. BrandForge verbindet visuelles Design mit moderner Webentwicklung.", goal: "Ein benutzerfreundliches Studio schaffen, in dem sich visuelle Markenkonzepte direkt im Browser entwickeln und anpassen lassen.", contribution: "Konzept und Umsetzung der Anwendung mit React, Context API, Tailwind CSS, Express.js und MongoDB. Funktionen für Bild- und Typografiegestaltung, Farben, Design-Elemente sowie das Speichern und Verwalten von Projekten.", learning: "Wie Frontend, Backend und Datenbank zu einer interaktiven Designanwendung zusammenarbeiten.", image: "/images/brandforge-preview.svg", url: "https://brandforge-75d2.onrender.com/", tags: ["React", "Tailwind CSS", "Express.js", "MongoDB", "UI / UX Design"], featured: true },
  { number: "02", title: "Reaching The Heavens", category: "Cover Design", year: "2025", description: "Ein ausdrucksstarkes Coverkonzept mit kräftigem Orange, enger Bildkomposition und editorialer Typografie.", goal: "Ein eigenständiges Cover mit hohem Wiedererkennungswert gestalten.", contribution: "Bildauswahl, Komposition, Farbwirkung und typografische Hierarchie ausgearbeitet.", learning: "Wie Farbe und Typografie die Stimmung eines visuellen Produkts prägen.", image: "/images/album-cover.jpg", tags: ["Art Direction", "Typography", "Image Editing"] },
  { number: "03", title: "Horror Poster", category: "Filmplakat / Poster Design", year: "2025", description: "Ein atmosphärisches Horrorplakat mit kontrastreicher Bildsprache und dramatischer visueller Wirkung.", goal: "Spannung und Genre allein durch das Key Visual vermitteln.", contribution: "Kontrast, Bildbearbeitung und visuelle Blickführung gestaltet.", learning: "Wie Licht, Kontrast und reduzierte Farbigkeit eine Geschichte erzählen.", image: "/images/horror-poster.jpg", tags: ["Poster Design", "Image Editing", "Visual Storytelling"] },
  { number: "04", title: "Raum & Perspektive", category: "Fotografie", year: "2025", description: "Eine dokumentarische Aufnahme, die Perspektive, Licht und Inszenierung als gestalterische Mittel nutzt.", goal: "Einen alltäglichen Raum aus einer bewusst gewählten Perspektive zeigen.", contribution: "Bildkomposition und Auswahl der Perspektive umgesetzt.", learning: "Wie Blickwinkel und Licht die Wahrnehmung eines Motivs verändern.", image: "/images/photo-collage.png", tags: ["Photography", "Composition"] },
  { number: "05", title: "Kurzfilm — Key Visual", category: "Poster Design", year: "2025", description: "Ein plakatives Filmvisual mit analoger Textur, kontrastreicher Bildsprache und starkem Titelbereich.", goal: "Ein Filmplakat mit klarer visueller Identität entwickeln.", contribution: "Layout, Typografie und Bildwirkung zusammengeführt.", learning: "Wie Titelhierarchie und Textur die Wirkung eines Posters stärken.", image: "/images/film-poster.png", tags: ["Poster", "Visual Design"] },
  { number: "06", title: "Product Study", category: "Produktfotografie", year: "2025", description: "Farbige Lichtsetzung und sorgfältige Komposition für eine atmosphärische Produktaufnahme.", goal: "Ein Produkt durch Licht und Farbe visuell hervorheben.", contribution: "Lichtstimmung, Perspektive und Bildausschnitt gestaltet.", learning: "Wie kontrolliertes Licht die Form und Atmosphäre eines Produkts beeinflusst.", image: "/images/product-photo.png", tags: ["Lighting", "Photography"] }
];

const skillGroups = [
  { title: "Frontend", icon: Code2, tags: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Tools & Workflow", icon: Monitor, tags: ["Git", "GitHub", "VS Code", "Responsive Design"] },
  { title: "Design", icon: Layers3, tags: ["Photoshop", "Illustrator", "InDesign", "Typografie"] }
];

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" /><span>{children}</span></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState(() => localStorage.getItem("portfolio-language") || "de");
  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".project-card, .skill-card, .resume-content article, .about-main, .contact-content").forEach(el => {
      el.classList.add("reveal-item");
      revealObserver.observe(el);
    });
    return () => revealObserver.disconnect();
  }, []);
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({ pageLanguage: "de", includedLanguages: "en,fr,es,it,pt,nl,tr,de", autoDisplay: false }, "google_translate_element");
      }
    };
    if (!document.querySelector('script[data-google-translate="true"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.dataset.googleTranslate = "true";
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);
  const changeLanguage = value => {
    localStorage.setItem("portfolio-language", value);
    setLanguage(value);
    const host = window.location.hostname;
    const parentDomain = host.includes(".") ? host.split(".").slice(-2).join(".") : host;
    if (value === "de") {
      document.cookie = "googtrans=; Max-Age=0; path=/";
      document.cookie = `googtrans=; Max-Age=0; path=/; domain=${host}`;
      document.cookie = `googtrans=; Max-Age=0; path=/; domain=.${parentDomain}`;
      document.cookie = "googtrans=/de/de; path=/";
    } else {
      document.cookie = `googtrans=/de/${value}; path=/`;
      document.cookie = `googtrans=/de/${value}; path=/; domain=${host}`;
      document.cookie = `googtrans=/de/${value}; path=/; domain=.${parentDomain}`;
    }
    window.location.reload();
  };
  const translations = {
    de: { projects: "Projekte", about: "Über mich", skills: "Skills", journey: "Lebenslauf", contact: "Kontakt", discover: "Projekte entdecken", reach: "Kontakt aufnehmen", selected: "Ausgewählte Projekte", resume: "Vollständiger Lebenslauf", language: "Sprache", home: "Startseite" },
    en: { projects: "Projects", about: "About", skills: "Skills", journey: "Resume", contact: "Contact", discover: "Explore projects", reach: "Get in touch", selected: "Selected projects", resume: "Full résumé", language: "Language", home: "Home" },
    fr: { projects: "Projets", about: "À propos", skills: "Compétences", journey: "CV", contact: "Contact", discover: "Voir les projets", reach: "Me contacter", selected: "Projets sélectionnés", resume: "CV complet", language: "Langue", home: "Accueil" },
    es: { projects: "Proyectos", about: "Sobre mí", skills: "Habilidades", journey: "Currículum", contact: "Contacto", discover: "Ver proyectos", reach: "Contactar", selected: "Proyectos seleccionados", resume: "Currículum completo", language: "Idioma", home: "Inicio" },
    it: { projects: "Progetti", about: "Chi sono", skills: "Competenze", journey: "CV", contact: "Contatto", discover: "Scopri i progetti", reach: "Contattami", selected: "Progetti selezionati", resume: "CV completo", language: "Lingua", home: "Home" },
    pt: { projects: "Projetos", about: "Sobre mim", skills: "Competências", journey: "Currículo", contact: "Contato", discover: "Ver projetos", reach: "Entre em contato", selected: "Projetos selecionados", resume: "Currículo completo", language: "Idioma", home: "Início" },
    nl: { projects: "Projecten", about: "Over mij", skills: "Vaardigheden", journey: "CV", contact: "Contact", discover: "Bekijk projecten", reach: "Contact opnemen", selected: "Geselecteerde projecten", resume: "Volledig cv", language: "Taal", home: "Home" },
    tr: { projects: "Projeler", about: "Hakkımda", skills: "Beceriler", journey: "Özgeçmiş", contact: "İletişim", discover: "Projeleri keşfet", reach: "İletişime geç", selected: "Seçili projeler", resume: "Tam özgeçmiş", language: "Dil", home: "Ana sayfa" }
  };
  const t = translations[language] || translations.en;
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div id="google_translate_element" className="google-translate-hidden" aria-hidden="true" /><header className="header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Tim Uhl Startseite">TU<span>.</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        <div className="nav-wrap"><label className="language-picker"><span>{t.language}</span><select value={language} onChange={e => changeLanguage(e.target.value)} aria-label={t.language}><option value="de">Deutsch</option><option value="en">English</option><option value="fr">Français</option><option value="es">Español</option><option value="it">Italiano</option><option value="pt">Português</option><option value="nl">Nederlands</option><option value="tr">Türkçe</option></select></label><nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Hauptnavigation">
          <a className={activeSection === "projects" ? "active" : ""} href="#projects" onClick={closeMenu}>{t.projects}</a><a className={activeSection === "about" ? "active" : ""} href="#about" onClick={closeMenu}>{t.about}</a><a className={activeSection === "skills" ? "active" : ""} href="#skills" onClick={closeMenu}>{t.skills}</a><a className={activeSection === "resume" ? "active" : ""} href="#resume" onClick={closeMenu}>{t.journey}</a><a className={`nav-contact ${activeSection === "contact" ? "active" : ""}`} href="#contact" onClick={closeMenu}>{t.contact} <MessageCircle size={15} /></a>
        </nav></div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-topline"><span>PORTFOLIO / 2026</span><span>WEB DEVELOPMENT × DESIGN</span></div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span className="availability-dot" /> {language === "de" ? "JUNIOR WEB DEVELOPER · DESIGN-HINTERGRUND" : "JUNIOR WEB DEVELOPER · DESIGN BACKGROUND"}</p>
              <h1>{language === "de" ? <>Ich entwickle<br /><span>digitale</span> Erlebnisse</> : <>I build<br /><span>digital</span> experiences</>}<span className="purple-dot">.</span></h1>
              <p className="hero-description">{language === "de" ? "Ich bin Tim Uhl. Ich verbinde mein Gespür für visuelle Gestaltung mit moderner Webentwicklung — für digitale Erlebnisse, die klar aussehen und sich intuitiv anfühlen." : "I’m Tim Uhl. I combine a visual design mindset with modern web development to create digital experiences that feel clear and intuitive."}</p>
              <div className="hero-actions"><a className="button button-primary" href="#projects">{t.discover} <ArrowDownRight size={18} /></a><a className="text-link" href="#resume">{language === "de" ? "Mein Lebenslauf" : "My résumé"} <Download size={16} /></a><a className="text-link" href="#contact">{t.reach} <MessageCircle size={17} /></a></div>
              <div className="hero-meta"><div><span className="meta-number">01</span><span>Gestaltung</span></div><div><span className="meta-number">02</span><span>Entwicklung</span></div><div><span className="meta-number">03</span><span>Neugier</span></div></div>
            </div>
            <a className="hero-art hero-portrait" href="/images/self-portrait.jpg" target="_blank" rel="noreferrer" aria-label="Selbstporträt in voller Größe öffnen"><img src="/images/self-portrait.jpg" alt="Tim Uhl – Selbstporträt vor dunkelblauem Hintergrund" /><span className="portrait-label">TIM UHL / PORTRAIT 2026 ↗</span></a>
          </div>
          <a href="#projects" className="scroll-note"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </section>

        <section className="projects section-wrap" id="projects">
          <div className="section-heading"><SectionLabel number="01">{t.selected}</SectionLabel><div className="heading-row"><h2>{language === "de" ? <>Ausgewählte<br /><span>Projekte.</span></> : <>Selected<br /><span>projects.</span></>}</h2><p>Eine Auswahl aus Webentwicklung, visueller Gestaltung, Fotografie und Medienprojekten.</p></div></div>
          <div className="project-grid">
            {projects.map(project => <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.number}>
              <a className="project-image-wrap" href={project.url || project.image} target="_blank" rel="noreferrer" aria-label={project.url ? `Live-Demo öffnen: ${project.title}` : `Vollbild öffnen: ${project.title}`}><img src={project.image} alt={`Projektvorschau: ${project.title}`} loading="lazy" /><span className="project-number">{project.number}</span><span className="project-open" aria-hidden="true"><ArrowUpRight size={20} /></span></a>
              <div className="project-info"><div className="project-title-row"><div><p className="project-category">{project.category}</p><h3>{project.title}</h3></div><span className="project-year">{project.year}</span></div><p className="project-description">{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><details className="case-study"><summary>{language === "de" ? "Case Study ansehen" : "View case study"}</summary><div><p><b>{language === "de" ? "Ziel" : "Goal"}</b>{project.goal}</p><p><b>{language === "de" ? "Mein Beitrag" : "My contribution"}</b>{project.contribution}</p><p><b>{language === "de" ? "Gelernt" : "What I learned"}</b>{project.learning}</p></div></details>{project.url && <a className="project-live-link" href={project.url} target="_blank" rel="noreferrer">{language === "de" ? "Live-Projekt öffnen" : "Open live project"} <ArrowUpRight size={16} /></a>}</div>
            </article>)}
          </div>
        </section>

        <section className="about-section" id="about"><div className="section-wrap about-layout">
          <div className="about-side"><SectionLabel number="02">A little about me</SectionLabel><p className="side-note">Kreativität ist nicht nur, wie etwas aussieht. Sondern auch, wie es funktioniert.</p></div>
          <div className="about-main"><h2>Vom visuellen Denken<br />zum <span>digitalen Machen.</span></h2><p className="about-lead">Mein Hintergrund liegt in der Foto- und Medientechnik. Dabei habe ich gelernt, mit Bildsprache, Typografie und Komposition bewusst umzugehen. Heute erweitere ich diese Perspektive um Webentwicklung.</p><p className="about-body">Mich interessiert die Verbindung aus sauberem Code und gutem Design: verständliche Strukturen, responsive Layouts und Details, die ein digitales Produkt rund machen. Ich lerne kontinuierlich dazu und setze neue Kenntnisse direkt in eigenen Projekten um.</p>
            <div className="about-stats"><div><span className="stat-big">01</span><span className="stat-label">Design Mindset</span></div><div><span className="stat-big">02</span><span className="stat-label">Code in Progress</span></div><div><span className="stat-big">∞</span><span className="stat-label">Lust zu lernen</span></div></div>
          </div>
        </div></section>

        <section className="skills section-wrap" id="skills"><div className="section-heading"><SectionLabel number="03">Tools & capabilities</SectionLabel><div className="heading-row"><h2>{language === "de" ? <>Mein <span>Werkzeug.</span></> : <>My <span>toolkit.</span></>}</h2><p>Technik und Gestaltung gehören für mich zusammen. Diese Übersicht ist bewusst kompakt gehalten und kann an deine tatsächlichen Kenntnisse angepasst werden.</p></div></div>
          <div className="skills-grid">{skillGroups.map((skill, index) => { const Icon = skill.icon; return <article className="skill-card" key={skill.title}><div className="skill-icon"><Icon size={21} /></div><span className="skill-index">0{index + 1} / 03</span><h3>{skill.title}</h3><div className="skill-tags">{skill.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>; })}</div>
        </section>

        <section className="resume-section" id="resume"><div className="section-wrap resume-layout"><div className="resume-heading"><SectionLabel number="04">Curriculum vitae</SectionLabel><p className="resume-kicker">DESIGN × DEVELOPMENT × CURIOSITY</p><h2>{t.resume}<span className="purple-dot">.</span></h2><p>Tim Uhl · Junior Web Developer | Webdesign & digitale Gestaltung</p><div className="resume-actions"><button type="button" className="button button-primary" onClick={() => window.print()}><Download size={17} /> Lebenslauf drucken / PDF speichern</button><a className="text-link" href="mailto:tim.uhl@outlook.de">Kontakt aufnehmen <MessageCircle size={16} /></a></div><div className="resume-highlight"><span className="resume-highlight-mark">TU.</span><div><b>Visuelles Denken.</b><br /><span>Technische Umsetzung.</span></div></div></div><div className="resume-content"><h3>Profil</h3><p>Kreativer Berufseinsteiger mit Hintergrund in Foto- und Medientechnik und wachsender Spezialisierung auf Webentwicklung. Ich verbinde gestalterisches Verständnis mit technischem Interesse und arbeite an modernen, responsiven und benutzerfreundlichen Websites.</p><h3>Persönliche Angaben</h3><p><b>Name:</b> Tim Uhl</p><p><b>Geburtsdatum:</b> 25.12.2006</p><p><b>Adresse:</b> Kärntenerstrasse 9, 68753 Kirrlach</p><p><b>Sprachen:</b> Deutsch und Englisch</p><p><b>Interessen:</b> Fahrrad fahren</p><h3>Berufserfahrung und Weiterbildung</h3><article><b>09/2026 – 11/2026 · Codelabs Web Development Bootcamp</b><p>Abgeschlossenes Web Development Bootcamp mit eigenständigem Abschlussprojekt BrandForge – Brand Design Studio.</p></article><article><b>07/2026 – 08/2026 · Codelabs Bootcamp Prework</b><p>Vorbereitende Lerninhalte und selbstständige Übungen.</p></article><article><b>01/2026 – 02/2026 · SHIRTS UNITED, Mannheim</b><p>Mitarbeit im Bereich Mediengestaltung und Umsetzung visueller Ideen.</p></article><article><b>10/2025 · Universitätsklinikum Mannheim</b><p>Praktikum in der Grafikabteilung mit Einblicken in Gestaltung und Arbeitsabläufe.</p></article><h3>Schullaufbahn</h3><article><b>2023 – 2025 · AFK Mannheim</b><p>Berufskolleg für Foto- und Medientechnik · Fachhochschulreife.</p></article><article><b>2017 – 2023 · JPH Realschule Waghäusel</b><p>Realschulabschluss.</p></article><article><b>2013 – 2017 · Schillerschule Kirrlach</b><p>Grundschulabschluss.</p></article><h3>Kenntnisse</h3><p>Webentwicklung: HTML, CSS, JavaScript, React. Tools und Workflow: Git, GitHub, VS Code, Responsive Design. Design und Medien: Adobe Photoshop, Illustrator und InDesign, Typografie, Bildbearbeitung, Fotografie und visuelle Gestaltung. Sprachen: Deutsch und Englisch.</p><h3>Projekte</h3><article><b>Abschluss-Website – Codelabs Web Development Bootcamp</b><p>BrandForge – Brand Design Studio: interaktive Webanwendung zur Gestaltung und Verwaltung von Markenidentitäten. Die Live-Anwendung verbindet React, Tailwind CSS, Express.js und MongoDB. <a href="https://brandforge-75d2.onrender.com/" target="_blank" rel="noreferrer">BrandForge live öffnen ↗</a></p></article><article><b>Weitere Designarbeiten</b><p>Ausgewählte Arbeiten aus Grafikdesign, Bildbearbeitung, Fotografie, Covergestaltung, Produktfotografie und Filmplakatgestaltung.</p></article><h3>Kontakt</h3><p><a href="mailto:tim.uhl@outlook.de">tim.uhl@outlook.de</a> · +49 1590 1712931</p></div></div></section>

        <section className="contact section-wrap" id="contact"><SectionLabel number="05">Let's talk</SectionLabel><div className="contact-content"><p className="eyebrow">{language === "de" ? "DU HAST EIN PROJEKT ODER EINE IDEE?" : "HAVE A PROJECT OR AN IDEA?"}</p><h2>{language === "de" ? <>Lass uns etwas<br /><span>entwickeln.</span></> : <>Let’s build<br /><span>something.</span></>}</h2><p className="contact-description">{language === "de" ? "Ich freue mich über Austausch, spannende Einstiegsgelegenheiten und kreative Projekte." : "I’m open to conversations, exciting opportunities and creative projects."}</p><a className="button button-primary contact-button" href="mailto:tim.uhl@outlook.de">{language === "de" ? "Schreib mir eine E-Mail" : "Send me an email"} <MessageCircle size={18} /></a></div><div className="contact-bottom"><a href="mailto:tim.uhl@outlook.de"><Mail size={16} /> tim.uhl@outlook.de</a><span className="contact-location"><span className="availability-dot" /> Offen für neue Möglichkeiten</span></div></section>
      </main>

      <footer className="footer section-wrap"><a className="wordmark footer-mark" href="#home">TU<span>.</span></a><p>Designed with intention. Built with curiosity.</p><a href="#home" className="back-top">Back to top <ArrowUpRight size={15} /></a><span className="copyright">© 2026 Tim Uhl</span></footer>
    </div>
  );
}