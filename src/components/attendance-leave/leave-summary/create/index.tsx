import React, { useState } from "react";
import {
  Button,
  Form,
  IconButton,
  Input,
  Textarea,
  FileUploadModal,
} from "@/components/_shared/form";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  FormHelperText,
  FormControl,
  Paper,
  Grid,
} from "@mui/material";
import BasicDatePicker from "@/components/_shared/form/DatePicker";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";

export default function CreateLeaveApplicationComponent() {
  const router = useRouter();

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

  const NextBtnWrapper = styled(Box)({
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

  const BrowseButton = styled("button")({
    width: "88px",
    border: "1px solid #cbcbcb",
    backgroundColor: "#F4F5F7",
  });

  const DummyEmployeeName = [
    { employeeId: 1, name: "Mr. A" },
    { employeeId: 2, name: "Mr. B" },
    { employeeId: 3, name: "Mr. C" },
  ];

  const DummyTypeChoicement = [
    { value: 1, label: "Annual/paid Leave" },
    { value: 2, label: "Child Care Leavee" },
    { value: 3, label: "No Pay Leave" },
    { value: 4, label: "Maternity Leave" },
    { value: 5, label: "Paternity Leave" },
    { value: 6, label: "Shared Parental Leave" },
    { value: 7, label: "Sick leave" },
  ];

  const DummyLeaveDurationChoicement = [
    { value: 1, label: "AM" },
    { value: 2, label: "PM" },
    { value: 3, label: "Full Day" },
    { value: 4, label: "Multiple Day" },
  ];

  const Star = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchecma = Yup.object().shape({
    name: Yup.string().required("This is required"),
    type: Yup.string().required("This is required"),
    remaining_leave_balance: Yup.string().required("This is required"),
    leave_duration: Yup.string().required("This is required"),
    start_date: Yup.string().required("This is required"),
    end_date: Yup.string().required("This is required"),
    note: Yup.string().required("This is required"),
    file: Yup.string().required("This is required"),
  });

  const initialValues: {
    name: string;
    type: string;
    remaining_leave_balance: string;
    leave_duration: string;
    start_date: string;
    end_date: string;
    note: string;
    file: string;
  } = {
    name: "",
    type: "",
    remaining_leave_balance: "",
    leave_duration: "",
    start_date: "",
    end_date: "",
    note: "",
    file: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any) => {
        console.log(values);
      }}
      validationSchema={validationSchecma}
    >
      {(formik) => (
        <FormikForm>
          <Header>
            <HeaderPageTitle>
              <IconButton
                parentColor="primary.500"
                icons={<ArrowBack sx={{ color: "#FFFFFF" }} />}
                onClick={() => {
                  router.push("/attendance-leave/leave-summary");
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
                Leave Application
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
                onClick={() => {
                  router.push("/attendance-leave/leave-summary");
                }}
              />
              <Button
                fullWidth={false}
                size="small"
                label="Save and Approve"
                color="primary"
              />
            </NextBtnWrapper>
          </Header>
          <Paper style={{ padding: "21px 32px" }}>
            <Box>
              <Grid container spacing={2} rowSpacing={4}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Typography style={{ fontSize: "14px", marginBottom: "6px" }}>
                    Employee Name <Star />
                  </Typography>
                  <FormControl
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                  >
                    <Select
                      fullWidth
                      size="small"
                      value={formik.values.name}
                      onChange={(e) =>
                        formik.setFieldValue("name", e.target.value)
                      }
                    >
                      {DummyEmployeeName.map((type, i) => (
                        <MenuItem key={i} value={type.employeeId}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {formik.touched.name && formik.errors.name}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography
                        style={{ fontSize: "14px", marginBottom: "6px" }}
                      >
                        Type <Star />
                      </Typography>
                      <Select fullWidth size="small">
                        {DummyTypeChoicement.map((type, i) => (
                          <MenuItem key={i} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography
                        style={{ fontSize: "14px", marginBottom: "6px" }}
                      >
                        Remaining Leave Balance
                      </Typography>
                      <Input size="small" />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Date Information */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Grid container spacing={2} style={{ marginTop: "27px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography
                        style={{
                          marginBottom: "1px",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#223567",
                        }}
                      >
                        Date Information
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Typography
                        style={{ fontSize: "14px", marginBottom: "6px" }}
                      >
                        Leave Duration
                      </Typography>
                      <RadioGroup row>
                        {DummyLeaveDurationChoicement.map((radio, i) => (
                          <FormControlLabel
                            key={i}
                            value={radio.value}
                            control={
                              <Radio
                                size="small"
                                checkedIcon={<BpCheckedIcon />}
                              />
                            }
                            label={radio.label}
                          />
                        ))}
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Grid container>
                        <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                          <BasicDatePicker
                            customLabel="Start Date"
                            withAsterisk
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          xl={1}
                          style={{ textAlign: "center", marginTop: "37px" }}
                        >
                          -
                        </Grid>
                        <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                          <BasicDatePicker
                            customLabel="End Date"
                            withAsterisk
                          />{" "}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Typography style={{ fontSize: "14px", marginBottom: "6px" }}>
                    Note
                  </Typography>
                  <Textarea minRows={6} style={{ resize: "vertical" }} />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  Browse For Upload File (On Progress)
                  <div style={{ display: "flex" }} onClick={handleOpen}>
                    <Input
                      inputProps={{ readOnly: true }}
                      size="small"
                      placeholder="Choose File"
                    ></Input>
                    <BrowseButton>
                      <Typography style={{ fontSize: "14px" }}>
                        Browse
                      </Typography>
                    </BrowseButton>
                  </div>
                </Grid>
              </Grid>
              <FileUploadModal
                open={open}
                handleClose={handleClose}
                // onChange={(e) => formik.setFieldValue('picture', convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose), false)}
              />
            </Box>
          </Paper>
        </FormikForm>
      )}
    </Formik>
  );
}
