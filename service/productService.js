// https://62b07878196a9e9870244798.mockapi.io/product
const BASE_URL = "https://62b07878196a9e9870244798.mockapi.io/product";

export let productService = {
  getProductList: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
};
