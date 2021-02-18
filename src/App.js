import React, { useEffect } from 'react';
import GlobalFonts from './styled/fonts';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, Typography } from '@material-ui/core';
import MainRouter from './pages/rootRouter';
import { ChordsAdderProvider } from './context/ChordsAdderContext';
import { useSoundsLoaded } from './hooks/useSoundsLoaded';
import { Loader } from './components/global/Loader';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [soundsLoaded, isError] = useSoundsLoaded();

  if (!soundsLoaded) {
    return <Loader />;
  }

  if (soundsLoaded && isError) {
    return <Typography variant="h3">Error</Typography>;
  }

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
