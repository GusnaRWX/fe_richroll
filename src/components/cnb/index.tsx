import React from "react";
import EnhancedTable from "./table";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "../_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { getTableRequested } from "@/store/reducers/slice/cnb/compensationSlice";
import { useAppDispatch, useAppSelectors } from '@/hooks/index';

const CNBComponent = () => {
  const dispatch = useAppDispatch()
  const dataTable = useAppSelectors(state => state.compensation?.dataTable?.data)
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
      payload: 4
    })
  }, [])

  console.log(dataTable);

  return (
    <>
      <TitleWrapper>
        <Typography variant="h5">Compensation and Benefits</Typography>
        <div>
          <Button
            onClick={() => router.push("/cnb/create")}
            startIcon={<AddIcon />}
            label="Add Profile"
          />
        </div>
      </TitleWrapper>
      {/* <EnhancedTable rows={dataTable} /> */}
    </>
  );
};

export default CNBComponent;
