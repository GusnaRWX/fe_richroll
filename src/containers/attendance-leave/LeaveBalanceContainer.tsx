import React from "react";
import Layout from "@/components/_shared/_core/layout/Index";
import LeaveBalanceComponent from "@/components/attendance-leave/balance";

const LeaveBalanceContainer = () => {
  return (
    <Layout>
      <LeaveBalanceComponent />
    </Layout>
  );
};

export default LeaveBalanceContainer;
