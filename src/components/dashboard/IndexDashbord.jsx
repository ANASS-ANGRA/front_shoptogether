import { Box } from "@mui/material";
import ResponsiveAppBar from "./NavBar";
import MenuDashbord from "./MenuDashbord";
import { MenuProvider } from "../../services/MenuService";
function Indexdasboard({ Children }) {
  return (
    <MenuProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}>
        <ResponsiveAppBar />
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "2%",
              paddingRight: "2%",
            }}
          >
            <Box
              sx={{
                marginTop: "150px",
                marginRight: "2%",
                position: "rala", // Changed from "sticky" to "fixed"
                top: "300px",
                zIndex: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <MenuDashbord />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "80%" },
                marginTop: { xs: "100px", md: "150px" },
              }}
            >
              {Children}
            </Box>
          </Box>
        </Box>
      </div>
    </MenuProvider>
  );
}

export default Indexdasboard;
