import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import { ChordsCreator } from './ChordsCreator';
import { ChordsEditor } from './ChordsEditor';
import { MainPage } from './MainPage';
import { routes } from './routes';

export default function MainRouter() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={routes.chordsEditor}>
          <ChordsEditor />
        </Route>
        <Route path={routes.chordsCreator}>
          <ChordsCreator />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
