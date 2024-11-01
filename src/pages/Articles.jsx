import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Card,
  TablePagination,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../assets/style/Table";

import Indexdasboard from "../components/dashboard/IndexDashbord";
import { Link } from "react-router-dom";

const PageArticles = () => {
  return <Indexdasboard Children={<Articles />} />;
};
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0); // Page starts at 0 for TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalItems, setTotalItems] = useState(0); // Total item count from API

  const fetchData = async (page, rowsPerPage) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/article/getArticlePaginate?page=${
          page + 1
        }&per_page=${rowsPerPage}`
      );
      setArticles(response.data.data);
      setTotalItems(response.data.total); // Set total items from API response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage); // Fetch data whenever page or rows per page changes
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state on page change
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset page to 0 when rows per page changes
  };

  return (
    <Card sx={{ padding: "2%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ textDecoration: "line-through" }}>
                ID
              </StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell>Client Email</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <StyledTableRow key={article.id}>
                <StyledTableCell >
                  <Link to={`/article/${article.id}`}># {article.id}</Link>
                </StyledTableCell>
                <StyledTableCell>{article.name}</StyledTableCell>
                <StyledTableCell>{article.client.fullName}</StyledTableCell>
                <StyledTableCell>{article.client.Email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalItems}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Card>
  );
};

export default PageArticles;
