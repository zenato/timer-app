type Sound = {
  id: number,
  label: string,
  filename: string,
};

const sounds = [
  {
    id: 1,
    label: 'alerts.basic',
    filename: 'alert_1.mp3',
  },
  {
    id: 2,
    label: 'alerts.alert1',
    filename: 'alert_2.mp3',
  },
  {
    id: 3,
    label: 'alerts.alert2',
    filename: 'alert_2.mp3',
  },
  {
    id: 4,
    label: 'alerts.alert3',
    filename: 'alert_2.mp3',
  },
  {
    id: 6,
    label: 'alerts.alert4',
    filename: 'alert_2.mp3',
  },
  {
    id: 7,
    label: 'alerts.alert5',
    filename: 'alert_2.mp3',
  },
  {
    id: 8,
    label: 'alerts.alert6',
    filename: 'alert_2.mp3',
  },
];

const storageKeys = {
  time: '@time',
  sound: '@sound',
};


export {
  sounds,
  storageKeys,
};

export type {
  Sound,
};
