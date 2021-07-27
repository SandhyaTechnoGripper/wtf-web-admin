/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { TextField, InputBase, Button } from "@material-ui/core";
import { shallowEqual, useSelector } from "react-redux";
import { green } from "@material-ui/core/colors";
import {
  fade,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

import { Notice, KTCodeExample } from "../../_metronic/_partials/controls";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PopUpToast from "../../_metronic/layout/components/PopUpToast/PopUpToast";

// const currencies = [
//   {
//     value: "Active",
//     label: "Active",
//   },
//   {
//     value: "Inactive",
//     label: "Inactive",
//   },
// ];
// update equipment
const useStyles3 = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

//view equipment
const useStyles4 = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
}));

// add equipment
const useStyles2 = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function AddonsManagement() {
                 const { authToken } = useSelector(
                   ({ auth }) => ({
                     authToken: auth.authToken,
                   }),
                   shallowEqual
                 );
                 //update equipment
                 const classes3 = useStyles3();
                 //view equipment
                 const classes4 = useStyles4();
                 // add equipment
                 const classes2 = useStyles2();
               
                 const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(
                   false
                 );
                 const [message, setMessage] = useState({
                   type: "suceess",
                   message: "",
                 });
                 const [editModalOpen, setEditModalOpen] = useState({
                   open: false,
                   id: null,
                 });
                 const [getData, setGetData] = useState([]);
                 const [images, setImages ] = useState({
                   images:null
                 })
                 const [getGymData, setGymData] = useState([]);

                 const [error, setError] = useState({
                   gym_id: "",
                   name: "",
                   description: "",
                   price: "",
                 });
                 const [values, setValues] = useState({
                  gym_id: "",
                  name: "",
                  description: "",
                  price: "",
                 });
                 
                 useEffect(() => {
                   if (authToken) {
                     fetchGymData();
                     fetchGetData();
                   }
                 }, []);

                 const fetchGetData = () => {
                   fetch("http://13.232.102.139:9000/addon/", {
                     method: "GET",
                     headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${authToken}`,
                     },
                   })
                     .then((response) => response.json())
                     .then((responseJson) => {
                       setGetData(responseJson.data);
                     });
                 };

                 const handleChange = (name) => (event) => {
                   console.log(event);
                   setValues({ ...values, [name]: event.target.value });
                 };
                   
                 const fetchGymData = () => {
                   fetch("http://13.232.102.139:9000/gym/", {
                     method: "GET",
                     headers: {
                       // 'Content-Type': 'application/json',
                       Authorization: `Bearer ${authToken}`,
                     },
                   })
                     .then((response) => response.json())
                     .then((responseJson) => {
                       setGymData(responseJson.data);
                     });
                 };

                 const equipAdd = (e) => {
                 const data = new FormData();
                 data.append("gym_id",values.gym_id);
                 data.append("name",values.name);
                 data.append("description",values.description);
                 data.append("images",images.images);
                 data.append("price",values.price);
                 data.append("user_id", "T6JNqwknrAaxg");

                   e.preventDefault();
                   
                   if (values.gym_id === "") {
                     return setError({ gym_id: "*GYM Id is mandatary" });
                   }
                   if (values.equipment === "") {
                     return setError({ gym_id: "*Equipment is mandatary" });
                   }
                   if (values.quantity === "") {
                     return setError({ gym_id: "*Quantity is mandatary" });
                   }
                   if (values.brand === "") {
                     return setError({ gym_id: "*Brand is mandatary" });
                   }
                   // POST request using fetch inside useEffect React hook
                   

                   const requestOptions = {
                     method: "POST",
                     headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${authToken}`,
                     },
                     body: data,
                   };
                   fetch(
                     "http://13.232.102.139:9000/addon/add",
                     requestOptions
                   )
                     .then((response) => response.json())
                     .then((data) => {
                       setSuccessSnackBarOpen(true);
                       setMessage({
                         type: "success",
                         message: "Addons Added Successfully",
                       });
                       fetchGetData();
                     });
                 };

                 const getParticularEquipment = (id) => {
                   if (editModalOpen.open) {
                     setValues({
                       gym_id: "",
                       equipment: "",
                       quantity: "",
                       brand: "",
                     });
                     return setEditModalOpen({ open: false, id: null });
                   }

                   setEditModalOpen({ open: true, id: id });
                   let equipment = getData.filter((data) => data.uid === id);
                   setValues({
                     gym_id: equipment[0].gym_id,
                     equipment: equipment[0].equipment,
                     quantity: equipment[0].quantity,
                     brand: equipment[0].brand,
                   });
                 };

                 const updateData = () => {
                   const requestOptions = {
                     method: "PUT",
                     headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${authToken}`,
                     },
                     body: JSON.stringify({
                       equipment_id: editModalOpen.id,
                       ...values,
                     }),
                   };
                   fetch(
                     "http://13.232.102.139:9000/addon/update",
                     requestOptions
                   ).then((response) => {
                     if (response.ok) {
                       // success
                       setSuccessSnackBarOpen(true);
                       setMessage({
                         type: "success",
                         message: "Addons Updated Successfully",
                       });
                       fetchGetData();
                       setValues({
                         gym_id: "",
                         equipment: "",
                         quantity: "",
                         brand: "",
                       });
                     } else {
                       // error
                       setMessage({
                         type: "error",
                         message: "Addons Updation failed",
                       });
                     }
                   });
                 };

                 const deleteData = (id) => {
                   const requestOptions = {
                     method: "PUT",
                     headers: {
                       "Content-Type": "application/json",
                       Authorization: `Bearer ${authToken}`,
                     },
                     body: JSON.stringify({ uid: id }),
                   };
                   fetch(
                     "http://13.232.102.139:9000/addon/delete",
                     requestOptions
                   ).then((response) => {
                     if (response.ok) {
                       // success

                       setSuccessSnackBarOpen(true);
                       setMessage({
                         type: "success",
                         message: "Addons Deleted Successfully",
                       });
                       let data = getData.filter((data) => data.uid !== id);
                       setGetData(data);
                     } else {
                       // error
                       setMessage({
                         type: "success",
                         message: "Addons deletion failed",
                       });
                     }
                   });
                 };
                 return (
                   <>
                     <div className="row">
                       <div className="col-md-3">
                         <KTCodeExample
                           jsCode={jsCode1}
                           beforeCodeTitle={`${
                             !editModalOpen.open
                               ? "Add Addons"
                               : "Update Addons"
                           }`}
                           codeBlockHeight="400px"
                         >
                           <span>
                             <code>TextField</code> supports outlined styling.
                           </span>
                           <div className="separator separator-dashed my-7"></div>
                           <form
                             className={classes2.container}
                             noValidate
                             autoComplete="off"
                           >
                             {editModalOpen.open ? (
                               <TextField
                                 id="outlined-select-currency"
                                 select
                                 name="gym_id"
                                 label="Gym Id"
                                 className={classes2.textField}
                                 value={values.gym_id}
                                 onChange={handleChange("gym_id")}
                                 SelectProps={{
                                   MenuProps: {
                                     className: classes2.menu,
                                   },
                                 }}
                                 margin="normal"
                                 variant="outlined"
                               >
                                 {getGymData?.length > 0 &&
                                   getGymData.map((option) => (
                                     <MenuItem
                                       key={option.uid}
                                       value={option.gym_id}
                                     >
                                       {option.name}
                                     </MenuItem>
                                   ))}
                               </TextField>
                             ) : (
                               <TextField
                                 // error
                                 id="outlined-error"
                                 name="name"
                                 label="Name"
                                 className={classes2.textField}
                                 margin="normal"
                                 variant="outlined"
                                 value={values.name}
                                 onChange={handleChange("name")}
                               />
                             )}

                             <TextField
                               // error
                               id="outlined"
                               name="description"
                               label="Description"
                               className={classes2.textField}
                               margin="normal"
                               variant="outlined"
                               value={values.description}
                               onChange={handleChange("description")}
                             />
                             <TextField
                               // error
                               id="outlined-error"
                               name="image"
                               label="Image"
                               type="file"
                               className={classes2.textField}
                               margin="normal"
                               variant="outlined"
                               value={values.images}
                               onChange={(e) => setImages({...images, images : e.target.files[0]})}
                             />

                             <TextField
                               // error
                               id="outlined-error"
                               name="price"
                               label="Price"
                               type="text"
                               className={classes2.textField}
                               margin="normal"
                               variant="outlined"
                               value={values.price}
                               onChange={handleChange("price")}
                             />
                             <Button
                               variant="contained"
                               className={classes3.button}
                               onClick={
                                 editModalOpen.open ? updateData : equipAdd
                               }
                             >
                               Submit
                             </Button>
                           </form>
                         </KTCodeExample>
                       </div>

                       <div className="col-md-9">
                         <KTCodeExample
                           jsCode={jsCode1}
                           beforeCodeTitle="View Addons"
                           codeBlockHeight="400px"
                         >
                           <Paper className={classes4.root}>
                             <Table className={classes4.table}>
                               <TableHead>
                                 <TableRow>
                                   <TableCell>GYM Id</TableCell>
                                   <TableCell align="right">
                                     Name
                                   </TableCell>
                                   <TableCell align="right">Description</TableCell>
                                   <TableCell align="right">image</TableCell>
                                   <TableCell align="right">Price</TableCell>
                                 </TableRow>
                               </TableHead>
                               <TableBody>
                                 {getData?.map((row) => (
                                   <TableRow key={row.uid}>
                                     <TableCell component="th" scope="row">{row.gym_id}</TableCell>
                                     <TableCell align="right">{row.name}</TableCell>
                                     <TableCell align="right">{row.description}</TableCell>
                                     <TableCell align="right">{row.image}</TableCell>
                                     <TableCell align="right">{row.price}</TableCell>
                                     <TableCell align="right">
                                       <Button
                                         variant="contained"
                                         className={classes3.button}
                                         onClick={() =>
                                           getParticularEquipment(row.uid)
                                         }
                                       >
                                         Edit
                                       </Button>
                                       <Button
                                         variant="contained"
                                         className={classes3.button}
                                         onClick={() => deleteData(row.uid)}
                                       >
                                         Delete
                                       </Button>
                                     </TableCell>
                                   </TableRow>
                                 ))}
                               </TableBody>
                             </Table>
                           </Paper>
                         </KTCodeExample>
                       </div>
                     </div>
                     <PopUpToast
                       successSnackBarOpen={successSnackBarOpen}
                       setSuccessSnackBarOpen={setSuccessSnackBarOpen}
                       vertical="top"
                       horizontal="right"
                       severity={message.type}
                       message={message.message}
                     />
                   </>
                 );
               }

const jsCode1 = `
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <TextField
        id="standard-uncontrolled"
        label="Uncontrolled"
        defaultValue="foo"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        required
        id="standard-required"
        label="Required"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        error
        id="standard-error"
        label="Error"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        disabled
        id="standard-disabled"
        label="Disabled"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
      />
      <TextField
        id="standard-read-only-input"
        label="Read Only"
        defaultValue="Hello World"
        className={classes.textField}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        id="standard-dense"
        label="Dense"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
      />
      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax="4"
        value={values.multiline}
        onChange={handleChange('multiline')}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-multiline-static"
        label="Multiline"
        multiline
        rows="4"
        defaultValue="Default Value"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-helperText"
        label="Helper text"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
      />
      <TextField
        id="standard-with-placeholder"
        label="With placeholder"
        placeholder="Placeholder"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-textarea"
        label="With placeholder multiline"
        placeholder="Placeholder"
        multiline
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-number"
        label="Number"
        value={values.age}
        onChange={handleChange('age')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        className={classes.textField}
        margin="normal"
      />
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-select-currency-native"
        select
        label="Native select"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
      >
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <TextField
        id="standard-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="standard-bare"
        className={classes.textField}
        defaultValue="Bare"
        margin="normal"
        inputProps={{ 'aria-label': 'bare' }}
      />
    </form>
  );
}
`;
