import React, { useContext } from 'react';
import { settingsStore } from '../../context/SettingsProvider';
import { Checkbox } from '../global/Checkbox';

interface Props {}

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

  return <Checkbox label="Guitar mode" onChange={onChange} value={chordsGuitarMode} />;
};
