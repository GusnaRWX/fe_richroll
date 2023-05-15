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
  RadioGroup,
  Radio,
  FormControlLabel,
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

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  interface supplementType {
    compensation: string;
    amount: number;
    taxStatus: string;
    per: string;
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
      per: "",
    };
    setSupplementaryList((prev) => [...prev, newData]);
  };

  const selectChange = (index: number, newItem: unknown, type: string) => {
    let items = [...supplementaryList];
    let item = { ...items[index] };
    if (type === "compensation") {
      item.compensation = newItem as string;
    } else if (type === "amount") {
      item.amount = newItem as number;
    } else if (type === "tax") {
      item.taxStatus = newItem as string;
    } else if (type === "per") {
      item.per = newItem as string;
    }
    items[index] = item;
    setSupplementaryList(items);
  };

  React.useEffect(() => {
    console.log(supplementaryList);
  }, [supplementaryList]);

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
