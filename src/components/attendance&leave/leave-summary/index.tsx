import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const AttendanceAndLeaveComponent = () => {
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
        <Typography variant="h5">Leave Summary</Typography>
        <div>
          <Button
            onClick={() =>
              router.push("/attendance&leave/leave-summary/create")
            }
            startIcon={<AddIcon />}
            label="Create New Leave Application"
          />
        </div>
      </TitleWrapper>
    </>
  );
};

export default AttendanceAndLeaveComponent;
