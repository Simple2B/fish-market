import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Spinner } from "../../../../components";

import {
  GET_ORDERS,
  sortByDate,
  StatusBtnItem,
  getOrders,
  CHECK_TOKEN_LOGIN,
} from "../../../../services";
import { Order } from "./Order";
import style from "./Orders.module.css";
import { FilterButton } from "./FilterButton";
import { OrderData } from "../../../../main.type";
import { queryClient } from "../../../../queryClient";

type OrdersProps = {
  filterOptions: StatusBtnItem[];
  isArchive: boolean;
};

const Orders = ({ filterOptions, isArchive }: OrdersProps) => {
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [arrayActiveOrders, setArrayActiveOrders] = useState<number[]>([]);
  const [activeBtnFilterName, setActiveBtnFilterName] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: [GET_ORDERS, isArchive],
    queryFn: getOrders,
    onSuccess: (data: OrderData[]) => {
      if (activeBtnFilterName) {
        const sortFunction = filterOptions.find(
          (item) => item.name === activeBtnFilterName
        )?.sortFn;

        if (!sortFunction) {
          setActiveBtnFilterName("");
          setOrdersData(data);
          return;
        }
        setOrdersData([...data].sort(sortFunction));
        return;
      }

      setOrdersData(data);
      console.log("onSuccess");
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("5sek pass");

      queryClient.invalidateQueries([GET_ORDERS]);

      if (arrayActiveOrders.length >= 1) {
        setOrdersData(
          [...ordersData].sort((orderA, orderB) =>
            arrayActiveOrders.includes(orderA.id) ? -1 : 0
          )
        );
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handlerButtonsFilters = ({ sortFn, name }: StatusBtnItem) => {
    if (!data) {
      return;
    }

    if (activeBtnFilterName === name) {
      setActiveBtnFilterName("");
      setOrdersData([...ordersData].sort(sortByDate));
      return;
    }
    setOrdersData([...ordersData].sort(sortByDate).sort(sortFn));
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
        {ordersData.map((el: OrderData) => (
          <Order
            key={el.id}
            {...el}
            setArrayActiveOrders={setArrayActiveOrders}
          />
        ))}
      </div>
    </div>
  );
};

export { Orders };
