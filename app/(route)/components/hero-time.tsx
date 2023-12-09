'use client';

import { useEffect, useState } from 'react';

import { useDate } from '@/hooks/use-date';

export function HeroTime() {
  const [isMounted, setIsMounted] = useState(false);
  const { date, time } = useDate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="hero__time">
      <p>{date}</p>
      <p>Local Time: {time}</p>
    </div>
  );
}
