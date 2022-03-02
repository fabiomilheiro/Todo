import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useUserContext } from "./context/UserContext";
import { useFirebaseApp } from "reactfire";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const title = "Todo list with firebase 🔥";
const github = new GithubAuthProvider();
export const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const firebase = useFirebaseApp();
  const auth = getAuth(firebase);
  const { user } = useUserContext();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            {title}
          </Typography>

          {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photoURL || ""} />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    auth.signOut();
                  }}
                >
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => signInWithPopup(auth, github)}>
                    <Typography textAlign="center">
                      Sign in with GitHub
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
