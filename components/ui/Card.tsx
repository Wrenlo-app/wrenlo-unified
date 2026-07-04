import { ReactNode } from 'react'

/**
 * Shared Card primitive.
 *
 * - variant="marketing": renders styles/marketing.css's `.card` class.
 *   No accent border option — marketing's .card doesn't have one.
 * - variant="dashboard": renders MetricCard's original inline-style card,
 *   including the colored top border accent MetricCard added on top of
 *   the base card look.
 */

type CardProps =
  | {
      variant: 'marketing'
      children: ReactNode
    }
  | {
      variant: 'dashboard'
      accentColor: string
      children: ReactNode
    }

export default function Card(props: CardProps) {
  if (props.variant === 'marketing') {
    return <div className="card">{props.children}</div>
  }

  // Exact copy of MetricCard's original inline styling.
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        borderTop: `4px solid ${props.accentColor}`,
      }}
    >
      {props.children}
    </div>
  )
}
