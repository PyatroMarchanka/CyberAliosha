import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import { AboutPage } from './AboutPage';
import { ChordsCreatorPage } from './Chords/ChordsCreatorPage';
import { ChordsEditorPage } from './Chords/ChordsEditorPage';
import { MainPage } from './MainPage';
import { routes } from './routes';
import { SavedChordsPage } from './Chords/SavedChordsPage';
import { MelodiesPage } from './Melodies/MelodiesPage';

export default function MainRouter() {
  return (
    <Router>
      <Header />
      <Body>
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
  padding: 20px 50px;
`;
