"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { challengeRequestSchema } from "../../../../../packages/schemas/src/validation/ChallengeRequest";

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

export function GenerateChallengeForm() {
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8001/api/v1/challenge-request",
        values
      );
      console.log("This is the resposne", response.data);
    } catch (err) {
      console.error("❌ Error submitting form", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Please Generate Your Coding Challenge</CardTitle>
        <CardDescription>
          I'm using <span className="text-primary">llama-3.1-8b-instant</span>{" "}
          model for this problems generation and as well as for the Analysis on
          coded solution
        </CardDescription>
      </CardHeader>

      <CardContent>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
