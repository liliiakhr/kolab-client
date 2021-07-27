import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, AppBar, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Tooltip, Tabs, Tab, Box, Badge, Menu, MenuItem, Zoom, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UserContext from '../contexts/UserContext';


function NavBar(props) {
  const {user, onLogout} = useContext(UserContext);
  const [groupNames, setGroupNames] = useState([])
  const [menuIndex, setMenuIndex] = useState(null)
  // Variables that help with display and navigation of the sidebar
  let location = useLocation();
  let selectedGroup = location.pathname.replace("/group/", '')
  // let menuIndex = groupNames.indexOf(selectedGroup)

  // Hardcoded values for the appBar & Drawer (sidemenu)
  const drawerWidth = 240;
  const appBarHeight = 60;

  // DrawerStates
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState(0);

  // States related to the sub menu's from the appbar
  // anchorEl is a prop from menu function that helps to find the position of the menu
  // anchorEl is either null or an html-element (which you get frome event.currentTarget)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  // Boolean to open menu
  // if anchorEl is not null it will become true, else it will be false, same for mobileMoreAnchorEl
  const isMenuOpen = Boolean(anchorEl);                   // Menu are the menus for friends or when you click on your own avatar icon
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);   // Mobile menu is the menu for when a user is on mobile (3 dots appear)
  
  // Created to differentiate between the friends and user menu
  const [selectedMenu, setSelectedMenu] = useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      height: appBarHeight,
      [theme.breakpoints.up('sm')]: {
          // height: 56,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      marginTop: appBarHeight,
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
      marginTop: appBarHeight - 3
    },
    moveDrawerDown: {
        marginTop: "50"
    },
    // STYLES FROM NAVBAR TWO
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  //   inputRoot: {
  //     color: 'inherit',
  //   },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  useEffect(() => {
    const getGroupNames = async () => {
      try {
        let response = await axios.get(`${API_URL}/api/navbar/groupnames/${user._id}`, {withCredentials: true})
        let groupNamesTemporary = response.data.map(group => group.name)
        setMenuIndex(groupNamesTemporary.indexOf(selectedGroup) + 1)
        setGroupNames(groupNamesTemporary)
      }
      catch(error) {
      }
    }
    getGroupNames();
  }, [user])

  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  // Functions for opening/closing drawer
  const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const handleMenuChange = (name) => {
    console.log(name)
    if (!groupNames.includes(name)) {
      setMenuIndex(0)
    }
    setMenuIndex(groupNames.indexOf(name) + 1)
    props.onNavBarChange()
  }

  const drawer = (
      <div >
          <Tabs
          orientation="vertical"
          variant="scrollable"
          value={menuIndex}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
      >   
          <Link to={`/home`} style={{ textDecoration: "none", color: "black", textAlign: "center"}} >
            <Tab label="Feed" onClick={props.onNavBarChange}/>
          </Link>
          {
            groupNames && 
            groupNames.map(groupName => {
              return (               
                <Link to={`/group/${groupName}`} style={{ textDecoration: "none", color: "black", textAlign: "center"}} >
                  {/* <Tab label={groupName} onClick={props.onNavBarChange} name={groupName}/> */}
                  <Tab label={groupName} onClick={() => handleMenuChange(groupName)} name={groupName}/>
                </Link>
              )
            })
          }
      </Tabs>
      </div>
  );

  // Functions for opening and closing the App bar menus
  const handleProfileMenuOpen = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menuType)
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Functions for rendering the menu JSX and the mobileMenu JSX
  // They are created here and not in the render method to make things cleaner
  // In the render method you will find {renderMenu} and {renderMobileMenu}
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
          selectedMenu === 'user' ? (
              <div>
                  <MenuItem onClick={() => {history.push(`/profile/${user._id}`)}}>Profile</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
              </div>
          )
          :
          (
              <div>
                  <MenuItem onClick={() => {history.push('/friends')}}>My Friends</MenuItem>
                  <MenuItem onClick={() => {history.push('/people')}}>Explore People</MenuItem>
              </div>
          )
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {history.push('/explore')}}>
        <IconButton aria-label="show 4 new mails" color="inherit"   >
          <Badge badgeContent={4} color="secondary">
            <ExploreIcon />
          </Badge>
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleProfileMenuOpen(event, 'friend') }>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <PeopleAltIcon />
          </Badge>
        </IconButton>
        <p>Friends</p>
      </MenuItem>
      <MenuItem onClick={(event) => handleProfileMenuOpen(event, 'user') } >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );  


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={1}>
        <Toolbar style={{ display: "flex", alignItems: "center"}}>
            {/* Conditionally show the Drawer (sidemenu) based on the showDrawer prop */}
            {
                props.showDrawer &&
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
            }
            <Tooltip TransitionComponent={Zoom} title="Go back to your feed">
                <Link to="/home">
                    <img src="/images/kolab_logo.png" style={{height: appBarHeight }} />
                </Link>
            </Tooltip>
            <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                        <Tooltip TransitionComponent={Zoom} title="What topics facinate you?">
                            <Button onClick={() => {history.push('/explore')} }color="inherit" startIcon={
                                                <Badge badgeContent={4} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                                    <ExploreIcon />
                                                </Badge>
                                }> Explore
                            </Button>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} title="Connect with your partners in passion">
                            <Button  
                                    color="inherit" 
                                    startIcon={
                                        <Badge badgeContent={4} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                            <PeopleAltIcon />
                                        </Badge>
                                    }
                                    onClick={(event) => handleProfileMenuOpen(event, 'friend') }
                                > Friends
                                </Button>
                        </Tooltip>
                        <Tooltip TransitionComponent={Zoom} title="Check your profile">
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={(event) => handleProfileMenuOpen(event, 'user') }
                                color="inherit"
                                >
                                <Avatar alt={user.username} src={user.image_url} />
                            </IconButton>
                        </Tooltip>
                </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          {/* NAVBAR TWO */}

        </Toolbar>
      </AppBar>
      {/* Puts the Mobile menu and menu in that we created above */}
      {renderMobileMenu}
      {renderMenu}
      {/* Conditionally render the drawer based on showDrawer prop */}
      {
        props.showDrawer &&
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
      }
      <main className={classes.content}>
        { props.children }
      </main>
    </div>
  );
}

export default NavBar;
