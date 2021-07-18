import React from 'react';
import { StatusBar } from 'react-native';
import { OrderBook } from './src/components/OrderBook';

export const App = (): JSX.Element => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <OrderBook />
    </>
  );
};
