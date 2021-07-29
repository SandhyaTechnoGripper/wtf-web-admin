/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import clsx from "clsx";
import { TextField, InputBase } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import {
  fade,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

import { Notice, KTCodeExample } from "../../_metronic/_partials/controls";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getDate } from "date-fns";
import PopUpToast from "../../_metronic/layout/components/PopUpToast/PopUpToast";

// Submit
const useStyles3 = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width:177,

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

export default function GymManagement() {
  //submit button
  const classes3 = useStyles3();
  //edit button
  const classes5 = useStyles5();
  //delete button
  const classes6 = useStyles6();
  //view gym
  const classes4 = useStyles4();
  // add gym
  const classes2 = useStyles2();
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [message, setMessage] = useState({
    type: "suceess",
    message: "",
  });
  const [editModalOpen, setEditModalOpen] = useState({
    open: false,
    id: null,
  });
  const [selectedFile, setSelectedFile] = useState({
    lease_agreement: null,
    electricity_bill: null,
    bank_statement: null,
  });
  const [getData, setGetData] = useState([]);
  const [values, setValues] = useState({
    user_id: "",
    name: "",
    gym_name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState({
    user_id: "",
    name: "",
    gym_name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    latitude: "",
    longitude: "",
  });
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (authToken) {
      fetchGetData();
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const changeHandler = (name) => (event) => {
    setSelectedFile({
      ...selectedFile,
      [name]: event.target.files[0],
    });
  };

  const gymAdd = () => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("gym_name", values.gym_name);
    data.append("address1", values.address1);
    data.append("address2", values.address2);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("pin", values.pin);
    data.append("country", values.country);
    data.append("lat", values.latitude);
    data.append("long", values.longitude);
    data.append("lease_agreement", selectedFile.lease_agreement);
    data.append("electricity_bill", selectedFile.electricity_bill);
    data.append("bank_statement", selectedFile.bank_statement);
    data.append("user_id", values.user_id);

    if (values.name === "") {
      return setError({ mode: "*Name is mandatary" });
    }
    if (values.gym_name === "") {
      return setError({ name: "*GYM Name is mandatary" });
    }
    if (values.address1 === "") {
      return setError({ date: "*Address 1 is mandatary" });
    }
    if (values.address2 === "") {
      return setError({ is_public: "*Address 2 is mandatary" });
    }
    if (values.city === "") {
      return setError({ description: "*City is mandatary" });
    }
    if (values.state === "") {
      return setError({ price: "*State is mandatary" });
    }
    if (values.pin === "") {
      return setError({ price: "*Pin is mandatary" });
    }
    if (values.country === "") {
      return setError({ price: "*Country is mandatary" });
    }
    if (values.latitude === "") {
      return setError({ price: "*Latitude is mandatary" });
    }
    if (values.longitude === "") {
      return setError({ price: "*Longitude is mandatary" });
    }
    if (!selectedFile.lease_agreement) {
      return setError({ price: "*Lease Agreement is mandatary" });
    }
    if (!selectedFile.electricity_bill) {
      return setError({ price: "*Electricity is mandatary" });
    }
    if (!selectedFile.bank_statement) {
      return setError({ price: "*Bank Statement is mandatary" });
    }

    fetch("http://13.232.102.139:9000/gym/add", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          fetchGetData();
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "GYM Added Successfully",
          });
        } else {
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "GYM Added failed",
          });
        }
        return response.json();
      })
      .then((values) => {
        console.log("Success PostData:", values);
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

  const getParticularGym = (id) => {
    if (editModalOpen.open) {
      setValues({
        name: "",
        gym_name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pin: "",
        country: "",
        latitude: "",
        longitude: "",
      });
      return setEditModalOpen({ open: false, id: null });
    }

    setEditModalOpen({ open: true, id: id });
    let gym = getData.filter((data) => data.uid === id);
    setValues({
      name: gym[0].name,
      user_id: gym[0].user_id,
      gym_name: gym[0].gym_name,
      address1: gym[0].address1,
      address2: gym[0].address2,
      state: gym[0].state,
      pin: gym[0].pin,
      country: gym[0].country,
      latitude: gym[0].latitude,
      longitude: gym[0].longitude,
    });
  };

  const updateData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", values.name);
    data.append("gym_name", values.gym_name);
    data.append("address1", values.address1);
    data.append("address2", values.address2);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("pin", values.pin);
    data.append("country", values.country);
    data.append("lat", values.latitude);
    data.append("long", values.longitude);
    data.append("lease_agreement", selectedFile.lease_agreement);
    data.append("electricity_bill", selectedFile.electricity_bill);
    data.append("bank_statement", selectedFile.bank_statement);
    data.append("user_id", values.user_id);

    if (values.name === "") {
      return setError({ mode: "*Name is mandatary" });
    }
    if (values.gym_name === "") {
      return setError({ name: "*GYM Name is mandatary" });
    }
    if (values.address1 === "") {
      return setError({ date: "*Address 1 is mandatary" });
    }
    if (values.address2 === "") {
      return setError({ is_public: "*Address 2 is mandatary" });
    }
    if (values.city === "") {
      return setError({ description: "*City is mandatary" });
    }
    if (values.state === "") {
      return setError({ price: "*State is mandatary" });
    }
    if (values.pin === "") {
      return setError({ price: "*Pin is mandatary" });
    }
    if (values.country === "") {
      return setError({ price: "*Country is mandatary" });
    }
    if (values.latitude === "") {
      return setError({ price: "*Latitude is mandatary" });
    }
    if (values.longitude === "") {
      return setError({ price: "*Longitude is mandatary" });
    }
    if (!selectedFile.lease_agreement) {
      return setError({ price: "*Lease Agreement is mandatary" });
    }
    if (!selectedFile.electricity_bill) {
      return setError({ price: "*Electricity is mandatary" });
    }
    if (!selectedFile.bank_statement) {
      return setError({ price: "*Bank Statement is mandatary" });
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    };
    fetch("http://13.232.102.139:9000/gym/update", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "GYM Updated Successfully",
          });
          fetchGetData();
          setValues({
            name: "",
            gym_name: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            pin: "",
            country: "",
            latitude: "",
            longitude: "",
          });
        } else {
          // error
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "GYM Updation failed",
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
    fetch("http://13.232.102.139:9000/gym/delete", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "GYM Deleted Successfully",
          });
          let data = getData.filter((data) => data.uid !== id);
          setGetData(data);
        } else {
          // error
          setMessage({
            type: "error",
            message: "GYM deletion failed",
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
            // jsCode={jsCode2}
            beforeCodeTitle={`${
              !editModalOpen.open ? "Add Gym" : "Update Gym"
            }`}
            codeBlockHeight="400px"
          >
            
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
                id="outlined-name"
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
                label="Latitude"
                type="text"
                className={classes2.textField}
                value={values.latitude}
                onChange={handleChange("latitude")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Longitude"
                type="text"
                className={classes2.textField}
                value={values.longitude}
                onChange={handleChange("longitude")}
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
              onClick={editModalOpen.open ? updateData : gymAdd}
            >
              Save & Continue
            </Button>
          </KTCodeExample>
        </div>

        <div className="col-md-9">
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
                    <TableCell align="right">Latitude</TableCell>
                    <TableCell align="right">Longitudet</TableCell>
                    <TableCell align="right">Lease Agreement</TableCell>
                    <TableCell align="right">Electricity Bill</TableCell>
                    <TableCell align="right">Bank Statement</TableCell>
                    <TableCell align="right">Action</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getData?.map((row) => (
                    <TableRow key={row.uid}>
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
                        variant="contained"
                        className={classes5.button}
                        onClick={() => getParticularGym(row.uid)}
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
        severity="success"
        message={""}
      />
    </>
  );
}
