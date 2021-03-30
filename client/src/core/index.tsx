import * as React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import Auth from '../containers/auth';
import Tasks from '../containers/tasks';

import { store } from './store';

interface IState {
  auth: boolean;
  subscription: any;
}

class Application extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      auth: Boolean(store.getState().user.token),
      subscription: null,
    };

    this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    this.authHandler();
  }

  componentWillUnmount() {
    this.state.subscription && this.state.subscription();
  }

  authHandler() {
    const subscription = store.subscribe(() => {
      const current = store.getState().user.token;

      if (Boolean(current) !== this.state.auth) {
        this.setState({ auth: Boolean(current) });
      }
    });

    this.setState({
      subscription,
    });
  }

  render() {
    const { auth } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {!auth && (
              <>
                <Redirect to="/auth" />
                <Route exact path="/auth" component={Auth} />
              </>
            )}

            <Route exact path="/tasks" component={Tasks} />

            <Redirect from="/" to="/tasks" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Application;
