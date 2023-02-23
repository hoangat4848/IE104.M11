function displayItemsFromCart() {
  let cartItems = localStorage.getItem("productsInCart");
  // Convert to js Object
  cartItems = JSON.parse(cartItems);

  const cartContainer = document.querySelector(".cart-container");
  const cartTotalPrice = document.querySelector(".cart-total-price > span");

  //If this is checkout page
  if (cartContainer) {
    // If items in cart exist.
    if (cartItems) {
      Object.values(cartItems).map((item) => {
        cartContainer.innerHTML += `
        <tr class="cart-item">
          <td class="d-none">
            <div class="cart-tag d-none">${item.tag}</div>
          </td>
          <td>
            <button class="remove-cart-btn btn btn-sm btn-link">
              <ion-icon name="trash-sharp"></ion-icon>
            </button>
          </td>
          <td class="cart-name">${item.name}</td>
          <td><span>${item.inCart}</span></td>
          <td class="cart-price">${item.price}</td>
        </tr>
        `;
      });

      cartTotalPrice.innerHTML = `${localStorage.getItem("totalCost")}.00$`;
    } else {
      cartContainer.innerHTML = "";
      cartTotalPrice.innerHTML = "0.00$";
    }
  }
}
displayItemsFromCart();

let removeBtns = document.querySelectorAll(".remove-cart-btn");

removeBtns &&
  removeBtns.forEach((el) => {
    el.addEventListener("click", () => {
      // Get cartTag
      cartItem = el.parentElement.parentElement;

      const cartTag = cartItem.querySelector(".cart-tag").innerText;

      // productsInCart in local storage
      let cartItems = localStorage.getItem("productsInCart");
      cartItems = JSON.parse(cartItems);

      // Get cartNumber from local storage
      cartNum = localStorage.getItem("cartNumber");
      cartNum = parseInt(cartNum);

      // Update cartNumber in local storage
      cartNum -= cartItems[cartTag].inCart;
      localStorage.setItem("cartNumber", cartNum);

      //Get totalCost from local storage
      cartTotalCostStorage = localStorage.getItem("totalCost");
      cartTotalCostStorage = parseInt(cartTotalCostStorage);
      cartTotalCostStorage -=
        cartItems[cartTag].price * cartItems[cartTag].inCart;

      //Update totalCost in local storage
      const cartTotalPrice = document.querySelector(".cart-total-price > span");
      cartTotalPrice.innerHTML = `${cartTotalCostStorage}.00\$`;
      localStorage.setItem("totalCost", cartTotalCostStorage);

      // Remove and Update productsInCart in local storage
      delete cartItems[cartTag];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      cartItem.remove();
    });
  });
