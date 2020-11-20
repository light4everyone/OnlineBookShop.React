import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Login from './login/Login';
import CombinedStore from './store/CombinedStore';
import { BrowserRouter, Redirect, Route, Switch as RouterSwitch } from 'react-router-dom';
import Admin from './admin/Admin';
import { fetchCurrentUser } from './store/actions/auth';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector<CombinedStore, boolean>(
    (s) => s.auth.isAuthenticated
  );

  const isFetchingCurrentUser = useSelector<CombinedStore, boolean>(
    (s) => s.auth.isFetchingCurrentUser
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        {
          !isFetchingCurrentUser
            ?
            <RouterSwitch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route path="/">
                {isAuthenticated ? <Admin /> : <Redirect to="/login" />}
              </Route>
            </RouterSwitch>
            : null
        }
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
}

export default App;
