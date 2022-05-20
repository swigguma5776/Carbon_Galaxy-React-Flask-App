import React, {useState} from 'react';
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
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import carbon_image from '../../assets/images/galaxy.jpg'; 
import { AnyArray } from 'immer/dist/internal';

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
      height: '1000px',
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
    },
    centerText:{
        display: 'flex',
        flexDirection: 'column', 
        width: '75%',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: 'white',  
        textAlign: 'center', 
    }
   
  };

  export const About = () => {
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
                    <h1>How This App Works</h1>
                </Typography>
                    <br></br>
                <Typography sx={myStyles.centerText}> 
                    <p>Carbon Galaxy uses resources like the <a href="https://www.websitecarbon.com/api/"> Website Carbon API</a>and the 
                    <a href="https://github.com/thegreenwebfoundation/co2.js/blob/main/src/hosting-api.js">Green Website Foundation</a> calculations to calculate the carbon emissions
                        of websites. The calculations are based on the following data: data transfers
                        over wires, bytes of data the website uses, energy intensity, energy source, and
                        website fraffic. This isn't an exact science and something that continues
                        to be refined. 
                    </p>
                    <br></br>
                    <p>When users input a website's url an API call is made. From that API call, we extract how much
                        carbon emissions a webpage produces per one site visit and whether or not that website is using green energy.
                        After extracting that information Carbon Galaxy App runs a couple more calculations on the data to find out
                        how much carbon emissions a single webpage will produce with an average of 10k web visits per month. We also calculate
                        the amount of trees it would take to offset that amount of carbon in a given year. 
                    </p>
                </Typography>
                <br></br>
                <br></br>
                <Typography sx={myStyles.headerText}>
                    <h1>Offseting Your Carbon</h1>
                </Typography>
                    <br></br>
                <Typography sx={myStyles.centerText}> 
                    <p>Global Warming is the biggest crisis the world as a collective faces for our immediate future. One of the 
                        major contributors to global warming is harmful greenhouse gas emissions and CO2 is the biggest culprit! 
                        For many leading developing countries reducing Carbon Emissions is their number one goal. This, of course,
                        has to happen at the top by reducing burning of fossil fuels. However, there are things that everyday people
                        can do to help offset their carbon footprint like carpool, eat less meat, and shop local! 
                    </p>
                    <br></br>
                    <p>
                        By using Carbon Galaxy users not only can get a better understanding of just the impact browsing the web
                        actually has on the environment, but they have the opportunity to try to offset some of harm. By clicking on the 
                        'Offset Carbon' on the Dashboard an API call is made through the Ecosia servers. <a href="https://info.ecosia.org/what">Ecosia</a> is a search engine platform
                        that generates income from ads. They than use that income to plant trees around the world! To date they've planted over 
                        150 million trees which they publish their financial report every month for transparancy. 
                    </p>
                </Typography>
        </Box>
    </Box>

)

}