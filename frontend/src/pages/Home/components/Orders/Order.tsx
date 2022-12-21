import { CiAlarmOn } from "react-icons/ci";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { Step, Stepper } from "react-form-stepper";

import style from "./Order.module.css";
import { useState } from "react";
import { OrderItem } from "./OrderItem";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { OrderData, OrderStatus } from "../../../../main.type";
import { ConnectorStyleProps } from "react-form-stepper/dist/components/Connector/ConnectorTypes";

const buttonsNameByStatus = [
  { key: OrderStatus.created, btnName: "Pending order" },
  { key: OrderStatus.pending, btnName: "Pick up order" },
  { key: OrderStatus.in_progress, btnName: "Order is ready" },
  { key: OrderStatus.ready, btnName: "Collected" },
  { key: OrderStatus.picked_up, btnName: "Next step" },
  { key: OrderStatus.can_not_complete, btnName: "Can’t complete" },
];

const Order = ({
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
  items,
  status,
}: OrderData) => {
  const [showItems, setShowItems] = useState<boolean>(false);

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
            <div className={orderContentStatusBtn}>
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
        <div className={orderItemContent}>
          {" "}
          {items.map((item, indx) => (
            <OrderItem key={indx} {...item} />
          ))}
        </div>
      )}
    </>
  );
};

export { Order };
