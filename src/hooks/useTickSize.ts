import { useState, useEffect } from 'react';

interface TickSizeHook {
  tickSize: TickSize;
  tickSizeOptions: TickSize[];
  setTickSize: (_: TickSize) => void;
}

const btcTicSize: TickSize[] = [0.5, 1, 2.5];
const ethTickSize: TickSize[] = [0.05, 0.1, 0.25];

export const useTickSize = (productId: ProductId): TickSizeHook => {
  const [tickSize, setTickSize] = useState<TickSize>(0.5);
  const [tickSizeOptions, settickSizeOptions] =
    useState<TickSize[]>(btcTicSize);

  useEffect((): void => {
    setTickSize(productId === 'PI_XBTUSD' ? 0.5 : 0.05);
    settickSizeOptions(productId === 'PI_XBTUSD' ? btcTicSize : ethTickSize);
  }, [productId]);

  return {
    tickSize,
    tickSizeOptions,
    setTickSize,
  };
};
