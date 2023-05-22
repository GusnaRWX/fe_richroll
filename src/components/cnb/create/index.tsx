import React from "react";
import { styled as MuiStyled } from "@mui/material/styles";
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
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  getCompensationComponentOptionRequested,
  postNewCnbProfileRequested,
} from "@/store/reducers/slice/cnb/compensationSlice";
import { useAppDispatch, useAppSelectors } from "@/hooks/index";
import { getCompanyData } from "@/utils/helper";

export default function CreateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const compensationComponentOption = useAppSelectors(
    (state) => state.compensation?.compensationComponentOption?.data?.items
  );

  React.useEffect(() => {
    dispatch({
      type: getCompensationComponentOptionRequested.toString(),
    });
  }, []);

  const AddButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 10px",
    ".MuiTypography-root": {
      fontSize: "12px",
    },
  });

  const Header = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  });

  const HeaderPageTitle = styled("div")({
    display: "flex",
    gap: "16px",
    alignItems: "center",
  });

  const NextBtnWrapper = MuiStyled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
    data: {
      compensationComponentId: string;
      taxStatus: string;
      rateOrAmount: number | null;
      period: string;
    };
  }

  const [supplementaryList, setSupplementaryList] = React.useState<
    supplementType[]
  >([]);

  interface baseCompType {
    name: string;
    compensationComponentId: string;
    taxStatus: string;
    rateOrAmount: string;
    period: string;
  }

  const [BaseCompensation, setBaseCompensation] = React.useState<baseCompType>({
    name: "",
    compensationComponentId: "",
    taxStatus: "",
    rateOrAmount: "0",
    period: "",
  });

  const addSuplementary = () => {
    const newData = {
      id: Math.floor(Math.random() * 100 + 1),
      data: {
        compensationComponentId: "",
        taxStatus: "",
        rateOrAmount: 0,
        period: "",
      },
    };
    setSupplementaryList((prev) => [...prev, newData]);
  };

  const selectChange = (index: number, newItem: unknown, type: string) => {
    let items = [...supplementaryList];
    let item = { ...items[index] };
    if (type === "compensation") {
      item.data.compensationComponentId = newItem as string;
    } else if (type === "amount") {
      item.data.rateOrAmount = newItem as number;
    } else if (type === "tax") {
      item.data.taxStatus = newItem as string;
    } else if (type === "per") {
      item.data.period = newItem as string;
    }
    items[index] = item;
    setSupplementaryList(items);
  };

  const deleteSuplementary = (i: number) => {
    let items = [...supplementaryList];
    let search = items.filter((item) => {
      return item.id !== i;
    });
    setSupplementaryList(search);
  };

  function CreateNewCnbProfile() {
    dispatch({
      type: postNewCnbProfileRequested.toString(),
      Payload: {
        companyId: companyData?.id,
        name: BaseCompensation.name,
        baseCompensation: {
          compensationComponentId: parseInt(
            BaseCompensation.compensationComponentId
          ),
          taxStatus: BaseCompensation.taxStatus,
          amount:
            BaseCompensation.compensationComponentId === "1"
              ? 0
              : BaseCompensation.rateOrAmount,
          rate:
            BaseCompensation.compensationComponentId === "1"
              ? BaseCompensation.rateOrAmount
              : 0,
          period: BaseCompensation.period,
        },
        supplementaryCompensations: supplementaryList.map((item) => ({
          compensationComponentId: parseInt(item.data.compensationComponentId),
          taxStatus: item.data.taxStatus,
          amount:
            item.data.compensationComponentId === "1"
              ? 0
              : item.data.rateOrAmount,
          rate:
            item.data.compensationComponentId === "1"
              ? item.data.rateOrAmount
              : 0,
          period: item.data.period,
        })),
      },
    });
  }

  return (
    <div>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor="primary.500"
            icons={<ArrowBack sx={{ color: "#FFFFFF" }} />}
            onClick={() => {
              router.push("/compensation-benefits");
            }}
          />
          <Typography
            style={{
              color: "#223567",
              fontSize: "20px",
              fontWeight: "700",
              width: "250px",
            }}
          >
            Create New CnB Profile
          </Typography>
        </HeaderPageTitle>
        <NextBtnWrapper>
          <Button
            fullWidth={false}
            size="small"
            label="Cancel"
            variant="outlined"
            sx={{ mr: "12px" }}
            color="primary"
          />
          <Button
            fullWidth={false}
            size="small"
            label="Save"
            color="primary"
            onClick={() => CreateNewCnbProfile()}
          />
        </NextBtnWrapper>
      </Header>
      <Paper sx={{ width: "100%", p: "20px 30px" }}>
        <Form style={{ marginBottom: "32px" }}>
          <Typography>
            Profile Name
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Grid container>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <TextField
                fullWidth
                placeholder="Sales"
                value={BaseCompensation.name}
                onChange={(e) =>
                  setBaseCompensation({
                    ...BaseCompensation,
                    name: e.target.value as string,
                  })
                }
              />
            </Grid>
          </Grid>
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
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <div style={{ marginBottom: "16px" }}>
                  <Typography style={{ fontSize: "14px" }}>
                    Compensation Component
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    value={BaseCompensation.compensationComponentId}
                    onChange={(e) =>
                      setBaseCompensation({
                        ...BaseCompensation,
                        compensationComponentId: e.target.value as string,
                      })
                    }
                  >
                    {compensationComponentOption?.map((Option, i) => (
                      <MenuItem key={i} value={Option.id}>
                        {Option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography style={{ fontSize: "14px" }}>
                  Tax Status<span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  row
                  style={{ height: "54px" }}
                  value={BaseCompensation.taxStatus}
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      taxStatus: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={
                      <Radio size="small" checkedIcon={<BpCheckedIcon />} />
                    }
                    label="Taxable"
                  />
                  <FormControlLabel
                    value="false"
                    control={
                      <Radio size="small" checkedIcon={<BpCheckedIcon />} />
                    }
                    label="Non-Taxable"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid container>
              <Typography>
                {BaseCompensation?.compensationComponentId === "1"
                  ? "Rate"
                  : "Amount"}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3} lg={3} xl={3}>
                  <TextField
                    fullWidth
                    type="number"
                    value={BaseCompensation.rateOrAmount}
                    onChange={(e) =>
                      setBaseCompensation({
                        ...BaseCompensation,
                        rateOrAmount: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">IDR</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={3} md={3} lg={3} xl={3}>
                  <Select
                    fullWidth
                    value={BaseCompensation.period}
                    onChange={(e) =>
                      setBaseCompensation({
                        ...BaseCompensation,
                        period: e.target.value as string,
                      })
                    }
                  >
                    <MenuItem value="Per Week">per Week</MenuItem>
                    <MenuItem value="Per Month">per Month</MenuItem>
                    <MenuItem value="Per Year">per Year</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                    <div key={i} style={{ marginBottom: "33px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <div style={{ marginBottom: "16px" }}>
                            <Typography style={{ fontSize: "14px" }}>
                              Compensation Component {i + 1}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Select
                              fullWidth
                              value={
                                supplementaryList[i].data
                                  .compensationComponentId
                              }
                              onChange={(e) =>
                                selectChange(
                                  i,
                                  e.target.value as string,
                                  "compensation"
                                )
                              }
                            >
                              {compensationComponentOption?.map((Option, i) => (
                                <MenuItem key={i} value={Option.id}>
                                  {Option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography style={{ fontSize: "14px" }}>
                            Tax Status<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: "54px",
                            }}
                          >
                            <RadioGroup
                              row
                              value={supplementaryList[i].data.taxStatus}
                              onChange={(e) =>
                                selectChange(i, e.target.value as string, "tax")
                              }
                            >
                              <FormControlLabel
                                value="true"
                                control={
                                  <Radio
                                    size="small"
                                    checkedIcon={<BpCheckedIcon />}
                                  />
                                }
                                label="Taxable"
                              />
                              <FormControlLabel
                                value="false"
                                control={
                                  <Radio
                                    size="small"
                                    checkedIcon={<BpCheckedIcon />}
                                  />
                                }
                                label="Non-Taxable"
                              />
                            </RadioGroup>
                            <Box>
                              <Button
                                color="red"
                                startIcon={<DeleteIcon />}
                                label="Delete"
                                onClick={() => deleteSuplementary(suplement.id)}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      <Typography>
                        {suplement.data.compensationComponentId === "1"
                          ? "Rate"
                          : "Amount"}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3} md={3} lg={3} xl={3}>
                          <TextField
                            fullWidth
                            type="number"
                            value={supplementaryList[i].data.rateOrAmount}
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
                                <InputAdornment position="end">
                                  IDR
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} xl={3}>
                          <Select
                            fullWidth
                            value={supplementaryList[i].data.period}
                            onChange={(e) =>
                              selectChange(i, e.target.value as string, "per")
                            }
                          >
                            <MenuItem value="Per Week">per Week</MenuItem>
                            <MenuItem value="Per Month">per Month</MenuItem>
                            <MenuItem value="Per Year">per Year</MenuItem>
                          </Select>
                        </Grid>
                      </Grid>
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
      </Paper>
    </div>
  );
}
