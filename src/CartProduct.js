import CustomAppBar from "./common/CustomAppBar";
import { Button, Table, TableBody, TableContainer,TableHead, TableRow } from "@mui/material";
import Paper, { paperClasses } from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function CartProduct(props) {
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
      <CustomAppBar title="CART PRODUCTS" mt={5}/>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Unit Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cartProducts.map((item,index) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.product_title}</TableCell>
                <TableCell>{item.product_description}</TableCell>
                <TableCell>{item.product_price}</TableCell>
                <TableCell className="qty"><Button variant="outlined" sx={{marginRight:"5px"}} className="qty-plus" onClick={()=>props.qtyChange(index,1)}><AddIcon/></Button><span className="qty-span" >{item.quantity}</span><Button className="qty-minus" variant="outlined" sx={{marginLeft:"5px"}} onClick={()=>props.qtyChange(index,-1)}><RemoveIcon/></Button></TableCell>
                <TableCell>{parseInt(item.product_price) * item.quantity}</TableCell>
                <TableCell>
                  <Button variant="contained" className="remove_from_cart" onClick={()=>props.removeFromCart(index)}> REMOVE FROM CART</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell colSpan={6} className="grand_total">Grand Total : {props.GrandTotal}</TableCell>
                <TableCell>
                    <Button variant="contained" className="checkoutbtn" onClick={()=>{ if(window.confirm("Are you sure want to Checkout?")){ props.checkoutCall(); } }}>Checkout</Button>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
