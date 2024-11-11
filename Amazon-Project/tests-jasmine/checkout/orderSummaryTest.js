import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('Test Suite: renderOrderSummary', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  // hook ( runs before each of our tests )
  beforeEach(() => {
    // mocking localStorage.setItem so it doesnt interfere with our actual localStorage
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

    // mock localStorage.getItem so it doesnt interact with the action localStorage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    // removing the HTML we generated on the screen
    document.querySelector('.js-test-container').innerHTML = ``;
  });


  // Test 1
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });


  // Test 2
  it('removes a product', () => {
    // click the delete button with code
    // deleted the first product from the cart
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // check if theres only one product left in the cart
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    // check to see if the first product container is null aka not there anymore
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)      
    ).toEqual(null);

    // check to see if the second product container is not null aka still there
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)      
    ).not.toEqual(null);

    // checking if the cart array has been changed too
    expect(
      cart.length
    ).toEqual(1);

    // checking if the first product in the cart is the second product
    expect(
      cart[0].productId
    ).toEqual(productId2);
  });
});