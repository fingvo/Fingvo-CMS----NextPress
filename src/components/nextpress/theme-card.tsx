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
import { cn } from "@/lib/utils";

type Theme = {
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  active?: boolean;
};

export function ThemeCard({ theme }: { theme: Theme }) {
  const { toast } = useToast();

  const handleActivate = () => {
    toast({
      title: "Theme Activated",
      description: `${theme.name} is now your active theme.`,
    });
  };

  return (
    <Card className={cn("flex flex-col overflow-hidden", theme.active && "border-primary")}>
      <CardHeader className="p-0 relative">
        <div className="relative h-56 w-full">
          <Image
            src={theme.imageUrl}
            alt={theme.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={theme.imageHint}
          />
        </div>
         {theme.active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Active Theme</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle>{theme.name}</CardTitle>
        <CardDescription className="text-xs">by {theme.author}</CardDescription>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="w-full">
          Live Preview
        </Button>
        <Button
          className="w-full"
          onClick={handleActivate}
          disabled={theme.active}
        >
          {theme.active ? "Activated" : "Activate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
