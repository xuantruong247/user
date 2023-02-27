import { productController } from "./controller/productController.js";
import { productService } from "./service/productService.js";

// click vào cover thì tắt cover và giỏ hàng
productController.sideSwitch();
// bật tắt side nav
let sideNav = (num) => {
  productController.cartSwitch(num);
};
window.sideNav = sideNav;

// --------------------------------------------------------------------------

let productList = [];
let cloneCart = [];

var dataJson = localStorage.getItem("productListJson");
if (dataJson !== null) {
  let product_arr = JSON.parse(dataJson);
  cloneCart = [...product_arr];
}
productController.totalQty(cloneCart);
productController.renderCart(cloneCart);

let renderProductService = () => {
  productService
    .getProductList()
    .then((res) => {
      productList = res.data;
      productController.renderProductList(productList);
    })
    .catch((err) => {});
};
renderProductService();

let addItem = (id) => {
  productService
    .getProductList()
    .then((res) => {
      productList = res.data;
      let cart = productController.addProductToCart(id, productList, cloneCart);
      productController.renderCart(cart);
      productController.totalQty(cart);

      var productListJson = JSON.stringify(cart);
      localStorage.setItem("productListJson", productListJson);
    })
    .catch((err) => {});
};
window.addItem = addItem;

let deleteCartItem = (id) => {
  let cart = [...cloneCart];
  let index = cart.findIndex((items) => {
    return items.id == id;
  });
  cart.splice(index, 1);
  productController.renderCart(cart);
  cloneCart = [...cart];
  productController.totalQty(cloneCart);

  var productListJson = JSON.stringify(cloneCart);
  localStorage.setItem("productListJson", productListJson);
};
window.deleteCartItem = deleteCartItem;

let changeQuantity = (id, step) => {
  let cart = [...cloneCart];
  let index = cart.findIndex((items) => {
    return items.id == id;
  });
  cart[index].quantity = cart[index].quantity + step;

  if (cart[index].quantity == 0) {
    cart.splice(index, 1);
  } // giỏ hàng có 1 sản phẩm thì bấm trừ là xoá lun

  productController.renderCart(cart);
  productController.totalQty(cart);
  cloneCart = [...cart];

  var productListJson = JSON.stringify(cloneCart);
  localStorage.setItem("productListJson", productListJson);
};
window.changeQuantity = changeQuantity;

let clearCart = () => {
  let cart = [...cloneCart];
  cart = [];
  productController.renderCart(cart);
  productController.totalQty(cart);
  cloneCart = [...cart];
  var productListJson = JSON.stringify(cloneCart);
  localStorage.setItem("productListJson", productListJson);
};
window.clearCart = clearCart;

let buy = (index) => {
  switch (index) {
    case 1: {
      if (cloneCart.length > 0) {
        document.getElementById("invoice").style.display = "block";
        document.getElementById("cart").style.display = "none";
        let cart = [...cloneCart];
        productController.renderInvoice(cart);
      }
      break;
    }
    case 0:
      {
        document.getElementById("invoice").style.display = "none";
        document.getElementById("cart").style.display = "block";
      }
      break;
  }
};
window.buy = buy;

let order = () => {
  cloneCart = [];
  productController.totalQty(cart);
  productController.renderCart(cloneCart);
  var productListJson = JSON.stringify(cloneCart);
  localStorage.setItem("productListJson", productListJson);
  buy(0);
};
window.order = order;

let mySelect = () => {
  let value = document.getElementById("mySelect").value;
  if (value === "0") {
    renderProductService();
  }

  let cart = productList.filter((items) => {
    return items.type === value;
  });
  productController.renderProductList(cart);
};
window.mySelect = mySelect;
