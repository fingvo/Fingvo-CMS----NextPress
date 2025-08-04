"use server";

import {
  optimizeContentEngagement,
  type OptimizeContentEngagementInput,
  type OptimizeContentEngagementOutput,
} from "@/ai/flows/optimize-content-engagement";

export async function optimizeContentAction(
  input: OptimizeContentEngagementInput
): Promise<OptimizeContentEngagementOutput> {
  return await optimizeContentEngagement(input);
}
