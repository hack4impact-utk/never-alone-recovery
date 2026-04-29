"use client";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from "@mui/icons-material/Badge";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SecurityIcon from "@mui/icons-material/Security";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useMemo, useState } from "react";

import ProfilePicture from "./profile-picture";

const APP_BAR_HEIGHT = 76;
const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 84;

type NavigationItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <CheckCircleOutlineIcon />,
  },
  {
    label: "Rent",
    href: "/rent",
    icon: <AttachMoneyIcon />,
  },
  {
    label: "Intake Form",
    href: "/intake-form",
    icon: <AssignmentIcon />,
  },
  {
    label: "Audits",
    href: "/audit",
    icon: <SecurityIcon />,
  },
  {
    label: "Metrics",
    href: "/metrics",
    icon: <BarChartIcon />,
  },
  {
    label: "Client Dashboard",
    href: "/client-dashboard",
    icon: <GroupIcon />,
  },
  {
    label: "Staff Dashboard",
    href: "/staff-dashboard",
    icon: <BadgeIcon />,
  },
  {
    label: "Donor Dashboard",
    href: "/donor-dashboard",
    icon: <VolunteerActivismIcon />,
  },
];

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps): ReactNode {
  const { data: session } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState<boolean>(false);

  const drawerWidth = drawerCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  const currentLabel = useMemo(() => {
    return (
      navigationItems.find((item) => item.href === pathname)?.label ?? "Home"
    );
  }, [pathname]);

  const toggleDrawer = (): void => {
    if (isDesktop) {
      setDrawerCollapsed((currentValue) => !currentValue);
      return;
    }

    setMobileDrawerOpen((currentValue) => !currentValue);
  };

  const handleCloseMobileDrawer = (): void => {
    setMobileDrawerOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ px: 1, py: 1, flexGrow: 1 }}>
        {navigationItems.map((item) => {
          const selected =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              selected={selected}
              onClick={handleCloseMobileDrawer}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                justifyContent: "flex-start",
                mb: 0.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 1.5,
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  m: 0,
                  display: "hidden",
                  maxWidth: drawerCollapsed && isDesktop ? 0 : 220,
                  opacity: drawerCollapsed && isDesktop ? 0 : 1,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  if (!session) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: 3,
          minHeight: `${APP_BAR_HEIGHT}px`,
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${APP_BAR_HEIGHT}px !important`,
            gap: 2,
            px: 2,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open sidebar"
            onClick={toggleDrawer}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src="/NeverAloneRecoveryLogo.svg"
              alt="NAR Logo"
              sx={{
                height: 48,
                width: 48,
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Box component="div" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                Never Alone Recovery
              </Box>
              <Box
                component="div"
                sx={{ fontSize: 14, color: "text.secondary" }}
              >
                {currentLabel}
              </Box>
            </Box>
          </Box>
          <ProfilePicture />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={handleCloseMobileDrawer}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: `${APP_BAR_HEIGHT}px`,
            height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shortest,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          pt: `${APP_BAR_HEIGHT + 8}px`,
          px: { xs: 2, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
