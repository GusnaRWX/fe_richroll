import React from "react";
import { Button, Form, IconButton } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
    id: number;
    compensation: string;
    amount: number;
    taxStatus: string;
    per: string;
  }

  const [supplementaryList, setSupplementaryList] = React.useState<
    supplementType[]
  >([]);

  const [BaseCompensation, setBaseCompensation] = React.useState<Object>({
    compensation: "",
    tax: "",
    amount: "",
    per: "",
  });

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
      id: Math.floor(Math.random() * 100 + 1),
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
  React.useEffect(() => {
    console.log(BaseCompensation);
  }, [BaseCompensation]);

  const deleteSuplementary = (i: number) => {
    let items = [...supplementaryList];
    let search = items.filter((item) => {
      return item.id !== i;
    });
    setSupplementaryList(search);
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
            Profile Name
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
            <TextField fullWidth placeholder="Sales" />
          </div>
          <Typography
            style={{
              marginBottom: "17px",
              marginTop: "31px",
              fontSize: "18px",
              fontWeight: "700",
              color: "#223567",
            }}
          >
            Compensation
          </Typography>
          <Typography
            style={{
              marginBottom: "17px",
              fontSize: "16px",
              fontWeight: "700",
              color: "#223567",
            }}
          >
            Base
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "33px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div id="right" style={{ width: "100%", maxWidth: "511px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <Typography style={{ fontSize: "14px" }}>
                    Compensation Component
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    onChange={(e) =>
                      setBaseCompensation({
                        ...BaseCompensation,
                        compensation: e.target.value,
                      })
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
              <div id="center" style={{ maxWidth: "388px", width: "100%" }}>
                <Typography style={{ fontSize: "14px" }}>
                  Tax Status<span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  row
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      tax: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="taxable"
                    control={
                      <Radio size="small" checkedIcon={<BpCheckedIcon />} />
                    }
                    label="Taxable"
                  />
                  <FormControlLabel
                    value="non-taxable"
                    control={
                      <Radio size="small" checkedIcon={<BpCheckedIcon />} />
                    }
                    label="Non-Taxable"
                  />
                </RadioGroup>
              </div>
            </div>
            <div>
              <Typography>
                {BaseCompensation?.compensation === "wage" ? "Rate" : "Amount"}
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
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      amount: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">IDR</InputAdornment>
                    ),
                  }}
                />
                <Select
                  fullWidth
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      per: e.target.value,
                    })
                  }
                >
                  <MenuItem value="hour">per Hour</MenuItem>
                  <MenuItem value="month">per Month</MenuItem>
                </Select>
              </div>
            </div>
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
                      key={i}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "24px",
                        }}
                      >
                        <div
                          id="right"
                          style={{ width: "100%", maxWidth: "511px" }}
                        >
                          <div style={{ marginBottom: "16px" }}>
                            <Typography style={{ fontSize: "14px" }}>
                              Compensation Component {i + 1}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                              fullWidth
                              value={supplementaryList[i].compensation}
                              onChange={(e) =>
                                selectChange(
                                  i,
                                  e.target.value as string,
                                  "compensation"
                                )
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
                        <div
                          id="center"
                          style={{ maxWidth: "388px", flexGrow: "1" }}
                        >
                          <Typography style={{ fontSize: "14px" }}>
                            Tax Status<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <RadioGroup
                            row
                            value={supplementaryList[i].taxStatus}
                            onChange={(e) =>
                              selectChange(i, e.target.value as string, "tax")
                            }
                          >
                            <FormControlLabel
                              value="taxable"
                              control={
                                <Radio
                                  size="small"
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label="Taxable"
                            />
                            <FormControlLabel
                              value="non-taxable"
                              control={
                                <Radio
                                  size="small"
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label="Non-Taxable"
                            />
                          </RadioGroup>
                        </div>
                        <div>
                          <Button
                            color="red"
                            startIcon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => deleteSuplementary(suplement.id)}
                          />
                        </div>
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
                            value={supplementaryList[i].amount}
                            onChange={(e) =>
                              selectChange(
                                i,
                                e.target.value as unknown,
                                "amount"
                              )
                            }
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
                          <Select
                            fullWidth
                            value={supplementaryList[i].per}
                            onChange={(e) =>
                              selectChange(i, e.target.value as string, "per")
                            }
                          >
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
