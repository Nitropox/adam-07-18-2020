import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef<any>();

  useEffect((): void => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect((): any => {
    const handler = (...args: any[]): (() => void) =>
      savedCallback.current(...args);

    if (delay !== null) {
      const id = setInterval(handler, delay);
      return (): void => clearInterval(id);
    }

    return null;
  }, [delay]);
}
