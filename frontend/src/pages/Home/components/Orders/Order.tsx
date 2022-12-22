import { CiAlarmOn } from "react-icons/ci";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { Step, Stepper } from "react-form-stepper";
import { useOutletContext } from "react-router-dom";

import style from "./Order.module.css";
import { useState } from "react";
import { OrderItem } from "./OrderItem";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import {
  IOpenModalData,
  ManagerOutletContext,
  OrderData,
  OrderStatus,
} from "../../../../main.type";
import { ConnectorStyleProps } from "react-form-stepper/dist/components/Connector/ConnectorTypes";
import { useMutation } from "@tanstack/react-query";
import { changeOrder, GET_ORDERS, removeOrder } from "../../../../services";
import { queryClient } from "../../../../queryClient";
import { modalData, TEXT_DATA } from "../../../../constants";

const buttonsNameByStatus = [
  { key: OrderStatus.created, btnName: "Pending order" },
  { key: OrderStatus.pending, btnName: "Pick up order" },
  { key: OrderStatus.in_progress, btnName: "Order is ready" },
  { key: OrderStatus.ready, btnName: "Collected" },
  { key: OrderStatus.picked_up, btnName: "Next step" },
  { key: OrderStatus.can_not_complete, btnName: "Can’t complete" },
];

const Order = ({
  id,
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
  items,
  status,
}: OrderData) => {
  const [showItems, setShowItems] = useState<boolean>(false);

  const { openModal } = useOutletContext<ManagerOutletContext>();

  const changeStatusOrder = useMutation({
    mutationFn: changeOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_ORDERS]);
    },
    onError: async (err) => {
      console.log(`changeStatusOrder error ${err}`);
    },
  });

  const removeOrderData = useMutation({
    mutationFn: removeOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_ORDERS]);
    },
    onError: async (err) => {
      console.log(`removeOrderData error ${err}`);
    },
  });

  const handelBtnStatus = () => {
    if (showItems) {
      const currentStatusIndex = buttonsNameByStatus.findIndex(
        (obj) => obj.key === status
      );
      const reqData = {
        order_id: id,
        body: { new_status: buttonsNameByStatus[currentStatusIndex + 1].key },
      };

      changeStatusOrder.mutate(reqData);
    }
  };

  const confirmCanNotCompleted = () => {
    const reqData = {
      order_id: id,
      body: { new_status: OrderStatus.can_not_complete },
    };
    changeStatusOrder.mutate(reqData);
  };

  const confirmRemoveOrder = () => {
    const reqData = {
      order_id: id,
    };
    removeOrderData.mutate(reqData);
  };

  const handlerCantComplete = () => {
    const textData = TEXT_DATA.ENGLISH[modalData.CAN_NOT_COMPLETED];
    const openModalData: IOpenModalData = {
      modalTitle: textData.title,
      modalConfirmLabel: textData.btnName,
      confirmCallback: confirmCanNotCompleted,
    };
    openModal(openModalData);
  };

  const handlerRemove = () => {
    const textData = TEXT_DATA.ENGLISH[modalData.REMOVE_ORDER];
    const openModalData: IOpenModalData = {
      modalTitle: textData.title,
      modalConfirmLabel: textData.btnName,
      confirmCallback: confirmRemoveOrder,
    };
    openModal(openModalData);
  };

  const orderContent = classNames(style.orderContent, {
    [style.orderContentButton]: !showItems,
  });

  const orderItemContent = classNames(style.orderItemContent, {
    [style.orderContentButton]: showItems,
  });

  const orderContentStatusBtn = classNames(style.orderContentStatusBtn, {
    [style.btnActive]: showItems,
  });

  return (
    <>
      <div className={orderContent}>
        <div className={style.orderContentWrap}>
          <div className={style.orderContentData}>
            <div className={style.orderContentDataRow}>
              <span>Order no: </span>
              data here
            </div>
            <div className={style.orderContentDataRow}>
              <span>Due date:</span>
              {pick_up_data
                ? pick_up_data
                : new Date(created_at).toDateString()}
            </div>
            <div className={style.orderContentDataRow}>
              <span>Name: </span> {customer_name}
            </div>
            <div className={style.orderContentDataRow}>
              <span>Phone: </span> {prone_number_value}
            </div>
          </div>
          <div className={style.orderContentNote}>
            <div className={style.orderContentNoteAlarm}>
              <CiAlarmOn className={style.iconContent} />
            </div>
            <div className={style.orderContentNoteText}>
              <span>Note: </span> {note}
            </div>
          </div>
        </div>
        <div className={style.orderContentStatus}>
          <Stepper
            activeStep={buttonsNameByStatus.findIndex(
              (obj) => obj.key === status
            )}
            style={{ padding: "0" }}
            connectorStateColors={true}
            connectorStyleConfig={
              {
                size: "3px",
                completedColor: "#C1E1FF",
                activeColor: "#C1E1FF",
              } as ConnectorStyleProps
            }
            styleConfig={
              {
                activeTextColor: "#5099dd",
                activeBgColor: "#5099dd",
                completedBgColor: "#C1E1FF",
                completedTextColor: "#C1E1FF",
                inactiveTextColor: "#D1D1D1",
              } as StepStyleDTO
            }
          >
            {buttonsNameByStatus.slice(0, -1).map((obj) => (
              <Step
                key={obj.key}
                label={
                  obj.key[0].toLocaleUpperCase() +
                  obj.key.replace("_", " ").slice(1)
                }
              />
            ))}
          </Stepper>
          <div className={style.orderContentStatusWrap}>
            <div className={orderContentStatusBtn} onClick={handelBtnStatus}>
              {buttonsNameByStatus.find((obj) => obj.key === status)?.btnName}
            </div>
            <div
              className={style.orderContentStatusIconBtn}
              onClick={() => setShowItems((currentIsShow) => !currentIsShow)}
            >
              {showItems ? (
                <BiChevronUp className={style.iconContent} />
              ) : (
                <BiChevronDown className={style.iconContent} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showItems && (
        <>
          <div className={orderItemContent}>
            {" "}
            {items.map((item, indx) => (
              <OrderItem key={indx} {...item} />
            ))}
            <div className={style.orderItemButtons}>
              <div className={style.orderItemBtn} onClick={handlerCantComplete}>
                {TEXT_DATA.ENGLISH[modalData.CAN_NOT_COMPLETED].btnName}
              </div>
              <div className={style.orderItemBtn} onClick={handlerRemove}>
                {TEXT_DATA.ENGLISH[modalData.REMOVE_ORDER].btnName}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { Order };
