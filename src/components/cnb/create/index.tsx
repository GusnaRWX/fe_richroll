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
  FormControl,
  FormHelperText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  getCompensationComponentOptionRequested,
  postNewCnbProfileRequested,
} from "@/store/reducers/slice/cnb/compensationSlice";
import { useAppDispatch, useAppSelectors } from "@/hooks/index";
import { getCompanyData } from "@/utils/helper";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const compensationComponentOption = useAppSelectors(
    (state) => state.compensation?.compensationComponentOption?.data?.items
  );

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

  const validationSchecma = Yup.object().shape({
    name: Yup.string().required("This is required"),
    compensationComponentId: Yup.string().required("This is required"),
    period: Yup.string().required("This is required"),
    rateOrAmount: Yup.string().required("This is required"),
    taxStatus: Yup.string().required("This is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      compensationComponentId: "",
      period: "",
      rateOrAmount: "",
      taxStatus: "",
      supplementary: supplementaryList,
    },
    onSubmit: (value) => {
      console.log(value);
    },
    validationSchema: validationSchecma,
  });

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

  const deleteSuplementary = (i: number) => {
    const items = [...supplementaryList];
    const search = items.filter((item) => {
      return item.id !== i;
    });
    setSupplementaryList(search);
  };

  React.useEffect(() => {
    console.log(formik.errors.supplementary);
  }, [formik]);

  function CreateNewCnbProfile() {
    let supplement = true;
    supplementaryList.map((item) => {
      if (supplementaryList.length === 0) {
        return false;
      }
      if (
        item.data.compensationComponentId &&
        item.data.period &&
        item.data.rateOrAmount &&
        item.data.taxStatus !== ""
      ) {
        supplement = true;
      } else {
        supplement = false;
      }
    });
    if (
      BaseCompensation.name &&
      BaseCompensation.compensationComponentId &&
      BaseCompensation.period &&
      BaseCompensation.rateOrAmount &&
      BaseCompensation.taxStatus !== "" &&
      supplement
    ) {
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
            compensationComponentId: parseInt(
              item.data.compensationComponentId
            ),
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
    } else {
      alert("mohon isi seluruh field");
    }
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
            onClick={() => formik.submitForm()}
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
                required
                placeholder="Sales"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                value={formik.values.name}
                onChange={(e) =>
                  formik.setFieldValue(
                    "name",
                    e.target.value.replace(/[^a-zA-Z\s]+/, "") as string
                  )
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
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.compensationComponentId &&
                      Boolean(formik.errors.compensationComponentId)
                    }
                  >
                    <Select
                      fullWidth
                      value={formik.values.compensationComponentId}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "compensationComponentId",
                          e.target.value
                        )
                      }
                    >
                      {compensationComponentOption?.map((Option, i) => (
                        <MenuItem key={i} value={Option.id}>
                          {Option.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formik.touched.compensationComponentId &&
                        formik.errors.compensationComponentId}
                    </FormHelperText>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography style={{ fontSize: "14px" }}>
                  Tax Status<span style={{ color: "red" }}>*</span>
                </Typography>
                <FormControl
                  error={
                    formik.touched.taxStatus && Boolean(formik.errors.taxStatus)
                  }
                >
                  <RadioGroup
                    row
                    style={{ height: "54px" }}
                    value={formik.values.taxStatus}
                    onChange={(e) =>
                      formik.setFieldValue("taxStatus", e.target.value)
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
                  <FormHelperText>
                    {formik.touched.taxStatus && formik.errors.taxStatus}
                  </FormHelperText>
                </FormControl>
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
                    error={
                      formik.touched.rateOrAmount &&
                      Boolean(formik.errors.rateOrAmount)
                    }
                    helperText={
                      formik.touched.rateOrAmount && formik.errors.rateOrAmount
                    }
                    value={formik.values.rateOrAmount}
                    onChange={(e) =>
                      formik.setFieldValue("rateOrAmount", e.target.value)
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
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.period && Boolean(formik.errors.period)
                    }
                  >
                    <Select
                      fullWidth
                      value={formik.values.period}
                      onChange={(e) =>
                        formik.setFieldValue("period", e.target.value)
                      }
                    >
                      <MenuItem value="Per Week">per Week</MenuItem>
                      <MenuItem value="Per Month">per Month</MenuItem>
                      <MenuItem value="Per Year">per Year</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.touched.period && formik.errors.period}
                    </FormHelperText>
                  </FormControl>
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
                            <FormControl
                              fullWidth
                              // error={
                              //   formik.errors.supplementary[0]?.data
                              //     ?.compensationComponentId
                              // }
                            >
                              <Select
                                fullWidth
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `supplementary.${i}.compensationComponentId`,
                                    e.target.value
                                  )
                                }
                              >
                                {compensationComponentOption?.map(
                                  (Option, i) => (
                                    <MenuItem key={i} value={Option.id}>
                                      {Option.name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                              {/* <FormHelperText>
                                {formik.errors.supplementary[i]?.data
                                  ?.compensationComponentId &&
                                  formik.errors.supplementary[i]?.data
                                    ?.compensationComponentId}
                              </FormHelperText> */}
                            </FormControl>
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
                            <FormControl>
                              <RadioGroup
                                row
                                value={
                                  formik.values.supplementary[i]?.data
                                    ?.taxStatus
                                }
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `supplementary.${i}.taxStatus`,
                                    e.target.value
                                  )
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
                            </FormControl>
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
                        {formik.values.supplementary[i]?.data
                          ?.compensationComponentId === "1"
                          ? "Rate"
                          : "Amount"}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={3} md={3} lg={3} xl={3}>
                          <TextField
                            fullWidth
                            type="number"
                            value={
                              formik.values.supplementary[i]?.data?.rateOrAmount
                            }
                            onChange={(e) =>
                              formik.setFieldValue(
                                `supplementary.${i}.rateOrAmount`,
                                e.target.value
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
                          <FormControl fullWidth>
                            <Select
                              fullWidth
                              value={
                                formik.values.supplementary[i]?.data?.period
                              }
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `supplementary.${i}.period`,
                                  e.target.value
                                )
                              }
                            >
                              <MenuItem value="Per Week">per Week</MenuItem>
                              <MenuItem value="Per Month">per Month</MenuItem>
                              <MenuItem value="Per Year">per Year</MenuItem>
                            </Select>
                          </FormControl>
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
