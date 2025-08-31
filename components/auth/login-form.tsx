"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { TwoFactorForm } from "./two-factor-form"

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToSignup?: () => void
  onSwitchToReset?: () => void
}

export function LoginForm({ onSuccess, onSwitchToSignup, onSwitchToReset }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const result = await login(email, password)

    if (result.success) {
      onSuccess?.()
    } else if (result.requiresTwoFactor) {
      setShowTwoFactor(true)
    } else {
      setError(result.error || "Login failed")
    }
  }

  const handleTwoFactorSuccess = () => {
    setShowTwoFactor(false)
    onSuccess?.()
  }

  const handleTwoFactorBack = () => {
    setShowTwoFactor(false)
  }

  if (showTwoFactor) {
    return <TwoFactorForm onSuccess={handleTwoFactorSuccess} onBack={handleTwoFactorBack} />
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">Sign in to your CorpMail account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="text-center space-y-2">
            <Button type="button" variant="link" className="text-sm" onClick={onSwitchToReset}>
              Forgot your password?
            </Button>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button type="button" variant="link" className="p-0 h-auto" onClick={onSwitchToSignup}>
                Sign up
              </Button>
            </div>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium mb-2">Demo Credentials:</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Admin: admin@company.com / admin123</div>
            <div>
              Manager: manager@company.com / manager123 <Shield className="inline w-3 h-3 ml-1" />
            </div>
            <div>User: user@company.com / user123</div>
            <div className="text-xs mt-2 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              2FA code: 123456
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
