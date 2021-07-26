/* eslint-disable no-restricted-imports */
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";
import clsx from "clsx";
import { TextField, InputBase } from "@material-ui/core";
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
import Button from "@material-ui/core/Button";
import { getDate } from "date-fns";

// Submit
const useStyles3 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

const currencies = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

//view user
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

// add user
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

export default function TransferListExamplePage() {
  // submit button
  const classes3 = useStyles3();

  //view gym
  const classes4 = useStyles4();
  // add gym
  const classes2 = useStyles2();
  const [selectedFile, setSelectedFile] = React.useState({
    lease_agreement: null,
    electricity_bill: null,
    bank_statement: null,
  });
  const [isSelected, setIsSelected] = React.useState(false);
  const [getData, setGetData] = React.useState([]);
  const [values, setValues] = React.useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    latitudet: "",
    longitude: "",
  });
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );
  // console.log("filesdata",files)
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    // console.log("data of gym",values)
  };
  const changeHandler = (name) => (event) => {
    setSelectedFile({ ...selectedFile, [name]: event.target.files[0] });
    setIsSelected(true);
  };

  const handleInput = () => {
    console.log(values);
    console.log(selectedFile);
// address1: "delhi ashok nagar"
// address2: "new delhi "
// bank_statement: "/home/ubuntu/test2/gym_upload/1626873618572-signature.jpg"
// city: "delhi"
// country: "india"
// date_added: "1626873620"
// electricity_bill: "/home/ubuntu/test2/gym_upload/1626873617487-document-2.jpg"
// gym_name: "gold_gym"
// late_updated: null
// latitude: "28.7041° N"
// lease_agreement: "/home/ubuntu/test2/gym_upload/1626873616205-doucment-1.jpg"
// longitude: "77.1025° E"
// name: "gold"
// pin: "345678"
// state: "delhi"
// uid: "vnICjKVi3e3bo
    const data = new FormData();
    data.append("name", values.name);
    data.append("gym_name", values.name);
    data.append("address1", values.address1);
    data.append("address2", values.address2);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("pin", values.pin);
    data.append("country", values.country);
    data.append("lat", "1221212");
    data.append("long", "11212");
    data.append("lease_agreement", selectedFile.lease_agreement);
    data.append("electricity_bill", selectedFile.electricity_bill);
    data.append("bank_statement", selectedFile.bank_statement);
    data.append("user_id", "zeWBVGFpEKTBh");

    fetch("http://13.232.102.139:9000/gym/add", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    })
      .then((response) => response.json())
      .then((values) => {
        console.log("Success PostData:", values);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchGetData = () => {
    fetch("http://13.232.102.139:9000/gym/", {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setGetData(responseJson.data);
        console.log("Success GetData :", responseJson);
      });
  };

  useEffect(() => {
    fetchGetData();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <KTCodeExample
            // jsCode={jsCode2}
            beforeCodeTitle="Add Gym"
            codeBlockHeight="400px"
          >
            <div className="separator separator-dashed my-7"></div>
            <form className={classes2.container} noValidate autoComplete="on">
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
                type="text"
                className={classes2.textField}
                value={values.city}
                onChange={handleChange("city")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="State"
                type="text"
                className={classes2.textField}
                value={values.state}
                onChange={handleChange("state")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Pin"
                type="number"
                className={classes2.textField}
                value={values.pin}
                onChange={handleChange("pin")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Country"
                type="text"
                className={classes2.textField}
                value={values.country}
                onChange={handleChange("country")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Lease Agreement"
                type="file"
                className={classes2.textField}
                // name='lease_agreement'
                // value={selectedFile.lease_agreement}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    lease_agreement: e.target.files[0],
                  })
                }
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined"
                label="Electricity Bill"
                type="file"
                className={classes2.textField}
                //  name='electricity_bill'
                // value={selectedFile.electricity_bill}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    electricity_bill: e.target.files[0],
                  })
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Bank Statement"
                type="file"
                className={classes2.textField}
                //  name='electricity_bill'
                // value={selectedFile.electricity_bill}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    bank_statement: e.target.files[0],
                  })
                }
                margin="normal"
                variant="outlined"
              />
            </form>
            <Button
              type="submit"
              variant="contained"
              className={classes3.button}
              onClick={handleInput}
            >
              Submit
            </Button>
          </KTCodeExample>
        </div>

        <div className="col-md-8">
          <KTCodeExample
            // jsCode={jsCode4}
            beforeCodeTitle="View Gym"
            // codeBlockHeight="400px"
          >
            <Paper className={classes4.root}>
              <Table className={classes4.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Trainer Name</TableCell>
                    <TableCell align="right">Address 1</TableCell>
                    <TableCell align="right">Address 2</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Pin</TableCell>
                    <TableCell align="right">Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {console.log(getData)}
                  {getData?.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {/* <TableCell align="right">{row.name}</TableCell> */}
                      <TableCell align="right">{row.address1}</TableCell>
                      <TableCell align="right">{row.address2}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.pin}</TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.latitude}</TableCell>
                      <TableCell align="right">{row.longitude}</TableCell>
                      <TableCell align="right">{row.lease_agreement}</TableCell>
                      <TableCell align="right">
                        {row.electricity_bill}
                      </TableCell>
                      <TableCell align="right">{row.bank_statement}</TableCell>
                      <Button
                        type="submit"
                        variant="contained"
                        className={classes3.button}
                      >
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
