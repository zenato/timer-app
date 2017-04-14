import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Picker,
  Platform,
  StyleSheet,
} from 'react-native';
import I18n from 'react-native-i18n';

const Label = ({ children }) => (
  <View style={styles.labelContainer}>
    <Text style={styles.labelText}>{children}</Text>
  </View>
);

const Selector = ({ value, onChange }) => (
  <View style={styles.picker}>
    <Picker
      mode="dropdown"
      selectedValue={value}
      onValueChange={onChange}
      itemStyle={styles.pickerItem}
    >
      {_.range(0, 60).map(v => (
        <Picker.Item
          label={_.padStart(v, 2, ' ')}
          key={`min-${v}`}
          value={v}
        />
      ))}
    </Picker>
  </View>
);

export default class TimePicker extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    sec: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      min: props.min,
      sec: props.sec,
    };

    this.handleChangeMin = this.handleChangeMin.bind(this);
    this.handleChangeSec = this.handleChangeSec.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.min !== props.min || this.state.sec !== props.sec) {
      this.setState({ min: props.min, sec: props.sec });
    }
  }

  handleChangeMin(min) {
    const { sec } = this.state;
    if (min === 0 && sec === 0) {
      this.setState(() => ({ min: 1, sec: 0 }));
      this.props.onChange({ min: 1, sec: 0 });
    } else {
      this.setState(() => ({ min }));
      this.props.onChange({ min, sec });
    }
  }

  handleChangeSec(sec) {
    const { min } = this.state;
    if (min === 0 && sec === 0) {
      this.setState(() => ({ min: 1, sec: 0 }));
      this.props.onChange({ min: 1, sec: 0 });
    } else {
      this.setState(() => ({ sec }));
      this.props.onChange({ min, sec });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Selector value={this.state.min} onChange={this.handleChangeMin} />
        <Label>{I18n.t('min')}</Label>
        <Selector value={this.state.sec} onChange={this.handleChangeSec} />
        <Label>{I18n.t('sec')}</Label>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 220,
  },
  labelContainer: {
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
    height: 35,
    marginTop: 90.3,
    ...Platform.select({
      android: {
        height: 50,
      },
    }),
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 8,
    ...Platform.select({
      android: {
        paddingTop: 13,
      },
    }),
    textAlign: 'right',
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
        marginTop: 90.3,
        width: 100,
        height: 50,
      },
    }),
  },
  pickerItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
