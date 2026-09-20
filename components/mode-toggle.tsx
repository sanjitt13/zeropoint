"use client"

import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const THEMES = ["system", "light", "dark"] as const

type Theme = (typeof THEMES)[number]

const ICONS: Record<Theme, React.ComponentType> = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
}

const subscribe = () => () => {}

// The stored theme is only readable in the browser, so the first paint has to
// match the server (always "system") and settle once hydration is done.
function useHydrated() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const hydrated = useHydrated()

  const current: Theme =
    hydrated && THEMES.includes(theme as Theme) ? (theme as Theme) : "system"
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]
  const Icon = ICONS[current]

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      onClick={() => setTheme(next)}
    >
      <Icon />
    </Button>
  )
}
