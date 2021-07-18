import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { SafeAreaView, View } from 'react-native';
import { TextComponent } from './ui/TextComponent';
import { useTickSize } from '../hooks/useTickSize';
import { TickSizeSelect } from './TickSizeSelect';
import { Button } from './ui/Button';
import { useSocket } from '../hooks/useSocket';
import { OrderbookHeader } from './ui/OrderbookHeader';
import { OrderbookRow } from './ui/OrderbookRow';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #1a1d28;
`;

const Title = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`;

const CenteringWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const Margin = styled(View)`
  height: 20px;
  width: 100%;
`;

const Loader = styled(View)`
  width: 100%;
  height: 392px;
  justify-content: center;
  align-items: center;
`;

const max = (bids?: OrderBookRow[], asks?: OrderBookRow[]): number =>
  bids && asks ? Math.max(asks[0].total, bids[bids.length - 1].total) : 0;

export const OrderBook = (): JSX.Element => {
  const [productId, setProductId] = useState<ProductId>('PI_XBTUSD');
  const [isTickSelectOpen, setIsTickSelectOpen] = useState<boolean>(false);
  const [killFeed, setKillFeed] = useState<boolean>(false);

  const { tickSize, tickSizeOptions, setTickSize } = useTickSize(productId);
  const { bids, asks, isOrderBookLoading, error } = useSocket(
    productId,
    tickSize,
    killFeed,
  );

  const maxTotal = max(bids, asks);

  const toggleFeedButton = (): void =>
    setProductId(
      (prevProduct): ProductId =>
        prevProduct === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD',
    );

  const tickSelectHandler = (selectedTickSize: TickSize): void => {
    setTickSize(selectedTickSize);
    setIsTickSelectOpen(false);
  };

  return (
    <Container>
      <Title>
        <TextComponent color="greyWhite">Order Book</TextComponent>
        <Button
          text={`Group ${tickSize}`}
          onPress={(): void => setIsTickSelectOpen(!isTickSelectOpen)}
          small
        />
      </Title>
      <OrderbookHeader />
      {isOrderBookLoading && (
        <Loader>
          <TextComponent>Loading...</TextComponent>
        </Loader>
      )}
      {asks &&
        asks.map(
          ({ price, size, total }): ReactNode => (
            <OrderbookRow
              key={price}
              price={price}
              size={size}
              total={total}
              max={maxTotal}
              color="redLight"
            />
          ),
        )}
      <Margin />
      {bids &&
        bids.map(
          ({ price, size, total }): ReactNode => (
            <OrderbookRow
              key={price}
              price={price}
              size={size}
              total={total}
              max={maxTotal}
              color="greenLight"
            />
          ),
        )}
      <CenteringWrapper>
        <Button text="Toggle Feed" onPress={toggleFeedButton} />
        <Button
          color="redLight"
          text="Kill Feed"
          onPress={(): void => setKillFeed(!killFeed)}
        />
      </CenteringWrapper>

      {isTickSelectOpen && (
        <TickSizeSelect
          tickSizeOptions={tickSizeOptions}
          setIsTickSelectOpen={setIsTickSelectOpen}
          tickSelectHandler={tickSelectHandler}
        />
      )}
      {error && (
        <CenteringWrapper>
          <TextComponent color="redLight">{`${error}. Please try again...`}</TextComponent>
        </CenteringWrapper>
      )}
    </Container>
  );
};
