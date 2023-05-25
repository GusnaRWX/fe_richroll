import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Typography,
} from "@mui/material";
import Table from "@/components/_shared/form/Table";
import { IconButton } from "@/components/_shared/form";
import styled from "@emotion/styled";
import { visuallyHidden } from "@mui/utils";

// Import Icon React Icon
import { HiPencilAlt } from "react-icons/hi";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

const headerItems = [
  { id: "id", label: "Request ID" },
  { id: "name", label: "Employee Name" },
  { id: "position", label: "Position" },
  { id: "departement", label: "Departement" },
  { id: "starting", label: "Starting Balance" },
  { id: "leave", label: "Leave Used" },
  { id: "remaining", label: "Remaining Balance" },
  { id: "action", label: "" },
];

interface LeaveBalanceTableProps {
  tabValue: number;
}

type Order = "asc" | "desc";

function LeaveBalanceTable({ tabValue }: LeaveBalanceTableProps) {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>("desc");
  const [sort, setSort] = useState("");
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        id: 1,
        employeeName: "Agus Knalpot",
        position: "Leader",
        departement: "PT. Mencari Jodoh",
        starting_balance: "3 Month",
        leave_used: "3 Month",
        remaining_balance: "3 Month",
      },
      {
        id: 2,
        employeeName: "Agus Knalpot",
        position: "Leader",
        departement: "PT. Mencari Jodoh",
        starting_balance: "3 Month",
        leave_used: "3 Month",
        remaining_balance: "3 Month",
      },
      {
        id: 3,
        employeeName: "Agus Knalpot",
        position: "Leader",
        departement: "PT. Mencari Jodoh",
        starting_balance: "3 Month",
        leave_used: "3 Month",
        remaining_balance: "3 Month",
      },
      {
        id: 4,
        employeeName: "Agus Knalpot",
        position: "Leader",
        departement: "PT. Mencari Jodoh",
        starting_balance: "3 Month",
        leave_used: "3 Month",
        remaining_balance: "3 Month",
      },
      {
        id: 5,
        employeeName: "Agus Knalpot",
        position: "Leader",
        departement: "PT. Mencari Jodoh",
        starting_balance: "3 Month",
        leave_used: "3 Month",
        remaining_balance: "3 Month",
      },
    ],
    itemTotals: 5,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    headId: string
  ) => {
    const isAsc = sort === headId && direction === "asc";
    setDirection(isAsc ? "desc" : "asc");
    setSort(headId);
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  function OpenProfileDetail() {
    router.push("/attendance-leave/balance/profile-detail");
  }

  return (
    <>
      <Table
        count={data?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {headerItems.map((item) => (
              <TableCell
                key={item.id}
                sortDirection={sort === item.id ? direction : false}
              >
                <TableSortLabel
                  active={sort === item.id}
                  direction={sort === item.id ? direction : "asc"}
                  onClick={(e) => handleRequestSort(e, item.id)}
                >
                  {item.label}
                  {sort === item.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {direction === "asc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        }
        bodyChildren={
          <>
            {typeof data?.items !== "undefined" ? (
              data?.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    <Typography>Data not found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <NameWrapper>
                        {/* <Avatar
                          src={
                            item?.user?.userInformation !== null
                              ? item?.user?.userInformation.picture
                              : item.user.name
                          }
                          alt={
                            item?.user?.userInformation !== null
                              ? item?.user?.userInformation.picture
                              : item.user.name
                          }
                          sx={{
                            width: 24,
                            height: 24,
                          }}
                        /> */}
                        &nbsp;{item.employeeName}
                      </NameWrapper>
                    </TableCell>
                    <TableCell>{item.position}</TableCell>
                    <TableCell>{item.departement}</TableCell>
                    <TableCell>{item.starting_balance}</TableCell>
                    <TableCell>
                      {/* {dayjs(item.user.createdAt).format("YYYY-MM-DD H:m:s")} */}
                      {item.leave_used}
                    </TableCell>
                    <TableCell>{item.remaining_balance}</TableCell>
                    <TableCell>
                      <ButtonWrapper>
                        <IconButton
                          parentColor="primary.50"
                          icons={<HiPencilAlt fontSize={20} color="#223567" />}
                          onClick={OpenProfileDetail}
                        />
                      </ButtonWrapper>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  <Typography>Data not found</Typography>
                </TableCell>
              </TableRow>
            )}
          </>
        }
      />
    </>
  );
}

export default LeaveBalanceTable;
