import React from "react";
import LeaveBalanceProfileDetailContainer from "@/containers/attendance-leave/LeaveBalanceProfileDetailContainer";
import MetaHead from "@/components/_shared/_core/layout/MetaHead";

export default function Index() {
  return (
    <>
      <MetaHead title="Kayaroll - Leave Balance Profile" />
      <LeaveBalanceProfileDetailContainer />
    </>
  );
}
