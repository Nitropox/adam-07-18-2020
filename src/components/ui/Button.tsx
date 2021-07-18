import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css, CSSProp } from 'styled-components';
import { colors } from './colors';
import { TextComponent } from './TextComponent';

interface PressableProps {
  color?: keyof typeof colors;
  small?: boolean;
}

const Pressable = styled(TouchableOpacity)<PressableProps>`
  width: 140px;
  align-items: center;
  padding: 10px 20px;
  background-color: #563ddd;
  border-radius: 4px;
  margin: 0 10px;
  background-color: ${({ color = 'violet' }: PressableProps): string =>
    colors[color]};

  ${({ small }: PressableProps): CSSProp =>
    (small &&
      css`
        padding: 4px;
        width: 100px;
        background-color: #353c49;
      `) ||
    ''};
`;

interface Props extends TouchableOpacityProps {
  text: string;
  color?: keyof typeof colors;
  small?: boolean;
}

export const Button = ({
  text,
  color,
  small,
  ...props
}: Props): JSX.Element => {
  return (
    <Pressable {...props} color={color} small={small}>
      <TextComponent color={small ? 'greyWhite' : 'white'}>
        {text}
      </TextComponent>
    </Pressable>
  );
};
