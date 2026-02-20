"use client"

import Link from "next/link"
import { Package, Boxes, CookingPot, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetProductsQuery, useGetRawMaterialsQuery, useGetRecipesQuery } from "@/store/api"

export default function Home() {
  const { data: products = [], isLoading: loadingProducts } = useGetProductsQuery()
  const { data: rawMaterials = [], isLoading: loadingRawMaterials } = useGetRawMaterialsQuery()
  const { data: recipes = [], isLoading: loadingRecipes } = useGetRecipesQuery()

  const loading = loadingProducts || loadingRawMaterials || loadingRecipes

  const cards = [
    {
      title: "Produtos",
      count: products.length,
      icon: Package,
      href: "/products",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Matérias-Primas",
      count: rawMaterials.length,
      icon: Boxes,
      href: "/raw-materials",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Receitas",
      count: recipes.length,
      icon: CookingPot,
      href: "/recipes",
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do seu estoque
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card
            key={card.href}
            className={`bg-linear-to-br ${card.gradient} border-0 shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <div className="text-3xl font-bold">{card.count}</div>
              )}
              <Button
                variant="link"
                asChild
                className="mt-2 h-auto p-0 text-sm"
              >
                <Link href={card.href}>
                  Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
