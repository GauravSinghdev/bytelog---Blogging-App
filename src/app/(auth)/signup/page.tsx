
import React from "react";
import SignupForm from "./SignupForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Signup"
}


export default function SignupPage() {
  
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-slate-200/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

      <SignupForm />
    </div>
  );
}
