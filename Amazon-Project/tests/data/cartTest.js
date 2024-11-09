import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js'; 


// Define a test suite for the addToCart function
describe('test suite: addToCart', () => { 
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem'); // Mock localStorage.setItem to observe when it's called
  });

  // First Test

  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      // Mock localStorage.getItem to return a predefined cart with one item
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    
    loadFromStorage(); // Load the initial cart state from "localStorage" into the cart variable

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // Attempt to add the existing product to the cart
    
    expect(cart.length).toEqual(1); // Verify that the cart still has only one item (since it's the same product)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // Ensure localStorage.setItem was called once to save the updated cart
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }])); // Verify that localStorage.setItem was called with the correct updated cart data

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // Check that the product ID matches the expected item
    expect(cart[0].quantity).toEqual(2); // Verify that the quantity increased to 2
  });


  // Second Test

  it('adds a new product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      // Mock localStorage.getItem to return an empty cart
      return JSON.stringify([]);
    });
    
    loadFromStorage(); // Load the initial empty cart state from "localStorage"

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // Add a new product to the cart
    
    expect(cart.length).toEqual(1); // Verify that the cart now has one item
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // Ensure localStorage.setItem was called once to save the updated cart
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }])); // Verify that localStorage.setItem was called with the correct new cart data

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); // Check that the new product's ID matches the expected ID
    expect(cart[0].quantity).toEqual(1); // Verify that the quantity is set to 1 for the new product
  });
});



describe('Test Suite: Remove from cart function', () => {
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      // Mock localStorage.getItem to return a predefined cart with one item
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    spyOn(localStorage.setItem); 
  });
  
  it('remove a productId that is in the cart', () => {
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(0);
  });
});
