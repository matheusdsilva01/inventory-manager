"use client"

import { useState, useCallback } from "react"

interface DialogState<T> {
  open: boolean
  item: T | null
  openWith: (item: T) => void
  openNew: () => void
  close: () => void
  setOpen: (open: boolean) => void
}

export function useDialogState<T = unknown>(): DialogState<T> {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<T | null>(null)

  const openWith = useCallback((item: T) => {
    setItem(item)
    setOpen(true)
  }, [])

  const openNew = useCallback(() => {
    setItem(null)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  return { open, item, openWith, openNew, close, setOpen }
}
