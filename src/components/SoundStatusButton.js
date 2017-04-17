// @flow

import _ from 'lodash';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import I18n from 'react-native-i18n';
import { sounds } from '../constants';

type Props = {
  value: number,
  onPress: () => void,
};

const soundLabel = id => _.get(_.head(_.filter(sounds, { id }) || sounds), 'label');

const SoundStatusButton = ({ value, onPress }: Props) => (
  <TouchableHighlight onPress={onPress} underlayColor="#eee">
    <View style={styles.container}>
      <Text style={styles.label}>{I18n.t('onfinish')}</Text>
      <View style={styles.sound}>
        <Text style={styles.soundText}>{I18n.t(soundLabel(value))}</Text>
        <Text style={styles.soundTextArrow}>></Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  sound: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundText: {
    color: '#777',
    fontSize: 18,
  },
  soundTextArrow: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
});

export default SoundStatusButton;
