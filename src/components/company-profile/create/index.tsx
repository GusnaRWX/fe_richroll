import React from "react";
import { IconButton, Button, Form } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function CreateCompanyProfileComponent() {
  const router = useRouter();

  const AddButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 10px",
    ".MuiTypography-root": {
      fontSize: "12px",
    },
  });
  const SaveButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 16px",
    ".MuiTypography-root": {
      fontSize: "12px",
    },
  });
  const CancelButton = styled(Button)({
    color: "#223567",
    maxWidth: "245px",
    padding: "8px 16px",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <IconButton
            parentColor="primary.500"
            icons={<ArrowBack sx={{ color: "#FFFFFF" }} />}
            onClick={() => {
              router.push("/");
            }}
          />
          <Typography
            style={{
              color: "#223567",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Create New CnB Profile
          </Typography>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <CancelButton color="primary" label="Cancel" />
          <SaveButton color="primary" label="Save" />
        </div>
      </div>
      <div
        style={{
          padding: "20px 32px",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form style={{ marginBottom: "32px" }}>
          <Typography>
            Input
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              maxWidth: "50%",
            }}
          >
            <TextField fullWidth />
          </div>
        </Form>
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
                          {suplement.compensation === "wage"
                            ? "Rate"
                            : "Amount"}
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
    </div>
  );
}
