export enum Language {
  EN = 'en',
  AR = 'ar'
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'PenTool' | 'Monitor' | 'Share2' | 'Megaphone' | 'Activity' | 'FileText';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Content {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    heading: string;
    description: string;
    stats: { label: string; value: string }[];
    modal: {
      btnText: string;
      arabicTitle: string;
      englishTitle: string;
      arabicText: string;
      englishText: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    items: Service[];
  };
  work: {
    title: string;
    subtitle: string;
    tabs: string[];
  };
  partners: {
    title: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  contact: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    cta: string;
  };
  nav: NavItem[];
}
