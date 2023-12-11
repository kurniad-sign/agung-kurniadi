'use client';

import { type ReactNode } from 'react';

export function RunningText({ children }: { children: ReactNode }) {
  return (
    <div className="c-running-animation">
      <div className="c-running-animation__text">{children}</div>
      <div className="c-running-animation__text">{children}</div>
      <div className="c-running-animation__text">{children}</div>
      <div className="c-running-animation__text">{children}</div>
    </div>
  );
}
