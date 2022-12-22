import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Spinner } from "../../../../components";
import { API_BASE_URL } from "../../../../constants";
import {
  FilteringFunctions,
  GET_ORDERS,
  setFilterCreated,
  setFilterInProgress,
  setFilterPending,
  TOKEN_KEY,
} from "../../../../services";
import { Order } from "./Order";
import style from "./Orders.module.css";
import { FilterButton } from "./FilterButton";
import { OrderData } from "../../../../main.type";

enum FilterBtnName {
  FUTURE_ORDERS = "Future orders",
  PENDING = "Pending",
  IN_PROGRESS = "In progress",
}

const FILTER_OPTIONS = [
  { name: FilterBtnName.FUTURE_ORDERS, filterFn: setFilterCreated },
  { name: FilterBtnName.PENDING, filterFn: setFilterPending },
  { name: FilterBtnName.IN_PROGRESS, filterFn: setFilterInProgress },
];

const Orders = () => {
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [activeBtn, setActiveBtn] = useState<string>(FilterBtnName.PENDING);

  const { data, isLoading } = useQuery({
    queryKey: [GET_ORDERS],
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

      return data.orders;
    },
    onSuccess: (data) => {
      const filterFn = FILTER_OPTIONS.find(
        (option) => option.name === activeBtn
      )?.filterFn;
      if (filterFn) {
        setOrdersData(data.filter(filterFn));
      }
    },
  });

  const handlerButtonsFilters = ({
    filterFn,
    name,
  }: {
    filterFn: FilteringFunctions;
    name: string;
  }) => {
    if (data) {
      setOrdersData([...data].filter(filterFn));
      setActiveBtn(name);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={style.ordersPage}>
      <div className={style.buttonsFilter}>
        {FILTER_OPTIONS.map((item) => (
          <FilterButton
            key={item.name}
            item={item}
            handlerButtonsFilters={handlerButtonsFilters}
            activeBtn={activeBtn}
          />
        ))}
      </div>
      <div className={style.ordersContent}>
        {ordersData &&
          ordersData.map((el: OrderData) => <Order key={el.id} {...el} />)}
      </div>
    </div>
  );
};

export { Orders };
