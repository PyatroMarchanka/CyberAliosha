import React from 'react';
import GlobalFonts from './styled/fonts';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import MainRouter from './pages/rootRouter';
import { ChordsAdderProvider } from './context/ChordsAdderContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChordsAdderProvider>
        <GlobalFonts />

        <MainRouter />
      </ChordsAdderProvider>
    </ThemeProvider>
  );
}

export default App;
