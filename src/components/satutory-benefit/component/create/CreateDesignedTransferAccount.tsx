import { Input } from "@/components/_shared/form";
import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

export default function CreateDesignedTransferAccount() {
  const [selectedAccountValue, setSelectedAccountValue] = useState("company");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAccountValue(event.target.value);
  };

  const CustomWrappperParentForm = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    display: "flex",
    flexDirection: "row",
    gap: "15px",
  }));

  const AsteriskComponent = styled("span")(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  return (
    <Box component="div" sx={{ marginTop: "17px" }}>
      <Typography
        style={{ color: "#223567", fontWeight: 700, fontSize: "16px" }}
      >
        Bank Information
      </Typography>
      <Box
        component="div"
        sx={{ display: " flex", gap: "32px", marginTop: "27px" }}
      >
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Radio
            checked={selectedAccountValue === "central"}
            onChange={handleChange}
            value="central"
            name="radio-buttons"
          />
          <Typography
            style={{ color: "#223567", fontWeight: 500, fontSize: "16px" }}
          >
            Central Account
          </Typography>
        </Box>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Radio
            checked={selectedAccountValue === "individual"}
            onChange={handleChange}
            value="individual"
            name="radio-buttons"
          />
          <Typography
            style={{ color: "#223567", fontWeight: 500, fontSize: "16px" }}
          >
            Individual Account
          </Typography>
        </Box>
        <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
          <Radio
            checked={selectedAccountValue === "company"}
            onChange={handleChange}
            value="company"
            name="radio-buttons"
          />
          <Typography
            style={{ color: "#223567", fontWeight: 500, fontSize: "16px" }}
          >
            Company Account Only
          </Typography>
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
          The Designated Transfer Account is added manually to each employee's
          profile
        </Typography>
      </Box>

      <CustomWrappperParentForm
        sx={{
          marginTop: "16px",
        }}
      >
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
            sx={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}
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
            Bank Account Holder`s Name {""}
            <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <Input
            size="small"
            placeholder="Input Bank Account Holders Name"
            required
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#6B7280",
              borderColor: "#E5E7EB",
            }}
          />
        </Box>
      </CustomWrappperParentForm>

      <CustomWrappperParentForm
        sx={{
          marginTop: "32px",
        }}
      >
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
            required
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#6B7280",
              borderColor: "#E5E7EB",
            }}
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
              required
              sx={{
                backgroundColor: "#F3F4F6",
                color: "#6B7280",
                borderColor: "#E5E7EB",
              }}
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
              required
              sx={{
                backgroundColor: "#F3F4F6",
                color: "#6B7280",
                borderColor: "#E5E7EB",
              }}
            />
          </Box>
        </Box>
      </CustomWrappperParentForm>

      <CustomWrappperParentForm
        sx={{
          marginTop: "32px",
        }}
      >
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
            required
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#6B7280",
              borderColor: "#E5E7EB",
            }}
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
            required
            sx={{
              backgroundColor: "#F3F4F6",
              color: "#6B7280",
              borderColor: "#E5E7EB",
            }}
          />
        </Box>
      </CustomWrappperParentForm>

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
        />
        <FormHelperText
          sx={{ fontWeight: 500, color: "#6B7280", fontSize: "14px" }}
        >
          Max.100 Character
        </FormHelperText>
      </Box>
    </Box>
  );
}
