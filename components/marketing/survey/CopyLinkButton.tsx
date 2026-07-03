"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText("https://wrenlo.co/survey").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button className="btn btn-ghost" onClick={handleCopy}>
      {copied ? "✓ Copied!" : "Copy survey link"}
    </button>
  );
}
