import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ProductItemProps, ItemUnit } from "./ProductList.type";

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
    <Card
      sx={{ width: "320px", height: "20px", m: "5px" }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          // width: "100%",
          // height: "100%",
          paddingTop: "24px",
          paddingBottom: "16px",
        }}
      >
        <Box
          sx={{
            height: "131px",
            width: "163px",
          }}
        >
          <img
            src={image}
            alt={image}
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
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
            {`$${price} ${ItemUnit.kilogram}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
