import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../components";
import { getUserBusinessInfo, GET_USER_BUSINESS } from "../../../../services";
import { LeftPanel, RightPanel } from "./components";
import style from "./SettingsView.module.css";

const SettingsView = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_USER_BUSINESS],
    queryFn: getUserBusinessInfo,
    onSuccess: (data) => {},
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
        </div>
      )}
    </>
  );
};

export { SettingsView };
