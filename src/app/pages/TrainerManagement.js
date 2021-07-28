/* eslint-disable no-restricted-imports */
import React, { useEffect, useState } from "react";
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

import { Notice, KTCodeExample } from "../../_metronic/_partials/controls";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function TrainerManagement() {
  // submit button
  const classes3 = useStyles3();
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
    aadhar_card: null,
    pan_card: null,
  });

  const [getData, setGetData] = useState([]);
  const [values, setValues] = useState({
    name: "",
    gym_name: "",
    gym_id: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    date_oboarding: "",
    user_id: "",
  });
  const [error, setError] = useState({
    name: "",
    gym_name: "",
    gym_id: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
    country: "",
    date_oboarding: "",
    user_id: "",
  });
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );

  useEffect(() => {
    fetchGetData();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const trainerAdd = () => {
    if (values.name === "") {
      return setError({ name: "*Name is mandatary" });
    }
    if (values.gym_name === "") {
      return setError({ gym_name: "*GYM Name is mandatary" });
    }
    if (
      !values.email ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      return setError({ email: "*Please enter valid email" });
    }
    if (values.address1 === "") {
      return setError({ address1: "*Address 1 is mandatary" });
    }
    if (values.address2 === "") {
      return setError({ address2: "*Address 2 is mandatary" });
    }
    if (values.city === "") {
      return setError({ city: "*City is mandatary" });
    }
    if (values.state === "") {
      return setError({ state: "*State is mandatary" });
    }
    if (values.pin === "") {
      return setError({ pin: "*Pin is mandatary" });
    }
    if (values.country === "") {
      return setError({ country: "*Country is mandatary" });
    }
    if (values.date_oboarding === "") {
      return setError({ date_oboarding: "*Date is mandatary" });
    }
    if (!selectedFile.aadhar_card) {
      return setError({ aadhar_card: "*Aadhar card is mandatary" });
    }
    if (!selectedFile.pan_card) {
      return setError({ pan_card: "*Pan card is mandatary" });
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("gym_name", values.gym_name);
    data.append("gym_id", values.gym_id);
    data.append("email", values.email);
    data.append("address1", values.address1);
    data.append("address2", values.address2);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("pin", values.pin);
    data.append("country", values.country);
    data.append("date_oboarding", values.date_oboarding);
    data.append("aadhar_card", selectedFile.aadhar_card);
    data.append("pan_card", selectedFile.pan_card);
    data.append("user_id", values.user_id);

    fetch("http://13.232.102.139:9000/trainer/add", {
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
            message: "Trainer Added Successfully",
          });
        } else {
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "Trainer Added failed",
          });
        }
        return response.json();
      })
      .then((values) => {
        console.log("Success PostData:", values);
      });
  };
  const fetchGetData = () => {
    fetch("http://13.232.102.139:9000/trainer/", {
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

  const getParticularTrainer = (id) => {
    if (editModalOpen.open) {
      setValues({
        name: "",
        gym_name: "",
        gym_id: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pin: "",
        country: "",
        date_oboarding: "",
      });
      return setEditModalOpen({ open: false, id: null });
    }

    setEditModalOpen({ open: true, id: id });
    let trainer = getData.filter((data) => data.uid === id);
    setValues({
      name: trainer[0].name,
      user_id: trainer[0].user_id,
      gym_name: trainer[0].gym_name,
      gym_id: trainer[0].gym_id,
      email: trainer[0].email,
      address1: trainer[0].address1,
      address2: trainer[0].address2,
      city: trainer[0].city,
      state: trainer[0].state,
      pin: trainer[0].pin,
      country: trainer[0].country,
      date_oboarding: trainer[0].date_oboarding,
    });
  };

  const updateData = (e) => {
    e.preventDefault();

    if (values.name === "") {
      return setError({ name: "*Name is mandatary" });
    }
    if (values.gym_name === "") {
      return setError({ gym_name: "*GYM Name is mandatary" });
    }
    if (
      !values.email ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        values.email
      )
    ) {
      return setError({ email: "*Please enter valid email" });
    }
    if (values.address1 === "") {
      return setError({ address1: "*Address 1 is mandatary" });
    }
    if (values.address2 === "") {
      return setError({ address2: "*Address 2 is mandatary" });
    }
    if (values.city === "") {
      return setError({ city: "*City is mandatary" });
    }
    if (values.state === "") {
      return setError({ state: "*State is mandatary" });
    }
    if (values.pin === "") {
      return setError({ pin: "*Pin is mandatary" });
    }
    if (values.country === "") {
      return setError({ country: "*Country is mandatary" });
    }
    if (values.date_oboarding === "") {
      return setError({ date_oboarding: "*Date is mandatary" });
    }
    if (!selectedFile.aadhar_card) {
      return setError({ aadhar_card: "*Aadhar card is mandatary" });
    }
    if (!selectedFile.pan_card) {
      return setError({ pan_card: "*Pan card is mandatary" });
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("gym_name", values.gym_name);
    data.append("gym_id", values.gym_id);
    data.append("email", values.email);
    data.append("address1", values.address1);
    data.append("address2", values.address2);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("pin", values.pin);
    data.append("country", values.country);
    data.append("date_oboarding", values.date_oboarding);
    data.append("aadhar_card", selectedFile.aadhar_card);
    data.append("pan_card", selectedFile.pan_card);
    data.append("user_id", values.user_id);

    const requestOptions = {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: data,
    };
    fetch("http://13.232.102.139:9000/trainer/update", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "Trainer Updated Successfully",
          });
          fetchGetData();
          setValues({
            name: "",
            gym_name: "",
            gym_id: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            pin: "",
            country: "",
            date_oboarding: "",
          });
        } else {
          // error
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "error",
            message: "Trainer Updation failed",
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
    fetch("http://13.232.102.139:9000/trainer/delete", requestOptions).then(
      (response) => {
        if (response.ok) {
          // success
          setSuccessSnackBarOpen(true);
          setMessage({
            type: "success",
            message: "Trainer Deleted Successfully",
          });
          let data = getData.filter((data) => data.uid !== id);
          setGetData(data);
        } else {
          // error
          setMessage({
            type: "error",
            message: "Trainer deletion failed",
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
              !editModalOpen.open ? "Add Trainer" : "Update Trainer"
            }`}
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
                id="outlined-name"
                label="GYM Name"
                className={classes2.textField}
                value={values.gym_name}
                onChange={handleChange("gym_name")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Email"
                type="email"
                className={classes2.textField}
                value={values.email}
                onChange={handleChange("email")}
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
                label="Date"
                type="date"
                className={classes2.textField}
                value={values.date_oboarding}
                onChange={handleChange("date_oboarding")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="outlined"
                label="Aadhar Card"
                type="file"
                className={classes2.textField}
                //  name='electricity_bill'
                // value={selectedFile.electricity_bill}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    aadhar_card: e.target.files[0],
                  })
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined"
                label="Pan card"
                type="file"
                className={classes2.textField}
                //  name='electricity_bill'
                // value={selectedFile.electricity_bill}
                onChange={(e) =>
                  setSelectedFile({
                    ...selectedFile,
                    pan_card: e.target.files[0],
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
              onClick={editModalOpen.open ? updateData : trainerAdd}
            >
              Submit
            </Button>
          </KTCodeExample>
        </div>

        <div className="col-md-9">
          <KTCodeExample
            // jsCode={jsCode4}
            beforeCodeTitle="View Trainer"
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
                        className={classes3.button}
                        onClick={() => getParticularTrainer(row.uid)}
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
