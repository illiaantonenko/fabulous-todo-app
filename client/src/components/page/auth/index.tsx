import * as React from 'react';

import { Props } from '../../../containers/auth';
import { Typography } from '../../ui';

import Authorization from './sign_in';
import Registration from './sign_up';
import * as css from './main.module.css';

interface IState {
  activeTab: 'auth' | 'register';
}

class AuthPage extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 'auth',
    };

    this.switchTabs = this.switchTabs.bind(this);
  }

  switchTabs() {
    const { activeTab } = this.state;
    const nextTab = activeTab === 'auth' ? 'register' : 'auth';

    this.setState({ activeTab: nextTab });
  }

  render() {
    const { activeTab } = this.state;
    const { authenticate, register } = this.props;

    return (
      <div className={css.auth_wrapper}>
        <div
          className={`${css.animation_container} ${activeTab === 'register' ? css.register : ''}`}
        >
          <div className={css.auth_block}>
            <Authorization
              toggle={this.switchTabs}
              onSubmit={authenticate}
            />
          </div>
          <div className={css.content_block}>
            <img className={css.bg_image} src={`${process.env.ASSETS_URL}/img/sidebar.jpeg`} alt="Flower on the pretty desc" />
            <Typography tag="h2" weight="light" color="white_2" className={css.title}>
              Organise yourself
            </Typography>
            <Typography tag="p" weight="regular" color="white" className={css.description}>
              You lose all of your motivation in compleeting personal tasks?
              If it is so, then this application is for you. Do not forget about your
              plans and goals and build yourself!
            </Typography>
          </div>
          <div className={css.reg_block}>
            <Registration
              toggle={this.switchTabs}
              onSubmit={register}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
