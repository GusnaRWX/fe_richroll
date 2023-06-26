import { Input, Button } from "@/components/_shared/form";
import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  MenuItem,
  Radio,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { Dispatch, SetStateAction, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

interface CreateDesignedTransferAccountProps {
  setValue: Dispatch<SetStateAction<number>>;
}

export default function CreateDesignedTransferAccount({
  setValue,
}: CreateDesignedTransferAccountProps) {
  const [account, setAccount] = useState("central");

  const AsteriskComponent = styled("span")(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  const boxStyle = {
    display: "flex",
    gap: "15px",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    marginTop: "32px",
  };

  const validationSchema = Yup.object({
    bank: Yup.string().required("This Field is Required"),
    holder: Yup.string().required("This Field is Required"),
    no: Yup.string().required("This Field is Required"),
    bankCode: Yup.string(),
    branchCode: Yup.string(),
    branchName: Yup.string(),
    swiftCode: Yup.string(),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      bank: "",
      holder: "",
      no: "",
      bankCode: "",
      branchCode: "",
      branchName: "",
      swiftCode: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setValue(2);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  React.useEffect(() => {
    if (account !== "central") {
      formik.resetForm();
    }
  }, [account]);

  return (
    <Box component="div" sx={{ marginTop: "17px" }}>
      <Typography
        style={{ color: "#223567", fontWeight: 700, fontSize: "16px" }}
      >
        Bank Information
      </Typography>

      <Typography
        style={{
          color: "#223567",
          fontWeight: 400,
          fontSize: "14px",
          marginTop: "10px",
        }}
      >
        Type
      </Typography>

      <Box
        component="div"
        sx={{ display: " flex", gap: "32px", marginTop: "10px" }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <RadioGroup row value={account} onChange={handleChange}>
            <FormControlLabel
              value="central"
              control={<Radio />}
              label="Central Account"
            />
            <FormControlLabel
              value="individual"
              control={<Radio />}
              label="Individual Account"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company Account Only"
            />
          </RadioGroup>
        </Box>
      </Box>

      <Box
        component="div"
        sx={{
          backgroundColor: "#E9EFFF",
          width: "100%",
          padding: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InfoOutlined sx={{ color: "#223567" }} />
        <Typography
          variant="text-base"
          component="div"
          sx={{
            marginLeft: "6.67px",
            fontWeight: 400,
            fontSize: "12px",
            color: "#223567",
          }}
        >
          The Designated Transfer Account is added manually to each employee’s
          profile
        </Typography>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            component="div"
            sx={{ color: "#374151", fontWeight: 400 }}
          >
            Bank <AsteriskComponent>*</AsteriskComponent>
          </Typography>

          <Select
            fullWidth
            placeholder="Select Bank"
            size="small"
            disabled={account !== "central"}
            sx={
              account !== "central"
                ? {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                  }
                : null
            }
            value={formik.values.bank}
            onChange={(e) => formik.setFieldValue("bank", e.target.value)}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            component="div"
            sx={{ color: "#374151", fontWeight: 400 }}
          >
            Bank Account Holder`s Name &nbsp;
            <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <Input
            size="small"
            placeholder="Input Bank Account Holders Name"
            disabled={account !== "central"}
            sx={
              account !== "central"
                ? {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                  }
                : null
            }
            value={formik.values.holder}
            onChange={(e) => formik.setFieldValue("holder", e.target.value)}
          />
        </Box>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            component="div"
            sx={{ color: "#374151", fontWeight: 400 }}
          >
            Bank Account No <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <Input
            size="small"
            placeholder="Input Bank Account No."
            disabled={account !== "central"}
            sx={
              account !== "central"
                ? {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                  }
                : null
            }
            value={formik.values.no}
            onChange={(e) => formik.setFieldValue("no", e.target.value)}
          />
        </Box>

        <Box
          component="div"
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            gap: "15px",
          }}
        >
          <Box component="div" sx={{ width: "50%" }}>
            <Typography
              component="div"
              sx={{ color: "#374151", fontWeight: 400 }}
            >
              Bank Code
            </Typography>
            <Input
              size="small"
              placeholder="Input Bank Code"
              disabled={account !== "central"}
              sx={
                account !== "central"
                  ? {
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                    }
                  : null
              }
            />
          </Box>

          <Box component="div" sx={{ width: "50%" }}>
            <Typography
              component="div"
              sx={{ color: "#374151", fontWeight: 400 }}
            >
              Branch Code
            </Typography>
            <Input
              size="small"
              placeholder="Input Branch Code"
              disabled={account !== "central"}
              sx={
                account !== "central"
                  ? {
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                    }
                  : null
              }
              value={formik.values.branchCode}
              onChange={(e) =>
                formik.setFieldValue("branchCode", e.target.value)
              }
            />
          </Box>
        </Box>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            component="div"
            sx={{ color: "#374151", fontWeight: 400 }}
          >
            Branch Name
          </Typography>

          <Input
            size="small"
            placeholder="Input Branch Name"
            disabled={account !== "central"}
            sx={
              account !== "central"
                ? {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                  }
                : null
            }
            value={formik.values.branchName}
            onChange={(e) => formik.setFieldValue("branchName", e.target.value)}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            component="div"
            sx={{ color: "#374151", fontWeight: 400 }}
          >
            Swift Code
          </Typography>

          <Input
            size="small"
            placeholder="Input Swift Code"
            disabled={account !== "central"}
            sx={
              account !== "central"
                ? {
                    backgroundColor: "#F3F4F6",
                    color: "#6B7280",
                  }
                : null
            }
            value={formik.values.swiftCode}
            onChange={(e) => formik.setFieldValue("swiftCode", e.target.value)}
          />
        </Box>
      </Box>

      <Box component="div" sx={{ marginTop: "32px" }}>
        <Typography
          component="div"
          sx={{ marginBottom: "7px", color: "#374151", fontWeight: 700 }}
        >
          Notes
        </Typography>
        <Input
          size="small"
          placeholder="Input Notes"
          required
          sx={{
            color: "#6B7280",
            borderColor: "#E5E7EB",
          }}
          value={formik.values.notes}
          onChange={(e) => formik.setFieldValue("notes", e.target.value)}
        />
        <FormHelperText
          sx={{ fontWeight: 500, color: "#6B7280", fontSize: "14px" }}
        >
          Max.100 Character
        </FormHelperText>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              color="primary"
              label="Next"
              sx={{ width: "63px" }}
              onClick={() => formik.submitForm()}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
