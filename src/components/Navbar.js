import React from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, AppBar, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Typography, Tabs, Tab, Box, Badge, Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { MailIcon, MenuIcon, ExploreIcon, AccountCircle, NotificationsIcon, MoreIcon, PeopleAltIcon } from '@material-ui/icons'
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const drawerWidth = 240;
const appBarHeight = 60;



function NavBar(props) {

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
        padding: theme.spacing(3),
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
      inputRoot: {
        color: 'inherit',
      },
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

    // function TabPanel(props) {
    //     const { children, value, index, ...other } = props;
    //     console.log("children", children)
    //     console.log("value", value)
    //     console.log("index", index)
    //     console.log("other", other)
        
    //     return (
    //       <div
    //         role="tabpanel"
    //         hidden={value !== index}
    //         id={`vertical-tabpanel-${index}`}
    //         aria-labelledby={`vertical-tab-${index}`}
    //         {...other}
    //       >
    //         {value === index && (
    //           <Box p={3}>
    //             <Typography>{children}</Typography>
    //           </Box>
    //         )}
    //       </div>
    //     );
    //   }
      
    //   TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.any.isRequired,
    //     value: PropTypes.any.isRequired,
    //   };
    
    // function a11yProps(index) {
    //     return {
    //       id: `vertical-tab-${index}`,
    //       'aria-controls': `vertical-tabpanel-${index}`,
    //     };
    //   }

    // Window is always undefined, needs clean up ==> Needed for "container variable later"
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

    // This is for the drawer
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawer = (
    <div >
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {/* <Tab label="Item One" {...a11yProps(0)} /> */}
        {/* <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
        <Tab label="Item One" />
        <Tab label="Item Two"  />
        <Tab label="Item Three" />
        <Tab label="Item Four"  />
        <Tab label="Item Five"  />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

    const handleLogOut = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`)
            // !! NEEDS TO BE UNCOMMENTED LATER, onece the onUpdateUser function exists !!
            // props.onUpdateUser(null)
            history.push('/')
        }
        catch(error) {
            // ?? What is best to put in here?
        }
    }

    // FUNCTIONS FROM NAVBAR 2
    // anchorEl is a prop from menu function that helps to find the position of the menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    // Boolean to open menu
    // ?? why is this not directly set in the state
    const [mobileMoreFriendsAnchorEl, setMobileMoreFriendsAnchorEl] = React.useState(null);
    const isFriendMenuOpen = Boolean(mobileMoreFriendsAnchorEl);

    // Created to differentiate between the friends and user menu
    const [selectedMenu, setSelectedMenu] = React.useState(null);
 
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
                    <MenuItem onClick={() => {history.push(`/profile/${props.user._id}`)}}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </ div>
            )
            :
            (
                <div>
                    <MenuItem onClick={() => {history.push('/friends')}}>My Friends</MenuItem>
                    <MenuItem onClick={() => {history.push('/people')}}>Explore People</MenuItem>
                </ div>
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
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Explore</p>
        </MenuItem>
        <MenuItem onClick={(event) => handleProfileMenuOpen(event, 'friend') }>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <img src="/images/kolab_logo.png" style={{height: "50px" }} />
          </Link>

            {/* Stuff from NavBar 2 */} 
            <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
                <Button onClick={() => {history.push('/explore')} }color="inherit" startIcon={
                                    <Badge badgeContent={4} color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                        <ExploreIcon />
                                    </Badge>
                    }> Explore
                </Button>
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
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(event) => handleProfileMenuOpen(event, 'user') }
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
      {/* NAVBAR TWO */}
      {renderMobileMenu}
      {renderMenu}
      {/* NAVBAR TWO */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
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
      <main className={classes.content}>
        { props.children }
      </main>
    </div>
  );
}

export default NavBar;
