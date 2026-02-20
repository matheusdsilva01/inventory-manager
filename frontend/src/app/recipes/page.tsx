"use client"

import { useState } from "react"
import { Plus, Eye, Trash2, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useLazyGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useDeleteRecipeMutation,
} from "@/store/api"
import type { RecipeResponse, CreateRecipe } from "@/types"
import { RecipeCreateDialog } from "@/components/pages/recipes/create-dialog"
import { RecipeDetailDialog } from "@/components/pages/recipes/detail-dialog"
import { RecipeDeleteDialog } from "@/components/pages/recipes/delete-dialog"

export default function RecipesPage() {
    const { data = [], isLoading: loading } = useGetRecipesQuery()
    const [createRecipe] = useCreateRecipeMutation()
    const [deleteRecipe] = useDeleteRecipeMutation()

    // Create dialog
    const [createOpen, setCreateOpen] = useState(false)

    // Detail dialog — subscribe for auto-refresh after mutations
    const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)
    const [detailOpen, setDetailOpen] = useState(false)
    const [triggerRecipeById] = useLazyGetRecipeByIdQuery()
    const { data: selectedRecipe = null } = useGetRecipeByIdQuery(selectedRecipeId ?? "", {
        skip: !selectedRecipeId,
    })

    // Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deletingRecipe, setDeletingRecipe] = useState<RecipeResponse | null>(null)

    const handleViewDetail = async (recipe: RecipeResponse) => {
        try {
            await triggerRecipeById(recipe.id).unwrap()
            setSelectedRecipeId(recipe.id)
            setDetailOpen(true)
        } catch {
            toast.error("Erro ao carregar receita")
        }
    }

    const handleDelete = (recipe: RecipeResponse) => {
        setDeletingRecipe(recipe)
        setDeleteOpen(true)
    }

    const handleCreateSubmit = async (formData: CreateRecipe) => {
        await createRecipe(formData).unwrap()
        toast.success("Receita criada com sucesso")
    }

    const handleConfirmDelete = async () => {
        if (!deletingRecipe) return
        await deleteRecipe(deletingRecipe.id).unwrap()
        toast.success("Receita excluída com sucesso")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Receitas</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie as receitas e seus itens
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Receita
                </Button>
            </div>

            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead className="text-center">Itens</TableHead>
                            <TableHead className="w-17.5" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell className="text-center"><Skeleton className="h-5 w-8 mx-auto" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                                    Nenhuma receita cadastrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((recipe) => (
                                <TableRow key={recipe.id}>
                                    <TableCell className="font-medium">
                                        {recipe.productName}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary">
                                            {recipe.recipeItems.length}{" "}
                                            {recipe.recipeItems.length === 1
                                                ? "item"
                                                : "itens"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleViewDetail(recipe)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Ver / Editar Itens
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(recipe)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Excluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create Dialog */}
            <RecipeCreateDialog
                key={createOpen ? "open" : "closed"}
                open={createOpen}
                onOpenChange={setCreateOpen}
                onSubmit={handleCreateSubmit}
            />

            {/* Detail Dialog — auto-refreshes via RTK Query tag invalidation */}
            <RecipeDetailDialog
                open={detailOpen}
                onOpenChange={(open) => {
                    setDetailOpen(open)
                    if (!open) setSelectedRecipeId(null)
                }}
                recipe={selectedRecipe}
                onUpdate={() => {}}
            />

            {/* Delete Dialog */}
            {deletingRecipe && (
                <RecipeDeleteDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    productName={deletingRecipe.productName}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    )
}
