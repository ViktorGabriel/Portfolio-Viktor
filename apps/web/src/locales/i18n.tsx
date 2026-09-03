import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt-BR' | 'en-US';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  'pt-BR': {
    'nav.dossier': 'DOSSIER',
    'nav.telemetry': 'TELEMETRIA',
    'nav.architecture': 'ARQUITETURA',
    'nav.blueprints': 'BLUEPRINTS',
    'nav.cli': 'CLI',
    'nav.contact': 'CONTATO',
    'nav.online': 'ONLINE',
    'nav.role': 'Software Engineer',
    'nav.bff': 'BFF',
    'hero.label': '// ENGENHARIA DE SISTEMAS',
    'hero.title1': 'CONSTRUINDO INFRAESTRUTURA',
    'hero.title2': 'ESCALÁVEL & RESILIENTE',
    'hero.subtitle': 'CLEAN ARCHITECTURE & MICROSERVIÇOS RESILIENTES',
    'hero.desc1': 'Portfólio de ',
    'hero.desc2': ' — backends de alta performance com Node.js & TypeScript, padrões SOLID rigorosos e tolerância a falhas by design.',
    'app.archTitle': '// SYSTEM ARCHITECTURE INSPECTOR',
    'app.cliTitle': '// CLI CONSOLE INTERFACE',
    'app.blueprintsTitle': '// ENGINEERING BLUEPRINTS',
    'app.blueprintsSubtitle': 'System Architecture & Solutions',
    'app.blueprintsDesc': 'Produção focada em microsserviços de alto throughput, pipelines dirigidos a eventos e APIs distribuídas.',
    'app.footerChannel': 'COMMUNICATION CHANNEL OPEN',
    'app.footerTitle': 'Pronto para Construir Soluções de Alto Impacto?',
    'app.footerDesc': 'Disponível para posições de engenharia de software, arquitetura de backend e projetos com foco em alta performance.',
    'app.footerCopyright': '© {year} Viktor Gabriel • Clean Architecture • SOLID • Distributed Systems',
    
    // Dossier Section
    'dossier.badge': '// ABOUT // TECHNICAL DOSSIER',
    'dossier.portraitLabel': 'VG.PORTRAIT',
    'dossier.portraitStatus': '◈ ATIVO',
    'dossier.roleKey': 'CARGO',
    'dossier.roleVal': 'Engenheiro Backend / Estudante de Engenharia de Software (6º Período)',
    'dossier.locKey': 'LOCALIZAÇÃO',
    'dossier.locVal': 'Contagem, Minas Gerais, Brasil',
    'dossier.langKey': 'IDIOMAS',
    'dossier.langVal': 'Inglês (B2 / Técnico) · Português (Nativo)',
    'dossier.availKey': 'DISPONIBILIDADE',
    'dossier.availVal': 'Aberto a Estágio em Backend / Vagas Júnior',
    'dossier.header': '// PERFIL DE SISTEMA & FOCO EM ARQUITETURA',
    'dossier.summaryP1': 'Engenheiro backend e estudante de engenharia de software (6º período) com foco na construção de ',
    'dossier.summaryP1_bold1': 'sistemas desacoplados em nível de produção',
    'dossier.summaryP1_mid': ' utilizando ',
    'dossier.summaryP1_bold2': 'Node.js, TypeScript e Java',
    'dossier.summaryP1_dot': '. ',
    'dossier.summaryP2': 'Defensor da disciplina rigorosa de ',
    'dossier.summaryP2_bold1': 'Clean Architecture & SOLID',
    'dossier.summaryP2_mid': ', persistência com ',
    'dossier.summaryP2_bold2': 'PostgreSQL / SQL',
    'dossier.summaryP2_mid2': ', e entrega orientada a contêineres com ',
    'dossier.summaryP2_bold3': 'Docker',
    'dossier.summaryP2_end': '. Focado em oportunidades onde o rigor de engenharia, modelagem de domínio e resiliência de sistemas sejam prioridade.',
    'dossier.pillarArch': 'Arquitetura & Padrões',
    'dossier.pillarData': 'Dados & Persistência',
    'dossier.pillarDevOps': 'DevOps & Ferramental',
    'dossier.credsHeader': '// CREDENCIAIS & CERTIFICAÇÕES',
    'dossier.cvBtn': '[ Baixar Currículo Completo.pdf ]',
    'dossier.githubBtn': '[ Inspecionar Código / GitHub ]',
    'dossier.lastUpdated': 'ÚLTIMA_ATUALIZAÇÃO: 2026.08 // ARTEFATO_VERIFICADO',
  },
  'en-US': {
    'nav.dossier': 'DOSSIER',
    'nav.telemetry': 'TELEMETRY',
    'nav.architecture': 'ARCHITECTURE',
    'nav.blueprints': 'BLUEPRINTS',
    'nav.cli': 'CLI',
    'nav.contact': 'CONTACT',
    'nav.online': 'ONLINE',
    'nav.role': 'Software Engineer',
    'nav.bff': 'BFF',
    'hero.label': '// SYSTEMS ENGINEERING',
    'hero.title1': 'BUILDING INFRASTRUCTURE',
    'hero.title2': 'SCALABLE & RESILIENT',
    'hero.subtitle': 'CLEAN ARCHITECTURE & RESILIENT MICROSERVICES',
    'hero.desc1': 'Portfolio of ',
    'hero.desc2': ' — high-performance backends with Node.js & TypeScript, strict SOLID patterns and fault tolerance by design.',
    'app.archTitle': '// SYSTEM ARCHITECTURE INSPECTOR',
    'app.cliTitle': '// CLI CONSOLE INTERFACE',
    'app.blueprintsTitle': '// ENGINEERING BLUEPRINTS',
    'app.blueprintsSubtitle': 'System Architecture & Solutions',
    'app.blueprintsDesc': 'Production focused on high-throughput microservices, event-driven pipelines and distributed APIs.',
    'app.footerChannel': 'COMMUNICATION CHANNEL OPEN',
    'app.footerTitle': 'Ready to Build High-Impact Solutions?',
    'app.footerDesc': 'Available for software engineering positions, backend architecture and projects focused on high performance.',
    'app.footerCopyright': '© {year} Viktor Gabriel • Clean Architecture • SOLID • Distributed Systems',

    // Dossier Section
    'dossier.badge': '// ABOUT // TECHNICAL DOSSIER',
    'dossier.portraitLabel': 'VG.PORTRAIT',
    'dossier.portraitStatus': '◈ ACTIVE',
    'dossier.roleKey': 'ROLE',
    'dossier.roleVal': 'Backend Engineer / Software Engineering Student (6th Sem)',
    'dossier.locKey': 'LOCATION',
    'dossier.locVal': 'Contagem, Minas Gerais, Brazil',
    'dossier.langKey': 'LANGUAGES',
    'dossier.langVal': 'English (B2 / Technical) · Portuguese (Native)',
    'dossier.availKey': 'AVAILABILITY',
    'dossier.availVal': 'Open to Backend Internships / Junior Roles',
    'dossier.header': '// SYSTEM PROFILE & ARCHITECTURE FOCUS',
    'dossier.summaryP1': 'Backend engineer and software engineering student (6th semester) with a focus on building ',
    'dossier.summaryP1_bold1': 'production-grade, decoupled systems',
    'dossier.summaryP1_mid': ' using ',
    'dossier.summaryP1_bold2': 'Node.js, TypeScript, and Java',
    'dossier.summaryP1_dot': '. ',
    'dossier.summaryP2': 'Advocates for strict ',
    'dossier.summaryP2_bold1': 'Clean Architecture & SOLID',
    'dossier.summaryP2_mid': ' discipline, persistence with ',
    'dossier.summaryP2_bold2': 'PostgreSQL / SQL',
    'dossier.summaryP2_mid2': ', and container-first delivery with ',
    'dossier.summaryP2_bold3': 'Docker',
    'dossier.summaryP2_end': '. Targets roles where engineering rigour, domain modelling, and system resilience matter.',
    'dossier.pillarArch': 'Architecture & Patterns',
    'dossier.pillarData': 'Data & Persistence',
    'dossier.pillarDevOps': 'DevOps & Tooling',
    'dossier.credsHeader': '// CREDENTIALS & CERTIFICATIONS',
    'dossier.cvBtn': '[ Download Full CV.pdf ]',
    'dossier.githubBtn': '[ Inspect Source / GitHub ]',
    'dossier.lastUpdated': 'LAST_UPDATED: 2026.08 // VERIFIED_ARTIFACT',
  }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'pt-BR' || saved === 'en-US') ? saved as Language : 'pt-BR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }
  return context;
};
