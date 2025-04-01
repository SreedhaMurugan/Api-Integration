import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, CircularProgress, Container, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Star, StarHalf, StarBorder } from "@mui/icons-material";
import AppHeader from './AppBar';


const ProductList = ({ price, originalPrice, rating, reviews }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* MUI Header */}
     <AppHeader />
      <Container maxWidth={false} sx={{ mt: '7rem' }}>
        {/* Loading Indicator */}
        {loading && (
          <Grid container justifyContent="center" alignItems="center" sx={{ height: "80vh" }}>
            <CircularProgress />
          </Grid>
        )}

        {/* Error Message */}
        {error && <Typography color="error">Error: {error}</Typography>}

        {/* Product List */}
        {!loading && !error && (
 <Grid container spacing={3} justifyContent="center">
 {products.map((product) => (
   <Grid item xs={12} sm={12} key={product.id} display="flex" justifyContent="center" >
     <Card sx={{ height: 500, maxWidth: 400, display: "flex", flexDirection: "column", backgroundColor: "#ffe0b2" }}>
       <CardMedia
         component="img"
         image={product.image}
         alt={product.title}
         sx={{ height: 170, objectFit: "contain", backgroundColor: "#fff" }}
       />
       <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", }}>
         <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center" }}>
           {product.title}
         </Typography>
         <Typography
           variant="body2"
           sx={{
             color: "text.secondary",
             wordWrap: "break-word",
             overflowWrap: "break-word",
             mt:'3rem'
           }}
         >
           {product.description.length > 200 ? product.description.substring(0, 200) + "..." : product.description}
         </Typography>
         <Box>
      {/* Price Section */}
      <Box display="flex" alignItems="baseline" sx={{mt:'1rem'}}>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#000" }}>
          ₹{product.price}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000", alignSelf: "flex-start" }}>
          00
        </Typography>
      </Box>
      

      {/* Rating Section */}
      <Box display="flex" alignItems="center" mt={1}>

        {/* Render stars dynamically based on rating */}
        {Array.from({ length: 5 }).map((_, index) => {
           const starRating = rating || 3;
          if (index + 1 <= starRating) {
            return <Star key={index} sx={{ color: "orange" }} />;
          } else if (index < starRating && index + 0.5 <= starRating) {
            return <StarHalf key={index} sx={{ color: "orange" }} />;
          } else {
            return <StarBorder key={index} sx={{ color: "orange" }} />;
          }
        })}
        
        {/* Review Count */}
        <Typography sx={{ fontSize: "1rem", ml: 1 }}>{reviews}</Typography>
      </Box>
    </Box>

       </CardContent>
     </Card>
   </Grid>
 ))}
</Grid>

)}

      </Container>
    </>
  );
};

export default ProductList;
