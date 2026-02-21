"use client"

import { Cards } from "@/components/pages/dashboard/cards"

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do seu estoque
        </p>
      </div>
      <Cards />
    </div>
  )
}
