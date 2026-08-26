// Central content loader. Every section of the site reads its data from
// here, and this reads straight from the JSON files in /src/content.
// To update the site's content, edit the JSON files — no component code
// needs to change.

import profile from "@/content/profile.json";
import experience from "@/content/experience.json";
import projects from "@/content/projects.json";
import research from "@/content/research.json";
import skills from "@/content/skills.json";
import certifications from "@/content/certifications.json";
import achievements from "@/content/achievements.json";
import gallery from "@/content/gallery.json";
import socials from "@/content/socials.json";
import testimonials from "@/content/testimonials.json";
import blog from "@/content/blog.json";

export interface Profile {
  name: string;
  initials: string;
  title: string;
  titleRoles: string[];
  tagline: string;
  summary: string;
  shortBio: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  photo: string;
  availability: string;
  availabilityStatus: string;
  languages: string[];
  interests: string[];
  stats: { label: string; value: string }[];
  education: {
    degree: string;
    branch: string;
    institution: string;
    location: string;
    expected: string;
    cgpa: string;
    logo: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  logo: string | null;
  type: string;
  location: string;
  duration: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  duration: string;
  featured: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  image: string;
  status: string;
  /** IDs of research.json papers that this project's work was published/presented as */
  researchIds?: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  conference: string;
  venue: string;
  year: string;
  status: string;
  indexing: string;
  abstract: string;
  image?: string;
  fileUrl?: string;
  /** true once the paper has an active, indexed listing on IEEE Xplore */
  ieeeLive: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string | null;
  year: string | null;
  credentialUrl: string | null;
  image?: string;
  fileUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  logo?: string;
  image?: string;
  fileUrl?: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  caption: string;
  image: string;
  logo?: boolean;
}

export interface Socials {
  github: string;
  linkedin: string;
  googleScholar: string;
  ieee?: string;
  gdgCommunity?: string;
  email: string;
  phone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export const getProfile = (): Profile => profile as Profile;
export const getExperience = (): ExperienceItem[] => experience as ExperienceItem[];
export const getProjects = (): Project[] => projects as Project[];
export const getResearch = (): ResearchPaper[] => research as ResearchPaper[];
export const getSkills = (): SkillCategory[] => skills as SkillCategory[];
export const getCertifications = (): Certification[] => certifications as Certification[];
export const getAchievements = (): Achievement[] => achievements as Achievement[];
export const getGallery = (): GalleryItem[] => gallery as GalleryItem[];
export const getSocials = (): Socials => socials as Socials;
export const getTestimonials = (): Testimonial[] => testimonials as Testimonial[];
export const getBlogPosts = (): BlogPost[] => blog as BlogPost[];
