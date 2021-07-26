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

import {
  Notice,
  KTCodeExample,
} from "../../../../_metronic/_partials/controls";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

  const [getData, setGetData] = useState([]);

  const [gym_id, setGymId] = useState("");
  const [equipment, setEquipment] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (authToken) {
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
        console.log("Success GetData :", responseJson);
      });
  };

  const equipAdd = (e) => {
    e.preventDefault();

    const postData = {
      gym_id,
      equipment,
      quantity,
      brand,
    };
    console.log("clicked", postData);
    // console.log(typeof postData);
    // console.log(postData);

    // // POST request using fetch inside useEffect React hook
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(postData),
    // };
    // fetch("http://13.232.102.139:9000/user/add", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => postData);
  };

  return (
    <>
      <Notice icon="flaticon-warning font-primary">
        <span>Text fields let users enter and edit text.</span>{" "}
        <span>
          For more info please check the components's official{" "}
          <a
            target="_blank"
            className="font-weight-bold"
            rel="noopener noreferrer"
            href="https://material-ui.com/components/text-fields/"
          >
            demos & documentation
          </a>
        </span>
      </Notice>
      <div className="row">
        <div className="col-md-4">
          <KTCodeExample
            jsCode={jsCode1}
            beforeCodeTitle="Add Equipment"
            codeBlockHeight="400px"
          >
            <span>
              <code>TextField</code> supports outlined styling.
            </span>
            <div className="separator separator-dashed my-7"></div>
            <form className={classes2.container} noValidate autoComplete="off">
              <TextField
                id="outlined-select-currency"
                select
                name="gym_id"
                label="Equipment Id"
                className={classes2.textField}
                value={gym_id}
                onChange={(e) => setGymId(e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes2.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {getData?.length > 0 &&
                  getData.map((option) => (
                    <MenuItem key={option.uid} value={option.gym_id}>
                      {option.gym_id}
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                error
                id="outlined-error"
                name="equipment"
                label="Equipment"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
              />
              <TextField
                error
                id="outlined-error"
                name="quantity"
                label="Quantity"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <TextField
                error
                id="outlined-error"
                name="brand"
                label="Brand"
                className={classes2.textField}
                margin="normal"
                variant="outlined"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <Button
                variant="contained"
                className={classes3.button}
                onClick={equipAdd}
              >
                Submit
              </Button>
            </form>
          </KTCodeExample>

          {/* <KTCodeExample
            jsCode={jsCode1}
            beforeCodeTitle="Update User"
            codeBlockHeight="400px"
          >
            <span>
              <code>TextField</code> supports outlined styling.
            </span>
            <div className="separator separator-dashed my-7"></div>
            <form className={classes2.container} noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label="Name"
                className={classes3.textField}
                value={values3.name}
                onChange={handleChange3("name")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                error
                id="outlined-error"
                label="Account type"
                className={classes3.textField}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes3.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                className={classes3.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="Phone"
                type="number"
                className={classes3.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-select-currency"
                select
                label="Status"
                className={classes3.textField}
                value={values3.currency}
                onChange={handleChange3("currency")}
                SelectProps={{
                  MenuProps: {
                    className: classes3.menu,
                  },
                }}
                margin="normal"
                variant="outlined"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </form>
          </KTCodeExample> */}
        </div>

        <div className="col-md-8">
          <KTCodeExample
            jsCode={jsCode1}
            beforeCodeTitle="View Equipment"
            codeBlockHeight="400px"
          >
            <Paper className={classes4.root}>
              <Table className={classes4.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipment Id</TableCell>
                    <TableCell align="right">Equipment</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getData?.map((row) => (
                    <TableRow key={row.uid}>
                      <TableCell component="th" scope="row">
                        {row.gym_id}
                      </TableCell>
                      <TableCell align="right">{row.equipment}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
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
