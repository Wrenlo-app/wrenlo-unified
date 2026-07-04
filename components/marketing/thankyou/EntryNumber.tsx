"use client";

import { useEffect, useState } from "react";

export default function EntryNumber() {
  const [num, setNum] = useState<number | null>(null);

  useEffect(() => {
    setNum(Math.floor(Math.random() * 79) + 18);
  }, []);

  return (
    <div className="entry-box">
      <div className="entry-num">{num !== null ? `#${num}` : "#—"}</div>
      <div className="entry-lbl">Your entry number · Draw closes at 200 responses</div>
    </div>
  );
}
