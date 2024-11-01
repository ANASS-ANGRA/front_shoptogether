import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material/";
import StoreIcon from "@mui/icons-material/Store";
import { MenuContext } from "../../services/MenuService";
import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SystemSecurityUpdateGoodIcon from "@mui/icons-material/SystemSecurityUpdateGood";
const MenuContainer = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.14), 0 0 1px 0 rgba(0, 0, 0, 0.12)",
  backgroundColor: "#fff",
  display: "flex",
  maxWidth: 263,
  flexDirection: "column",
  fontSize: 8,
  color: "#666",
  fontWeight: 300,
  padding: "24px 16px 64px",
  minHeight: "80vh",
  position: "sticky",
  top: "150px",
  [theme.breakpoints.down("sm")]: {
    fontSize: 6,
    padding: "16px 8px 32px",
  },
}));

const menuItemsByRole = {
  captain: [
    { icon: <HomeIcon />, label: "dashboard", path: "/dashboard-user" },
    {
      icon: <CheckCircleIcon />,
      label: "Bookings List",
      path: "/bookings",
    },
  ],
  commercial: [
    { icon: <HomeIcon />, label: "dashboard", path: "/dashboard-user" },
    {
      icon: <CheckCircleIcon />,
      label: "Bookings List",
      path: "/bookings",
    },
  ],
  admin: [
    { icon: <HomeIcon />, label: "dashboard", path: "/dashboard" },
    { icon: <StoreIcon />, label: "magasin", path: "/magasin" },
    { icon: <PersonIcon />, label: "users", path: "/users" },
    { icon: <AccountBalanceWalletIcon />, label: "cheque", path: "/check" },
    {
      icon: <SystemSecurityUpdateGoodIcon />,
      label: "virements",
      path: "/virements",
    },
    { icon: <AttachMoneyIcon />, label: "Cart", path: "/Cart" },
  ],
};

function MenuDashboard() {
  const { MenuPhone, toggleMenuPhone, setMenuPhoneFalse } =
    useContext(MenuContext);
  //  const { MenuPhone } = useSelector((state) => state.style);
  const menuItems = [
    { icon: <HomeIcon />, label: "dashboard", path: "/" },
    {
      icon: <CheckCircleIcon />,
      label: "articles",
      path: "/articles",
    },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const location = useLocation();

  const menuList = (
    <>
      {menuItems?.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <ListItem key={item.label} disablePadding>
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  color: isActive ? "primary.main" : "inherit",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "primary.main" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Typography>{item.label}</Typography>} />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
    </>
  );

  return (
    <div>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              toggleMenuPhone();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={MenuPhone}
            onClick={() => {
              setMenuPhoneFalse();
            }}
          >
            {menuList}
          </Drawer>
        </>
      ) : (
        <MenuContainer>{menuList}</MenuContainer>
      )}
    </div>
  );
}

export default MenuDashboard;
