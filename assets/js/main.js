//Add to cart (Menu page)

cartBtns = document.querySelectorAll(".add-cart");

//Hardcode data
products = [
  {
    name: "Og Fried Chicken",
    tag: "original-fried-chicken",
    price: 5,
    inCart: 0,
  },
  {
    name: "Cream Sauce Chicken",
    tag: "cream-sauce-chicken",
    price: 7,
    inCart: 0,
  },
  {
    name: "Baby Ball Chicken",
    tag: "baby-ball-chicken",
    price: 6,
    inCart: 0,
  },
  {
    name: "Crispy Chicken Bar",
    tag: "crispy-chicken-bar",
    price: 6,
    inCart: 0,
  },
  {
    name: "Pasta Chicken",
    tag: "pasta-chicken",
    price: 8,
    inCart: 0,
  },
  {
    name: "Vietnamese Rice Chicken",
    tag: "rice-chicken",
    price: 8,
    inCart: 0,
  },
  {
    name: "Pepperoni Pizza",
    tag: "pepperoni-pizza",
    price: 7,
    inCart: 0,
  },
  {
    name: "Juicy Pineapple Pizza",
    tag: "pineapple-pizza",
    price: 8,
    inCart: 0,
  },
  {
    name: "Ultimate Vegan Pizza",
    tag: "ultimate-vegan-pizza",
    price: 9,
    inCart: 0,
  },
  {
    name: "Vegetable Pizza",
    tag: "vegetable-pizza",
    price: 5,
    inCart: 0,
  },
  {
    name: "Spinach Pizza",
    tag: "spinach-pizza",
    price: 6,
    inCart: 0,
  },
  {
    name: "Double Cheese Spicy Pizza",
    tag: "double-cheese-spicy-pizza",
    price: 10,
    inCart: 0,
  },
  {
    name: "Double Bacon Pizza",
    tag: "double-bacon-pizza",
    price: 10,
    inCart: 0,
  },
  {
    name: "Vegan Pizza",
    tag: "vegan-pizza",
    price: 6,
    inCart: 0,
  },
  {
    name: "Strawberry Soda",
    tag: "strawberry-soda",
    price: 4,
    inCart: 0,
  },
  {
    name: "Schweppes",
    tag: "schweppes",
    price: 4,
    inCart: 0,
  },
];

for (let i = 0; i < cartBtns.length; i++) {
  cartBtns[i].addEventListener("click", () => {
    addToCart(products[i]);
    totalCost(products[i]);
  });
}

onLoadHeaderCart();

function onLoadHeaderCart() {
  let cartNum = localStorage.getItem("cartNumber");
  const headerCartNum = document.querySelector(".header-cart .cart-number");
  if (cartNum && headerCartNum) {
    headerCartNum.style.opacity = 1;
    headerCartNum.innerText = cartNum;
  }
}

function addToCart(product, quantity = 1) {
  // console.log("The product is", product);
  // Check if cart in LocalStorage is empty or not.
  let cartQuantity = localStorage.getItem("cartNumber");
  cartQuantity = parseInt(cartQuantity);
  if (!cartQuantity) {
    localStorage.setItem("cartNumber", quantity);
    // TODO update cart number on header
    onLoadHeaderCart();
  } else {
    localStorage.setItem("cartNumber", cartQuantity + quantity);
    // TODO update cart number on header
    onLoadHeaderCart();
  }

  // Check if that the product exist in local storage or not.
  // cartItems = localStorage.getItem("");
  setItems(product, quantity);
}

function setItems(product, quantity = 1) {
  //Check if productsInCart exists or not.
  let cartItems = localStorage.getItem("productsInCart");
  // Convert to js Object
  cartItems = JSON.parse(cartItems);

  if (cartItems) {
    // Check if the product exists in productsInCart.
    if (!cartItems[product.tag]) {
      // Append the product to cartItems
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += quantity;
  } else {
    product.inCart = quantity;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, quantity = 1) {
  // Check if totalCost exists or not.
  let total = localStorage.getItem("totalCost");
  total = parseInt(total);

  if (total) {
    localStorage.setItem("totalCost", total + product.price * quantity);
  } else {
    localStorage.setItem("totalCost", product.price * quantity);
  }
}

// PRODUCT DETAILS PAGE

// image gallery control
imgSelected = document.querySelector(".product-img-selected img");
smallImgs = document.querySelectorAll(".product-small-img img");

// console.log(smallImgs.length);

for (let i = 0; i < smallImgs.length; i++) {
  smallImgs[i].addEventListener("click", () => {
    imgSelected.src = smallImgs[i].src;
  });
}

// add to cart control
const btnMinusQuantity = document.querySelector(".productQuantityMinus");
const btnPlusQuantity = document.querySelector(".productQuantityPlus");

btnMinusQuantity &&
  btnMinusQuantity.addEventListener("click", () => {
    productQuantity = document.querySelector(".productQuantity");
    currentValue = parseInt(productQuantity.value);

    if (currentValue != productQuantity.min)
      productQuantity.value = `${currentValue - 1}`;
  });

btnMinusQuantity &&
  btnPlusQuantity.addEventListener("click", () => {
    productQuantity = document.querySelector(".productQuantity");
    currentValue = parseInt(productQuantity.value);

    if (currentValue != productQuantity.max)
      productQuantity.value = `${currentValue + 1}`;
  });

// Add to cart (Product page)
const productAddBtn = document.querySelector(".product-add-btn");

productAddBtn &&
  productAddBtn.addEventListener("click", () => {
    quantity = parseInt(document.querySelector(".productQuantity").value);
    addToCart(products[6], quantity);
    totalCost(products[6], quantity);
  });

// Main
