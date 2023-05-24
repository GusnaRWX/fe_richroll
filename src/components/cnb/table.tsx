/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material/";
import ConfirmationModal from "../_shared/common/ConfirmationModal";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { styled } from "@mui/material/styles";
import { TextFieldProps } from "@mui/material/";
import { IconButton } from "../_shared/form";
import { useAppDispatch } from "@/hooks/index";
import { deleteCompensationRequested } from "@/store/reducers/slice/cnb/compensationSlice";
import dayjs from "dayjs";
import DetailModal from "./modal";
import DetailCnb from "./detail";

interface Data {
  name: string;
  baseCompensation: string | string[];
  supplementaryCompensation: string | string[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  _a: { [key in Key]: number | string },
  _b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Profile Name",
  },
  {
    id: "baseCompensation",
    numeric: false,
    disablePadding: false,
    label: "Base Compensation",
  },
  {
    id: "supplementaryCompensation",
    numeric: false,
    disablePadding: false,
    label: "Supplement Compensation",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date Created",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Last Updated",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

const SearchTable = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginTop: "16px",
  marginLeft: "16px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "300px",
  },
}));

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(rows: any) {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("createdAt");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const deleteCnb = (Id: string | number) => {
    dispatch({
      type: deleteCompensationRequested.toString(),
      Id: Id,
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - rows?.rows?.items.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows?.rows?.items, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const [DeleteConfirmation, setDeleteConfirmation] = React.useState({
    open: false,
    id: 0,
  });
  const handleOpen = (id: number) => {
    setDeleteConfirmation({ open: true, id: id });
  };
  const handleClose = () => {
    setDeleteConfirmation({ open: false, id: 0 });
  };

  const [detailOpen, setDetailOpen] = React.useState({ id: 0, open: false });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchTable
          id="search-table"
          placeholder="Search"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows?.rows?.items.length !== 0 &&
                visibleRows?.map((row: any, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.baseCompensation[0]}</TableCell>
                      <TableCell>
                        {row.supplementaryCompensation.map(
                          (item: string, i: number) => (
                            <div key={i}>{item}</div>
                          )
                        )}
                      </TableCell>
                      <TableCell>
                        {dayjs(row.createdAt).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(row.updatedAt).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell style={{ display: "flex", gap: "8px" }}>
                        <IconButton
                          parentColor="primary.50"
                          icons={<VisibilityIcon sx={{ color: "#223567" }} />}
                          onClick={() =>
                            setDetailOpen({ id: row.id, open: true })
                          }
                        />
                        <IconButton
                          parentColor="primary.50"
                          icons={<BorderColorIcon sx={{ color: "#223567" }} />}
                        />
                        <IconButton
                          parentColor="red.100"
                          icons={<DeleteIcon sx={{ color: "#EF4444" }} />}
                          onClick={() => handleOpen(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* Delete */}
              <ConfirmationModal
                open={DeleteConfirmation.open}
                handleClose={handleClose}
                title="Are you sure you want to delete this record?"
                content="Any unsaved changes will be discarded. This cannot be undone"
                withCallback
                noChange={true}
                callback={() => deleteCnb(DeleteConfirmation.id)}
              />

              {/* Detail */}
              <DetailModal
                open={detailOpen.open}
                handleClose={() => setDetailOpen({ id: 0, open: false })}
                title="CnB Profile Detail"
                content={
                  <DetailCnb id={detailOpen.id} open={detailOpen.open} />
                }
              />
              {rows?.rows?.items.length === undefined && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Data
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {rows?.rows?.items.length !== undefined && (
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows?.rows?.items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Record per pages"
            sx={{
              ".MuiTablePagination-toolbar": {
                paddingRight: "24px",
              },
              ".MuiTablePagination-spacer": {
                display: "none",
              },
              ".MuiTablePagination-selectLabel": {
                order: 2,
                marginRight: "16px",
              },
              ".mui-style-t2m9id-MuiInputBase-root-MuiTablePagination-select": {
                order: 1,
                marginRight: "8px",
              },
              ".MuiTablePagination-displayedRows": {
                order: 3,
              },
              ".MuiTablePagination-actions": {
                order: 4,
                marginLeft: "auto !important",
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
