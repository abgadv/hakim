import { Content } from './types';
import { TESTIMONIALS_DATA } from './constants';

const ABOUT_TEXT_EN = `I am Mohamed Hakim, a young physician with a strong passion for digital marketing, driven by a deep belief that the medical market is not a conventional one. It is a highly specialized field with its own standards, rules, and sensitivities—far removed from traditional marketing approaches.

Being a doctor myself, I have gained a comprehensive understanding of the true nature of the medical market, its real challenges, and the gaps that conventional marketing agencies often fail to address. I firmly believe that medical marketing must be built and managed with a medical mindset—one that understands the profession, respects its ethics, and accurately identifies the needs of healthcare professionals and medical institutions.

Based on this vision, and supported by my background in digital marketing, I established a fully specialized team of physicians who share the same passion, the same deep understanding of the medical field, and the same commitment to delivering impactful and ethical marketing solutions.

We chose to focus exclusively on the medical sector, with a clear mission:
to create marketing solutions that originate from within the medical community itself—practical, effective, and sustainable.

That is why our philosophy is summed up in one simple slogan:
“From Doctors… To Doctors.”`;

export const CONTENT_EN: Content = {
  nav: [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  hero: {
    badge: 'Medical Marketing Redefined',
    title: 'From Doctors, To Doctors.',
    subtitle: 'Specialized branding and marketing solutions tailored for the healthcare industry. Trust, precision, and medical expertise combined with world-class design.',
    ctaPrimary: 'Start Your Journey',
    ctaSecondary: 'View Our Work',
  },
  about: {
    title: 'Who We Are',
    heading: 'Bridging the gap between Medicine and Marketing',
    description: 'Founded by Dr. Mohamed Hakeem, we understand the nuances of the medical field that general agencies miss. We craft narratives that resonate with patients and build authority for practitioners.',
    stats: [
      { label: 'Happy Doctors', value: '150+' },
      { label: 'Campaigns', value: '500+' },
      { label: 'Years Exp.', value: '8+' },
    ],
    modal: {
      btnText: 'Know More',
      arabicTitle: 'عن د. محمد حكيم',
      englishTitle: 'About Dr. Mohamed Hakeem',
      arabicText: '', 
      englishText: ABOUT_TEXT_EN
    }
  },
  services: {
    title: 'Our Expertise',
    subtitle: 'Comprehensive solutions for medical growth',
    items: [
      { id: 's1', title: 'Social Media Designs', description: 'High-end visuals tailored for medical brands to engage patients.', iconName: 'Share2' },
      { id: 's2', title: 'Visual Identity & Branding', description: 'Logos, color palettes, and guidelines that exude trust.', iconName: 'PenTool' },
      { id: 's3', title: 'Advertising Campaigns', description: 'Targeted ROI-focused campaigns for clinics and hospitals.', iconName: 'Megaphone' },
      { id: 's4', title: 'Website Design', description: 'Modern, fast, and accessible websites for healthcare.', iconName: 'Monitor' },
      { id: 's5', title: 'Marketing Consultation', description: 'Strategic growth planning from a medical perspective.', iconName: 'Activity' },
      { id: 's6', title: 'Medical Content Writing', description: 'Accurate, compliant, and engaging medical copy.', iconName: 'FileText' },
    ]
  },
  work: {
    title: 'Selected Works',
    subtitle: 'A glimpse into our visual excellence',
    tabs: [], // Removed filter tabs
  },
  partners: {
    title: 'Partners of Success',
  },
  testimonials: {
    title: 'Testimonials',
    subtitle: 'What our partners say about us',
    items: TESTIMONIALS_DATA
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to elevate your medical practice? Let’s talk.',
    phoneLabel: 'Call Us Directly',
    cta: 'Book a Consultation',
  }
};