"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  useGetProductsQuery,
  useGetProductRecipeQuery,
  useLazyGetProductRecipeQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/store/api"
import type { Product, CreateProduct, UpdateProduct } from "@/types"
import { useDialogState } from "@/hooks/use-dialog-state"

export function useProductsPage() {
  const { data = [], isLoading: loading } = useGetProductsQuery()
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const formDialog = useDialogState<Product>()
  const deleteDialog = useDialogState<Product>()

  // Recipe dialog — subscribe to auto-refresh after mutations
  const [recipeProductId, setRecipeProductId] = useState<string | null>(null)
  const [recipeOpen, setRecipeOpen] = useState(false)
  const [triggerRecipe] = useLazyGetProductRecipeQuery()
  const { data: recipeData = null } = useGetProductRecipeQuery(recipeProductId ?? "", {
    skip: !recipeProductId,
  })

  const handleViewRecipe = async (product: Product) => {
    try {
      await triggerRecipe(product.id).unwrap()
      setRecipeProductId(product.id)
      setRecipeOpen(true)
    } catch {
      toast.error("Este produto não possui uma receita cadastrada.")
    }
  }

  const handleSubmit = async (formData: CreateProduct | UpdateProduct) => {
    if ("id" in formData) {
      await updateProduct(formData as UpdateProduct).unwrap()
      toast.success("Produto atualizado com sucesso")
    } else {
      await createProduct(formData as CreateProduct).unwrap()
      toast.success("Produto criado com sucesso")
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return
    await deleteProduct(deleteDialog.item.id).unwrap()
    toast.success("Produto excluído com sucesso")
  }

  const handleRecipeOpenChange = (open: boolean) => {
    setRecipeOpen(open)
    if (!open) setRecipeProductId(null)
  }

  return {
    products: data,
    loading,
    formDialog,
    deleteDialog,
    recipe: {
      open: recipeOpen,
      data: recipeData,
      onOpenChange: handleRecipeOpenChange,
    },
    handleViewRecipe,
    handleSubmit,
    handleConfirmDelete,
  }
}
