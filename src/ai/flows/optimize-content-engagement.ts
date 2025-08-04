'use server';

/**
 * @fileOverview AI tool that helps content creators generate content variations for better engagement by suggesting specific styles.
 *
 * - optimizeContentEngagement - A function that handles the content optimization process.
 * - OptimizeContentEngagementInput - The input type for the optimizeContentEngagement function.
 * - OptimizeContentEngagementOutput - The return type for the optimizeContentEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeContentEngagementInputSchema = z.object({
  content: z.string().describe('The original content to be optimized.'),
  targetAudience: z.string().describe('The intended audience for the content.'),
  engagementGoal: z.string().describe('The desired engagement outcome (e.g., more shares, comments, clicks).'),
  stylePreferences: z.string().optional().describe('Optional style preferences or examples of successful content styles.'),
});
export type OptimizeContentEngagementInput = z.infer<typeof OptimizeContentEngagementInputSchema>;

const OptimizeContentEngagementOutputSchema = z.object({
  optimizedContent: z.string().describe('The AI-optimized content variation.'),
  suggestedStyles: z.array(z.string()).describe('Specific content styles suggested for better engagement.'),
  explanation: z.string().describe('Explanation of why the content was optimized in this way.'),
});
export type OptimizeContentEngagementOutput = z.infer<typeof OptimizeContentEngagementOutputSchema>;

export async function optimizeContentEngagement(input: OptimizeContentEngagementInput): Promise<OptimizeContentEngagementOutput> {
  return optimizeContentEngagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeContentEngagementPrompt',
  input: {schema: OptimizeContentEngagementInputSchema},
  output: {schema: OptimizeContentEngagementOutputSchema},
  prompt: `You are an AI assistant that helps content creators generate content variations that have better engagement.

You will analyze the provided content, target audience, engagement goal, and style preferences (if any) to suggest optimized content and specific styles that tend to yield better results.

Original Content: {{{content}}}
Target Audience: {{{targetAudience}}}
Engagement Goal: {{{engagementGoal}}}
Style Preferences: {{{stylePreferences}}}

Instructions:
1. Analyze the content for potential areas of improvement in terms of engagement.
2. Suggest optimized content variations that are more likely to resonate with the target audience and achieve the engagement goal.
3. Identify and suggest specific content styles that have proven successful in similar contexts.
4. Provide a clear explanation of why the content was optimized in this way, highlighting the rationale behind the suggested changes.

Output the optimized content, suggested styles, and explanation in the format specified by the schema.

Here's an example output format:
{
  "optimizedContent": "[Optimized content variation]",
  "suggestedStyles": ["[Specific content style 1]", "[Specific content style 2]"],
  "explanation": "[Explanation of the optimization]"
}`,
});

const optimizeContentEngagementFlow = ai.defineFlow(
  {
    name: 'optimizeContentEngagementFlow',
    inputSchema: OptimizeContentEngagementInputSchema,
    outputSchema: OptimizeContentEngagementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
