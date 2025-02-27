"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, TvMinimalPlay, Zap } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-[#F9FBFD] min-h-screen">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Zap className="h-5 w-5" />
          <span>Dashboard de Curso</span>
        </Link>
      </div>
      <div className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive("/dashboard")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <TvMinimalPlay className="h-4 w-4" />
            <span>Cursos</span>
          </Link>
          <Link
            href="/dashboard/#"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive("/dashboard/#")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

