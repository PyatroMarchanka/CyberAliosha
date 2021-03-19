import React, { useContext } from 'react';
import { settingsStore } from '../../context/SettingsProvider';
import { CheckboxIcon } from '../global/CheckboxIcon';

export const GuitarModeSwitcher = () => {
  const {
    state: { chordsGuitarMode },
    dispatch,
  } = useContext(settingsStore);

  const onChange = (value: boolean) => {
    dispatch({
      type: 'SET_CHORDS_GUITAR_MODE',
      payload: value,
    });
  };

  return <CheckboxIcon onChange={onChange} value={chordsGuitarMode} />;
};
