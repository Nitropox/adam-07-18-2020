export const mergeAndSort = (state: Order[], update: Order[]): Order[] => {
  const newArr: Order[] = update.slice();

  state.forEach(([price, size]): void => {
    if (update.find((o): boolean => o[0] === price)) {
      return;
    }

    newArr.push([price, size]);
  });

  return newArr
    .filter((el: Order): boolean => el[1] > 0)
    .sort((a: Order, b: Order): number => b[0] - a[0]);
};

export const roundToNumber = (n: number, roundTo: number): number =>
  Math.floor(n / roundTo) * roundTo;

interface OrdersObject {
  [key: number]: number;
}

export const groupOrdersByTickSize = (
  orders: Order[],
  tickSize: TickSize,
): Order[] => {
  if (tickSize === 0.5 || tickSize === 0.05) {
    return orders.sort((a: Order, b: Order): number => b[0] - a[0]);
  }
  const obj: OrdersObject = orders.reduce(
    (o: OrdersObject, [price, size]: Order): OrdersObject => {
      const roundedPrice = roundToNumber(price, tickSize);
      o[roundedPrice] = o[roundedPrice] ? o[roundedPrice] + size : size;
      return o;
    },
    {},
  );

  return (
    Object.keys(obj).map(
      (key): Order => [Number(key), obj[Number(key)]],
    ) as Order[]
  ).sort((a: Order, b: Order): number => b[0] - a[0]);
};

export const mapBidsWithTotal = (orders: Order[]): OrderBookRow[] => {
  const newArr: OrderBookRow[] = [];
  orders.forEach(([price, size]: Order, index: number): void => {
    index === 0
      ? newArr.push({ price, size, total: size })
      : newArr.push({ price, size, total: size + newArr[index - 1].total });
  });
  return newArr;
};

//this one could be optimized
export const mapAsksWithTotal = (orders: Order[]): OrderBookRow[] => {
  const newArr: number[] = [];
  orders.reverse().forEach(([_, size]: Order, index: number): void => {
    index === 0 ? newArr.push(size) : newArr.push(size + newArr[index - 1]);
  });
  return orders
    .map(
      ([price, size]: Order, index: number): OrderBookRow => ({
        price,
        size,
        total: newArr[index],
      }),
    )
    .reverse();
};
