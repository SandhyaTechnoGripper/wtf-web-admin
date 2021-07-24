/* eslint-disable no-restricted-imports */
import React,{useEffect} from "react";
import axios from 'axios'
import clsx from "clsx";
import {
  TextField,
  InputBase,

} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {
  fade,
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

import {Notice, KTCodeExample} from "../../../../_metronic/_partials/controls";
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getDate } from "date-fns";




// Submit
const useStyles3 = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const currencies = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
];


//view user
const useStyles4 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));


// add user
const useStyles2 = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));


export default function SwitchsExamplesPage() {

// submit button
  const classes3 = useStyles3();

  //view gym
  const classes4 = useStyles4();
  // add gym
  const classes2 = useStyles2();
  const [files, setFiles] = React.useState({
    lease_agreement:null,
    electricity_bill:null,
    bank_satatement:null
  })
  const [getData,setGetData] = React.useState([])
  const [values, setValues] = React.useState({
      name: '',
      gym_name:'',
      address1:'', 
      address2:'' ,
      city:'',
      state:'',
      pin:'',
      country:'',
      latitudet:'',
      longitude:''
     
});
  
console.log("filesdata",files)
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    console.log("data of gym",values)
  };
   
      const data = new FormData();
      const file = files[0];
      data.append("lease_agreement", file); 
      data.append('electricity_bill',file)
      data.append('bank_statement',file)
      // }
      console.log("file data", data)
  const handleInput= () =>{
   
     fetch('http://13.232.102.139:9000/gym/add', {
      method: 'POST',
      headers: {
        'Content-Type':'multipart/form-data','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiR3lQWEpBcDhZV1pOIiwibmFtZSI6Im1vaGl0IiwiaWF0IjoxNjI3MDI0MDQzLCJleHAiOjE2MjcwNDkyNDN9.8VvF6J5zf_-uC24giObBOT3DvU6SXVXm5756duNuJ2s',
      },
      body: JSON.stringify(values,data),
    })
    .then(response => response.json())
    .then(values => {
      console.log('Success PostData:', values);
    })
    
    
 
  
   }
  const fetchGetData = () =>{
    fetch('http://13.232.102.139:9000/gym/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiR3lQWEpBcDhZV1pOIiwibmFtZSI6Im1vaGl0IiwiaWF0IjoxNjI3MDQ2MDc4LCJleHAiOjE2MjcwNzEyNzh9.TvhwzDggCU_u6dsLz-TYlsOR0W7Tr6ArC0jEOfM1ZDY',
      }
      
    })
    .then(response => response.json())
    .then(responseJson => {
      setGetData(responseJson.data)
      console.log('Success GetData :', responseJson);
     
      
    })
 
  }

  useEffect(() => {
      fetchGetData(); 
}, []);

  return (
    
    <>
      <div className="row">
        <div className="col-md-4">
          <KTCodeExample
            // jsCode={jsCode2}
            beforeCodeTitle="Add GYM"
            codeBlockHeight="400px"
          >
           
            <div className="separator separator-dashed my-7"></div>
            <form 
             onSubmit={handleInput()}
            className={classes2.container} 
            noValidate autoComplete="on" >
           
              <TextField
                id="outlined-name"
                label="Name"
                className={classes2.textField}
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined"
                label="GYM Name"
                className={classes2.textField}
                value={values.gym_name}
                onChange={handleChange("gym_name")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined"
                label="Address 1"
                className={classes2.textField}
                value={values.address1}
                onChange={handleChange("address1")}
                type="text"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Address 2"
                className={classes2.textField}
                value={values.address2}
                onChange={handleChange("address2")}
                type="text"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="City"
                type= "text"
                className={classes2.textField}
                value={values.city}
                onChange={handleChange("city")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="State"
                type= "text"
                className={classes2.textField}
                value={values.state}
                onChange={handleChange("state")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Pin"
                type= "number"
                className={classes2.textField}
                value={values.pin}
                onChange={handleChange("pin")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Country"
                type= "text"
                className={classes2.textField}
                value={values.country}
                onChange={handleChange("country")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Lat"
                type= "text"
                className={classes2.textField}
                value={values.lat}
                onChange={handleChange("latitudet")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Long"
                type= "text"
                className={classes2.textField}
                value={values.long}
                onChange={handleChange("longitude")}
                margin="normal"
                variant="outlined"
              />
             
              <TextField
                id="outlined"
                label="Lease Agreement"
                type= "file"
                className={classes2.textField}
                name='lease_agreement'
                onChange={(e)=> setFiles(e.target.files)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Electricity Bill"
                type= "file"
                className={classes2.textField}
                 name='electricity_bill'
                // value={values.electricity_bill}
                onChange={(e)=> setFiles(e.target.files)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Bank Statement"
                type= "file"
                className={classes2.textField}
                name='bank_statement'
                // value={values.bank_statement}
                onChange={(e)=> setFiles(e.target.files)}
                margin="normal"
                variant="outlined"
              />
              
            </form>
            <Button  
              type="submit"
              variant="contained" 
              className={classes3.button}
              >
                Submit
              </Button>
            
          </KTCodeExample>
        </div>

        <div className="col-md-8">
        <KTCodeExample
            // jsCode={jsCode4}
            beforeCodeTitle="View GYM"
            // codeBlockHeight="400px"
          >
          <Paper className={classes4.root}>
            <Table className={classes4.table}>
              <TableHead >
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">GYM Name</TableCell>
                  <TableCell align="right">Address 1</TableCell>
                  <TableCell align="right">Address 2</TableCell>
                  <TableCell align="right">City</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Pin</TableCell>
                  <TableCell align="right">Country</TableCell>
                  <TableCell align="right">Lat</TableCell>
                  <TableCell align="right">Long</TableCell>
                  <TableCell align="right">Lease Agreement</TableCell>
                  <TableCell align="right">Electricity Bill</TableCell>
                  <TableCell align="right">Bank Statement</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getData.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    {/* <TableCell align="right">{row.name}</TableCell> */}
                    <TableCell align="right">{row.gym_name}</TableCell>
                    <TableCell align="right">{row.address1}</TableCell>
                    <TableCell align="right">{row.address2}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                    <TableCell align="right">{row.pin}</TableCell>
                    <TableCell align="right">{row.country}</TableCell>
                    <TableCell align="right">{row.latitude}</TableCell>
                    <TableCell align="right">{row.longitude}</TableCell>
                    <TableCell align="right">{row.lease_agreement}</TableCell>
                    <TableCell align="right">{row.electricity_bill}</TableCell>
                    <TableCell align="right">{row.bank_statement}</TableCell>
                    <Button 
                    type="submit" variant="contained" 
                    className={classes3.button} >
                Edit
              </Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          </KTCodeExample>
        </div>
      </div>
    </>
  );
}
