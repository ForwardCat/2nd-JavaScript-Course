import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

// Test Suite
describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

  const product1Name = 'Black and Gray Athletic Cotton Socks - 6 Pairs';
  const product2Name = 'Intermediate Size Basketball';

// Hook (Before Each)
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

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

  // Hook (afterEach)
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
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

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain(product1Name);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(product2Name);
  });



// Test 2
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll(`.js-cart-item-container`).length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId2);

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain(product2Name);
  })
});