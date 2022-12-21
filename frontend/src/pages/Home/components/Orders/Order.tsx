import { CiAlarmOn } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { OrderData } from "./Order.type";
import style from "./Order.module.css";
import { useState } from "react";

const Order = ({
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
  items,
}: OrderData) => {
  const [showItems, setShowItems] = useState<boolean>(false);

  console.log(showItems);

  return (
    <>
      <div className={style.orderContent}>
        <div className={style.orderContentData}>
          <div className={style.orderContentDataRow}>
            <span>Order no: </span>
            data here
          </div>
          <div className={style.orderContentDataRow}>
            <span>Due date:</span>
            {pick_up_data ? pick_up_data : new Date(created_at).toDateString()}
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
            <CiAlarmOn
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className={style.orderContentNoteText}>
            <span>Note: </span> {note}
          </div>
        </div>
        <div className={style.orderContentStatus}>
          <div>Progress bar</div>
          <div className={style.orderContentStatusWrap}>
            <div className={style.orderContentStatusBtn}>BTN</div>
            <div
              className={style.orderContentStatusIconBtn}
              onClick={() => setShowItems((currentIsShow) => !currentIsShow)}
            >
              <BiChevronDown
                style={{
                  height: " 100%",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showItems && <div>Data item </div>}
    </>
  );
};

export { Order };
