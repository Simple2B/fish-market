import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../../../components";
import { TOKEN_KEY } from "../../../../constants";
import { getMonthListByYear, getYearList } from "../../../../services";
import style from "./FunctionalPanel.module.css";

type FunctionalPanelProps = {
  handlerRegisterNewUser: () => void;
  yearData: number;
  monthData: string;
  setYearData: (n: number) => void;
  setMonthData: (n: string) => void;
};

const FunctionalPanel = ({
  handlerRegisterNewUser,
  yearData,
  monthData,
  setYearData,
  setMonthData,
}: FunctionalPanelProps) => {
  const navigator = useNavigate();

  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigator("/login");
  };

  const handlerYearDataSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearData(Number(e.target.value));
  };

  const handlerMonthDataSelector = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMonthData(e.target.value);
  };

  return (
    <div className={style.functionalPanelContent}>
      <div className={style.functionalPanelLeft}>
        <div>
          Year subjected
          <select
            className={style.functionalPanelSelect}
            placeholder="Choose option"
            value={yearData}
            onChange={handlerYearDataSelector}
          >
            <option value={""}>Choose option...</option>
            {getYearList().map((year: number) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          Month subjected
          <select
            className={style.functionalPanelSelect}
            placeholder="Choose option"
            value={monthData}
            onChange={handlerMonthDataSelector}
            disabled={!yearData}
          >
            <option value={""}>Choose option...</option>
            {getMonthListByYear(Number(yearData)).map((month: string) => {
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={style.functionalPanelRight}>
        <CustomBtn
          btnName="Register New User"
          handlerOnClick={handlerRegisterNewUser}
          additionalStyles={style.activeBtn}
        />
        <CustomBtn
          btnName="Login Out"
          additionalStyles={style.activeBtn}
          handlerOnClick={logOut}
        />
      </div>
    </div>
  );
};

export { FunctionalPanel };
