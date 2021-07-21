export const mergeAndSort = (state: Order[], update: Order[]): Order[] => {
  if (!update) {
    return state; //spam toggle feed button protection
  }

  const newArr: Order[] = update;

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
      const roundedPrice = Number(roundToNumber(price, tickSize).toFixed(2));
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

export const mapAsksWithTotal = (orders: Order[]): OrderBookRow[] => {
  const newArr: OrderBookRow[] = [];
  let k = -1;
  for (let i = orders.length - 1; i >= 0; i--) {
    i === orders.length - 1
      ? newArr.push({
          price: orders[i][0],
          size: orders[i][1],
          total: orders[i][1],
        })
      : newArr.push({
          price: orders[i][0],
          size: orders[i][1],
          total: orders[i][1] + newArr[k].total,
        });
    k++;
  }
  return newArr.reverse();
};
