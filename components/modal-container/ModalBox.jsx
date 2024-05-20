import { defineComponent } from 'vue';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import PropTypes from '../_util/vue-types';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getConfirmLocale } from '../modal/locale';
import Modal from '../modal/Modal';
import Drawer from '../drawer';
import Button from '../button';
import {
  initDefaultProps,
  getComponentFromProp,
  // getClass,
  // getStyle,
  mergeProps,
  // getListeners,
} from '../_util/props-util';

const modalBoxProps = (defaultProps = {}) => {
  const props = {
    ...Modal.props,
    // 子组件属性
    children: PropTypes.any,
    // Drawer拓展的属性
    drawer: PropTypes.bool,
    placement: PropTypes.oneOf(['right', 'left']).def('right'),
    // on 事件
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  };

  return initDefaultProps(props, defaultProps);
};

const ModalBox = defineComponent({
  data() {
    return {
      okLoading: false,
    };
  },
  props: modalBoxProps({
    width: 520,
    visible: false,
    okType: 'primary',
    drawer: false,
  }),
  methods: {
    handleClose(e) {
      this.$emit('close', e);
    },
    handleOk(e) {
      const self = this;
      let ret;
      if (isFunction(self.onOk)) {
        ret = self.onOk(e);
      }
      if (ret && ret.then) {
        self.okLoading = true;
        ret
          .then(res => {
            self.okLoading = false;
            if (res === false) {
              return res;
            } else {
              self.handleClose();
            }
          })
          .catch(e => {
            console.error(e);
            self.okLoading = false;
          });
      } else {
        self.handleClose();
      }
    },
    handleCancel(e) {
      if (isFunction(this.onCancel)) {
        this.onCancel(e);
      }
    },
    renderOkBtn(locale) {
      const { okType, okButtonProps, handleOk, okLoading } = this;
      const okBtnProps = mergeProps(
        {
          on: { click: handleOk },
          props: {
            type: okType,
            loading: okLoading,
          },
        },
        okButtonProps || {},
      );
      return (
        <Button {...okBtnProps}>{getComponentFromProp(this, 'okText') || locale.okText}</Button>
      );
    },

    renderCancelBtn(locale) {
      const { cancelButtonProps, handleCancel } = this;
      const cancelBtnProps = mergeProps({ on: { click: handleCancel } }, cancelButtonProps || {});

      return (
        <Button {...cancelBtnProps}>
          {getComponentFromProp(this, 'cancelText') || locale.cancelText}
        </Button>
      );
    },
  },
  render(h) {
    const { renderOkBtn, renderCancelBtn, handleCancel, handleClose } = this;

    const {
      drawer,
      footer: propsFooter,
      title: propsTitle,
      children: propsChildren,
      dialogStyle,
      onOk,
      onCancel,
      ...props
    } = this.$props;

    const okBtn = (
      <LocaleReceiver
        componentName="Modal"
        defaultLocale={getConfirmLocale()}
        scopedSlots={{ default: renderOkBtn }}
      />
    );

    const cancelBtn = (
      <LocaleReceiver
        componentName="Modal"
        defaultLocale={getConfirmLocale()}
        scopedSlots={{ default: renderCancelBtn }}
      />
    );

    const newChildren = isFunction(propsChildren) ? propsChildren(h) : propsChildren;
    const slotsDefault = isArray(newChildren) ? newChildren : [newChildren];
    const title = isFunction(propsTitle) ? propsTitle(h) : propsTitle;
    const footer = isFunction(propsFooter)
      ? propsFooter(h, { okBtn, cancelBtn })
      : propsFooter === void 0
      ? [cancelBtn, okBtn]
      : propsFooter;
    const mergeProps = { ...props };

    const scopedSlots = {
      title: () => [title],
    };

    if (isNull(footer)) {
      mergeProps['footer'] = null;
    } else {
      scopedSlots['footer'] = () => (Array.isArray(footer) ? footer : [footer]);
    }

    return drawer === true
      ? h(
          Drawer,
          {
            props: {
              ...omit(mergeProps, ['dialogClass, confirmLoading']),
              drawerStyle: dialogStyle,
            },
            on: {
              close: (e) => {
                if (isNull(footer) && mergeProps.maskClosable) {
                  handleClose(e);
                } else {
                  handleCancel(e);
                }
              },
            },
            scopedSlots,
          },
          slotsDefault,
        )
      : h(
          Modal,
          {
            props: {
              ...omit(mergeProps, ['placement', 'height', 'handle', 'confirmLoading']),
              dialogStyle,
            },
            on: {
              cancel: (e) => {
                if (isNull(footer) && mergeProps.maskClosable) {
                  handleClose(e);
                } else {
                  handleCancel(e);
                }
              },
            },
            scopedSlots,
          },
          slotsDefault,
        );
  },
});

export default ModalBox;
