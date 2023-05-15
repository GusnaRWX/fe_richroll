import React from "react";
import { Button, Form } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";

export default function CreateCompanyProfileComponent() {
  const AddButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 10px",
    ".MuiTypography-root": {
      fontSize: "12px",
    },
  });

  interface supplementType {
    compensation: string;
    amount: number;
    taxStatus: string;
  }

  const [supplementaryList, setSupplementaryList] = React.useState<
    supplementType[]
  >([]);

  const options = [
    { label: "Bonus", value: "bonus" },
    { label: "Overtime", value: "overtime" },
    { label: "Allowances", value: "allowances" },
    { label: "Commission", value: "commission" },
    { label: "Piece Rate", value: "pieceRate" },
    { label: "Wage", value: "wage" },
    { label: "Salary", value: "salary" },
  ];

  const addSuplementary = () => {
    const newData = {
      compensation: "",
      amount: 0,
      taxStatus: "",
    };
    setSupplementaryList((prev) => [...prev, newData]);
  };

  const compensationChange = (index, newItem) => {
    let items = [...supplementaryList];
    let item = { ...items[index] };
    item.compensation = newItem;
    items[index] = item;
    setSupplementaryList(items);
  };

  const deleteSuplementary = (i: number) => {
    supplementaryList.splice(i, 1);
  };

  return (
    <div>
      Form Here
      <div>
        <div>
          {supplementaryList.length > 0 && (
            <>
              <Typography
                style={{
                  marginBottom: "17px",
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#223567",
                }}
              >
                Suplementary
              </Typography>
              <Form>
                {supplementaryList.map((suplement, i) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "33px",
                    }}
                  >
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div
                        id="right"
                        style={{ width: "50%", maxWidth: "511px" }}
                      >
                        <div style={{ marginBottom: "16px" }}>
                          <Typography style={{ fontSize: "14px" }}>
                            Compensation Component {i + 1}
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Select
                            fullWidth
                            onChange={(e) =>
                              compensationChange(i, e.target.value as string)
                            }
                          >
                            {options.map((option, i) => (
                              <MenuItem key={i} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div id="left">asd</div>
                    </div>
                    <div>
                      <Typography>
                        {suplement.compensation === "wage" ? "Rate" : "Amount"}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "24px",
                          maxWidth: "511px",
                        }}
                      >
                        <TextField
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Rp
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="start">
                                IDR
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Select fullWidth label="select">
                          <MenuItem value="hour">per Hour</MenuItem>
                          <MenuItem value="month">per Month</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </Form>
            </>
          )}
        </div>
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
