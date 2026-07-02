"use client";

import { useCTAPopup } from "./CTAPopup";

type CTAButtonProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Generic popup-triggering button. Use this instead of writing a new
 * one-off client component for every page that just needs a button
 * wired to wrenloPopup.open(label) (the original inline onclick pattern).
 */
export default function CTAButton({ label, className, children }: CTAButtonProps) {
  const { openPopup } = useCTAPopup();
  return (
    <button className={className} onClick={() => openPopup(label)}>
      {children}
    </button>
  );
}
