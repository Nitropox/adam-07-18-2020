import { useCallback, useState } from 'react';
import { groupOrdersByTickSize, mergeAndSort } from './helpers';
import { useInterval } from './useInterval';

const ORDER_BOOK_DEPTH = 7;
const REFRESH_TIME = 1000;

interface SocketEvent {
  event: string;
  feed: string;
  product_id: string;
  bids: Order[];
  asks: Order[];
}

interface SocketHook {
  bidsSnapshot?: Order[];
  asksSnapshot?: Order[];
  manageOrderBookState: (event: WebSocketMessageEvent) => void;
  flushOrders: () => void;
}

export const useOrderBook = (tickSize: TickSize): SocketHook => {
  const [asks, setAsks] = useState<Order[]>();
  const [bids, setBids] = useState<Order[]>();
  const [asksSnapshot, takeAsksSnapshot] = useState<Order[]>();
  const [bidsSnapshot, takeBidsSnapshot] = useState<Order[]>();

  const updateOrders = useCallback(
    (updatedAsks: Order[], updatedBids: Order[]): void => {
      setAsks((prevAsks): Order[] | undefined => {
        if (prevAsks) {
          return mergeAndSort(prevAsks, updatedAsks).slice(-25);
        }
        return prevAsks;
      });
      setBids((prevBids): Order[] | undefined => {
        if (prevBids) {
          return mergeAndSort(prevBids, updatedBids).slice(0, 25);
        }
        return prevBids;
      });
    },
    [],
  );

  const manageOrderBookState = useCallback(
    (event: WebSocketMessageEvent): void => {
      const data: SocketEvent = JSON.parse(event.data);
      if (data.feed === 'book_ui_1_snapshot') {
        setAsks(data.asks);
        setBids(data.bids);
      } else {
        updateOrders(data.asks, data.bids);
      }
    },
    [updateOrders],
  );

  /**
   * Reset orderBook state when toggling product
   */
  const flushOrders = useCallback((): void => {
    setAsks(undefined);
    setBids(undefined);
  }, []);

  /**
   * Take snapshot of orderBook with given interval, orderBook depth
   * and tickSize
   * (looks like Binance Android app is at 1 second)
   */
  useInterval((): void => {
    takeAsksSnapshot(
      asks
        ? groupOrdersByTickSize(asks, tickSize).slice(-1 * ORDER_BOOK_DEPTH)
        : undefined,
    );
    takeBidsSnapshot(
      bids
        ? groupOrdersByTickSize(bids, tickSize).slice(0, ORDER_BOOK_DEPTH)
        : undefined,
    );
  }, REFRESH_TIME);

  return {
    manageOrderBookState,
    asksSnapshot,
    bidsSnapshot,
    flushOrders,
  };
};
