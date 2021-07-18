import React, { ReactNode } from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import styled from 'styled-components';

const ModalContent = styled(View)`
  width: 100%;
  padding: 4px 0 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #1a1d28;
`;

const Backdrop = styled(Pressable)`
  flex: 1;
`;

const ModalBody = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 10,
  },
});

interface Props {
  children: ReactNode;
  isVisible: boolean;
  onClickOutside: () => void;
}
export const BottomDrawer = ({
  isVisible,
  onClickOutside,
  children,
}: Props): JSX.Element => {
  return (
    <Modal animationType="slide" visible={isVisible} transparent>
      <ModalBody>
        <Backdrop onPress={onClickOutside} />
        <ModalContent style={styles.shadow}>{children}</ModalContent>
      </ModalBody>
    </Modal>
  );
};
