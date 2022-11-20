import { Navigate, useParams } from "react-router-dom";

export function Market() {
  const { marketId } = useParams<"marketId">();
  if (!marketId) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      <p>{marketId}</p>
    </div>
  );
}
