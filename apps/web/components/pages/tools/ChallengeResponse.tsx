"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { z } from "zod";
import { codingChallengeSchema } from "../../../../../packages/schemas/src/validation/ChallengeAnalysis";
import { useRouter } from "next/navigation";

type CodingChallenge = z.infer<typeof codingChallengeSchema>;

const ChallengeResponse = ({ data }: { data: CodingChallenge }) => {
  const router = useRouter();

  const {
    title,
    description,
    input_format,
    output_format,
    constraints,
    examples,
    tags,
  } = data;

  const handleSolveClick = () => {
    // Save context into localStorage for later usage in /coding/[id]
    localStorage.setItem("currentChallenge", JSON.stringify(data));
    router.push(`/coding/${encodeURIComponent(title.replace(/\s+/g, "-"))}`);
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="border-b">
        <CardTitle>Your Coding Challenge is Generated</CardTitle>
        <CardDescription>
          I'm using <span className="text-primary">llama-3.1-8b-instant</span>{" "}
          model for problem generation and solution analysis.
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="text-card-foreground text-sm font-normal overflow-y-auto flex-1">
        {/* Title */}
        <h1 className="text-2xl font-semibold">{title}</h1>

        {/* Tags */}
        <div className="flex gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>

        {/* Description + Formats */}
        <div className="mt-4 space-y-2 border-b pb-2">
          <p>{description}</p>
          <p>
            <strong>Input Format:</strong>{" "}
            <span className="text-muted-foreground">{input_format}</span>
          </p>
          <p>
            <strong>Output Format:</strong>{" "}
            <span className="text-muted-foreground">{output_format}</span>
          </p>
        </div>

        {/* Examples */}
        <div className="mt-4 space-y-4">
          {examples.map((ex, i) => (
            <div key={i} className="space-y-2 border-l-2 px-2">
              <h2 className="font-semibold">Example {i + 1}:</h2>
              <p>
                <strong>Input:</strong>{" "}
                <span className="text-muted-foreground">{ex.input}</span>
              </p>
              <p>
                <strong>Output:</strong>{" "}
                <span className="text-muted-foreground">{ex.output}</span>
              </p>
              <p>
                <strong>Explanation:</strong>{" "}
                <span className="text-muted-foreground">{ex.explanation}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mt-4">
          <h2 className="font-semibold">Constraints:</h2>
          <ul className="list-disc pl-6 space-y-2">
            {constraints.split(".").map(
              (c, idx) =>
                c.trim() && (
                  <li key={idx} className="bg-sidebar px-2 py-1 rounded-md">
                    {c.trim()}
                  </li>
                )
            )}
          </ul>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="space-x-3">
        <Button variant="outline" onClick={handleSolveClick}>
          Solve this Challenge
        </Button>
        <Button variant="outline">Generate a New One</Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeResponse;
