import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
      {!showProducts && <button onClick={handleStartOrder}>Start Order</button>}
    </div>
  );
}
