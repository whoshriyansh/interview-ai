"use client";

import React from "react";
import { GenerateChallengeForm } from "@/components/pages/tools/GenerateForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/shared/Loader";
import ChallengeResponse from "@/components/pages/tools/ChallengeResponse";

const GlassLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/10 backdrop-blur-md z-50">
      <div className="w-full">
        <Loader />
      </div>
    </div>
  );
};

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState<any | null>(null);

  return (
    <div className="h-screen w-screen overflow-y-auto container mx-auto py-6">
      {/* Phase 1 → show form */}
      {!loading && !response && (
        <Card>
          <CardHeader>
            <CardTitle>Please Generate Your Coding Challenge</CardTitle>
            <CardDescription>
              I'm using{" "}
              <span className="text-primary">llama-3.1-8b-instant</span> model
              for problem generation and solution analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateChallengeForm
              onLoadingChange={setLoading}
              onResponse={(data) => {
                setResponse(data);
                setLoading(false);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Phase 2 → loading overlay */}
      {loading && <GlassLoader />}

      {/* Phase 3 → show response */}
      {!loading && response && <ChallengeResponse data={response.data} />}
    </div>
  );
};

export default Page;
