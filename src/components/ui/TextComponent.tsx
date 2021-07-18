import { Text } from 'react-native';
import styled, { css, CSSProp } from 'styled-components';
import { colors } from './colors';

interface Props {
  color?: keyof typeof colors;
  monotype?: boolean;
}

export const TextComponent = styled(Text)<Props>`
  color: ${({ color = 'white' }: Props): string => colors[color]};
  ${({ monotype = false }: Props): CSSProp =>
    (monotype &&
      css`
        font-family: 'Courier';
        font-size: 18px;
      `) ||
    ''};
`;
