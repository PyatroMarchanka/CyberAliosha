import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import MainRouter from './pages/rootRouter';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
