import {
  makeStyles, Theme, createStyles, ListItem,
  ListItemIcon, ListItemText, AppBar,
  CssBaseline, Divider, Drawer, Menu, MenuItem,
  IconButton, List, Toolbar, Avatar, Typography
} from "@material-ui/core";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DashboardIcon from '@material-ui/icons/Dashboard';
import avatar from '../assets/avatar.png';

import { 
  Link as RouterLink, LinkProps as RouterLinkProps,
  Route, Switch as RouterSwitch
} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/auth";

import BookList from './books/BookList';
import AddBook from './books/AddBook';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    avatar: {
      marginRight: theme.spacing(1)
    },
    spacer: {
      flexGrow: 1
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />
          <Typography variant="h6" noWrap>
            Admin
          </Typography>
          <div className={classes.spacer}> </div>
          <IconButton
            onClick={handleProfileMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={openMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
        <Divider />
        <List>
          <ListItemLink to={`/`} primary="Dashboard" icon={<DashboardIcon />} />
          <ListItemLink to={`/books`} primary="Books" icon={<MenuBookIcon />} />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <RouterSwitch>
          <Route exact path={`/books`}>
            <BookList />
          </Route>
          <Route path={`/books/create`}>
            <AddBook />
          </Route>
        </RouterSwitch>
      </main>
    </div>
  </>
};

export default Admin;
