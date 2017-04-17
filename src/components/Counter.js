// @flow

import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  min: number,
  sec: number,
  pause: boolean,
  onFinish: () => void,
};

type State = {
  remainTime: number,
};

export default class Counter extends Component<void, Props, State> {
  remainTime = (this.props.min * 60 + this.props.sec) * 1000;
  startTime = 0;

  timeout: ?number = null;
  displayInterval: ?number = null;

  state = {
    remainTime: this.remainTime,
  };

  componentWillReceiveProps(props: Props) {
    if (this.props.pause !== props.pause) {
      if (props.pause) {
        this.stop();
      } else {
        this.start();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  componentDidMount() {
    this.start();
  }

  start = () => {
    this.startTime = new Date().getTime();
    this.timeout = setTimeout(() => this.finish(), this.remainTime);
    this.displayInterval = setInterval(() => {
      const remainTime = Math.max(this.remainTime - (new Date().getTime() - this.startTime), 0);
      this.setState({ remainTime });
    }, 200);
  };

  stop = () => {
    if (this.displayInterval) {
      clearInterval(this.displayInterval);
    }
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.remainTime = Math.max(this.remainTime - (new Date().getTime() - this.startTime), 0);
  };

  finish = () => {
    this.props.onFinish();
    this.stop();
  };

  render() {
    const { remainTime } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{_.padStart(Math.floor(remainTime / 60000), 2, '0')}</Text>
        <Text style={styles.text}>:</Text>
        <Text style={styles.text}>{_.padStart(Math.floor((remainTime % 60000) / 1000), 2, '0')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 216,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 70,
  },
});
