"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Plugin = {
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  installed?: boolean;
  active?: boolean;
};

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const { toast } = useToast();

  const handleInstall = () => {
    toast({
      title: "Plugin Installed",
      description: `${plugin.name} has been successfully installed.`,
    });
  };

  const handleActivate = () => {
    toast({
      title: "Plugin Activated",
      description: `${plugin.name} is now active.`,
    });
  };

  const handleDeactivate = () => {
    toast({
        title: "Plugin Deactivated",
        description: `${plugin.name} is now inactive.`,
        variant: 'destructive'
    });
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={plugin.imageUrl}
            alt={plugin.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            data-ai-hint={plugin.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle>{plugin.name}</CardTitle>
        <CardDescription className="text-xs">by {plugin.author}</CardDescription>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {plugin.description}
        </p>
      </CardContent>
      <CardFooter>
        {plugin.installed ? (
          plugin.active ? (
            <Button variant="outline" className="w-full" onClick={handleDeactivate}>
              Deactivate
            </Button>
          ) : (
            <Button className="w-full" onClick={handleActivate}>Activate</Button>
          )
        ) : (
          <Button className="w-full" onClick={handleInstall}>Install Now</Button>
        )}
      </CardFooter>
    </Card>
  );
}
