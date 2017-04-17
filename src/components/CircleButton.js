// @flow

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  label: string,
  onPress: () => void,
  disabled?: boolean,
  backgroundColor?: string,
  textColor?: string,
};

type ButtonProps = {
  label: string,
  disabled?: boolean,
  backgroundColor?: string,
  textColor?: string,
};

const Button = ({ label, disabled, backgroundColor, textColor }: ButtonProps) => (
  <View
    style={[
      styles.container,
      { backgroundColor },
      disabled && styles.disabledContainer,
    ]}
  >
    <Text
      style={[
        styles.text,
        { color: textColor },
        disabled && styles.disabledText,
      ]}
    >{label}</Text>
  </View>
);

const CircleButton = (props: Props) => props.disabled
  ? <Button {...props} />
  : (
    <TouchableOpacity onPress={props.onPress}>
      <Button {...props} />
    </TouchableOpacity>
  );

CircleButton.defaultProps = {
  disabled: false,
  backgroundColor: '#0b1635',
  textColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#ff4b00',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  disabledContainer: {
    backgroundColor: '#ddd',
  },
  disabledText: {
    color: '#fff',
  },
});

export default CircleButton;
