import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title, leftButton, rightButton }) => (
  <View style={styles.container}>
    <View style={styles.leftButton}>
      {leftButton}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.rightButton}>
      {rightButton}
    </View>
  </View>
);

Header.propsTypes = {
  title: PropTypes.string.isRequired,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#2f0001',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  leftButton: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  rightButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
});

export default Header;
