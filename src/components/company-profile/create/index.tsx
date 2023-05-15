import React from "react";
import { Button } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

export default function CreateCompanyProfileComponent() {
  const AddButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 10px",
    ".MuiTypography-root": {
      fontSize: "12px",
    },
  });

  const supplementaryList = []

  const addSuplementary = () => {
    console.log('add'); 
  }

  return (
    <div>
      Form Here
      <div>
        <AddButton
          color="secondary"
          startIcon={<AddIcon />}
          label="Add Supplementary Compensation"
          onClick={() => addSuplementary()}
        />
      </div>
    </div>
  );
}
