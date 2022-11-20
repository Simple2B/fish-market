import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { ProductList } from "./components/ProductList";

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }
  const { data } = useQuery({
    queryKey: ["marketDetails"],
    queryFn: async () => {
      return { name: "Taras Supa Dupa Fish" };
    }, // TODO: Replace this code with real fetch
  });

  const [showProducts, setShowProducts] = useState<boolean>(false);
  const handleStartOrder = () => {
    setShowProducts(true);
  };
  return (
    <div>
      {!showProducts && <p>{data?.name}</p>}

      {showProducts && (
        <>
          <ProductList marketId={marketId} />
        </>
      )}
      {!showProducts && (
        <Button
          onClick={handleStartOrder}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Start Order
        </Button>
      )}
    </div>
  );
}
