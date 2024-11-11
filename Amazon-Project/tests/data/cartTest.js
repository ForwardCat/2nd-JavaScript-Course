import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test Suite: addToCart', () => {
  beforeEach(() => {
    // mocking localStorage.setItem so it doesnt interfere with our actual localStorage
    spyOn(localStorage, 'setItem');
  })
  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "0001",
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart("0001");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("0001");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "0001",
      quantity: 2,
      deliveryOptionId: '1'
    }]));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    // refreshing the cart so that it is the same as our mock
    loadFromStorage();
    
    addToCart("0001");

    expect(cart.length).toEqual(1);
    // this only works if we have a mock version of this
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("0001");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "0001",
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});