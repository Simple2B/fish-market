import { CiAlarmOn } from "react-icons/ci";
import style from "./OrderItem.module.css";

type OrderItemProps = {
  customer_name: string;
  prone_number_value: string;
  note: string | null;
  created_at: string;
  pick_up_data: string | null;
};

const OrderItem = ({
  customer_name,
  prone_number_value,
  note,
  created_at,
  pick_up_data,
}: OrderItemProps) => {
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
        <div>status</div>
      </div>
    </div>
  );
};

export { OrderItem };
