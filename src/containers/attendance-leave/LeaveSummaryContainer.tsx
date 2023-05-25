import React from "react";
import Layout from "@/components/_shared/_core/layout/Index";
import AttendanceAndLeaveComponent from "@/components/attendance-leave/leave-summary";

const LeaveSummaryContainer = () => {
  return (
    <Layout>
      <AttendanceAndLeaveComponent />
    </Layout>
  );
};

export default LeaveSummaryContainer;
