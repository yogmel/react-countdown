import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppViewModel } from '../../../viewmodels';
import { useDateQueryValues, useRemainingTime } from '../../shared/hooks';
import App from './App';

function AppContainer() {
  const locationSearch = useLocation().search;
  const targetDate = useDateQueryValues(locationSearch);
  const appViewModel = new AppViewModel(useRemainingTime(targetDate));

  return <App editor={appViewModel} targetDateFromQuery={targetDate} />;
}

export default AppContainer;
