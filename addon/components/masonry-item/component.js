import Component from '@ember/component';
import {computed, get} from '@ember/object';
import layout from './template';
import {htmlSafe} from '@ember/template';

export default Component.extend({
  layout,
  classNameBindings: ['itemClass'],
  attributeBindings: ['masonryItemStyle:style'],

  masonryItemStyle: htmlSafe('position: absolute'),

  itemClass: computed.oneWay('grid.itemClass'),

  click(ev) {
    const onItemClick = get(this, 'onItemClick');
    const item = get(this, 'item');

    if (onItemClick && typeof onItemClick === 'function') {
      onItemClick(ev, item);
    }
  }
});
