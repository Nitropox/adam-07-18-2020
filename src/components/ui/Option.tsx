import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled, { css, CSSProp } from 'styled-components';

const OptionWrapper = styled(View)`
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-color: #31343b;
  border-bottom-width: 1px;
`;

interface TextProps {
  isSelected: boolean;
}

const StyledText = styled(Text)<TextProps>`
  ${({ isSelected }: TextProps): CSSProp =>
    (isSelected &&
      css`
        color: #fff;
      `) ||
    css`
      color: #868d9a;
    `};
`;
interface Props {
  optionText: number;
  isSelected: boolean;
  onPress: () => void;
}

export const Option = ({
  optionText,
  isSelected,
  onPress,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <OptionWrapper>
        <StyledText isSelected={isSelected}>{optionText}</StyledText>
      </OptionWrapper>
    </TouchableOpacity>
  );
};
