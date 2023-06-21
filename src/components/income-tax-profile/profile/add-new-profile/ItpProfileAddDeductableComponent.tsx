import { Button, CheckBox } from "@/components/_shared/form";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CustomModal } from "@/components/_shared/common";
import { useState } from "react";
import { HiSelector } from "react-icons/hi";
import DeleteIcon from "@mui/icons-material/Delete";
import { HiPencilAlt } from "react-icons/hi";

const AddButton = styled(Button)({
  color: "white",
  maxWidth: "245px",
  padding: "8px 10px",
  ".MuiTypography-root": {
    fontSize: "14px",
  },
});

type TempInitialDeductableValues = {
  title: string;
  subTitle: string;
  additionalPayload?: string;
};

const ItpProfileAddDeductableComponent = () => {
  const [initialDeductableValues, setInitialDeductableValues] = useState<
    TempInitialDeductableValues[]
  >([]);

  const [isAddNewDeductableComponent, setIsAddNewDeductableComponent] =
    useState(false);

  function handleClose() {
    setIsAddNewDeductableComponent(false);
  }

  function handleSubmit() {
    console.log("submit");
  }

  return (
    <Box component="div">
      <Box component="div">
        <Paper elevation={1} sx={{ padding: "16px" }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              sx={{ fontWeight: 700, color: "#223567", fontSize: "18px" }}
            >
              Material Status
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
              />
            </Box>
          </Box>

          <Grid container sx={{ marginTop: "20px" }} rowSpacing={1}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Factor Unit Condition
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Amount
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Single
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 54.000.000
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Married
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 58.500.000
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Married with Spouse Earening (Claim)
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 112.500.000
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Married with Spouse Earening (Claimed)
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 0
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box component="div" sx={{ marginTop: "16px" }}>
        <Paper elevation={1} sx={{ padding: "16px" }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              sx={{ fontWeight: 700, color: "#223567", fontSize: "18px" }}
            >
              Number of Dependance
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
              />
            </Box>
          </Box>

          <Grid container sx={{ marginTop: "20px" }} rowSpacing={1}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Factor Unit Condition
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Amount
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                1
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 4.500.000
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                2
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 9.000.000
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                3
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 13.500.000
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box component="div" sx={{ marginTop: "16px" }}>
        <Paper elevation={1} sx={{ padding: "16px" }}>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              sx={{ fontWeight: 700, color: "#223567", fontSize: "18px" }}
            >
              Number of Dependance
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
              />
            </Box>
          </Box>

          <Grid container sx={{ marginTop: "20px" }} rowSpacing={1}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Factor Unit Condition
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#374151", fontWeight: 400, fontSize: "14px" }}
              >
                Amount
              </Typography>
            </Grid>

            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                1
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                sx={{ color: "#4B5563", fontWeight: 700, fontSize: "14px" }}
              >
                Rp. 4.500.000
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box component="div" sx={{ marginTop: "16px" }}>
        <Paper elevation={1} sx={{ padding: "16px" }}>
          <AddButton
            startIcon={<AddIcon />}
            label="Deductible"
            sx={{
              width: "136px",
              fontSize: "14px",
              backgroundColor: "#8DD0B8",
            }}
            onClick={() => setIsAddNewDeductableComponent(true)}
          />
        </Paper>
        <Box
          component="div"
          sx={{
            marginTop: "16px",
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            gap: "16px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              padding: "9px",
              width: "65px",
            }}
            label="Back"
          />
          <Button
            sx={{ padding: "9px", width: "65px" }}
            label="Next"
            variant="contained"
          />
        </Box>
      </Box>

      <CustomModal
        open={isAddNewDeductableComponent}
        handleClose={handleClose}
        handleConfirm={handleSubmit}
        title="Select Tax Deductable Components"
        width="678px"
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Employee Name" customLabel="" />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              xl={4}
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ fontWeight: 500, color: "#1F2937" }}>
                Component Name
              </Typography>
              <HiSelector />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              lg={4}
              xl={4}
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ fontWeight: 500, color: "#1F2937" }}>
                Component Condition
              </Typography>
              <HiSelector />
            </Grid>
            <Grid item xs={3} md={3} lg={3} xl={3}>
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
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Marital Deductable" customLabel="" />
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography
                sx={{ fontWeight: 500, color: "#4B5563", fontSize: "14px" }}
              >
                Marital Deductable
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography sx={{ fontWeight: 400, color: "#4B5563" }}>
                Marital Status
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Employee Dependants 2023" customLabel="" />
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography
                sx={{ fontWeight: 500, color: "#4B5563", fontSize: "14px" }}
              >
                Employee Dependants 2023
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography sx={{ fontWeight: 400, color: "#4B5563" }}>
                Number Of Dependants
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Occupational Allowances" customLabel="" />
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography
                sx={{ fontWeight: 500, color: "#4B5563", fontSize: "14px" }}
              >
                Occupational Allowances
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography sx={{ fontWeight: 400, color: "#4B5563" }}>
                Manual
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Other Component 01" customLabel="" />
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography
                sx={{ fontWeight: 500, color: "#4B5563", fontSize: "14px" }}
              >
                Other Component 01
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography sx={{ fontWeight: 400, color: "#4B5563" }}>
                Manual
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} md={1} lg={1} xl={1}>
              <CheckBox name="Other Component 02" customLabel="" />
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography
                sx={{ fontWeight: 500, color: "#4B5563", fontSize: "14px" }}
              >
                Other Component 02
              </Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} xl={4}>
              <Typography sx={{ fontWeight: 400, color: "#4B5563" }}>
                Manual
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default ItpProfileAddDeductableComponent;
