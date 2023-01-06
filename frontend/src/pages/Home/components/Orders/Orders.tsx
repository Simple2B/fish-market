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
      const sortResult = sortByIsActiveBtnFilterName(data);

      if (!sortResult) {
        setActiveBtnFilterName("");
      }
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    sortByIsActiveBtnFilterName(ordersData);
  }, [arrayActiveOrders, activeBtnFilterName]);

  const sortByIsActiveBtnFilterName = (data: OrderData[]): boolean => {
    const dataForSort = [...data].sort(sortByDate);

    const sortFunction = filterOptions.find(
      (item) => item.name === activeBtnFilterName
    )?.sortFn;

    if (activeBtnFilterName && sortFunction) {
      dataForSort.sort(sortFunction);
      sortByActiveOrderId(dataForSort);
      setOrdersData(dataForSort);
      return true;
    }
    sortByActiveOrderId(dataForSort);

    setOrdersData(dataForSort);
    return false;
  };

  const sortByActiveOrderId = (dataForSort: OrderData[]) => {
    if (arrayActiveOrders.length >= 1) {
      dataForSort.sort((orderA, orderB) =>
        arrayActiveOrders.includes(orderA.id) ? -1 : 0
      );
    }
  };

  const handlerButtonsFilters = ({ name }: StatusBtnItem) => {
    if (!data) {
      return;
    }

    const sortedOrders = [...ordersData];

    if (activeBtnFilterName === name) {
      setActiveBtnFilterName("");
      setOrdersData(sortedOrders);
      return;
    }
    setOrdersData(sortedOrders);
    setActiveBtnFilterName(name);
  };

  const onItemsShowChange = (id: number) => {
    if (arrayActiveOrders.includes(id)) {
      setArrayActiveOrders(arrayActiveOrders.filter((el) => el !== id));
    } else {
      setArrayActiveOrders([...arrayActiveOrders, id]);
    }
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
            onItemsShowChange={onItemsShowChange}
            showItems={arrayActiveOrders.includes(el.id)}
          />
        ))}
      </div>
    </div>
  );
};

export { Orders };
