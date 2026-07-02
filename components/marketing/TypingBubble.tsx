"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  'Flagging this as <strong>priority</strong>. What\'s your address and system age?',
  "Got it — I'll hold a priority slot and alert the owner now.",
  "Understood. Address and I'll take it from there.",
];

/**
 * Ported from the inline <script> at the bottom of index.html that
 * cycled the AI reply bubble text in the hero call-mock.
 */
export default function TypingBubble() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="t-bubble"
      style={{ transition: "opacity .4s", opacity: visible ? 1 : 0 }}
      dangerouslySetInnerHTML={{ __html: PHRASES[index] }}
    />
  );
}
