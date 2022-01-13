import React, { useState, useEffect } from "react";
import ProductApi from "../../api/productsApi";
import { styled, alpha } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Paper,
  TableRow,
  TablePagination,
  TableFooter,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  Autocomplete,
  TextField,
  Rating,
  Typography,
  Toolbar,
  Box,
  AppBar,
  IconButton,
} from "@mui/material";
import { PaginationTable } from "./tablePagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";

// Styled table head
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#042F94",
    [theme.breakpoints.up("xs")]: {
      fontSize: 16,
    },
  },
}));

// Styled Drop Down List
const DropDownField = styled(TextField)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.55),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  width: "75%",
  marginLeft: theme.spacing(8),
}));

export default function ProductList() {
  const [productData, setProductData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [ascOrder, setAscOrder] = useState(true);

  // Fetch data from API, Get All Products
  const getProducts = async () => {
    try {
      const response = await ProductApi.getProducts();
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Fetch data get all Products By Category
  const getProductsByCategory = async (category) => {
    try {
      const response = await ProductApi.getProductsByCategory(category);
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Sort function
  const sortArray = (sortParam) => {
    if (sortParam === "rate") {
      if (ascOrder) {
        productData.sort((a, b) => {
          if (a.rating.rate > b.rating.rate) return -1;
          if (a.rating.rate < b.rating.rate) return 1;
          return 0;
        });
        setAscOrder((prev) => !prev);
      } else {
        productData.sort((a, b) => {
          if (a.rating.rate > b.rating.rate) return 1;
          if (a.rating.rate < b.rating.rate) return -1;
          return 0;
        });
        setAscOrder((prev) => !prev);
      }
    }

    if (sortParam === "price") {
      if (ascOrder) {
        productData.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        });
        setAscOrder((prev) => !prev);
      } else {
        productData.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
        setAscOrder((prev) => !prev);
      }
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Dropdown contenu
  const cat = ["men's clothing", "women's clothing", "electronics", "jewelery"];

  // Dropdown Filter
  const onChangeCat = (e, value) => {
    if (value) {
      getProductsByCategory(value);
    } else getProducts();
    // const tableFiltred = productData.filter(function getRecent(product) {
    //   if (product.category === value) return product;
    // });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Prodcut List
            </Typography>
            <Autocomplete
              disablePortal
              id="dropDown"
              options={cat}
              onChange={onChangeCat}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <DropDownField {...params} variant="filled" label="Category" />
              )}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <div className="Container">
        <TableContainer component={Paper} sx={{ boxShadow: 5 }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell> Product</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">
                  Price
                  <IconButton
                    aria-label="delete"
                    size="meduim"
                    onClick={() => sortArray("price")}
                  >
                    <FilterListIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  Rating
                  <IconButton
                    aria-label="delete"
                    size="meduim"
                    onClick={() => sortArray("rate")}
                  >
                    <FilterListIcon fontSize="inherit" />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? productData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : productData
              ).map((product) => (
                <TableRow key={product.title} hover>
                  <TableCell>
                    <div className="product">
                      <img src={product.image} alt="" />
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="#042F94"
                      >
                        {product.title}
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="subtitle2" component="div">
                      {product.category}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" component="div">
                      {product.price} $
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Rating
                      size="small"
                      readOnly
                      defaultValue={product.rating.rate}
                      precision={0.5}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  count={productData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={PaginationTable}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
