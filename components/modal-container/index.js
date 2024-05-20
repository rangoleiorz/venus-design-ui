// eslint-disable-next-line no-unused-vars
import ModalContainer, { open, getKey } from './ModalContainer';
import Base from '../base';

/* istanbul ignore next */
ModalContainer.install = function(Vue) {
  Vue.use(Base);
  Vue.component(ModalContainer.name, ModalContainer);
};

export { open, getKey };
export default ModalContainer;
