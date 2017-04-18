// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import RNSound from 'react-native-sound';
import I18n from 'react-native-i18n';
import Header from './Header';
import { sounds } from '../constants';
import type { Sound } from '../constants';

const CancelButton = ({ onClose }) => (
  <TouchableHighlight underlayColor="#2f0001" onPress={onClose}>
    <Text style={styles.cancel}>{I18n.t('cancel')}</Text>
  </TouchableHighlight>
);

const DoneButton = ({ onClose }) => (
  <TouchableHighlight underlayColor="#2f0001" onPress={onClose}>
    <Text style={styles.done}>{I18n.t('done')}</Text>
  </TouchableHighlight>
);

type Props = {
  value: number,
  visible: boolean,
  onClose: (id: ?number) => void,
};

type State = {
  items: Array<Sound>,
};

export default class SoundModal extends Component<void, Props, State> {
  state = {
    items: sounds.map(sound => ({
      ...sound,
      key: sound.id,
      selected: sound.id === this.props.value,
    })),
  };

  sound: any = null;

  constructor(props: Props) {
    super(props);

    RNSound.setCategory('Playback');
  }

  handleOnCancel = () => {
    this.props.onClose();
    this.setState((state) => ({
      items: state.items.map(sound => ({
        ...sound,
        selected: sound.id === this.props.value,
      })),
    }));
  };

  handleOnDone = () => {
    const selected = _.head(_.filter(this.state.items, { selected: true }));
    this.props.onClose(selected.id);
  };

  handleOnSelect = (item: Sound) => {
    this.setState((state) => {
      return {
        items: state.items.map(sound => ({
          ...sound,
          selected: sound.id === item.id,
        })),
      };
    });
    this.playSound(item.filename);
  };

  playSound(filename: string) {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }

    this.sound = new RNSound(filename, RNSound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        this.sound.play(() => {
          this.sound.release();
          this.sound = null;
        });
      }
    });
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={this.handleOnCancel}
      >
        <Header
          title={I18n.t('onfinish')}
          leftButton={<CancelButton onClose={this.handleOnCancel}/>}
          rightButton={<DoneButton onClose={this.handleOnDone}/>}
        />
        {this.props.visible && (
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <TouchableHighlight underlayColor="#eee" onPress={() => this.handleOnSelect(item)}>
                <View style={styles.rowContainer}>
                  <Text style={styles.checkBox}>{item.selected ? '✓' : ''}</Text>
                  <Text style={styles.text}>{I18n.t(item.label)}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  cancel: {
    color: '#ffaa00',
    fontSize: 17,
  },
  done: {
    color: '#ffaa00',
    fontSize: 17,
    fontWeight: 'bold',
  },
  rowContainer: {
    height: 50,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    flex: 1,
    flexDirection: 'row',
  },
  checkBox: {
    width: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5008',
  },
  text: {
    fontSize: 18,
  },
});

