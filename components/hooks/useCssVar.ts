import { useRef, useEffect, LegacyRef } from 'react';

export function useCssVar(
  cssVar: string,
  factor: number,
  initialValue = '20',
  unit = 'px',
): [LegacyRef<HTMLDivElement> | undefined] {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.document.documentElement.style.setProperty(
      cssVar,
      ref.current ? ref.current.offsetWidth / factor + unit : initialValue + unit,
    );

    window.addEventListener('resize', () => {
      window.document.documentElement.style.setProperty(
        cssVar,
        ref.current ? ref.current.offsetWidth / factor + unit : initialValue + unit,
      );
    });
  }, []);

  return [ref];
}
