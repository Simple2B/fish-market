import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../../../constants";
import { TOKEN_KEY } from "../../../../services";
import { OrderItem } from "./OrderItem";
import style from "./Orders.module.css";

type OrdersProps = {};

// interface IOrderItem {
//   id: number;
// }

const Orders = (props: OrdersProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["getOrders"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/order/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return false;
      }

      const data = await res.json();
      console.log(data.orders);

      return data.orders;
    },
  });

  return (
    <div className={style.ordersPage}>
      <div className={style.buttonsFilter}>
        <div className={style.buttonFilter}>In progress</div>
        <div className={style.buttonFilter}>Pending</div>
        <div className={style.buttonFilter}>Future orders</div>
      </div>
      <div className={style.ordersContent}>
        {data && data.map((el: any) => <OrderItem key={el.id} {...el} />)}
      </div>
    </div>
  );
};

export { Orders };
