import { PluginCard } from "@/components/nextpress/plugin-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const plugins = [
  {
    name: "SEO Pro",
    author: "NextPress Team",
    description: "Advanced SEO tools to boost your site's ranking.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "chart graph",
    installed: true,
    active: true,
  },
  {
    name: "AI Content Generator",
    author: "NextPress AI",
    description: "Generate articles and ideas with the power of AI.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "robot brain",
    installed: true,
    active: false,
  },
  {
    name: "Performance Cache",
    author: "NextPress Team",
    description: "Speed up your site with advanced caching mechanisms.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "speed rocket",
    installed: false,
  },
  {
    name: "Contact Form 7",
    author: "Takayuki Miyoshi",
    description: "Simple and flexible contact form plugin.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "email letter",
    installed: false,
  },
  {
    name: "Social Share",
    author: "NextPress Team",
    description: "Add social sharing buttons to your content.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "social media",
    installed: true,
    active: true,
  },
  {
    name: "WooCommerce Bridge",
    author: "NextPress Commerce",
    description: "Integrate your e-commerce store seamlessly.",
    imageUrl: "https://placehold.co/400x200",
    imageHint: "shopping cart",
    installed: false,
  },
];

export default function PluginsPage() {
  const installedPlugins = plugins.filter((p) => p.installed);
  const activePlugins = plugins.filter((p) => p.installed && p.active);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Plugins</h1>
          <p className="text-muted-foreground">
            Extend your site&apos;s functionality with plugins.
          </p>
        </div>
         <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search plugins..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plugins.map((plugin) => (
              <PluginCard key={plugin.name} plugin={plugin} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="installed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedPlugins.map((plugin) => (
              <PluginCard key={plugin.name} plugin={plugin} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePlugins.map((plugin) => (
              <PluginCard key={plugin.name} plugin={plugin} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
