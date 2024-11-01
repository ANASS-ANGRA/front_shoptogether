import { useEffect, useState } from "react";
import {
  Card,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import IndexDashboard from "../components/dashboard/IndexDashbord";
import axios from "axios";
import { urlApi } from "../services/env";

export const styleInput = {
  backgroundColor: "#F8F8F8",
  borderColor: "gray",
};

export default function NewFastArticlePage() {
  return <IndexDashboard Children={<NewFastArticle />} />;
}

function NewFastArticle() {
  const [Produits, setProduits] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    Article: "",
  });
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`${urlApi}/category/getAllcategory`).then((response) => {
      setCategory(response.data);
    });
  }, []);

  const addArticle = () => {
    setProduits([...Produits, { produit: "", category: "", quantity: "" }]);
  };

  const deleteArticle = (index) => {
    setProduits(Produits.filter((_, i) => i !== index));
  };

  const handleArticleChange = (index, field, value) => {
    const updatedProduits = Produits.map((article, i) =>
      i === index ? { ...article, [field]: value } : article
    );
    setProduits(updatedProduits);
  };

  const handleSubmit = () => {
    const allData = {
      clientInformation: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        Article: formData.Article,
      },
      Produits,
    };
    axios.post(`${urlApi}/article/newFastArticle`, allData).then(() => {
      console.log("Sending all information: ", allData);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Card sx={{ padding: "2%" }}>
        <Box>
          <Grid container spacing={4} padding="5px">
            <Grid item xs={12}>
              <Typography variant="h4">
                <b>CLIENT INFORMATION</b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography required>Full Name</Typography>
              <TextField
                type="text"
                fullWidth
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                InputProps={{ style: styleInput }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography required>Phone Number</Typography>
              <TextField
                type="number"
                fullWidth
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                InputProps={{ style: styleInput }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography required>Email</Typography>
              <TextField
                type="email"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ style: styleInput }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography required>Article name</Typography>
              <TextField
                type="Article"
                fullWidth
                required
                name="Article"
                value={formData.Article}
                onChange={handleChange}
                InputProps={{ style: styleInput }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">
                <b>ARTICLE INFORMATION</b>
              </Typography>
            </Grid>

            {/* عرض المقالات المضافة */}
            {Produits.map((article, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography>produits name</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      value={article.produit}
                      onChange={(e) =>
                        handleArticleChange(index, "produit", e.target.value)
                      }
                      InputProps={{ style: styleInput }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>Category</Typography>
                    <Select
                      fullWidth
                      value={article.category}
                      onChange={(e) =>
                        handleArticleChange(index, "category", e.target.value)
                      }
                      sx={styleInput}
                      //InputProps={{ style: styleInput }}
                    >
                      {Category.map((c) => (
                        <MenuItem value={c.id}> {c.nomCatecory}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography required>Quantity</Typography>
                    <TextField
                      type="number"
                      fullWidth
                      required
                      value={article.quantity}
                      onChange={(e) =>
                        handleArticleChange(index, "quantity", e.target.value)
                      }
                      InputProps={{ style: styleInput }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteArticle(index)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button variant="contained" onClick={addArticle}>
                Add Article
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit All Information
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
