import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Column } from './Column';
import { TextComponent } from './TextComponent';
import { colors } from './colors';

const Header = styled(View)`
  flex-direction: row;
  border-top-color: ${colors.greyDark};
  border-top-width: 1px;
  border-bottom-color: #20252f;
  border-bottom-width: 1px;
  padding: 6px 0;
`;

export const OrderbookHeader = (): JSX.Element => {
  return (
    <Header>
      <Column width="40%" center>
        <TextComponent color="greyDark">PRICE</TextComponent>
      </Column>
      <Column width="30%" center>
        <TextComponent color="greyDark">SIZE</TextComponent>
      </Column>
      <Column width="30%" center>
        <TextComponent color="greyDark">TOTAL</TextComponent>
      </Column>
    </Header>
  );
};
