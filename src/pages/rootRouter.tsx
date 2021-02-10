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
import { Tabs } from '../components/global/Tabs';

export default function MainRouter() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Body>
        <Switch>
          <Route path={routes.chordsEditor}>
            <Tabs items={[{ label: 'Editor' }, { label: 'Saved' }]}>
              <ChordsEditorPage />
              <SavedChordsPage />
            </Tabs>
          </Route>
          {/* <Route path={routes.chordsCreator}>
            <ChordsCreatorPage />
          </Route> */}
          {/* <Route path={routes.chordsSaved}>
          </Route> */}
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
  overflow: hidden;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color:#454D5E;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;
  }
`;
