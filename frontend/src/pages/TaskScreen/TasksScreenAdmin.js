import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { csvImport } from "../../helper/csvImportApiCalls";

const listStyle = { margin: "8px 20px", width: 250 };

const TaskScreenAdmin = () => {
  const data = [
    [
      "applicationSeqNo",
      "applicantName",
      "dateOfBirth",
      "email",
      "mobile",
      "countryName",
      "gender",
      "category",
      "nationality",
      "physcialDisablity",
      "addressLine1",
      "addressLine2",
      "addressLine3",
      "communicationAddressCountry",
      "state",
      "district",
      "city",
      "pincode",
      "percentageVALR",
      "percentileVALR",
      "percentageDM",
      "percentileDM",
      "percentageQA",
      "percentileQA",
      "percentageGK",
      "percentileGK",
      "perWithoutGK",
      "percentileWithoutGK",
      "rankWithoutGK",
    ],
  ];

  const [values, setValues] = useState({
    csv: "",
    source: "",
    entrance: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
    email: "",
    count: 0,
  });

  const {
    csv,
    source,
    entrance,
    loading,
    error,
    success,
    formData,
    email,
    count,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "csv" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  //load all users here
  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    csvImport(formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          email: data.email,
          error: data.error,
          loading: false,
          source: "",
          entrance: "",
        });
      } else {
        setValues({
          ...values,
          csv: "",
          loading: false,
          source: "",
          entrance: "",
          success: data.message,
          count: data.count,
        });
      }
    });
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row mt-3">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              <h5>Loading...</h5>
            </div>
          </div>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {email}
            {error}
          </div>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success mt-4"
            style={{ display: success ? "" : "none" }}
          >
            {count}
            {success}
          </div>
        </div>
      </div>
    );
  };
  const textStyle = {
    marginTop: "50px",
    marginLeft: "42%",
    color: "red",
  };

  const paperStyle = {
    padding: 20,
    height: "90%",
    width: "80%",
    margin: "50px 50px 50px 50px",
  };
  const inputStyle = {
    marginLeft: "30px",
    marginTop: "40px",
  };

  const TaskScreenAdminForm = () => {
    return (
      <form>
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: 400,
            flexWrap: "wrap",
          }}
        >
          <Grid align="center">
            <Paper elevation={20} style={paperStyle}>
              <div style={{ width: "100%", float: "left" }}>
                <p>
                  {" "}
                  Use the form below to upload a csv file.Click
                  <CSVLink data={data} filename={"leads.csv"}>
                    {" "}
                    here
                  </CSVLink>{" "}
                  for an example template.
                </p>
              </div>

              <input
                style={inputStyle}
                name="csv"
                type="file"
                accept="*.csv"
                id="contained-button-file"
                onChange={handleChange("csv")}
              />
              <FormControl style={{ margin: "40px", width: 250 }}>
                <InputLabel>Source</InputLabel>
                <Select
                  labelId=""
                  id=""
                  value={source}
                  label="Source"
                  onChange={handleChange("source")}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value={"Social Media"}>Social Media</MenuItem>
                  <MenuItem value={"Walk in"}>Walk In</MenuItem>
                  <MenuItem value={"Coaching Class"}>Coaching Class</MenuItem>
                  <MenuItem value={"Outdoor"}>Outdoor</MenuItem>
                  <MenuItem value={"Digital Fair"}>Digital Fair</MenuItem>
                  <MenuItem value={"Paraphernalia"}>Paraphernalia</MenuItem>
                </Select>
              </FormControl>

              <FormControl style={listStyle}>
                <InputLabel>Entrance Exam</InputLabel>
                <Select
                  labelId=""
                  id=""
                  required
                  value={entrance}
                  label="Entrance Exam"
                  onChange={handleChange("entrance")}
                >
                  <MenuItem value="">
                    <em>OTHER</em>
                  </MenuItem>
                  <MenuItem value={"cat"}>CAT</MenuItem>
                  <MenuItem value={"mat"}>MAT</MenuItem>
                  <MenuItem value={"cmat"}>C-MAT</MenuItem>
                  <MenuItem value={"xat"}>XAT</MenuItem>
                  <MenuItem value={"mhcet"}>MH-CET</MenuItem>
                  <MenuItem value={"xat"}>XAT</MenuItem>
                  <MenuItem value={"ATMA"}>ATMA</MenuItem>
                </Select>
              </FormControl>

              <label htmlFor="contained-button-file">
                <Button
                  style={{ marginTop: "40px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                >
                  Upload
                </Button>
              </label>
            </Paper>
          </Grid>
        </div>
      </form>
    );
  };
  return (
    <>
      <h1 style={textStyle}>Admin Task Screen</h1>
      {loadingMessage()},{successMessage()},{errorMessage()},
      {TaskScreenAdminForm()}
    </>
  );
};

export default TaskScreenAdmin;
