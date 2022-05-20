import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, 
    DialogTitle } from '@mui/material';
import { CarbonForm } from '../CarbonForm';
import './datatable.css'; 


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 , minWidth: 100},
  {
    field: 'website_url',
    headerName: 'Website URL',
    width: 175,
    editable: true,
  },
  {
    field: 'carbon_per_webpage',
    headerName: 'Carbon per Webpage (in grams)',
    type: 'number',
    width: 250,
    editable: true,
  },
  {
    field: 'carbon_per_year',
    headerName: 'Carbon per Year (in grams)',
    type: 'number',
    width: 250,
    editable: true,
  },
  {
    field: 'green_energy',
    headerName: 'Green Energy',
    width: 150,
    editable: true,
  },
  {
    field: 'trees_needed',
    headerName: 'Trees needed to offset Carbon',
    type: 'number', 
    flex: 2,
    minWidth: 230,
    editable: true,
  },
  
];

interface gridData{
    data:{
        id?: string; 
    }
}

const myStyles = {
    text: {
      color: 'white', 
    }
}



export const DataTable = () => {
    let { carbonData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
        window.location.reload();
  
    }

    // console.log(gridData) // a list of id's from checked rows
    // console.log(carbonData)
    const len = carbonData.length - 1
    // console.log(carbonData[len].website_url)
    return (
      <div style={{ height: 373, width: '100%' }}>
          { carbonData.length > 0 &&
          <div className="description">
            <h1 id='carbon-description'>Congratulations! You added {carbonData[len].website_url} to the database </h1>
            <br></br>
            <h2 id='carbon-description'>
              {carbonData[len].website_url} uses {carbonData[len].carbon_per_webpage} grams of carbon for every
              webpage visit. Over a year with an average of 10,000 visits a month this webpage produces {carbonData[len].carbon_per_year} grams 
              of carbon! This means we would need to plant {carbonData[len].trees_needed} trees 
              in order to offset this website's carbon emissions. Check below to see all your websites!
            </h2>
          </div>
          } : { carbonData.length <= 0 &&
            <div className="description">
              <h1 id='carbon-description'>Welcome To Your Dashboard! </h1>
              <br></br>
              <h2 id='carbon-description'>
                Click on the 'Add Website' button above to start adding some websites to your dashboard.
              </h2>
              <br></br>
              <br></br>
              <br></br>
            </div>
          }
          <h2 id='carbon-description'>Your Websites' Carbon Emissions</h2>
        <DataGrid sx= {myStyles.text}
          rows={carbonData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
          {...carbonData}
        />

        <Button variant='contained' onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="warning" onClick={deleteData}>Delete</Button>
        

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Your Website Search</DialogTitle>
          <DialogContent>
            <DialogContentText>{gridData[1]}</DialogContentText>
              <CarbonForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>

      </div>
    );
  }