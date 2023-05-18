import React from "react";
import EnhancedTable from "./table";
import { Typography, Skeleton } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "../_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { getTableRequested } from "@/store/reducers/slice/cnb/compensationSlice";
import { useAppDispatch, useAppSelectors } from "@/hooks/index";
import { getCompanyData } from "@/utils/helper";

const CNBComponent = () => {
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const dataTable = useAppSelectors(
    (state) => state.compensation?.dataTable?.data
  );
  const loading = useAppSelectors(
    (state) => state.compensation?.loading
  );
  const rerender = useAppSelectors((state) => state.compensation.rerender)
  const router = useRouter();
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  React.useEffect(() => {
    dispatch({
      type: getTableRequested.toString(),
      payload: companyData?.id,
    });
  }, [rerender]);
  
  return (
    <>
      <TitleWrapper>
        <Typography variant="h5">Compensation and Benefits</Typography>
        <div>
          <Button
            onClick={() => router.push("/compensation-benefits/create")}
            startIcon={<AddIcon />}
            label="Add Profile"
          />
        </div>
      </TitleWrapper>
      {!loading ? 
      <EnhancedTable rows={dataTable} />
      :
      <Skeleton variant="rounded" height={100} />
      }
    </>
  );
};

export default CNBComponent;
