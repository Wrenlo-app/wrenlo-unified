"use client";

import { useState } from "react";

export default function CopyLinkButton({
  className = "btn btn-ghost",
  label = "Copy survey link",
}: {
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("https://wrenlo.co/survey").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button className={className} onClick={handleCopy}>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}
