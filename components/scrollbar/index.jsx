
import { ConfigConsumerProps } from '../config-provider/configConsumerProps';
import PropTypes from '../_util/vue-types';
import { getOptionProps } from '../_util/props-util';
import scrollbarWidth from './utils/scrollbar-width';
import { addResizeListener, removeResizeListener } from './utils/resize-event';
import { toObject } from './utils/util';
import Bar from './Bar';

/* istanbul ignore next */
const Scrollbar = {
  name: 'AScrollbar',
  components: { Bar },
  props: {
    native: PropTypes.bool,
    wrapStyle: PropTypes.object.def({}),
    wrapClass: PropTypes.object.def({}),
    viewClass: PropTypes.object.def({}),
    viewStyle: PropTypes.object.def({}),
    noresize: PropTypes.bool, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: PropTypes.string.def('div'),
    prefixCls: PropTypes.string,
  },

  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    },
  },

  mounted() {
    if (this.native) return;
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  },

  methods: {
    handleScroll() {
      const wrap = this.wrap;

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
    },

    update() {
      let heightPercentage, widthPercentage;
      const wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
      widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';
    },
  },

  render(h) {
    const { $slots, configProvider } = this;
    const props = getOptionProps(this);
    const children = $slots.default;

    const { native, tag, wrapClass, wrapStyle, viewClass, viewStyle, prefixCls: customizePrefixCls } = props;
    const getPrefixCls = configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('scrollbar', customizePrefixCls);

    const scrollbarWrapCls = `${prefixCls}-wrap`;

    const scrollbarViewCls = `${prefixCls}-view`;

    let gutter = scrollbarWidth();
    let style = wrapStyle;

    if (gutter) {
      const gutterWith = `-${gutter}px`;
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

      if (Array.isArray(wrapStyle)) {
        style = toObject(wrapStyle);
        style.marginRight = style.marginBottom = gutterWith;
      } else if (typeof wrapStyle === 'string') {
        style += gutterStyle;
      } else {
        style = gutterStyle;
      }
    }
    const view = h(
      tag,
      {
        class: [scrollbarViewCls, viewClass],
        style: viewStyle,
        ref: 'resize',
      },
      children,
    );
    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={this.handleScroll}
        class={[
          wrapClass,
          scrollbarWrapCls,
          gutter ? '' : `${scrollbarWrapCls}--hidden-default`,
        ]}
      >
        {[view]}
      </div>
    );
    let nodes;

    if (!native) {
      nodes = [
        wrap,
        <Bar prefixCls={prefixCls} move={this.moveX} size={this.sizeWidth}></Bar>,
        <Bar prefixCls={prefixCls} vertical move={this.moveY} size={this.sizeHeight}></Bar>,
      ];
    } else {
      nodes = [
        <div ref="wrap" class={[wrapClass, scrollbarWrapCls]} style={style}>
          {[view]}
        </div>,
      ];
    }
    return h('div', { class: prefixCls }, nodes);
  },
};


/* istanbul ignore next */
Scrollbar.install = function(Vue) {
  Vue.component(Scrollbar.name, Scrollbar);
};

export default Scrollbar;
