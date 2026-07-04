import Link from 'next/link'
import { AnchorHTMLAttributes, ReactNode } from 'react'
import { MARKETING_VARIANT_CLASS, MarketingVariant } from './Button'

/**
 * Shared ButtonLink primitive — for cases where a `.btn`-styled element
 * needs to be a link, not a <button> (e.g. "See the product first",
 * "Share on Facebook"). Marketing-only; there's no dashboard link-button
 * equivalent today.
 *
 * - Internal navigation (default): renders next/link's <Link>, matching
 *   what the original hand-written internal links used (keeps prefetching
 *   behavior intact). Also fine for same-page hash links like "#form" —
 *   Link renders a plain <a> under the hood for those.
 * - External / already-<a>-tag cases (target="_blank" to Facebook,
 *   LinkedIn, etc.): pass `external`, which renders a plain <a> tag so
 *   target/rel behave exactly as before.
 *
 * This does NOT cover one-off `.btn` links that also carry a custom
 * inline `style` override (e.g. the two-tone CTAs in the survey hero) —
 * those stay hand-written, see Sprint 4 notes.
 */

type ButtonLinkProps = {
  variant: MarketingVariant
  size?: 'lg' | 'full'
  href: string
  external?: boolean
  children: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'>

export default function ButtonLink({
  variant,
  size,
  href,
  external = false,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = ['btn', MARKETING_VARIANT_CLASS[variant]]
  if (size === 'lg') classes.push('btn-lg')
  if (size === 'full') classes.push('btn-full')
  const className = classes.join(' ')

  if (external) {
    return (
      <a className={className} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link className={className} href={href} {...rest}>
      {children}
    </Link>
  )
}
