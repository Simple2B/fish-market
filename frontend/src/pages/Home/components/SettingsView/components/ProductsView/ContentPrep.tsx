import { useMutation, useQuery } from "@tanstack/react-query";
import { AddPrepForm, PrepsView } from "../../../../../../components";
import { IPrep } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  activateDeactivatePrep,
  createProductPrep,
  deleteProductPrepById,
  getBusinessProductPreps,
  GET_BUSINESS_PRODUCTS_PREPS,
} from "../../../../../../services";

import style from "./ShowUpdateProduct.module.css";

type ContentPrepProps = {
  id: number;
  children: React.ReactNode;
};

const ContentPrep = ({ id, children }: ContentPrepProps) => {
  const { data } = useQuery({
    queryKey: [GET_BUSINESS_PRODUCTS_PREPS, id],
    queryFn: () => getBusinessProductPreps(id),
  });

  const mutationDeactivateActivatePrep = useMutation({
    mutationFn: activateDeactivatePrep,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {
      console.log("error");
    },
  });

  const mutationDeletePrep = useMutation({
    mutationFn: deleteProductPrepById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {},
  });

  const mutationCreateProductPrep = useMutation({
    mutationFn: createProductPrep,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {},
  });

  const handlerOnClickPrep = (prepId: number) => {
    if (!data) return;

    const isActive = !data.find((prep: IPrep) => prep.id === prepId).is_active;

    const reqData = {
      product_id: id,
      prep_id: prepId,
      body: { is_active: isActive },
    };
    mutationDeactivateActivatePrep.mutate(reqData);
  };

  const handlerDeletePrep = (prepId: number) => {
    const reqData = {
      product_id: id,
      prep_id: prepId,
    };

    mutationDeletePrep.mutate(reqData);
  };

  const handlerAddPreps = (prePname: { prep: string }) => {
    mutationCreateProductPrep.mutate({
      product_id: id,
      body: { name: prePname.prep },
    });
  };

  return (
    <>
      {data && (
        <div className={style.contentPrep}>
          <PrepsView
            preps={data}
            handlerOnClickPrep={handlerOnClickPrep}
            handlerDeletePrep={handlerDeletePrep}
          >
            {children}
          </PrepsView>
          <AddPrepForm handlerAddPreps={handlerAddPreps} />
        </div>
      )}
    </>
  );
};

export { ContentPrep };
