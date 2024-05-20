import Modal, { destroyFns } from './Modal';
import { open, getKey } from '../modal-container';
import modalConfirm from './confirm';
import Icon from '../icon';
import Base from '../base';

const info = function(props) {
  const config = {
    type: 'info',
    icon: h => {
      return <Icon type="info-circle" />;
    },
    okCancel: false,
    ...props,
  };
  return modalConfirm(config);
};

const success = function(props) {
  const config = {
    type: 'success',
    icon: h => {
      return <Icon type="check-circle" />;
    },
    okCancel: false,
    ...props,
  };
  return modalConfirm(config);
};

const error = function(props) {
  const config = {
    type: 'error',
    icon: h => {
      return <Icon type="close-circle" />;
    },
    okCancel: false,
    ...props,
  };
  return modalConfirm(config);
};

const warning = function(props) {
  const config = {
    type: 'warning',
    icon: h => {
      return <Icon type="exclamation-circle" />;
    },
    okCancel: false,
    ...props,
  };
  return modalConfirm(config);
};
const warn = warning;

const confirm = function confirmFn(props) {
  const config = {
    type: 'confirm',
    okCancel: true,
    ...props,
  };
  return modalConfirm(config);
};
Modal.info = info;
Modal.success = success;
Modal.error = error;
Modal.warning = warning;
Modal.warn = warn;
Modal.confirm = confirm;

Modal.open = open;

Modal.getKey = getKey;

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

/* istanbul ignore next */
Modal.install = function(Vue) {
  Vue.use(Base);
  Vue.component(Modal.name, Modal);
};

export default Modal;
