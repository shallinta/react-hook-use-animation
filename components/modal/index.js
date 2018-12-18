/**
 * 浮层、弹窗 组件
 *
 * 1. 显示：通过`visible`属性控制显示，变更visible属性时自动执行动画
 * visible变为false不显示时，动画结束后display会变成none
 * visible变为true显示时，display会先变为flex，然后执行动画
 *
 * 2. 动画：通过`animation`传入动画样式，动画基于css实现
 * 支持"fade", "slide-left", "slide-up", "zoom"四种动画
 * 默认动画为"slide-left"，可同时用多个动画，用空格隔开，如"fade slide-up"
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Portal from '../portal';
import useAnimation from '../../hooks/use-animation';
import './style.css';

const Modal = (props) => {
  const { children, visible, animation } = props;
  const ref = useRef(null);
  const [zIndex, setZIndex] = useState(Modal.zIndex);
  const [display, active, set] = useAnimation(ref.current);

  useEffect(() => {
    if (visible) {
      Modal.zIndex += 1;
      setZIndex(Modal.zIndex);
    }
    set(visible);
  }, [visible, ref]);

  const cname = cn({
    'ui-modal': true,
    hide: !display,
    [animation]: !active
  });

  return (
    <Portal>
      <div ref={ref} className={cname} style={{ zIndex }}>
        {children}
      </div>
    </Portal>
  );
};

Modal.zIndex = 10000; // 按实例显示时自增zIndex

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  animation: PropTypes.string
};

Modal.defaultProps = {
  animation: 'slide-left'
};

export default Modal;
