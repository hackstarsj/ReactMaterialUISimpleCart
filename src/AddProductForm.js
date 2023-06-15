import { v4 } from "uuid";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddProductForm(props) {
  const onAddProducts = (event) => {
    event.preventDefault();
    // console.log(event);
    // console.log("Product TITLE : ", event.target.product_title.value);
    // console.log(
    //   "Product DESCRIPTION : ",
    //   event.target.product_description.value
    // );
    // console.log("Product PRICE : ", event.target.product_price.value);
    // console.log("Product IN STOCK : ", event.target.product_in_stock.value);
    // console.log("Product ID : ", v4());
    let product = {
      id: v4(),
      product_title: event.target.product_title.value,
      product_description: event.target.product_description.value,
      product_price: event.target.product_price.value,
      product_in_stock: event.target.product_in_stock.value,
    };
    props.onAddProducts(product);
    event.target.reset()
  };

;

  return (
      <form onSubmit={onAddProducts} className="MainForm">
      <Grid container spacing={1} mt={2} pl={5} pr={5}>
        <Grid lg={2} xs={12}>
          <TextField id="outlined-basic" label="Product Title" sx={{width:"100%"}} name="product_title"  variant="outlined" />
        </Grid>
        <Grid lg={2} xs={12}>
          <TextField id="outlined-basic" label="Product Description" sx={{width:"100%"}} name="product_description"  variant="outlined" />
        </Grid>
        <Grid lg={2} xs={12}>
          <TextField id="outlined-basic" label="Product In Stock"  sx={{width:"100%"}} name="product_in_stock"  variant="outlined" />
        </Grid>
        <Grid lg={2} xs={12}>
          <TextField id="outlined-basic" label="Product Price"  sx={{width:"100%"}}  name="product_price"  variant="outlined" />
        </Grid>
        <Grid lg={4} xs={12}>
          <Button variant="contained" type="submit" color="primary" size="large" sx={{width:"100%",fontSize:"16px"}}>ADD PRODUCT</Button>
        </Grid>
      </Grid>
      </form>
  );
}
