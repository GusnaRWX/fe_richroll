import React, { useState } from "react";
import { Typography, Paper, Tabs, Tab, Box } from "@mui/material";
import PendingLeaveSummaryTable from "../TableComponent/PendingTable";
import ApprovedLeaveSummaryTable from "../TableComponent/ApprovedTable";
import styled from "@emotion/styled";
import { Button } from "@/components/_shared/form";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

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

const AttendanceAndLeaveComponent = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  return (
    <>
      <TitleWrapper>
        <Typography variant="h5">Leave Summary</Typography>
        <div>
          <Button
            onClick={() =>
              router.push("/attendance&leave/leave-summary/create")
            }
            startIcon={<AddIcon />}
            label="Create New Leave Application"
          />
        </div>
      </TitleWrapper>
      <Paper style={{ padding: "16px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Pending" {...a11yProps(0)} />
            <Tab label="Approved" {...a11yProps(1)} />
            <Tab label="Upcoming" {...a11yProps(3)} />
            <Tab label="History" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PendingLeaveSummaryTable tabValue={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ApprovedLeaveSummaryTable tabValue={value} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Tab Option 3
        </TabPanel>
        <TabPanel value={value} index={3}>
          Tab Option 4
        </TabPanel>
      </Paper>
    </>
  );
};

export default AttendanceAndLeaveComponent;
