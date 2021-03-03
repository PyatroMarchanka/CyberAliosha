import React, { useContext } from 'react';
import { chordsAdderStore } from '../../context/ChordsAdderContext';
import { Checkbox } from '../global/Checkbox';

interface Props {}

export const GuitarModeSwitcher = ({}: Props) => {
  const {
    state: { chordsGuitarMode },
    dispatch,
  } = useContext(chordsAdderStore);

  const onChange = (value: boolean) => {
    dispatch({
      type: 'SET_CHORDS_GUITAR_MODE',
      payload: value,
    });
  };

  return <Checkbox label="Guitar mode" onChange={onChange} value={chordsGuitarMode} />;
};
