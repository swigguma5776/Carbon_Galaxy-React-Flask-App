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
    Dialog,
    DialogActions,
    DialogContent, 
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import { DataTable, CarbonForm } from '../../components';  
import { useGetData } from '../../custom-hooks'; // Added this bad boy so i can run some API calls from my Carbon Data :)
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
    toolbarButton: {
      marginLeft: 'auto',
      backgroundColor: theme.palette.primary.contrastText,
      '&:hover': {
          color: 'white',
          backgroundColor: theme.palette.primary.light
      }
    },
    toolbarButtonOffset: {
      marginLeft: '5px',
      backgroundColor: theme.palette.primary.contrastText,
      '&:hover': {
          color: 'white',
          backgroundColor: theme.palette.primary.light
      }
    }
  };

  export const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plantTreesOpen, setTreesOpen] = useState(false);
  let { carbonData, getData } = useGetData();


  let trees = 0
  for (let i = 0; i < (carbonData.length); i++ ){
      trees += carbonData[i].trees_needed
  }
  console.log(trees)


  const handleDrawerOpen = () => {
      setOpen(true);
  }

  const handleDrawerClose = () => {
      setOpen(false); 
  }

  const handleDialogOpen = () => {
      setDialogOpen(true);
  }

  const handleDialogClose = () => {
      setDialogOpen(false); 
  }

  const treeDialogOpen = async (trees: any) => {
    setTreesOpen(true)
      for (let i = 0; i < (trees); i++ ){
          console.log(i)
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
                  'X-RapidAPI-Key': '9aac146b28msha98b54ca2f39ee0p16455djsn9a0f2e345df6'
              }
          };
  
          const response = await fetch('https://google-search1.p.rapidapi.com/google-search?hl=en&q=Avengers%2BEndgame&gl=us', options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
              
              }
      
  
  }

  console.log(carbonData)

  const treeDialogClose = () => {
    setTreesOpen(false)
  }

  const itemsList = [
      {
          text: 'Home',
          onClick: () => navigate('/')
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
                <Button sx={myStyles.toolbarButton} onClick={handleDialogOpen}> Add Website </Button>
                <Button sx={myStyles.toolbarButtonOffset} onClick={() => treeDialogOpen(trees)}> Offset Carbon! </Button>
                   {/*Dialog Pop Up begin */}
                <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText>Let's calculate some carbon emissions!</DialogContentText>
                        <CarbonForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleDialogClose} color="primary">Cancel</Button>
                        <Button onClick={handleDialogClose} color = "primary">Done</Button> 
                    </DialogActions>
                </Dialog>
                <Dialog open={plantTreesOpen} onClose={treeDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText>Congratulations! You planted {trees} trees which is the total
                        number of trees on your dashboard and offset roughly {trees * 20} kilograms of carbon. You Rock!</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={treeDialogClose} color = "primary">Done</Button> 
                    </DialogActions>
                </Dialog>
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
          <DataTable />
         
        </Box>
      </Box>

  )

}