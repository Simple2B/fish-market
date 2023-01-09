import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../components";
import { queryClient } from "../../../../queryClient";
import {
  CHECK_TOKEN_LOGIN,
  getUserBusinessInfo,
  GET_USER_BUSINESS,
} from "../../../../services";
import { LeftPanel, RightPanel } from "./components";
import { ProductsView } from "./components/ProductsView/ProductsView";
import style from "./SettingsView.module.css";

const SettingsView = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_USER_BUSINESS],
    queryFn: getUserBusinessInfo,
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {data && (
        <div className={style.settingsViewContent}>
          <div className={style.contentPanel}>
            <LeftPanel {...data} />
            <RightPanel web_site_id={data.web_site_id} />
          </div>
          <ProductsView />
        </div>
      )}
    </>
  );
};

export { SettingsView };
