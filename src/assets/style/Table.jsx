import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { TableRow } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F9F9F9",
    color: theme.palette.common.black,
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F8FBFD",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  [`& .${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
  },
}));
