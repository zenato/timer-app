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
  remain: number,
};

export default class Counter extends Component<void, Props, State> {
  remain: number = (this.props.min * 60 + this.props.sec) * 1000;
  startTime: number = 0;
  timer: any = null;
  display: any = null;

  state = {
    remain: this.remain,
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
    this.timer = setTimeout(() => this.finish(), this.remain);
    this.display = setInterval(() => {
      const remain = Math.max(this.remain - (new Date().getTime() - this.startTime), 0);
      this.setState({ remain });
    }, 200);
  };

  stop = () => {
    clearInterval(this.display);
    clearTimeout(this.timer);
    this.remain = Math.max(this.remain - (new Date().getTime() - this.startTime), 0);
  };

  finish = () => {
    this.props.onFinish();
    this.stop();
  };

  render() {
    const { remain } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{_.padStart(Math.floor(remain / 60000), 2, '0')}</Text>
        <Text style={styles.text}>:</Text>
        <Text style={styles.text}>{_.padStart(Math.floor((remain % 60000) / 1000), 2, '0')}</Text>
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
