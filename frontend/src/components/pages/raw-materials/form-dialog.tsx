"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import type { RawMaterial, CreateRawMaterial, UpdateRawMaterial } from "@/types"

interface RawMaterialFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    material?: RawMaterial | null;
    onSubmit: (data: CreateRawMaterial | UpdateRawMaterial) => Promise<void>;
}

export function RawMaterialFormDialog({
    open,
    onOpenChange,
    material,
    onSubmit,
}: RawMaterialFormDialogProps) {
    const [name, setName] = useState(material?.name ?? "")
    const [code, setCode] = useState(material?.code ?? "")
    const [quantity, setQuantity] = useState(material?.quantity?.toString() ?? "")
    const [loading, setLoading] = useState(false)
    const isEditing = !!material

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditing && material) {
                await onSubmit({
                    id: material.id,
                    name,
                    code,
                    quantity: parseFloat(quantity),
                } as UpdateRawMaterial)
            } else {
                await onSubmit({
                    name,
                    code,
                    quantity: parseFloat(quantity),
                } as CreateRawMaterial)
            }
            onOpenChange(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Editar Matéria-Prima" : "Nova Matéria-Prima"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Altere os dados da matéria-prima abaixo."
                            : "Preencha os dados para cadastrar uma nova matéria-prima."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="rm-name">Nome</Label>
                        <Input
                            id="rm-name"
                            placeholder="Ex: Parafuso M6, Resma A4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rm-code">Código</Label>
                        <Input
                            id="rm-code"
                            placeholder="Ex: MP-001"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rm-quantity">Quantidade em estoque</Label>
                        <Input
                            id="rm-quantity"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? "Salvar" : "Criar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
