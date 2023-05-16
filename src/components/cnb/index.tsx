import React from "react";
import EnhancedTable from "./table";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "../_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const CNBComponent = () => {
  const router = useRouter();
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

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
      <EnhancedTable />
    </>
  );
};

export default CNBComponent;
