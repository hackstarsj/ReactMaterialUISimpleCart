import React, { useEffect } from "react";
import AddProductForm from "./AddProductForm";
import CartProduct from "./CartProduct";
import InventoryProduct from "./InventoryProduct";
import GrandTotal from "./GrandTotalComponent";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomAppBar from "./common/CustomAppBar";

export default function EcommerceApp() {
  let [inventoryProducts, setInventoryProducts] = React.useState([]);
  let [cartProducts, setCartProducts] = React.useState([]);
  let [grandTotal, setGrandTotal] = React.useState(0);

  const onAddProducts = (product) => {
    console.log(product);
    inventoryProducts.push(product);
    setInventoryProducts([...inventoryProducts]);
    localStorage.setItem("allProducts", JSON.stringify(inventoryProducts));
  };

  useEffect(() => {
    let products = localStorage.getItem("allProducts");
    if (products != null) {
      setInventoryProducts(JSON.parse(products));
    }

    let cartproductsLocal = localStorage.getItem("cartProducts");
    if (cartproductsLocal != null) {
      let cartJSON = JSON.parse(cartproductsLocal);
      setCartProducts(cartJSON);
      let gT = 0;
      for (let i = 0; i < cartJSON.length; i++) {
        gT = gT + parseInt(cartJSON[i].product_price) * cartJSON[i].quantity;
      }
      setGrandTotal(gT);
    }
  }, []);

  const onAddToCart = (product) => {
    if (!checkProductExist(product)) {
      alert("No Quantity Available");
      return;
    }
    deductFromStocks(product);
    let findProduct = cartProducts.filter((item) => {
      return item.id == product.id ? true : false;
    });
    if (findProduct.length > 0) {
      let index = cartProducts.findIndex((item) => {
        return item.id == product.id ? true : false;
      });
      if (index != -1) {
        cartProducts[index].quantity = cartProducts[index].quantity + 1;
        setCartProducts([...cartProducts]);
        calculateTotal();
        return;
      }
    }
    product.quantity = 1;
    cartProducts.push(product);
    setCartProducts([...cartProducts]);
    calculateTotal();
  };

  const deductFromStocks = (product) => {
    inventoryProducts = inventoryProducts.map((item) => {
      if (item.id == product.id) {
        item.product_in_stock = item.product_in_stock - 1;
      }
      return item;
    });
    setInventoryProducts([...inventoryProducts]);
    localStorage.setItem("allProducts", JSON.stringify(inventoryProducts));
  };

  const checkProductExist = (product) => {
    let productIndex = inventoryProducts.findIndex((item) => {
      return item.id == product.id && parseInt(item.product_in_stock) > 0
        ? true
        : false;
    });
    if (productIndex != -1) {
      return true;
    }
    return false;
  };

  const calculateTotal = () => {
    let gT = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      gT =
        gT + parseInt(cartProducts[i].product_price) * cartProducts[i].quantity;
    }
    setGrandTotal(gT);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  };

  const removeFromCart = (index) => {
    cartProducts.splice(index, 1);
    setCartProducts([...cartProducts]);
    calculateTotal();
  };

  const qtyChange = (index, valueChange) => {
    cartProducts[index].quantity = cartProducts[index].quantity + valueChange;
    if (cartProducts[index].quantity == 0) {
      cartProducts.splice(index, 1);
    }
    setCartProducts([...cartProducts]);
    calculateTotal();
  };

  const checkoutCall = () => {
    cartProducts = [];
    setCartProducts([]);
    setGrandTotal(0);
    localStorage.removeItem("cartProducts");
  };

  return (
    <div>
      <CustomAppBar title="EAZY CART MUI"/>
      <AddProductForm onAddProducts={onAddProducts} />
      <InventoryProduct
        inventoryProducts={inventoryProducts}
        onAddToCart={onAddToCart}
      />
      <CartProduct
        cartProducts={cartProducts}
        removeFromCart={removeFromCart}
        qtyChange={qtyChange}
        GrandTotal={grandTotal}
        checkoutCall={checkoutCall}
      />
    </div>
  );
}
