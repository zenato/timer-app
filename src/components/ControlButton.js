import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import I18n from 'react-native-i18n';
import CircleButton from './CircleButton';

export default class ControlButton extends Component {
  static propTypes = {
    start: PropTypes.bool.isRequired,
    pause: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleOnStart = this.handleOnStart.bind(this);
  }

  handleOnStart() {
    const { start, pause, onStart, onResume, onPause } = this.props;
    if (!start) {
      onStart();
    } else if (pause) {
      onResume();
    } else {
      onPause();
    }
  }

  render() {
    const { start, pause, onCancel } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftButton}>
          <CircleButton
            label={I18n.t('cancel')}
            disabled={!start}
            backgroundColor="#aaa"
            onPress={onCancel}
          />
        </View>
        <View style={styles.rightButton}>
          <CircleButton
            label={pause ? I18n.t('resume') : (start && I18n.t('stop') || I18n.t('start'))}
            backgroundColor={start && !pause ? '#a40000' : '#449c01' }
            onPress={this.handleOnStart}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: 'row',
  },
  leftButton: {
    flex: 1,
    marginLeft: 20 ,
  },
  rightButton: {
    flex: 1,
    marginRight: 20,
    alignItems: 'flex-end',
  },
});
