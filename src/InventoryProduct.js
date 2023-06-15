import CustomAppBar from "./common/CustomAppBar";
import { Button, Table, TableContainer,TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function InventoryProduct(props) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "whitesmoke",
      color: theme.palette.common.black,
      fontWeight:"bold"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      fontWeight:"600"
    },
  }));

  return (
    <div>
      <CustomAppBar title="INVENTORY PRODUCTS" mt={3}/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow sx={{fontWeight:"bold"}}>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>In Stock</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {props.inventoryProducts.map((product,index)=>(
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.product_title}</TableCell>
              <TableCell>{product.product_description}</TableCell>
              <TableCell>{product.product_price}</TableCell>
              <TableCell>{product.product_in_stock}</TableCell>
              <TableCell>
                <Button className="add_to_cart" onClick={()=>props.onAddToCart(product)} variant="contained"><AddShoppingCartIcon/> ADD TO CART</Button>
              </TableCell>
            </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
