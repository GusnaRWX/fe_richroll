import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  Select,
  Textarea,
  IconButton,
  CheckBox,
  Form,
} from "@/components/_shared/form";
import { styled } from "@mui/material/styles";
import {
  Typography,
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
import { Close, Download } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BasicDatePicker from "@/components/_shared/form/DatePicker";
import { ArrowBack } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Form as FormikForm, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { CustomModal } from "@/components/_shared/common";
import DeleteIcon from "@mui/icons-material/Delete";
import { HiPencilAlt } from "react-icons/hi";

export default function CreateNewProfile() {
  const [isAddNewComponent, setIsAddNewComponent] = useState(false);
  const [isModalFormSubmitted, setIsModalFormSubmitted] = useState(false);

  function isCloseAddComponent() {
    setIsAddNewComponent(false);
  }

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

  const AddButton = styled(Button)({
    color: "white",
    maxWidth: "245px",
    padding: "8px 10px",
    ".MuiTypography-root": {
      fontSize: "14px",
    },
  });

  const Dummyoption = [
    { value: "1", label: "Dummy 1" },
    { value: "2", label: "Dummy 2" },
    { value: "3", label: "Dummy 3" },
  ];

  interface PayloadCreateComponentType {
    profileComponentId: string;
    title: string;
    effectivePeriode: string;
    rateType: string;
  }

  interface BaseTypeInitialValues {
    profile: PayloadCreateComponentType[];
  }

  const initialValues: BaseTypeInitialValues = {
    profile: [],
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any) => {
          // setIsModalFormSubmitted(true);
          setIsAddNewComponent(false);
        }}
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
                  // onClick={() => formik.handleSubmit()}
                />
              </NextBtnWrapper>
            </Header>
            <Paper style={{ padding: "21px 32px" }}>
              <Paper style={{ padding: "21px 32px" }}>
                <Grid container spacing={2} rowSpacing={4}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Input
                      placeholder="Input Statutory Benefits Name"
                      customLabel="Component Name"
                      withAsterisk
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder="Select Country"
                      customLabel="Country"
                      withAsterisk
                      size="small"
                      fullWidth
                      options={Dummyoption}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder="Select Country"
                      customLabel="Province"
                      size="small"
                      fullWidth
                      options={Dummyoption}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder="Select Country"
                      customLabel="City"
                      size="small"
                      fullWidth
                      options={Dummyoption}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder="Select Country"
                      customLabel="Sub-District"
                      size="small"
                      fullWidth
                      options={Dummyoption}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <BasicDatePicker
                      customLabel="Effective Date"
                      withAsterisk
                    />
                  </Grid>
                  <Grid item xs={3} md={3} lg={3} xl={3}>
                    <BasicDatePicker customLabel="Expiration Date" />
                  </Grid>
                  <Grid item xs={3} md={3} lg={3} xl={3}></Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Textarea
                      customLabel="Citation"
                      minRows={4}
                      style={{ resize: "vertical" }}
                    />
                    <Typography
                      style={{
                        fontSize: "14px",
                        marginTop: "6px",
                        color: "#6B7280",
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Textarea
                      customLabel="Internal Notes"
                      minRows={4}
                      style={{ resize: "vertical" }}
                    />
                    <Typography
                      style={{
                        fontSize: "14px",
                        marginTop: "6px",
                        color: "#6B7280",
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Textarea
                      customLabel="External Notes"
                      minRows={4}
                      style={{ resize: "vertical" }}
                    />
                    <Typography
                      style={{
                        fontSize: "14px",
                        marginTop: "6px",
                        color: "#6B7280",
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <FieldArray
                name="profile"
                render={(arrayHelper) => {
                  const handleCheckBoxChange = (e: any) => {
                    if (e.target.checked) {
                      arrayHelper.insert(formik.values.profile.length + 1, {
                        title: e.target.name,
                      });
                    } else {
                      arrayHelper.pop();
                    }
                  };
                  return (
                    <div>
                      {formik.values.profile.length > 0 && (
                        <FormikForm>
                          {formik.values.profile.map((profileData, i) => {
                            return (
                              <Paper
                                style={{
                                  padding: "21px 32px",
                                  marginTop: "16px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "#223567",
                                      fontWeight: 700,
                                      fontSize: "18px",
                                    }}
                                  >
                                    {profileData.title}
                                  </Typography>

                                  <Box sx={{ display: "flex", gap: "4px" }}>
                                    <Button
                                      size="medium"
                                      color="green"
                                      startIcon={<HiPencilAlt color="white" />}
                                      label="Edit"
                                      sx={{
                                        backgroundColor: "#8DD0B8",
                                        color: " white",
                                      }}
                                    />
                                    <Button
                                      color="red"
                                      size="medium"
                                      startIcon={<DeleteIcon />}
                                      label="Delete"
                                      sx={{
                                        backgroundColor: "#FEE2E2",
                                        color: "#B91C1C",
                                      }}
                                      onClick={() => arrayHelper.remove(i)}
                                    />
                                  </Box>
                                </Box>

                                <Grid container sx={{ marginTop: "12px" }}>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#374151",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                      }}
                                    >
                                      Contributor
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#374151",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                      }}
                                    >
                                      Rate Types
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#374151",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                      }}
                                    >
                                      Flat Rate
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <Typography
                                      sx={{
                                        color: "#374151",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                      }}
                                    >
                                      Amount Cap
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <Typography
                                      sx={{
                                        color: "#374151",
                                        fontWeight: 400,
                                        fontSize: "14px",
                                      }}
                                    >
                                      Effective Periode
                                    </Typography>
                                  </Grid>
                                </Grid>

                                <Grid container sx={{ marginTop: "12px" }}>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#4B5563",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Employee
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#4B5563",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Flat Rate
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2} md={2} lg={2} xl={2}>
                                    <Typography
                                      sx={{
                                        color: "#4B5563",
                                        fontWeight: 700,
                                      }}
                                    >
                                      10,0%
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <Typography
                                      sx={{
                                        color: "#4B5563",
                                        fontWeight: 700,
                                      }}
                                    >
                                      Rp. 3.000.000,00
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <Typography
                                      sx={{
                                        color: "#4B5563",
                                        fontWeight: 700,
                                      }}
                                    >
                                      -
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          })}
                        </FormikForm>
                      )}
                      <Box style={{ padding: "21px 32px" }}>
                        <AddButton
                          onClick={() => setIsAddNewComponent(true)}
                          color="secondary"
                          startIcon={<AddIcon />}
                          label="Add Component"
                          sx={{ fontSize: "18px" }}
                        />
                      </Box>

                      <CustomModal
                        open={isAddNewComponent}
                        title="Select Satutory Benefits Components"
                        width="698px"
                        handleClose={isCloseAddComponent}
                        handleConfirm={() => formik.handleSubmit()}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox name="Employee Name" customLabel="" />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 500, color: "#1F2937" }}
                              >
                                Employee Name
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 500, color: "#1F2937" }}
                              >
                                Effective Periode
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} xl={2}>
                              <Typography
                                sx={{ fontWeight: 500, color: "#1F2937" }}
                              >
                                Rate Type
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} xl={2}>
                              <AddButton
                                variant="contained"
                                startIcon={<AddIcon />}
                                label="Component"
                                sx={{ width: "136px", fontSize: "14px" }}
                              />
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name="Health Insurance"
                                customLabel=""
                                onChange={(e) => {
                                  handleCheckBoxChange(e);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Health Insurance
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                09/05/2023
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Fixed Rate
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name="Pension"
                                customLabel=""
                                onChange={(e) => {
                                  handleCheckBoxChange(e);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Pension
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                09/05/2023
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Fixed Rate
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name="Death"
                                customLabel=""
                                onChange={(e) => {
                                  handleCheckBoxChange(e);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Death
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                09/05/2023
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Fixed Rate
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name="Old Age"
                                customLabel=""
                                onChange={(e) => {
                                  handleCheckBoxChange(e);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Old Age
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                -
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Fixed Amount
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name="Work Accident"
                                customLabel=""
                                onChange={(e) => {
                                  handleCheckBoxChange(e);
                                }}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Work Accident
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                -
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 400, color: "#4B5563" }}
                              >
                                Matching
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CustomModal>
                    </div>
                  );
                }}
              />
            </Paper>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
