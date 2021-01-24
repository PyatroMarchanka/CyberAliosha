import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import { ChordsCreatorPage } from './ChordsCreatorPage';
import { ChordsEditorPage } from './ChordsEditorPage';
import { MainPage } from './MainPage';
import { routes } from './routes';

export default function MainRouter() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={routes.chordsEditor}>
          <ChordsEditorPage />
        </Route>
        <Route path={routes.chordsCreator}>
          <ChordsCreatorPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
