import React, { useContext, useEffect } from 'react';
import { settingsStore } from '../context/SettingsProvider';
import { getSettings } from '../localStorageUtils/settingsStorage';

export const useSettings = () => {
  const { dispatch } = useContext(settingsStore);

  useEffect(() => {
    dispatch({
      type: 'SET_SETTINGS',
      payload: getSettings(),
    });
  }, []);
};
