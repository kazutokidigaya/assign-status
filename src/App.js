import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function App() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [gender, setGender] = useState([]);

  useEffect(() => {
    const fetchAllpeople = async () => {
      const res = await axios.get("https://gorest.co.in/public/v2/users");
      setGender(res.data);
    };
    fetchAllpeople();
  }, []);

  return (
    <div className="body">
      <div className="number">
        <h1>Total No. of user Found</h1>
        <h3>Male : 5</h3>
        <h3>Female : 5</h3>
      </div>
      <div className="table-main">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Gender</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            {gender && gender.length > 0 ? (
              gender.map((res) => {
                return (
                  <TableBody>
                    <StyledTableRow key={res.id}>
                      <StyledTableCell component="th" scope="row">
                        {res.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {res.gender}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {res.status}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                );
              })
            ) : (
              <h2>no user found</h2>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
