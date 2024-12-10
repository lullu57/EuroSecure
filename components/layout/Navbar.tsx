"use client";

import { Shield } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">EuroSecure Insurance</span>
          </Link>
          <div className="space-x-6">
            <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Home
            </Link>
            <Link href="/careers" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}