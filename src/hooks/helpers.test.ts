import {
  mergeAndSort,
  roundToNumber,
  groupOrdersByTickSize,
  mapBidsWithTotal,
  mapAsksWithTotal,
} from './helpers';

describe('mergeAndSort', (): void => {
  it('should update and sort descending', (): void => {
    const state: Order[] = [
      [1, 10],
      [2, 12],
    ];
    const update: Order[] = [[2, 20]];

    expect(mergeAndSort(state, update)).toEqual([
      [2, 20],
      [1, 10],
    ]);
  });

  it('should remove record from orderbook if its size is 0', (): void => {
    const state: Order[] = [
      [2, 12],
      [1, 10],
    ];
    const update: Order[] = [[2, 0]];

    expect(mergeAndSort(state, update)).toEqual([[1, 10]]);
  });
});

describe('roundToNumber', (): void => {
  it('should round to whole number if roundTo is 1', (): void => {
    expect(roundToNumber(32.5, 1)).toBe(32);
    expect(roundToNumber(32.98, 1)).toBe(32);
  });
  it('should round to multiplier of 2.5', (): void => {
    expect(roundToNumber(1, 2.5)).toBe(0);
    expect(roundToNumber(2, 2.5)).toBe(0);
    expect(roundToNumber(2.5, 2.5)).toBe(2.5);
    expect(roundToNumber(2.6, 2.5)).toBe(2.5);
    expect(roundToNumber(4.67, 2.5)).toBe(2.5);
    expect(roundToNumber(5.2, 2.5)).toBe(5);
  });
});

describe('groupData', (): void => {
  it('should regroup the data to whole nombers if tick is 1 ', (): void => {
    const orders: Order[] = [
      [2.5, 3],
      [2, 3],
      [1.5, 2],
      [1, 1],
    ];
    expect(groupOrdersByTickSize(orders, 1)).toEqual([
      [2, 6],
      [1, 3],
    ]);
  });

  it('should regroup the data', (): void => {
    const orders: Order[] = [
      [5, 2],
      [4, 1],
      [3, 3],
      [2.5, 3],
      [2.4, 2],
      [1, 1],
    ];
    expect(groupOrdersByTickSize(orders, 2.5)).toEqual([
      [5, 2],
      [2.5, 7],
      [0, 3],
    ]);
  });
});

describe('mapAsksWithTotal', (): void => {
  it('should remap orders to array of objects with total field ', (): void => {
    const orders: Order[] = [
      [4, 4],
      [3, 3],
      [2, 2],
      [1, 1],
    ];
    expect(mapAsksWithTotal(orders)).toEqual([
      { price: 4, size: 4, total: 10 },
      { price: 3, size: 3, total: 6 },
      { price: 2, size: 2, total: 3 },
      { price: 1, size: 1, total: 1 },
    ]);
  });
});

describe('mapBidsWithTotal', (): void => {
  it('should remap orders to array of objects with total field ', (): void => {
    const orders: Order[] = [
      [4, 4],
      [3, 3],
      [2, 2],
      [1, 1],
    ];
    expect(mapBidsWithTotal(orders)).toEqual([
      { price: 4, size: 4, total: 4 },
      { price: 3, size: 3, total: 7 },
      { price: 2, size: 2, total: 9 },
      { price: 1, size: 1, total: 10 },
    ]);
  });
});
