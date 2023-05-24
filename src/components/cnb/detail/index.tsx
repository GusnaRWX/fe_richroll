import React from "react";
import { Box, Grid, styled, Typography, Button, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelectors } from "@/hooks/index";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getDetailRequested } from "@/store/reducers/slice/cnb/compensationSlice";

const DetailCnb = ({ id, open }) => {
  const dispatch = useAppDispatch();
  const detail = useAppSelectors((state) => state.compensation.detail?.data);
  const detailLoading = useAppSelectors(
    (state) => state.compensation?.detailLoading
  );
  const TitleData = styled(Typography)({
    fontSize: "14px",
    fontWeight: "600",
  });

  const ItemData = styled(Typography)({
    fontSize: "14px",
    color: "#4B5563",
    fontWeight: "400",
  });

  const TaxData = styled(Box)({
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#E5E7EB",
    padding: "3px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "75px",
    borderRadius: "4px",
  });

  React.useEffect(() => {
    if (open) {
      dispatch({
        type: getDetailRequested.toString(),
        Id: id,
      });
    }
  }, [id, open]);

  return (
    <>
      {!detailLoading ? (
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
              <ItemData>{detail?.name}</ItemData>
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
                <TaxData>
                  {detail?.baseCompensation[0]?.taxStatus
                    ? "Taxable"
                    : "NTaxable"}
                </TaxData>
              </Grid>
            </Grid>
            <Grid display="flex" flexDirection="column" gap="6px">
              <TitleData>
                {detail?.baseCompensation[0]?.amount ? "Amount" : "Rate"} per
                Hour
              </TitleData>
              <ItemData>
                Rp&nbsp;
                {detail?.baseCompensation[0]?.amount ||
                  detail?.baseCompensation[0]?.rate}
              </ItemData>
            </Grid>
          </Grid>

          {/* Supplement */}
          {detail?.supplementaryCompensation.map(
            (supplement: any, i: number) => (
              <Grid
                key={i}
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
                    <TitleData>Compensation Component {i + 1}</TitleData>
                    <ItemData>Transportation Allowance</ItemData>
                  </Grid>
                  <Grid xs={6} display="flex" flexDirection="column" gap="6px">
                    <TitleData>Tax Status</TitleData>
                    <TaxData>
                      {supplement?.taxStatus ? "Taxable" : "NTaxable"}
                    </TaxData>
                  </Grid>
                </Grid>
                <Grid display="flex" flexDirection="column" gap="6px">
                  <TitleData>
                    {supplement?.amount ? "Amount" : "Rate"} per Month
                  </TitleData>
                  <ItemData>
                    Rp {supplement?.amount || supplement?.rate}
                  </ItemData>
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      ) : (
        <Skeleton variant="rounded" height={100} />
      )}
    </>
  );
};

export default DetailCnb;
