import { View } from 'react-native';
import styled from 'styled-components';

interface Props {
  width: string;
  center?: boolean;
}

export const Column = styled(View)<Props>`
  width: ${({ width }: Props): string => width};
  align-items: ${({ center = false }: Props): string =>
    center ? 'center' : 'flex-start'};
`;
