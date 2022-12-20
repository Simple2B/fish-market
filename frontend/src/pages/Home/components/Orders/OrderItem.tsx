import { CiAlarmOn } from "react-icons/ci";
import { BiChevronDown } from "react-icons/bi";
import { OrderData } from "./Order.type";
import style from "./OrderItem.module.css";

const OrderItem = ({
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
}: OrderData) => {
  return (
    <div className={style.orderItemContent}>
      <div className={style.orderItemContentData}>
        <div className={style.orderItemContentDataRow}>
          <span>Order no: </span>
          data here
        </div>
        <div className={style.orderItemContentDataRow}>
          <span>Due date:</span>
          {pick_up_data ? pick_up_data : new Date(created_at).toDateString()}
        </div>
        <div className={style.orderItemContentDataRow}>
          <span>Name: </span> {customer_name}
        </div>
        <div className={style.orderItemContentDataRow}>
          <span>Phone: </span> {prone_number_value}
        </div>
      </div>
      <div className={style.orderItemContentNote}>
        <div className={style.orderItemContentNoteAlarm}>
          <CiAlarmOn
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className={style.orderItemContentNoteText}>
          <span>Note: </span> {note}
        </div>
      </div>
      <div className={style.orderItemContentStatus}>
        <div>Progress bar</div>
        <div className={style.orderItemContentStatusWrap}>
          <div className={style.orderItemContentStatusBtn}>BTN</div>
          <div className={style.orderItemContentStatusIconBtn}>
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
  );
};

export { OrderItem };
