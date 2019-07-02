import reducer from '../cart';
import expect from 'expect';

describe('cart reducer', () => {
  /**
   * Note: Initial state is a bit weird in this case because it's dictated by the entry point rather than
   * within the cart module. I should probably move it but at least this checks that nothing tampers with
   * the given initial state when an action isn't recognised and that undefined isn't returned!
   */
  it('should return the initial state', () => {
    expect(reducer({
      items: []
    }, {})).toEqual({
      items: []
    });
  });

  it('should handle ADD_ITEM', () => {
    const product =  { id: '0000001', name: 'Peas', price: 0.95 };

    expect(reducer({
      items: []
    }, {
      type: 'ADD_ITEM',
      payload: product
    })).toEqual({
      items: [{
        ...product,
        quantity: 1
      }]
    });
  });

  it('should handle ADD_ITEM and adjust quantities', () => {
    const product =  { id: '0000001', name: 'Peas', price: 0.95 };

    expect(reducer({
      items: [{
        ...product,
        quantity: 1
      }]
    }, {
      type: 'ADD_ITEM',
      payload: product
    })).toEqual({
      items: [{
        ...product,
        quantity: 2
      }]
    });
  });

  it('should handle DEL_ITEM', () => {
    const product =  { id: '0000001', name: 'Peas', price: 0.95 };

    expect(reducer({
      items: [{
        ...product,
        quantity: 1
      }]
    }, {
      type: 'DEL_ITEM',
      payload: product
    })).toEqual({
      items: []
    });
  });

  it('should handle DEL_ITEM and adjust quantities', () => {
    const product =  { id: '0000001', name: 'Peas', price: 0.95 };

    expect(reducer({
      items: [{
        ...product,
        quantity: 2
      }]
    }, {
      type: 'DEL_ITEM',
      payload: product
    })).toEqual({
      items: [{
        ...product,
        quantity: 1
      }]
    });
  });

  /**
   * Added this test after I discovered a bug that was removing all of my
   * items, not just this one! Consider this for regression purposes.
   */
  it('should handle DEL_ITEM and leave other items alone', () => {
    expect(reducer({
      items: [
        { id: '0000001', name: 'Peas', price: 0.95, quantity: 5 },
        { id: '0000004', name: 'Beans', price: 0.73, quantity: 1 }
      ]
    }, {
      type: 'DEL_ITEM',
      payload: { id: '0000004', name: 'Beans', price: 0.73, quantity: 1 }
    })).toEqual({
      items: [
        { id: '0000001', name: 'Peas', price: 0.95, quantity: 5 }
      ]
    });
  });
});