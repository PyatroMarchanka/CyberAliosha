import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import { AboutPage } from './AboutPage';
import { ChordsCreatorPage } from './Chords/ChordsCreatorPage';
import { ChordsEditorPage } from './Chords/ChordsEditorPage';
import { MainPage } from './MainPage';
import { routes } from './routes';
import { SavedChordsPage } from './Chords/SavedChordsPage';
import { MelodiesPage } from './Melodies/MelodiesPage';
import { theme } from '../utils/theme';
import { Navigation } from '../components/Header/Navigation';

export default function MainRouter() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Body>
        <Navigation />
        <Switch>
          <Route path={routes.chordsEditor}>
            <ChordsEditorPage />
          </Route>
          <Route path={routes.chordsCreator}>
            <ChordsCreatorPage />
          </Route>
          <Route path={routes.chordsSaved}>
            <SavedChordsPage />
          </Route>
          <Route path={routes.melodyEditor}>
            <MelodiesPage />
          </Route>
          <Route path={routes.about}>
            <AboutPage />
          </Route>
          <Route path={routes.root}>
            <MainPage />
          </Route>
        </Switch>
      </Body>
    </Router>
  );
}

const Body = styled.div`
  background-color: #60656f;
  border-radius: 10px;
  padding: 0 20px 20px;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color:${theme.colors.grey[400]};
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;
  }
`;
