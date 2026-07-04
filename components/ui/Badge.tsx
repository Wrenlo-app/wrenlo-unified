import { ReactNode } from 'react'

/**
 * Shared Badge/pill primitive.
 *
 * Color logic stays where it already lives (UrgencyBadge, StatusBadge,
 * or wherever marketing badges are used) — this component only renders.
 *
 * - variant="marketing": renders styles/marketing.css's `.badge` class
 *   plus a fixed color class you already have in CSS (e.g. "badge-green").
 *   Pass that class name via `colorClass`. No inline colors on this side,
 *   by design — marketing.css owns the palette.
 * - variant="dashboard": renders the exact pill styling that UrgencyBadge/
 *   StatusBadge used inline before this refactor. Pass the resolved
 *   colors via `bg` and `text` — the calling component keeps its own
 *   status/urgency → color mapping and just hands the result to this.
 *
 *   NOTE: in the original code, StatusBadge had `whiteSpace: 'nowrap'`
 *   but UrgencyBadge did not. That's preserved here via the optional
 *   `nowrap` prop (defaults to false) — don't default it to true, that
 *   would change UrgencyBadge's wrapping behavior.
 */

type BadgeProps =
  | {
      variant: 'marketing'
      colorClass: string // e.g. "badge-green" | "badge-blue" | "badge-red"
      children: ReactNode
    }
  | {
      variant: 'dashboard'
      bg: string
      text: string
      nowrap?: boolean
      children: ReactNode
    }

export default function Badge(props: BadgeProps) {
  if (props.variant === 'marketing') {
    return <span className={`badge ${props.colorClass}`}>{props.children}</span>
  }

  // Exact copy of the original UrgencyBadge/StatusBadge pill styling.
  return (
    <span
      style={{
        backgroundColor: props.bg,
        color: props.text,
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '500',
        ...(props.nowrap ? { whiteSpace: 'nowrap' as const } : {}),
      }}
    >
      {props.children}
    </span>
  )
}
