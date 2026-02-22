"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useLazyGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
} from "@/store/api"
import type { RecipeResponse, CreateRecipe } from "@/types"
import { useDialogState } from "@/hooks/use-dialog-state"

export function useRecipesPage() {
  const { data = [], isLoading: loading } = useGetRecipesQuery()
  const [createRecipe] = useCreateRecipeMutation()
  const [deleteRecipe] = useDeleteRecipeMutation()

  const createDialog = useDialogState()
  const deleteDialog = useDialogState<RecipeResponse>()

  // Detail dialog — subscribe for auto-refresh after mutations
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [triggerRecipeById] = useLazyGetRecipeByIdQuery()
  const { data: selectedRecipe = null } = useGetRecipeByIdQuery(selectedRecipeId ?? "", {
    skip: !selectedRecipeId,
  })

  const handleViewDetail = async (recipe: RecipeResponse) => {
    try {
      await triggerRecipeById(recipe.id).unwrap()
      setSelectedRecipeId(recipe.id)
      setDetailOpen(true)
    } catch {
      toast.error("Erro ao carregar receita")
    }
  }

  const handleCreateSubmit = async (formData: CreateRecipe) => {
    await createRecipe(formData).unwrap()
    toast.success("Receita criada com sucesso")
  }

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return
    await deleteRecipe(deleteDialog.item.id).unwrap()
    toast.success("Receita excluída com sucesso")
  }

  const handleDetailOpenChange = (open: boolean) => {
    setDetailOpen(open)
    if (!open) setSelectedRecipeId(null)
  }

  return {
    recipes: data,
    loading,
    createDialog,
    deleteDialog,
    detail: {
      open: detailOpen,
      data: selectedRecipe,
      onOpenChange: handleDetailOpenChange,
    },
    handleViewDetail,
    handleCreateSubmit,
    handleConfirmDelete,
  }
}
