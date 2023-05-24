import React from "react";
import { Box, Grid, styled, Typography, Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const DetailCnb = () => {
  const TitleData = styled(Typography)({
    fontSize: "14px",
    fontWeight: "600",
  });

  const ItemData = styled(Typography)({
    fontSize: "14px",
    color: "#4B5563",
    fontWeight: "400",
  });

  return (
    <>
      <Grid container direction="column" gap={4} xs={12} md={12}>
        {/* name */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" gap="6px">
            <TitleData>CnB Profile Name</TitleData>
            <ItemData>Sales</ItemData>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<BorderColorIcon sx={{ color: "white" }} />}
          >
            <Typography fontSize={14} color="white">
              Edit
            </Typography>
          </Button>
        </Grid>

        {/* Date */}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid xs={6} display="flex" flexDirection="column" gap="6px">
            <TitleData>Date Created</TitleData>
            <ItemData>01/02/23, 12:00</ItemData>
          </Grid>
          <Grid xs={6} display="flex" flexDirection="column" gap="6px">
            <TitleData>Last Updated</TitleData>
            <ItemData>01/02/22</ItemData>
          </Grid>
        </Grid>

        {/* Base */}
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="16px"
        >
          <Grid item>
            <Typography fontWeight={700} color="#223567">
              Base
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid xs={6} display="flex" flexDirection="column" gap="6px">
              <TitleData>Compensation Component</TitleData>
              <ItemData>Wage</ItemData>
            </Grid>
            <Grid xs={6} display="flex" flexDirection="column" gap="6px">
              <TitleData>Tax Status</TitleData>
              <ItemData>Taxable</ItemData>
            </Grid>
          </Grid>
          <Grid display="flex" flexDirection="column" gap="6px">
            <TitleData>Rate per Hour</TitleData>
            <ItemData>Rp 30.000,00</ItemData>
          </Grid>
        </Grid>

        {/* Supplement */}
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="16px"
        >
          <Grid item>
            <Typography fontWeight={700} color="#223567">
              Supplementary
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid xs={6} display="flex" flexDirection="column" gap="6px">
              <TitleData>Compensation Component 1</TitleData>
              <ItemData>Transportation Allowance</ItemData>
            </Grid>
            <Grid xs={6} display="flex" flexDirection="column" gap="6px">
              <TitleData>Tax Status</TitleData>
              <ItemData>NTaxable</ItemData>
            </Grid>
          </Grid>
          <Grid display="flex" flexDirection="column" gap="6px">
            <TitleData>Amount per Month</TitleData>
            <ItemData>Rp 500.000,00</ItemData>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailCnb;
