import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Input } from "@/components/_shared/form";
import Table from "@/components/_shared/form/Table";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { Formik, FieldArray } from "formik";
import * as Yup from 'yup'

const headerItems = [
  { id: "no", label: "No" },
  { id: "type", label: "Leave Type" },
  { id: "days", label: "Days" },
  { id: "current", label: "" },
];

interface EditModalTableProps {
  tabValue: number;
}

type Order = "asc" | "desc";

function EditModalTable({ tabValue, submitRef }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>("desc");
  const [sort, setSort] = useState("");
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        no: 1,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 2,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 3,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 4,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 5,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 6,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 7,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 8,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 9,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
      {
        no: 10,
        leaveType: "Annual Leave",
        days: 10,
        current: "10 Days",
      },
    ],
    itemTotals: 10,
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

  const IncrementDecrementButton = styled("button")({
    width: "40px",
    height: "40px",
    border: "none",
    backgroundColor: "#8DD0B8",
    color: "#fff",
    fontSize: "16px",
  });

  const validationSchecma = Yup.object().shape({
    days: Yup.array().of(
      Yup.object().shape({
        leaveType: Yup.string().required('This is required'),
        days: Yup.number().required('This is required').positive('Must be positive').integer('Must be number'),
        current: Yup.string().required('This is required'),
      })
    )
  });

  return (
    <>
      <Formik
        initialValues={{
          days: data.items,
        }}
        onSubmit={(value: any) => console.log(value)}
        validationSchema={validationSchecma}
      >
        {(formik) => {
          return (
            <FieldArray
              name="days"
              render={(arrayHelper) => {
                return (
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
                            formik.values.days.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.no}</TableCell>
                                <TableCell>{item.leaveType}</TableCell>
                                <TableCell>
                                  <IncrementDecrementButton
                                    onClick={() =>
                                      formik.setFieldValue(
                                        `days.${index}.days`,
                                        formik.values.days[index].days - 1
                                      )
                                    }
                                  >
                                    -
                                  </IncrementDecrementButton>
                                  <Input
                                    size="small"
                                    value={item.days}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        `days.${index}.days`,
                                        e.target.value
                                      )
                                    }
                                    sx={{ width: "60px", textAlign: "center" }}
                                  />
                                  <IncrementDecrementButton
                                    onClick={() =>
                                      formik.setFieldValue(
                                        `days.${index}.days`,
                                        formik.values.days[index].days + 1
                                      )
                                    }
                                  >
                                    +
                                  </IncrementDecrementButton>
                                </TableCell>
                                <TableCell>
                                  <Typography style={{ color: "#16A34A" }}>
                                    Curent : {item.current}
                                  </Typography>
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
                        <button
                          hidden
                          onClick={() => formik.submitForm()}
                          ref={submitRef}
                          type="submit"
                        >
                          submit
                        </button>
                      </>
                    }
                  />
                );
              }}
            />
          );
        }}
      </Formik>
    </>
  );
}

export default EditModalTable;
