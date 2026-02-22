import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function PageHeader({ title, description, icon, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
