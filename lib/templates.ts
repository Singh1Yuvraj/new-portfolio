import MinimalTheme from "@/components/templates/MinimalTheme";
import ModernTheme from "@/components/templates/ModernTheme";
import DeveloperTheme from "@/components/templates/DeveloperTheme";
import CreativeTheme from "@/components/templates/CreativeTheme";
import ProfessionalTheme from "@/components/templates/ProfessionalTheme";
import DarkProTheme from "@/components/templates/DarkProTheme";

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  component: React.ComponentType<{ data: any }>;
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, typography-first, white aesthetic. Ideal for writers, researchers, and minimalists.",
    tags: ["clean", "simple", "minimalist"],
    thumbnail: "/templates/minimal.png",
    component: MinimalTheme,
  },
  {
    id: "modern",
    name: "Modern Glow",
    description: "Bold backdrop gradients, glassmorphism cards, and smooth modern hover actions.",
    tags: ["gradient", "dark mode", "sleek"],
    thumbnail: "/templates/modern.png",
    component: ModernTheme,
  },
  {
    id: "developer",
    name: "Terminal CLI",
    description: "Interactive hacker terminal aesthetic with mock bash console commands.",
    tags: ["terminal", "retro", "monospace"],
    thumbnail: "/templates/developer.png",
    component: DeveloperTheme,
  },
  {
    id: "creative",
    name: "Neo Brutalist",
    description: "Vibrant high-contrast blocks, heavy drop shadows, offset layouts, and bold elements.",
    tags: ["colorful", "bold", "artistic"],
    thumbnail: "/templates/creative.png",
    component: CreativeTheme,
  },
  {
    id: "professional",
    name: "Corporate Executive",
    description: "Structured double-column timeline format. Conservative and authoritative.",
    tags: ["corporate", "clean", "structured"],
    thumbnail: "/templates/professional.png",
    component: ProfessionalTheme,
  },
  {
    id: "dark",
    name: "Dark Pro Neon",
    description: "Deep obsidian workspace accented by futuristic neon cyan and emerald indicators.",
    tags: ["neon", "obsidian", "dark mode"],
    thumbnail: "/templates/dark.png",
    component: DarkProTheme,
  },
];
