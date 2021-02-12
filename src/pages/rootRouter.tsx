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
  console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL);
  return (
    <Router basename={process.env.PUBLIC_URL}>
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
  -webkit-box-shadow: 0px 5px 15px 0px #333333;
  box-shadow: 0px 5px 15px 0px #333333;
  margin-top: 30px;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color:#454D5E;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;

    @media ${theme.breakpoints.belowTabletM} {
      padding: 0 20px;
    }
  }
`;
