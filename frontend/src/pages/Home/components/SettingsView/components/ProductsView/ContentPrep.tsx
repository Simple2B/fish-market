import { useMutation, useQuery } from "@tanstack/react-query";
import { AddPrepForm, PrepsView } from "../../../../../../components";
import { IPrep } from "../../../../../../main.type";
import { queryClient } from "../../../../../../queryClient";
import {
  activateDeactivatePrep,
  CHECK_TOKEN_LOGIN,
  createProductPrep,
  deleteProductPrepById,
  getBusinessProductPreps,
  GET_BUSINESS_PRODUCTS_PREPS,
  highlightProductPreps,
} from "../../../../../../services";
import { HighlightButtons } from "./HighlightButtons";

import style from "./ShowUpdateProduct.module.css";

type ContentPrepProps = {
  id: number;
};

const ContentPrep = ({ id }: ContentPrepProps) => {
  const { data } = useQuery({
    queryKey: [GET_BUSINESS_PRODUCTS_PREPS, id],
    queryFn: () => getBusinessProductPreps(id),
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationDeactivateActivatePrep = useMutation({
    mutationFn: activateDeactivatePrep,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationDeletePrep = useMutation({
    mutationFn: deleteProductPrepById,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationCreateProductPrep = useMutation({
    mutationFn: createProductPrep,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const mutationHighlightProductPreps = useMutation({
    mutationFn: highlightProductPreps,
    onSuccess: () => {
      queryClient.invalidateQueries([GET_BUSINESS_PRODUCTS_PREPS, id]);
    },
    onError: () => {
      queryClient.invalidateQueries([CHECK_TOKEN_LOGIN]);
    },
  });

  const handlerOnClickPrep = (prepId: number) => {
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

  const handlerUHighlightAll = (isHighlight: boolean) => {
    if (data && data.length <= 0) return;

    mutationHighlightProductPreps.mutate({
      product_id: id,
      body: { is_highlight: isHighlight },
    });
  };

  const onClickHighlightAll = () => {
    handlerUHighlightAll(true);
  };

  const onClickUnHighlightAll = () => {
    handlerUHighlightAll(false);
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
            <HighlightButtons
              handlerHighlightAll={onClickHighlightAll}
              handlerUnHighlightAll={onClickUnHighlightAll}
            />
          </PrepsView>
          <AddPrepForm handlerAddPreps={handlerAddPreps} />
        </div>
      )}
    </>
  );
};

export { ContentPrep };
