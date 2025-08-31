"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/components/auth/auth-provider"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (email: string, role: string) => {
    login(email, role)
    router.push("/")
  }

  const handleRegister = (email: string, role: string) => {
    login(email, role)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
