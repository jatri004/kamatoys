import type { Metadata } from "next";
import { Suspense } from "react";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your KamaDesires account.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
