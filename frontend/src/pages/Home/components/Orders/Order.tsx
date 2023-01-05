import { CiAlarmOn } from "react-icons/ci";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { useOutletContext } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import style from "./Order.module.css";
import { useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";
import {
  IOpenModalData,
  ManagerOutletContext,
  OrderData,
  OrderStatus,
} from "../../../../main.type";
import { useMutation } from "@tanstack/react-query";
import {
  changeOrder,
  GET_ORDERS,
  notify,
  removeOrder,
} from "../../../../services";
import { queryClient } from "../../../../queryClient";
import {
  IS_REMOVED_BTN_NAME,
  modalDataKeys,
  MODAL_TEXT_DATA,
} from "../../../../constants";
import { CustomStepper } from "../CustomStepper";

const buttonsNameByStatus = [
  { key: OrderStatus.created, btnName: "Pending order" },
  { key: OrderStatus.pending, btnName: "Pick up order" },
  { key: OrderStatus.in_progress, btnName: "Order is ready" },
  { key: OrderStatus.ready, btnName: "Collected" },
  { key: OrderStatus.picked_up, btnName: "Next step" },
  { key: OrderStatus.can_not_complete, btnName: "Can’t complete" },
];

const textDataCanNotCompleted =
  MODAL_TEXT_DATA[modalDataKeys.CAN_NOT_COMPLETED];
const textDataRemoved = MODAL_TEXT_DATA[modalDataKeys.REMOVE_ORDER];

const Order = ({
  id,
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
  items,
  status,
  is_deleted,
  setArrayActiveOrders,
}: OrderData & { setArrayActiveOrders: (n: number[]) => void }) => {
  const [showItems, setShowItems] = useState<boolean>(false);

  const { openModal } = useOutletContext<ManagerOutletContext>();

  // useEffect(() => {
  //   if (showItems) {
  //     setArrayActiveOrders((current) => {
  //       return [...current, id];
  //     });
  //   }
  // }, [showItems]);

  const changeStatusOrder = useMutation({
    mutationFn: changeOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_ORDERS]);
    },
    onError: async (err) => {
      console.error(`changeStatusOrder error ${err}`);
    },
  });

  const removeOrderData = useMutation({
    mutationFn: removeOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries([GET_ORDERS]);
      notify(textDataRemoved.toastMessage);
    },
    onError: async (err) => {
      console.error(`removeOrderData error ${err}`);
    },
  });

  const isOrderInArchive =
    status == OrderStatus.picked_up ||
    status == OrderStatus.can_not_complete ||
    is_deleted;

  const orderDataTime = pick_up_data ? pick_up_data : created_at;

  const statusBtnName = buttonsNameByStatus.find(
    (obj) => obj.key === status
  )?.btnName;

  const handelBtnStatus = () => {
    if (isOrderInArchive) {
      return;
    }

    const currentStatusIndex = buttonsNameByStatus.findIndex(
      (obj) => obj.key === status
    );
    const reqData = {
      order_id: id,
      body: { new_status: buttonsNameByStatus[currentStatusIndex + 1].key },
    };

    changeStatusOrder.mutate(reqData);
  };

  const confirmCanNotCompleted = () => {
    const reqData = {
      order_id: id,
      body: { new_status: OrderStatus.can_not_complete },
    };
    changeStatusOrder.mutate(reqData);
    notify(textDataCanNotCompleted.toastMessage);
  };

  const confirmRemoveOrder = () => {
    const reqData = {
      order_id: id,
    };
    removeOrderData.mutate(reqData);
  };

  const handlerCantComplete = () => {
    if (isOrderInArchive) {
      return;
    }

    const openModalData: IOpenModalData = {
      modalTitle: textDataCanNotCompleted.title,
      modalConfirmLabel: textDataCanNotCompleted.btnName,
      confirmCallback: confirmCanNotCompleted,
    };
    openModal(openModalData);
  };

  const handlerRemove = () => {
    if (is_deleted) {
      return;
    }
    const openModalData: IOpenModalData = {
      modalTitle: textDataRemoved.title,
      modalConfirmLabel: textDataRemoved.btnName,
      confirmCallback: confirmRemoveOrder,
    };
    openModal(openModalData);
  };

  const activeStep = buttonsNameByStatus.findIndex((obj) => obj.key === status);

  const orderContent = classNames(style.orderContent, {
    [style.orderContentButton]: !showItems,
  });

  const orderContentStatusBtn = classNames(
    style.orderContentStatusBtn,
    style.btnActive,
    {
      [style.btnInActive]: isOrderInArchive,
    }
  );

  const styleBtnCantComplete = classNames(style.orderItemBtn, {
    [style.btnInActive]: isOrderInArchive,
  });

  const styleBtnRemove = classNames(style.orderItemBtn, {
    [style.btnInActive]: is_deleted,
  });

  return (
    <>
      <div className={orderContent}>
        <div className={style.orderContentWrap}>
          <div className={style.orderContentData}>
            <div className={style.orderContentDataRow}>
              <span>Order no: </span>
              {id}
            </div>
            <div className={style.orderContentDataRow}>
              <span>Due date:</span>
              {new Date(orderDataTime).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </div>
            <div className={style.orderContentDataRow}>
              <span>Name: </span> {customer_name}
            </div>
            <div className={style.orderContentDataRow}>
              <span>Phone: </span> {prone_number_value}
            </div>
          </div>
          <div className={style.orderContentNote}>
            {showItems ? (
              <div className={style.orderContentNoteActive}>
                <span>Urgency:</span>
                <div className={style.orderContentNoteActiveAlarm}>
                  <CiAlarmOn className={style.iconContentAlarmActive} />
                </div>
              </div>
            ) : (
              <div className={style.orderContentNoteAlarm}>
                <div className={style.orderContentNoteAlarmWrap}>
                  <CiAlarmOn className={style.iconContentAlarm} />
                </div>
              </div>
            )}

            <div className={style.orderContentNoteText}>
              <span>Note: </span> {note}
            </div>
          </div>
        </div>
        <div className={style.orderContentStatus}>
          {status === OrderStatus.can_not_complete || is_deleted ? (
            <></>
          ) : (
            <CustomStepper
              activeStep={activeStep}
              steps={buttonsNameByStatus}
            />
          )}
          <div className={style.orderContentStatusWrap}>
            <div className={orderContentStatusBtn} onClick={handelBtnStatus}>
              {is_deleted ? IS_REMOVED_BTN_NAME : statusBtnName}
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
          <div className={style.orderItemContent}>
            {" "}
            {items.map((item, indx) => (
              <OrderItem key={indx} {...item} />
            ))}
            <div className={style.orderItemButtons}>
              <button
                className={styleBtnCantComplete}
                onClick={handlerCantComplete}
              >
                {textDataCanNotCompleted.btnName}
              </button>
              <button className={styleBtnRemove} onClick={handlerRemove}>
                {textDataRemoved.btnName}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { Order };
