import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function CustomAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }} mt={props.mt}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {props.title}
        </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
