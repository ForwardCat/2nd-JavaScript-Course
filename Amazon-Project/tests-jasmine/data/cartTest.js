import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test Suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

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
  });

  it('adds a new product to the cart', () => {
    // mocking setItem bc we dont want the mock values of the cart to be saved into the actual localStorage
    spyOn(localStorage, 'setItem');

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
  });
});