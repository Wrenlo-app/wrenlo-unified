import { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Shared Button primitive.
 *
 * This does NOT unify the marketing and dashboard design systems — it just
 * gives both sides one place to render a button from.
 *
 * - "marketing-*" variants render the exact same `className` combinations
 *   that were previously written by hand in components/marketing/*, so
 *   styles/marketing.css continues to control the actual appearance.
 *   No new classes, no new colors.
 * - "dashboard-outline" reproduces SignOutButton's original inline
 *   `style={}` object verbatim, so dashboard buttons look pixel-identical.
 *
 * Do not add new variants without confirming which design system they
 * belong to — see Sprint 4 notes.
 */

type MarketingVariant =
  | 'marketing-primary'
  | 'marketing-ghost'
  | 'marketing-teal'
  | 'marketing-outline-navy'
  | 'marketing-white'
  | 'marketing-red'
  | 'marketing-outline-red'

type DashboardVariant = 'dashboard-outline'

type ButtonVariant = MarketingVariant | DashboardVariant

export const MARKETING_VARIANT_CLASS: Record<MarketingVariant, string> = {
  'marketing-primary': 'btn-primary',
  'marketing-ghost': 'btn-ghost',
  'marketing-teal': 'btn-teal',
  'marketing-outline-navy': 'btn-outline-navy',
  'marketing-white': 'btn-white',
  'marketing-red': 'btn-red',
  'marketing-outline-red': 'btn-outline-red',
}

export type { MarketingVariant }

// Exact copy of SignOutButton.tsx's original inline style object.
// Do not edit without checking the dashboard visually — this is not
// derived from any design token, it's the pre-existing hardcoded style.
const DASHBOARD_OUTLINE_STYLE = {
  background: 'none',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  padding: '0.35rem 0.75rem',
  fontSize: '0.8rem',
  color: '#374151',
  cursor: 'pointer',
} as const

type ButtonProps = {
  variant: ButtonVariant
  size?: 'lg' | 'full'
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>

export default function Button({ variant, size, children, ...rest }: ButtonProps) {
  if (variant === 'dashboard-outline') {
    // size is not used on the dashboard side today — no dashboard button
    // variant currently needs it, so it's intentionally ignored here.
    return (
      <button style={DASHBOARD_OUTLINE_STYLE} {...rest}>
        {children}
      </button>
    )
  }

  const classes = ['btn', MARKETING_VARIANT_CLASS[variant]]
  if (size === 'lg') classes.push('btn-lg')
  if (size === 'full') classes.push('btn-full')

  return (
    <button className={classes.join(' ')} {...rest}>
      {children}
    </button>
  )
}
