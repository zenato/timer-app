import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Button = ({ label, disabled, backgroundColor, textColor }) => {
  return (<View
      style={[
        styles.container,
        { backgroundColor: backgroundColor },
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
    </View>);
}

const CircleButton = props => props.disabled
  ? <Button {...props} />
  : (
    <TouchableOpacity onPress={props.onPress}>
      <Button {...props} />
    </TouchableOpacity>
  );

CircleButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

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
