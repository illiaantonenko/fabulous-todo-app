import * as React from 'react';

import * as TYPES from './types';
import * as ICONS from './icons';

class Icon extends React.Component<TYPES.IIcons> {
  constructor(props : TYPES.IIcons) {
    super(props);
  }

  pickIcon() {
    const {
      type,
      color,
      width,
      size,
      className,
    } = this.props;

    if (!ICONS[type]) return null;
    const Component = ICONS[type];
    const props = {
      color,
      width,
      size,
      className,
    };

    return <Component {...props} />;
  }

  render() {
    return this.pickIcon();
  }
}

export default Icon;
