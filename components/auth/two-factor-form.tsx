"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface TwoFactorFormProps {
  onSuccess: () => void
  onBack: () => void
}

export function TwoFactorForm({ onSuccess, onBack }: TwoFactorFormProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const { verifyTwoFactor, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code || code.length !== 6) {
      setError("Please enter a 6-digit verification code")
      return
    }

    const result = await verifyTwoFactor(code)

    if (result.success) {
      onSuccess()
    } else {
      setError(result.error || "Verification failed")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-center">Enter the 6-digit code from your authenticator app</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="text-center text-lg tracking-widest"
              disabled={isLoading}
              maxLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>

          <Button type="button" variant="ghost" className="w-full" onClick={onBack} disabled={isLoading}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
        </form>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Demo code: <span className="font-mono font-medium">123456</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
