/* eslint-disable no-unused-vars */
import { defineComponent, shallowRef } from 'vue';
import { ConfigConsumerProps } from '../config-provider/configConsumerProps';
import ModalBox from './ModalBox';

import { getKey } from './_util';

let containerInstance;

const ModalContainer = defineComponent({
  name: 'AModalContainer',
  setup() {
    const modals = shallowRef([]);

    function findIndex(modalKey) {
      return modals.value.findIndex(({ key }) => key === modalKey);
    }

    function updateModals(modalsValue) {
      modals.value = modalsValue.slice();
    }

    function open(modalProps) {
      if (!modalProps.key) {
        modalProps.key = getKey();
        if (!modalProps.destroyOnClose) {
          console.warn(
            `The modal which opened has no key, please provide a key or set the \`destroyOnClose\` as true.`,
          );
        }
      } else {
        const index = findIndex(modalProps.key);
        if (index !== -1) {
          modals.value.splice(index, 1);
        }
      }
      modals.value.push({ ...modalProps, visible: true });

      updateModals(modals.value);
    }

    function close(props) {
      const target = modals.value.find(({ key }) => key === props.key);
      if (target) {
        Object.assign(target, props, { visible: false });
        updateModals(modals.value);
      }
    }

    function update(props) {
      const target = modals.value.find(({ key }) => key === props.key);
      if (target) {
        Object.assign(target, props);
        updateModals(modals.value);
      }
    }

    return {
      modals,
      open,
      close,
      findIndex,
      update,
    };
  },
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  props: {},
  mounted() {
    containerInstance = this;
  },
  methods: {
    renderContainerWrapper(h, modals) {
      return modals.map((item) => {
        const { key, ...dialogProps } = item;
        return h(ModalBox, {key, props: dialogProps, on: {
          close: () => {
            this.close({key});
          },
        }});
      });
    },

  },
  render(h) {
    const { getPrefixCls } = this.configProvider;
    const prefixCls = getPrefixCls('modal-container');
    const { renderContainerWrapper, modals } = this;

    const items = renderContainerWrapper(h, modals);
    return <div class={prefixCls}>{items}</div>;
  },
});

function getContainer() {
  return containerInstance;
}

function open(props) {
  const $container = getContainer();
  function close(destroy = false) {
    if (destroy) {
      $container.close({ key: props.key, destroyOnClose: true });
    } else {
      $container.close({ key: props.key });
    }
  }

  function update(mergeProps) {
    $container.update({ key: props.key, ...mergeProps });
  }
  props = {
    close,
    maskClosable: false,
    destroyOnClose: true,
    ...props,
  };
  $container.open(props);

  return {
    close,
    update,
  };
}

export { getContainer, open, getKey };

export default ModalContainer;
