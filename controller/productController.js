export let productController = {
  renderProductList: (productList) => {
    let contentHTML = "";
    for (let index = 0; index < productList.length; index++) {
      let product = productList[index];
      let contenDIV = `<div class="card">
                        <div class="top-bar d-flex">
                          <i class="fab fa-apple text-white"></i>
                          <em class="stocks">In Stock</em>
                        </div>

                        <div class="img-container">
                          <img
                            class="product-img"
                            src=${product.img}
                            alt=""
                           />
                          <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
                       </div>

                       <div class="details">
                          <div class="name-fav d-flex">
                            <strong class="product-name text-white">${product.name}</strong>
                            <button onclick='this.classList.toggle("fav")' class="heart">
                              <i class="fas fa-heart"></i>
                            </button>
                          </div>

                          <div class="wrapper">
                            <h5>${product.desc}</h5>
                            <p>
                              Camera sau: ${product.backCamera} </br>
                              Camera trước: ${product.frontCamera}
                            </p>
                          </div>

                          <div class="purchase">
                            <p class="product-price">${product.price}</p>
                            <span class="btn-add">
                              <div>
                                <button onclick="addItem(${product.id})" class="add-btn">
                                Add <i class="fas fa-chevron-right"></i>
                                </button>
                              </div>
                            </span>
                          </div>
                        </div>
                    </div>
                    `;

      contentHTML = contentHTML + contenDIV;
    }
    document.getElementById("contentHTML").innerHTML = contentHTML;
  },

  sideSwitch: () => {
    document
      .getElementById("banner_cover")
      .addEventListener("click", function () {
        document.getElementById("cart").style.display = "none";
        document.getElementById("banner_cover").style.display = "none";
      });
  },

  cartSwitch: (num) => {
    if (num == 1) {
      document.getElementById("cart").style.display = "block";
      document.getElementById("banner_cover").style.display = "block";
    } else {
      document.getElementById("cart").style.display = "none";
      document.getElementById("banner_cover").style.display = "none";
    }
  },

  renderCart: (cart) => {
    let contentHTML = "";
    for (let index = 0; index < cart.length; index++) {
      let product = cart[index];

      let contentTR = `
        <div class="row text-white text-center mt-5">
          <div class="col-2">
            <img class="cart-img" src=${product.img} alt="" />
          </div>
          <div class="col-3">${product.name}</div>
          <div class="col-3">
          <button
            onclick="changeQuantity(${product.id},+1)"
            class="btn btn-success text-white mr-2">+</button>
          ${product.quantity}
          <button
            onclick="changeQuantity(${product.id},-1)"
            class="btn btn-warning text-white ml-2">-</button>
          </div>
          
          <div class="col-2">${product.price * product.quantity}</div>
          <div class="col-2">
            <button
              onclick="deleteCartItem(${product.id})"
              class="btn btn-danger"><i class="fa fa-trash-alt"></i></button>
          </div>
        </div>
        `;

      contentHTML = contentHTML + contentTR;
    }

    document.getElementById("cart-items").innerHTML = contentHTML;
  },

  addProductToCart: (id, productList, cloneCart) => {
    let index = productList.findIndex((items) => {
      return items.id == id;
    });
    let newItem = productList[index];

    let cartIndex = cloneCart.findIndex((items) => {
      return items.id == id;
    });
    if (cartIndex == -1) {
      cloneCart.push({ ...newItem, quantity: 1 });
    } else {
      cloneCart[cartIndex].quantity++;
    }
    let cart = [...cloneCart];
    return cart;
  },

  renderInvoice: (cart) => {
    let totalPrice = 0;
    for (let index = 0; index < cart.length; index++) {
      totalPrice = totalPrice + cart[index].quantity * cart[index].price * 1;
    }

    let contentHTML = "";
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      let contentDiv = `
      <div class="shipping-items d-flex">
          <div class="item-names"><span>${item.quantity} x ${
        item.name
      } </span></div>
          <div class="items-price"><span>${
            item.price * item.quantity
          }</span></div>
      </div>
    `;
      contentHTML = contentHTML + contentDiv;
    }
    let contentDivBelow = `
      <hr />

      <div class="payment">
          <em>Payment</em>
          <div class="d-flex">
              <p>Total amount to be paid:</p>
              <span class="pay">${totalPrice}</span>
          </div>
      </div>

      <p class="text-centers">
      Your order has been placed <br/>
      Your order will be delivered to you in 3-5 working days <br/>
      You can pay ${totalPrice} by card or any online transaction method after the products have been dilivered to you
      </p>

      <div class="order mt-2">
          <button onclick="order()" class="btn-order btn text-white">
              Order Now
          </button>
          <button onclick="buy(0)" class="btn-cancel btn text-white">
              Cancel
          </button>
      </div>
  `;
    document.getElementById("invoice").innerHTML =
      contentHTML + contentDivBelow;
  },

  totalQty: (cart) => {
    let totalQty = 0;
    for (let index = 0; index < cart.length; index++) {
      totalQty = totalQty + cart[index].quantity;
    }
    document.getElementById("total_qty").innerText = `${totalQty}`;
  },
};
