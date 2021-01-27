import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import { AboutPage } from './AboutPage';
import { ChordsCreatorPage } from './ChordsCreatorPage';
import { ChordsEditorPage } from './ChordsEditorPage';
import { MainPage } from './MainPage';
import { routes } from './routes';
import { SavedChordsPage } from './SavedChordsPage';

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
  padding: 20px;
`;
