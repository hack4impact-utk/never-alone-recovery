"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";

import { handleLogout } from "@/utils/auth/handle-logout";

export default function ProfilePicture(): ReactNode {
  const [userMenu, setUserMenu] = useState<boolean>(false);

  const handleCloseUserMenu = (): void => {
    setUserMenu(false);
  };

  const toggleUserMenu = (): void => {
    setUserMenu(!userMenu);
  };
  const { data: session } = useSession();

  return (
    session && (
      <Box>
        <Tooltip title="Open settings" placement="left-end">
          <IconButton onClick={toggleUserMenu}>
            <Avatar
              alt={session.user?.name ?? "User"}
              src={session.user?.image ?? ""}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          open={userMenu}
          onClose={handleCloseUserMenu}
          aria-controls="logout"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            id="logout"
            onClick={() => {
              handleCloseUserMenu();
              handleLogout();
            }}
          >
            <Typography sx={{ textAlign: "center" }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  );
}
