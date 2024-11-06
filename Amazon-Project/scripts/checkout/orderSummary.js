// Import functions and data needed for the cart
import {
  cart, 
  removeFromCart, 
  calculateCartQuantity, 
  updateQuantity,
  updateDeliveryOption
} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// THis is a default, its a simplier syntax, but a page can only have one default export.
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js'

// external library
hello();

// This is an external library called dayJS
// helps us figure out the date of today
const today = dayjs();
// variable.add() is a method to add days onto today
const deliverDate = today.add(7, 'days');
// this tells dayJS how we want to format the date
console.log(deliverDate.format('dddd, D MMMM'));

export function renderOrderSummary() {
  // Show the total quantity of items in the cart at the top
  updateCartQuantity();

  // Initialize HTML string for the cart items
  let cartSummaryHTML = '';

  // Loop through each item in the cart
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the product details that match the cart item
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();

    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format(
      'dddd, D MMMM'
    );

    // Add HTML for each cart item, including details like image, name, price, and quantity controls
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();

      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );

      const dateString = deliveryDate.format(
        'dddd, D MMMM'
      );

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // we only want the checkbox to be check if the deliveryOption id is = to the one in the cart.
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  // Insert the cart HTML into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add event listeners to each "Delete" link
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId); // Remove item from cart

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove(); // Remove item from HTML

      updateCartQuantity(); // Update cart quantity display
    });
  });

  // Function to update the displayed cart quantity at the top
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} Items`;
  }

  // Add event listeners to each "Update" link to show quantity input
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity'); // Show input field for quantity
    });
  });

  // Add event listeners to each "Save" link to update the quantity
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      // Check that quantity is valid
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      // updates the quantity of a specific item in the cart.
      updateQuantity(productId, newQuantity); 

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity'); // Hide input field

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity; // Update quantity display

      updateCartQuantity(); // Update cart quantity display at the top
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary();
    });
  });
};

