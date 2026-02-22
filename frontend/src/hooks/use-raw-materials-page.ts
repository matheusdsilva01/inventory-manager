"use client"

import { toast } from "sonner"
import {
  useGetRawMaterialsQuery,
  useCreateRawMaterialMutation,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
} from "@/store/api"
import type { RawMaterial, CreateRawMaterial, UpdateRawMaterial } from "@/types"
import { useDialogState } from "@/hooks/use-dialog-state"

export function useRawMaterialsPage() {
  const { data = [], isLoading: loading } = useGetRawMaterialsQuery()
  const [createRawMaterial] = useCreateRawMaterialMutation()
  const [updateRawMaterial] = useUpdateRawMaterialMutation()
  const [deleteRawMaterial] = useDeleteRawMaterialMutation()

  const formDialog = useDialogState<RawMaterial>()
  const deleteDialog = useDialogState<RawMaterial>()

  const handleSubmit = async (formData: CreateRawMaterial | UpdateRawMaterial) => {
    if ("id" in formData) {
      await updateRawMaterial(formData as UpdateRawMaterial).unwrap()
      toast.success("Matéria-prima atualizada com sucesso")
    } else {
      await createRawMaterial(formData as CreateRawMaterial).unwrap()
      toast.success("Matéria-prima criada com sucesso")
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return
    await deleteRawMaterial(deleteDialog.item.id).unwrap()
    toast.success("Matéria-prima excluída com sucesso")
  }

  return {
    materials: data,
    loading,
    formDialog,
    deleteDialog,
    handleSubmit,
    handleConfirmDelete,
  }
}
