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
// submit button
const useStyles1 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width:200,

  },
  menu: {
    width: 350,
  },
  input: {
    display: "none",
  },
}));
//edit button
const useStyles5 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#000000',
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: '6px 12px 6px 12px',


  },
  menu: {
    width: 350,
  },
  input: {
    display: "none",
  },
}));
//delete button
const useStyles6 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width:150,
    padding: '6px 12px 6px 12px',

  },
  
  input: {
    display: "none",
  },
}));
export default function EquipmentManagement() {
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
  //submit button
  const classes1 = useStyles1();
  //edit button
  const classes5 = useStyles5();
  //delete button
  const classes6 = useStyles6();


  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [message, setMessage] = useState({
    type: "suceess",
    message: "",
  });
  const [editModalOpen, setEditModalOpen] = useState({ open: false, id: null });
  const [getData, setGetData] = useState([]);
  const [getGymData, setGymData] = useState([]);

  const [error, setError] = useState({
    gym_id: "",
    equipment: "",
    quantity: "",
    brand: "",
  });
  const [values, setValues] = useState({
    gym_id: "",
    equipment: "",
    quantity: "",
    brand: "",
  });

  useEffect(() => {
    if (authToken) {
      fetchGymData();
      fetchGetData();
    }
  }, []);

  const fetchGetData = () => {
    fetch("http://13.232.102.139:9000/equipment/", {
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
    e.preventDefault();

    if (values.gym_id === "") {
      return setError({ gym_id: "*GYM Name is mandatary" });
    }
    if (values.equipment === "") {
      return setError({ equipment: "*Equipment is mandatary" });
    }
    if (values.quantity === "") {
      return setError({ quantity: "*Quantity is mandatary" });
    }
    if (values.brand === "") {
      return setError({ brand: "*Brand is mandatary" });
    }
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(values),
    };
    fetch("http://13.232.102.139:9000/equipment/add/", requestOptions)
      .then((response) => {
        if (response.ok) {
          fetchGetData();
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "Equipment Added Successfully",
          });
        } else {
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "Equipment Addition failed",
          });
        }
        return response.json();
      })
      .then((data) => {});
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

  const updateData = (e) => {
    e.preventDefault();

    if (values.gym_id === "") {
      return setError({ gym_id: "*GYM Name is mandatary" });
    }
    if (values.equipment === "") {
      return setError({ equipment: "*Equipment is mandatary" });
    }
    if (values.quantity === "") {
      return setError({ quantity: "*Quantity is mandatary" });
    }
    if (values.brand === "") {
      return setError({ brand: "*Brand is mandatary" });
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ equipment_id: editModalOpen.id, ...values }),
    };
    fetch("http://13.232.102.139:9000/equipment/update", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "Equipment Updated Successfully",
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
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "Equipment Updation failed",
          });
        }
      }
    );
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
    fetch("http://13.232.102.139:9000/equipment/delete", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success

          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "Equipment Deleted Successfully",
          });
          let data = getData.filter((data) => data.uid !== id);
          setGetData(data);
        } else {
          // error
          setMessage({
            type: "success",
            message: "Equipment deletion failed",
          });
        }
      }
    );
  };
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <KTCodeExample
            jsCode={jsCode1}
            beforeCodeTitle={`${
              !editModalOpen.open ? "Add Equipment" : "Update Equipment"
            }`}
            codeBlockHeight="400px"
          >
           
            
            <form className={classes2.container} noValidate autoComplete="off">
              <TextField
                id="outlined-select-currency"
                select
                name="gym_id"
                label="Gym Name"
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
                    <MenuItem key={option.uid} value={option.gym_name}>
                      {option.gym_name}
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                // error
                id="outlined-error"
                name="equipment"
                label="Equipment"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={values.equipment}
                onChange={handleChange("equipment")}
              />
              <TextField
                // error
                id="outlined-error"
                name="quantity"
                label="Quantity"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={values.quantity}
                onChange={handleChange("quantity")}
              />

              <TextField
                // error
                id="outlined-error"
                name="brand"
                label="Brand"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={values.brand}
                onChange={handleChange("brand")}
              />
              <Button
                variant="contained"
                className={classes1.button}
                onClick={editModalOpen.open ? updateData : equipAdd}
              >
                Save & Continue
              </Button>
            </form>
          </KTCodeExample>
        </div>

        <div className="col-md-9">
          <KTCodeExample
            jsCode={jsCode1}
            beforeCodeTitle="View Equipment"
            codeBlockHeight="400px"
          >
            <Paper className={classes4.root}>
              <Table className={classes4.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">GYM Name</TableCell>
                    <TableCell align="left">Equipment</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Brand</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getData?.map((row) => (
                    <TableRow key={row.uid}>
                      <TableCell component="th" scope="row">
                        {row.gym_id}
                      </TableCell>
                      <TableCell align="left">{row.equipment}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{row.brand}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          className={classes5.button}
                          onClick={() => getParticularEquipment(row.uid)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          className={classes6.button}
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
