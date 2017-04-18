// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Alert,
  StatusBar,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import RNSound from 'react-native-sound';
import I18n from 'react-native-i18n';
import Header from '../components/Header';
import Counter from '../components/Counter';
import TimePicker from '../components/TimePicker';
import SoundModal from '../components/SoundModal';
import SoundStatusButton from '../components/SoundStatusButton';
import ControlButton from '../components/ControlButton';
import {
  updateTime,
  updateSound,
  toggleSoundModal,
  start,
  pause,
  resume,
  done
} from '../state/actions/timer';
import { sounds, storageKeys } from '../constants';

class Timer extends Component {
  sound: any = null;

  constructor(props) {
    super(props);

    RNSound.setCategory('Playback');
  };

  componentDidMount() {
    this.fetchData().done();
  }

  async fetchData() {
    const time = await AsyncStorage.getItem(storageKeys.time);
    if (time) {
      const s = time.split(':');
      this.props.updateTime({ min: Number(s[0]), sec: Number(s[1]) });
    }
    const sound = await AsyncStorage.getItem(storageKeys.sound);
    if (sound) {
      this.props.updateSound(Number(sound));
    }
  }

  handleChangeTimePicker = (value) => {
    this.props.updateTime(value);
    AsyncStorage.setItem(storageKeys.time, `${value.min}:${value.sec}`);
  };

  handleOnSoundStatusButton = () => {
    this.props.toggleSoundModal(true);
  };

  handleOnSoundModal = (value) => {
    this.props.toggleSoundModal(false);
    if (value) {
      this.props.updateSound(value);
      AsyncStorage.setItem(storageKeys.sound, value.toString());
    }
  };

  handleOnCancel = () => {
    this.props.done();
  };

  handleOnStart = () => {
    this.props.start();
  };

  handleOnPause = () => {
    this.props.pause();
  };

  handleOnResume = () => {
    this.props.resume();
  };

  handleOnFinish = () => {
    const { sound } = this.props.timer;
    const selected = _.head(_.filter(sounds, { id: sound }) || sounds);
    this.playSound(selected.filename);

    Alert.alert(I18n.t('timeover.title'), I18n.t('timeover.message'), [
      {
        text: I18n.t('timeover.button'),
        onPress: () => {
          if (this.sound) {
            this.sound.release();
            this.sound = null;
          }
          this.props.done();
        }
      },
    ]);
  };

  playSound = (filename) => {
    this.sound = new RNSound(filename, RNSound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        this.sound.play();
        this.sound.setNumberOfLoops(-1);
      }
    });
  };

  render() {
    const { min, sec, sound, showSoundModal, start, pause } = this.props.timer;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Header title={I18n.t('title')}/>

        {start ? (
          <Counter min={min} sec={sec} pause={pause} onFinish={this.handleOnFinish} />
        ) : (
          <TimePicker min={min} sec={sec} onChange={this.handleChangeTimePicker} />
        )}

        <SoundStatusButton value={sound} onPress={this.handleOnSoundStatusButton} />

        <SoundModal
          value={sound}
          visible={showSoundModal}
          onClose={this.handleOnSoundModal}
        />

        <ControlButton
          start={start}
          pause={pause}
          onStart={this.handleOnStart}
          onPause={this.handleOnPause}
          onResume={this.handleOnResume}
          onCancel={this.handleOnCancel}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default connect(state => ({
    timer: state.timer,
  }),
  (dispatch) => bindActionCreators({
    updateTime,
    updateSound,
    toggleSoundModal,
    start,
    pause,
    resume,
    done,
  }, dispatch)
)(Timer);
