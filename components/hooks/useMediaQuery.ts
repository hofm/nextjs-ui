import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useMediaQuery(): [string | undefined] {
  const [breakpoint, setBreakpoint] = useState<string | undefined>(undefined);

  //choose the screen size
  const handleResize = () => {
    const length = Object.keys(breakpoints).length;
    for (let i = length; i > 0; i--) {
      if (Object.values(breakpoints)[i - 1] <= window.innerWidth) {
        setBreakpoint(Object.keys(breakpoints)[i - 1]);
        return;
      }
    }
    setBreakpoint('sm');
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return [breakpoint];
}
