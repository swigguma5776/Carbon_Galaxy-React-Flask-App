import React, { useState } from 'react';
import { styled } from '@mui/material';
import { Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline,
    Box,
    CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import { AuthCheck, useSigninCheck } from 'reactfire'; 
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import carbon_image from '../../assets/images/galaxy.jpg'; 

interface Props{
    title:string;
}

// const Root = styled('div')({
//     padding: 0,
//     margin: 0
// })

// const NavBarContainer = styled('div')({
//     backgroundColor: '#3D2B4C',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
// })

const Logo = styled('h3')({
    marginTop: '-2px', 
})

const LogoA = styled(Link)({
    color: 'white',
    fontFamily: 'Copperplate',
    listStyle: 'none',
    textTransform: 'none',
    textDecoration: 'none'
})

const LogoNavigation = styled('ul')({
    listStyle: 'none',
    textTransform: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'white'
})

// const Main = styled('main')( {
//     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), url(${carbon_image});`,
//     width: '100%',
//     height: '100%',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     position: 'absolute',
// })
// const MainText = styled('div')({
//     fontSize: '22px',
//     textAlign: 'center',
//     position: 'relative',
//     width: '65%', 
//     fontFamily: 'Copperplate', 
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     color: 'white'
// })

const drawerWidth = 200;

const myStyles = {
    appBar : {
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
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      width: drawerWidth,
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), url(${carbon_image});`,
      height: '800px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
      marginTop: theme.spacing(2)
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    toolbar:{
      display: 'flex',
    },
    headerText:{
        display: 'flex',
        flexDirection: 'column', 
        width: '75%',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontFamily: 'Copperplate', 
        color: 'white',  
        textAlign: 'center', 
        fontSize: '25px', 
        marginTop: '20vh',
    },
    centerText:{
        display: 'flex',
        flexDirection: 'column', 
        fontFamily: 'Copperplate',
        fontSize: '22px', 
        width: '65%',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'white',  
        textAlign: 'center', 
        alignItems: 'center'
    },
    centerButton:{
        display: 'flex',
        flexDirection: 'row', 
        width: '250px',
        marginRight: '15px',
        marginLeft: '15px', 
    }
   
  };


const SignInText = () => {
    const auth = getAuth(); 
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth); 
    // const {status, data:signInCheckResult} = useSigninCheck(); 

    if (loading){
        return <CircularProgress />
    } 
    if (user){
        return <NavA to='/signin'>Sign Out</NavA>
    } else {
        return <NavA to='/signin'>Sign In</NavA>
    }
}

export const Home = ( props: Props) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
  
  
  
  
    const handleDrawerOpen = () => {
        setOpen(true);
    }
  
    const handleDrawerClose = () => {
        setOpen(false); 
    }
  
  
  
    const itemsList = [
      {
          text: 'Home',
          onClick: () => navigate('/')
      },
      {
          text: 'Dashboard',
          onClick: () => navigate('/dashboard')
      },
      {
          text: 'About',
          onClick: () => navigate('/about')
      },
      {
          text: 'Sign In',
          onClick: () => navigate('/signin')
      }
  ]

    return (
        <Box sx = {{display: 'flex'}}>
            <CssBaseline />
            <AppBar
                sx = {open ? myStyles.appBarShift: myStyles.appBar}
                position='fixed'>
                <Toolbar sx= {myStyles.toolbar}>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        sx={open ? myStyles.hide: myStyles.menuButton}>
                            <MenuIcon />
                    </IconButton>
                    <Logo>
                            <LogoA to='/'>Carbon Galaxy</LogoA>
                    </Logo>
                </Toolbar>
            </AppBar>
            <MUIDrawer
                sx={open ? myStyles.drawer : myStyles.hide}
                variant='persistent'
                anchor='left'
                open={open}
                style={{width:drawerWidth}}>
                    <Box
                        sx={myStyles.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                            </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        {itemsList.map((item, index) =>{
                            const {text, onClick} = item;
                            return(
                                <ListItem button key={text} onClick={onClick}>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </MUIDrawer>
                <Box sx={ myStyles.content } >
            <Box sx={ myStyles.drawerHeader }/>
                    <Typography sx={myStyles.headerText}>
                        <h1>{props.title}</h1>
                    </Typography>
                        <br></br>
                    <Typography sx={myStyles.centerText}>
                        <p>There are more BYTES of data than there are stars in our galaxy.
                            Actually about 50 billion times more bytes of data! 
                            All this data produces electricity which in turn emits carbon, which 
                            is one of the biggest contributors to global warming. Want to find out how
                            much carbon some of your favorite websites produce?</p>
                        <br></br>
                        <Box sx={{display: 'inline-flex'}}>
                            <Button sx={myStyles.centerButton} color='primary' variant='contained' component={Link} to='/dashboard'>Track Carbon Emissions</Button>
                            <Button sx={myStyles.centerButton} color='primary' variant='contained' component={Link} to='/about'>Find Out More</Button>
                        </Box>
                    </Typography>
            </Box>
        </Box>
    )
}