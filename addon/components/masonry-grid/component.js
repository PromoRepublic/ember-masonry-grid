/* global imagesLoaded, Masonry */
import layout from './template';
import {A} from '@ember/array';
import Component from '@ember/component';
import {htmlSafe} from '@ember/template';
import {tryInvoke} from '@ember/utils';
import {scheduleOnce} from '@ember/runloop';
import {computed, get, set, defineProperty, getProperties} from '@ember/object';

const MASONRY_OPTION_KEYS = A([
  'containerStyle',
  'columnWidth',
  'gutter',
  'hiddenStyle',
  'isFitWidth',
  'isInitLayout',
  'isOriginLeft',
  'isOriginTop',
  'isResizeBound',
  'itemSelector',
  'stamp',
  'transitionDuration',
  'visibleStyle'
]);

export default Component.extend({
  layout,
  classNames: ['masonry-grid'],

  // masonry default options
  // overriding the default `isInitLayout` value allows us to attach an event for
  // `layoutComplete` before the first render
  isInitLayout: false,
  itemSelector: '.masonry-item',
  attributeBindings: ['masonryGridStyle:style'],

  masonryGridStyle: htmlSafe('position: relative'),

  customLayout: false,
  masonry: null,

  waitForImages: true,

  itemClass: computed('itemSelector', function() {
    return get(this, 'itemSelector').replace('.', '');
  }),

  init() {
    this._super(...arguments);
    defineProperty(this, 'options', computed.apply(this, [...MASONRY_OPTION_KEYS, this._computeOptions]));
  },

  didUpdateAttrs(attrsObj) {
    this._super(...arguments);

    if (attrsObj) {
      const shouldRebuild = MASONRY_OPTION_KEYS.any((option) => {
        return (attrsObj.newAttrs[option] !== attrsObj.oldAttrs[option]);
      });

      if (shouldRebuild) {
        this._destroyMasonry();
      }
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this._destroyMasonry();
  },

  didRender() {
    this._super(...arguments);

    let masonry = get(this, 'masonry');

    scheduleOnce('afterRender', this, () => {
      let _f = () => {
        if (masonry) {
          masonry.reloadItems();
        } else {
          if (this.isDestroyed || this.isDestroying || !this.element) return;

          const options = get(this, 'options');
          masonry = set(this, 'masonry', new Masonry(get(this, 'element'), options));
          masonry.on('layoutComplete', layout => tryInvoke(this, 'onLayoutComplete', [layout]));
        }

        masonry.layout();
      };

      if (this.get('waitForImages')) {
        imagesLoaded(get(this, 'element'), _f);
      } else {
        _f();
      }
    });
  },

  _computeOptions() {
    let options = getProperties(this, MASONRY_OPTION_KEYS);

    Object.keys(options).forEach((key) => {
      if (options[key] === 'null') {
        options[key] = null;
      }

      if (options[key] === undefined) {
        delete options[key];
      }
    });

    return options;
  },

  _destroyMasonry() {
    const masonry = get(this, 'masonry');

    if (masonry) {
      masonry.destroy();
    }

    set(this, 'masonry', undefined);
  }
});
