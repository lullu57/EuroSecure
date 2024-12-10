"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader } from "@/components/careers/FileUploader";
import { jobs } from "@/lib/jobs-data";

export default function JobApplicationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  if (id === '3') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <h1 className="text-3xl font-bold mb-2">https://www.kali.org/tools/dirbuster/ Might be of help</h1>
          </Card>
        </div>
      </div>
    );
  }

  const job = jobs.find((j, index) => index.toString() === id);
  if (!job) {
    router.push("/careers");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('File uploaded to:', result.filePath);
      console.log('File has been ran to be scanned by our antivirus')
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      });

      router.push("/careers");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{job.department}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.type}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Input
                  id="location"
                  name="location"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Expected Salary (€)</Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Earliest Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                required
                className="min-h-[200px] bg-background"
                placeholder="Tell us why you'd be a great fit for this role..."
              />
            </div>

            <div className="space-y-2">
              <Label>Resume</Label>
              <FileUploader
                onFileSelect={setResumeFile}
                maxSize={5 * 1024 * 1024} // 5MB
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !resumeFile}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}