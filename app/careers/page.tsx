"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { jobs } from "@/lib/jobs-data";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">
            Help us shape the future of insurance technology
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          {jobs.map((job, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
                <Link href={`/careers/${index}`}>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Apply Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}