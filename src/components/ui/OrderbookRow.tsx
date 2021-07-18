import React from 'react';
import { View } from 'react-native';
import styled, { css, CSSProp } from 'styled-components';
import { colors } from './colors';
import { Column } from './Column';
import { TextComponent } from './TextComponent';

const RowWrapper = styled(View)`
  flex-direction: row;
  padding: 5px 0;
`;

interface BarProps {
  color: keyof typeof colors;
  width: number;
}

const Bar = styled(View)<BarProps>`
  position: absolute;
  width: ${({ width = 0 }: BarProps): string => `${width}%`};
  height: 28px;

  ${({ color }: BarProps): CSSProp =>
    (color === 'redLight' &&
      css`
        background-color: ${colors.redDark};
      `) ||
    css`
      background-color: ${colors.greenDark};
    `};
`;

interface Props {
  price: number;
  size: number;
  total: number;
  max: number;
  color: keyof typeof colors;
}

const OrderbookRowComponent = ({
  price,
  size,
  total,
  max,
  color,
}: Props): JSX.Element => {
  return (
    <RowWrapper>
      <Bar width={(total / max) * 100} color={color} />
      <Column center width="40%">
        <TextComponent monotype color={color}>
          {price}
        </TextComponent>
      </Column>
      <Column center width="30%">
        <TextComponent monotype color="white">
          {size}
        </TextComponent>
      </Column>
      <Column center width="30%">
        <TextComponent monotype color="white">
          {total}
        </TextComponent>
      </Column>
    </RowWrapper>
  );
};

export const OrderbookRow = React.memo(OrderbookRowComponent);
