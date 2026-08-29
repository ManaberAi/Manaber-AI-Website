import type { ElementType, ReactNode } from 'react'

import cn from '@/lib/cn'

/**
 * The shell. 1200px max, 20/24px gutters. Every slab's content sits inside
 * one of these so the nav card, section content and footer all share an edge.
 */
export default function Container({
  children,
  className,
  as,
}: {
  children: ReactNode
  className?: string
  as?: ElementType
}) {
  const Tag = as ?? 'div'

  return (
    <Tag className={cn('mx-auto w-full max-w-shell px-5 sm:px-6', className)}>
      {children}
    </Tag>
  )
}
