import { ThemeCard } from "@/components/nextpress/theme-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const themes = [
  {
    name: "Minimalist",
    author: "NextPress Team",
    description: "A clean, content-focused theme for writers and bloggers.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "minimalist blog",
    active: true,
  },
  {
    name: "Portfolio Pro",
    author: "Creative Minds",
    description: "Showcase your work with this stunning portfolio theme.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "art portfolio",
    active: false,
  },
  {
    name: "E-Commerce",
    author: "NextPress Commerce",
    description: "A feature-rich theme for your online store.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "online store",
    active: false,
  },
  {
    name: "Magazine",
    author: "PressWorks",
    description: "A modern theme for news sites and online magazines.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "news website",
    active: false,
  },
  {
    name: "Corporate",
    author: "Business Solutions",
    description: "A professional theme for your business website.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "corporate building",
    active: false,
  },
  {
    name: "Photo-Journal",
    author: "Pixel Perfect",
    description: "A beautiful theme for photographers and visual storytellers.",
    imageUrl: "https://placehold.co/400x300",
    imageHint: "camera lens",
    active: false,
  },
];

export default function ThemesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Themes</h1>
          <p className="text-muted-foreground">
            Change your site's appearance with a new theme.
          </p>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search themes..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </div>
    </div>
  );
}
