/**
 * 传送门组件
 */

import React from 'react';
import ReactDOM from 'react-dom';

const Portal = props => (
  ReactDOM.createPortal(
    React.Children.only(props.children),
    props.container || document.body
  )
);

export default Portal;
