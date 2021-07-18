import { useEffect, useState } from 'react';
import { mapAsksWithTotal, mapBidsWithTotal } from './helpers';
import { useOrderBook } from './useOrderBook';

const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1');

const socketSubscribe = (product: string): void =>
  ws.send(
    JSON.stringify({
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: [product],
    }),
  );

const socketUnsubscribe = (product: string): void =>
  ws.send(
    JSON.stringify({
      event: 'unsubscribe',
      feed: 'book_ui_1',
      product_ids: [product],
    }),
  );

interface SocketHook {
  bids?: OrderBookRow[];
  asks?: OrderBookRow[];
  isOrderBookLoading: boolean;
  error?: string;
}

export const useSocket = (
  productIDs: string,
  tickSize: TickSize,
  isFeedKilled: boolean,
): SocketHook => {
  const { bidsSnapshot, asksSnapshot, manageOrderBookState, flushOrders } =
    useOrderBook(tickSize);
  const [error, setError] = useState<string>();

  useEffect((): (() => void) => {
    try {
      //initial subscription
      ws.onopen = (): void => socketSubscribe(productIDs);

      if (ws.OPEN === ws.readyState && !isFeedKilled) {
        setError(undefined);
        socketSubscribe(productIDs);
      }

      ws.onmessage = manageOrderBookState;

      if (isFeedKilled) {
        throw new Error('Websocket error');
      }

      if (productIDs) {
        flushOrders();
      }
    } catch (err) {
      flushOrders();
      setError(err.message);
    }

    return (): void => socketUnsubscribe(productIDs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productIDs, isFeedKilled]);

  return {
    bids: bidsSnapshot ? mapBidsWithTotal(bidsSnapshot) : undefined,
    asks: asksSnapshot ? mapAsksWithTotal(asksSnapshot) : undefined,
    isOrderBookLoading: !(bidsSnapshot && asksSnapshot),
    error,
  };
};
