
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, Copy, Check, Calendar as CalendarIcon, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OptimizeContentEngagementOutput } from "@/ai/flows/optimize-content-engagement";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Editor } from "@tinymce/tinymce-react";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  status: z.enum(["draft", "published", "scheduled"]),
  publishedAt: z.date().optional(),
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
      status: "draft",
      targetAudience: "",
      engagementGoal: "",
      stylePreferences: "",
    },
  });

  const watchStatus = form.watch("status");

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
        <div className="lg:col-span-2 space-y-6">
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
                       <Editor
                        apiKey="cgwzpv6z7t4ht8z6eksz1pi3rl5cm4matgzk6w6uq47s73l4"
                        value={field.value}
                        onEditorChange={(content) => field.onChange(content)}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                            'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                            'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchStatus === 'scheduled' && (
                  <FormField
                    control={form.control}
                    name="publishedAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Publish Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
            </CardContent>
             <CardFooter className="justify-end">
                <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save {contentType}
                </Button>
            </CardFooter>
          </Card>

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
