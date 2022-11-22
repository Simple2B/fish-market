import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductItemProps } from "./ProductList.type";

export function ProductItem({
  id,
  name,
  image,
  sold_by,
  price,
  onClick,
}: Omit<ProductItemProps, "preps">) {
  const handleClick = () => {
    onClick(id);
  };
  return (
    <Grid xs={4} alignItems="center" justifyContent="center">
      <Card sx={{ maxWidth: 330 }} onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            align="center"
            gutterBottom
            variant="body2"
            component="div"
          >
            {name}
          </Typography>
          <Typography align="center" variant="h5" color="text.primary">
            {`$${price} ${sold_by}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
