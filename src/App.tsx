import React from 'react';
import GlobalFonts from './styled/fonts';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import MainRouter from './pages/rootRouter';
import { ChordsAdderProvider } from './context/ChordsAdderContext';
import { SettingsProvider } from './context/SettingsProvider';
import { useSettings } from './hooks/useSettings';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => {
  useSettings();

  return (
    <ThemeProvider theme={theme}>
      <SettingsProvider>
        <ChordsAdderProvider>
          <GlobalFonts />
          <MainRouter />
        </ChordsAdderProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
