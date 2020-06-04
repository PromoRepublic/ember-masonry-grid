import Ember from 'ember';
import EmberObject, { computed } from '@ember/object';
const {
  Controller,
  get,
  set,
  run
} = Ember;

export default Controller.extend({
  first: true,
  item: {
    imgsrc: 'http://placehold.it/350x150',
    name: 'Mittens'
  },

  currentObject: computed('first', 'model', function () {
    let modelIndex = this.get('first') ? 0 : 1;

    return this.get('model').objectAt(modelIndex);
  }),

  // actions: {
    switchObjects() {
      this.toggleProperty('first');
    },

    switchGutter() {
      const gutter = get(this, 'gutter');
      const newGutter = (gutter === 10) ? 0 : 10;

      set(this, 'gutter', newGutter);
    },

    onLayout() {
      console.log('onLayout', arguments);
    },

    onLayoutComplete() {
      console.log('onLayoutComplete', arguments);
    },

    onItemClick(ev, item) {
      Ember.run(() => {
        this.get('currentObject').removeObject(item);
      });
    },

    appendItem() {
      run(() => {
        this.get('currentObject').pushObject(Object.create(this.get('item')));
      });
    },

    prependItem(model) {
      run(() => {
        this.get('currentObject').insertAt(0, Object.create(this.get('item')));
      });
    }
  // }
});
