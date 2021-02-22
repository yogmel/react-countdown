import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppContainer from '../views/components/App/AppContainer';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <AppContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
