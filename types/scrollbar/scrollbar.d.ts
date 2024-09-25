// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import { AntdComponent } from '../component';


export declare class Scrollbar extends AntdComponent {
  /**
   * Show native scrollbar.
   * @default false
   * @type boolean
   */
  native: boolean;

  /**
   * If the container size doesn't change, it's a good idea to set it up to optimize performance.
   * @default false
   * @type boolean
   */
  noresize: boolean;

  /**
   * className of scrollbar wrap
   * @type string
   */
  wrapClass: string;

  /**
   * style of scrollbar wrap
   * @type object
   */
  wrapStyle: object;


  /**
   * className of scrollbar view
   * @type string
   */
  viewClass: string;

  /**
   * style of scrollbar view
   * @type object
   */
  viewStyle: object;


  /**
   * tag of Scrollbar render. default div
   * @default 'div'
   * @type string
   */
  tag: string;
}
