"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { challengeRequestSchema } from "../../../../../packages/schemas/src/validation/ChallengeRequest";
import { codingChallengeSchema } from "../../../../../packages/schemas/src/validation/ChallengeAnalysis";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

const challengeFormSchema = challengeRequestSchema
  .extend({
    experience: z
      .string()
      .min(1, "Experience is required")
      .regex(/^\d*$/, "Only numbers allowed"),
  })
  .omit({ experience: true })
  .extend({
    experience: z
      .string()
      .min(1, "Experience is required")
      .regex(/^\d*$/, "Only numbers allowed"),
  });

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

// 📝 Why are we using `onLoadingChange` and `onResponse` instead of calling setLoading/setResponse here?
// - The form should NOT own page-level state like loading or response data.
// - Instead, it notifies the parent via callbacks (lifting state up).
// - This makes the form reusable: different pages can decide how to show loading
//   (spinner, overlay, skeletons) or how to handle the response (show inline, redirect, etc.).
// - The `?.` optional chaining means these props are optional — the form works
//   even if the parent doesn’t care about loading/response.

export function GenerateChallengeForm({
  onLoadingChange,
  onResponse,
  onGeneration,
}: {
  onLoadingChange?: (loading: boolean) => void;
  onGeneration?: (isGenerated: boolean) => void;
  onResponse?: (data: typeof codingChallengeSchema) => void;
}) {
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      experience: "",
      techStack: [],
      difficulty: undefined,
      purpose: undefined,
    },
  });

  async function onSubmit(values: ChallengeFormValues) {
    try {
      onLoadingChange?.(true);

      const response = await axios.post(
        "http://localhost:8001/api/v1/challenge-request",
        values
      );
      toast.success("Hurrah!", {
        description: response.data.message,
      });
      onResponse?.(response.data);
      onGeneration?.(true);
    } catch (err: any) {
      toast.error("Whopsie!", {
        description: err.message,
      });
    } finally {
      onLoadingChange?.(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience (Years)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your professional experience in years, eg:2"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tech Stack (for demo: single input instead of array) */}
        <FormField
          control={form.control}
          name="techStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your tech stack, separated by commas."
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Difficulty */}
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {["Easy", "Medium", "Hard", "Advance"].map((level) => (
                    <FormItem
                      key={level}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={level} />
                      </FormControl>
                      <FormLabel className="font-normal">{level}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Purpose */}
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the purpose for generating a challenge." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Machine Coding Round",
                    "Technical Round",
                    "DSA Round",
                    "System Design",
                  ].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
