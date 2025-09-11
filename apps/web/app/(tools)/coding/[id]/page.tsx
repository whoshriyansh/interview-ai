"use client";

import React, { use, useEffect, useState } from "react";
import ChallengeResponse from "@/components/pages/tools/ChallengeResponse";
import Editor from "@monaco-editor/react";
//TODO: Fix the fu**** path
import { codingChallengeSchema } from "../../../../../../packages/schemas/src/validation/ChallengeAnalysis";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

type CodingChallenge = z.infer<typeof codingChallengeSchema>;

const GlassLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/10 backdrop-blur-md z-50">
      <div className="w-full">
        <Loader />
      </div>
    </div>
  );
};

type AnalysisResult = {
  score: number;
  hint: string;
  gratitude_message: string;
  output_format: string;
};

const CodingPage = () => {
  const [challenge, setChallenge] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState("// write your solution here");
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentChallenge");
    if (stored) {
      setChallenge(JSON.parse(stored));
    }
  }, []);

  const handleRun = async () => {
    try {
      if (!challenge) return;

      setLoading(true);
      const payload = {
        context: challenge,
        code,
      };

      const response = await axios.post(
        "http://localhost:8001/api/v1/challenge-analysis",
        payload
      );

      console.log("This is Response", response);
      toast.success("Hurrah!", {
        description: response.data.message,
      });
      setAnalysisResult(response.data.data);
      setLoading(false);
      setShowModal(true);
    } catch (error: any) {
      toast.error("Whopsie!", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Left (challenge) */}
      <div className="w-1/2 border-r overflow-y-auto">
        {challenge && <ChallengeResponse data={challenge} />}
      </div>

      {/* Right (editor) */}
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="font-semibold">Your Solution</h2>
          <Button onClick={handleRun}>Run Code</Button>
        </div>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
        />
      </div>

      {/* Modal for results */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Feedback</DialogTitle>
          </DialogHeader>
          {analysisResult && (
            <div className="mt-2 space-y-3">
              <p>
                <strong>Score:</strong> {analysisResult.score}
              </p>
              <p>
                <strong>Hint:</strong> {analysisResult.hint}
              </p>
              <p>
                <strong>Message:</strong> {analysisResult.gratitude_message}
              </p>
              <p>
                <strong>Output Format:</strong> {analysisResult.output_format}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {loading && <GlassLoader />}
    </div>
  );
};

export default CodingPage;
