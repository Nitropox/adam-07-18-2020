declare global {
  type ProductId = 'PI_XBTUSD' | 'PI_ETHUSD';
  type Order = [number, number];
  type TickSize = 0.05 | 0.1 | 0.25 | 0.5 | 1 | 2.5;
  interface OrderBookRow {
    price: number;
    size: number;
    total: number;
  }
}

export {};
