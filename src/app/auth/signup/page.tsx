import React from "react";
import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/AuthLayout";
import SignUpComponent from "@/components/auth/SignUp";

export const metadata: Metadata = {
  title: "somoAI SignIn Page | SomoCloud",
  description: "This is the somoAI Signin Page",
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignUpComponent />
    </AuthLayout>
  );
}
