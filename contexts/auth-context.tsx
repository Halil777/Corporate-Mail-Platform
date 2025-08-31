"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  department: string
  avatar?: string
  twoFactorEnabled: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; requiresTwoFactor?: boolean; error?: string }>
  logout: () => void
  signup: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; error?: string }>
  verifyTwoFactor: (code: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
  hasRole: (role: string | string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users for demonstration
  const mockUsers: (User & { password: string })[] = [
    {
      id: "1",
      name: "John Smith",
      email: "admin@company.com",
      password: "admin123",
      role: "admin",
      department: "IT",
      twoFactorEnabled: false,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "manager@company.com",
      password: "manager123",
      role: "manager",
      department: "HR",
      twoFactorEnabled: true,
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "user@company.com",
      password: "user123",
      role: "user",
      department: "Engineering",
      twoFactorEnabled: false,
    },
  ]

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      setIsLoading(false)
      return { success: false, error: "Invalid email or password" }
    }

    if (foundUser.twoFactorEnabled) {
      setIsLoading(false)
      // Store temporary user data for 2FA verification
      sessionStorage.setItem("tempUser", JSON.stringify(foundUser))
      return { success: false, requiresTwoFactor: true }
    }

    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    setIsLoading(false)

    return { success: true }
  }

  const verifyTwoFactor = async (code: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock 2FA verification (accept "123456" as valid code)
    if (code !== "123456") {
      setIsLoading(false)
      return { success: false, error: "Invalid verification code" }
    }

    const tempUserData = sessionStorage.getItem("tempUser")
    if (!tempUserData) {
      setIsLoading(false)
      return { success: false, error: "Session expired" }
    }

    const foundUser = JSON.parse(tempUserData)
    const { password: _, ...userWithoutPassword } = foundUser

    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    sessionStorage.removeItem("tempUser")
    setIsLoading(false)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    sessionStorage.removeItem("tempUser")
  }

  const signup = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "user",
      department: userData.department || "",
      twoFactorEnabled: false,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)

    return { success: true }
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    setIsLoading(false)

    if (!foundUser) {
      return { success: false, error: "No account found with this email address" }
    }

    return { success: true }
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return { success: false, error: "Not authenticated" }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setIsLoading(false)

    return { success: true }
  }

  const hasRole = (roles: string | string[]) => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    resetPassword,
    updateProfile,
    verifyTwoFactor,
    isLoading,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
