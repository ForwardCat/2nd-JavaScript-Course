import { validDeliveryOption } from './deliveryOptions.js';

// a class is an object generator
class Cart {
  cartItems;
  #localStorageKey; // this is a private property

  // the constructor is where we put our setup code for the class
  constructor(localStorageKey) {
    // set the localStorageKey
    this.#localStorageKey = localStorageKey;
    // load from localStorage
    this.#loadFromStorage(); // this is a private method
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];   
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });     
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (!matchingItem) {
      return;
    };
  
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    };
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) =>{
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  updateQuantity (productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });   
    matchingItem.quantity = newQuantity;
      
    saveToStorage();
  }
}

// 'new' generates a new object using the class 'Cart'
// an object created by a class is called an 'instance'
const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);

// checking if this object is generated from this class
// AKA if its an instance of the Cart Class
console.log(businessCart instanceof Cart);