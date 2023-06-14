/* eslint-disable @typescript-eslint/indent */
import React, { useState } from "react";
import { Button, Form, IconButton } from "@/components/_shared/form";
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
  Tabs,
  Tab,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

// Import Create Component
import CreateBasicDetailComponent from "./CreateBasicDetail";
import CreateDesignedTransferAccount from "./CreateDesignedTransferAccount";

export default function CreateNewComponent() {
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

  const [value, setValue] = useState(0);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
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
            Add New Component
          </Typography>
        </HeaderPageTitle>
      </Header>
      <Paper sx={{ width: "100%", p: "21px 32px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Basic Detail" {...a11yProps(0)} />
            <Tab label="Designated Transfer Account" {...a11yProps(1)} />
            <Tab label="Rates" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CreateBasicDetailComponent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateDesignedTransferAccount />
        </TabPanel>
        <TabPanel value={value} index={2}>
          3
        </TabPanel>
      </Paper>
    </>
  );
}
