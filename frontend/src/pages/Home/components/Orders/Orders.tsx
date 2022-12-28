import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Spinner } from "../../../../components";
import { ACTIVE_BTN_FILTER_INDEX, API_BASE_URL } from "../../../../constants";
import {
  FilteringFunctions,
  GET_ORDERS,
  sortByData,
  TOKEN_KEY,
  FilterBtnItem,
} from "../../../../services";
import { Order } from "./Order";
import style from "./Orders.module.css";
import { FilterButton } from "./FilterButton";
import { ManagerOutletContext, OrderData } from "../../../../main.type";
import { useOutletContext } from "react-router-dom";

const Orders = ({ filterOptions }: { filterOptions: FilterBtnItem[] }) => {
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const { activeBtnFilterName, setActiveBtnFilterName } =
    useOutletContext<ManagerOutletContext>();

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
        console.error("Bad login");
        return [];
      }

      const data = await res.json();

      return data.orders.sort(sortByData);
    },
    onSuccess: (data) => {
      if (!activeBtnFilterName) {
        setActiveBtnFilterName(filterOptions[ACTIVE_BTN_FILTER_INDEX].name);
      }

      const filterFn = filterOptions.find(
        (option) => option.name === activeBtnFilterName
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
    if (!data) {
      return;
    }
    setOrdersData([...data].filter(filterFn));
    setActiveBtnFilterName(name);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={style.ordersPage}>
      <div className={style.buttonsFilter}>
        {filterOptions.map((item) => (
          <FilterButton
            key={item.name}
            item={item}
            handlerButtonsFilters={handlerButtonsFilters}
            activeBtnFilterName={activeBtnFilterName}
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
