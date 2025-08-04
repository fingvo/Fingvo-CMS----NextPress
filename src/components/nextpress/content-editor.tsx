
"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { optimizeContentAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OptimizeContentEngagementOutput } from "@/ai/flows/optimize-content-engagement";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  targetAudience: z.string().optional(),
  engagementGoal: z.string().optional(),
  stylePreferences: z.string().optional(),
});

type ContentEditorProps = {
  isNew: boolean;
  contentType: string;
  contentId?: string;
};

export function ContentEditor({ isNew, contentType }: ContentEditorProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [aiResult, setAiResult] = useState<OptimizeContentEngagementOutput | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      targetAudience: "",
      engagementGoal: "",
      stylePreferences: "",
    },
  });

  const handleOptimize = async () => {
    const { content, targetAudience, engagementGoal, stylePreferences } = form.getValues();

    if (content.length < 10) {
      toast({
        title: "Content Too Short",
        description: "Please write at least 10 characters before optimizing.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      setAiResult(null);
      const result = await optimizeContentAction({
        content,
        targetAudience: targetAudience || "General audience",
        engagementGoal: engagementGoal || "Increase engagement",
        stylePreferences: stylePreferences || "None",
      });
      setAiResult(result);
    });
  };

  const applySuggestion = () => {
    if (aiResult) {
      form.setValue("content", aiResult.optimizedContent, { shouldValidate: true });
      toast({
        title: "Suggestion Applied",
        description: "The optimized content has been applied to the editor.",
      });
    }
  };

  const copyToClipboard = () => {
    if (aiResult) {
      navigator.clipboard.writeText(aiResult.optimizedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Saved`,
        description: `Your ${contentType} has been successfully saved.`,
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{isNew ? "Create" : "Edit"} {contentType}</CardTitle>
              <CardDescription>
                Fill in the details below to create your new {contentType}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your awesome title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Start writing your masterpiece..."
                        className="min-h-[300px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Button type="submit">Save {contentType}</Button>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Optimizer</CardTitle>
              <CardDescription>
                Refine your content for better engagement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                          <Input placeholder="e.g., Developers, Marketers" {...field} />
                      </FormControl>
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="engagementGoal"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Engagement Goal</FormLabel>
                      <FormControl>
                          <Input placeholder="e.g., More shares, comments" {...field} />
                      </FormControl>
                  </FormItem>
                  )}
              />
               <FormField
                  control={form.control}
                  name="stylePreferences"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Style Preferences</FormLabel>
                      <FormControl>
                          <Input placeholder="e.g., Casual, professional" {...field} />
                      </FormControl>
                  </FormItem>
                  )}
              />
              <Button onClick={handleOptimize} disabled={isPending} className="w-full" type="button">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Optimize with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {isPending && (
               <Card>
                  <CardContent className="p-6 text-center">
                      <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Generating suggestions...</p>
                  </CardContent>
              </Card>
          )}

          {aiResult && (
            <Card>
              <CardHeader>
                  <CardTitle>AI Suggestion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                      <h4 className="font-semibold text-sm mb-2">Optimized Content</h4>
                      <div className="relative rounded-md border bg-muted p-4 text-sm font-code">
                          <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 h-7 w-7"
                              onClick={copyToClipboard}
                              type="button"
                          >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                          {aiResult.optimizedContent}
                      </div>
                  </div>
                  <div>
                      <h4 className="font-semibold text-sm mb-2">Suggested Styles</h4>
                      <div className="flex flex-wrap gap-2">
                          {aiResult.suggestedStyles.map((style, i) => (
                              <Badge key={i} variant="secondary">{style}</Badge>
                          ))}
                      </div>
                  </div>
                   <div>
                      <h4 className="font-semibold text-sm mb-2">Explanation</h4>
                      <p className="text-sm text-muted-foreground italic">
                          &quot;{aiResult.explanation}&quot;
                      </p>
                  </div>
                  <Button onClick={applySuggestion} className="w-full" type="button">Apply Suggestion</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </form>
    </Form>
  );
}
