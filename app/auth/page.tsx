"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

type AuthMode = "login" | "signup" | "reset"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")
  const router = useRouter()

  const handleAuthSuccess = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        {mode === "login" && (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setMode("signup")}
            onSwitchToReset={() => setMode("reset")}
          />
        )}

        {mode === "signup" && <SignupForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setMode("login")} />}

        {mode === "reset" && <ResetPasswordForm onBack={() => setMode("login")} />}
      </div>
    </div>
  )
}
