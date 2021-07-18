import React, { ReactNode } from 'react';
import { BottomDrawer } from './ui/BottomDrawer';
import { Option } from './ui/Option';

interface Props {
  tickSizeOptions: TickSize[];
  setIsTickSelectOpen: (_: boolean) => void;
  tickSelectHandler: (_: TickSize) => void;
}
export const TickSizeSelect = ({
  tickSizeOptions,
  setIsTickSelectOpen,
  tickSelectHandler,
}: Props): JSX.Element => {
  return (
    <BottomDrawer
      isVisible
      onClickOutside={(): void => setIsTickSelectOpen(false)}>
      <>
        {tickSizeOptions.map(
          (option): ReactNode => (
            <Option
              key={option}
              isSelected={false}
              optionText={option}
              onPress={(): void => tickSelectHandler(option)}
            />
          ),
        )}
      </>
    </BottomDrawer>
  );
};
