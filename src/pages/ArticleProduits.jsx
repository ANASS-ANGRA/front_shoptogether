import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  TablePagination,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../assets/style/Table";
import Indexdasboard from "../components/dashboard/IndexDashbord";
import { useParams } from "react-router-dom";

const PageArticleProduits = () => {
  return <Indexdasboard Children={<ArticleProduits />} />;
};

const ArticleProduits = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const { id } = useParams();

  const fetchData = async (page, rowsPerPage) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/findProduitsArticle/${id}?page=${
          page + 1
        }&per_page=${rowsPerPage}`
      );
      setArticles(response.data.data);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ padding: "2%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>nom produit</StyledTableCell>
              <StyledTableCell>quantite</StyledTableCell>
              <StyledTableCell>category</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <StyledTableRow key={article.id}>
                <StyledTableCell>{article.nomProduit}</StyledTableCell>
                <StyledTableCell>{article.quantite}</StyledTableCell>
                <StyledTableCell>
                  {article.category.nomCatecory}
                </StyledTableCell>
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

export default PageArticleProduits;
