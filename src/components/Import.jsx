import Button from "@mui/material/Button";
import { TableView } from "./TableView";
import Papa from "papaparse";
import { useState } from "react";
import { FileTabs } from "./FileTabs";
import { useDashboardContext } from "./context/context";
import { useNavigate } from "react-router-dom";
import { COLUMNS_NEEDED } from "../constants";
import {
  accumulateAmountByYear,
  countGiftsByYear,
  getFirstTimeDonors,
  revenuByMonth,
  revenueBySegment,
  averageDonorFrequency,
  averageDonorLifespan,
  averageGift,
  getDonorTypesByYear,
  getSingleAndMultiDonors
} from "../utils";

const transformArrayToObject = (array) => {
  return array.reduce((acc, obj) => {
    const { 'Constituent ID': id, ...rest } = obj;
    acc[id] = rest;
    return acc;
  }, {});
};

export const Import = () => {
  const [columnNames, setColumnNames] = useState({});
  const [values, setValues] = useState({});
  const [files, setFiles] = useState([])
  const [currentFile, setCurrentFile] = useState("");
  const navigate = useNavigate();

  const { setDonations, setDonors, setDashboardData } =
    useDashboardContext();

  const tabChangeHandler = (newValue) => {
    setCurrentFile(newValue);
  };

  const changeHandler = (event) => {
    const fileName = event.target.files[0].name;
    setFiles([...files, fileName]);
    setCurrentFile(fileName);
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const columnsArray = [];

        results.data.forEach((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push({
            ...d,
            id: d["Constituent ID"],
          });
        });
        rowsArray[0].forEach((columnName) => {
          columnsArray.push({
            field: columnName,
            headerName: columnName,
            width: 160,
            editable: false,
          });
        });
        setColumnNames({ ...columnNames, [fileName]: columnsArray });
        setValues({ ...values, [fileName]: valuesArray });
      },
    });
  };

  const handleDashboardCreate = () => {
    const donors = values["febccm_donors.csv"];
    const donorsObj = transformArrayToObject(donors);
    const donations = values["febccm_gift.csv"];
    const lastYear = new Date().getFullYear() - 1;
    const startTime = lastYear - 3;
    const endTime = lastYear;
    setDashboardData({
      total_annual_donors: countGiftsByYear(donations),
      total_annual_donations: accumulateAmountByYear(donations),
      total_monthly_donations: revenuByMonth(donations),
      first_time_donors: getFirstTimeDonors(donations),
      single_and_multi_donors: getSingleAndMultiDonors(donations),
      donor_types_by_year: getDonorTypesByYear(donations, donorsObj), 
      history: {
        avg_gift: averageGift(donations),
        avg_gift_3: averageGift(donations, 3),
        avg_donor_lifespan: averageDonorLifespan(donations),
        avg_donor_lifespan_3: averageDonorLifespan(donations, 3),
        avg_donor_frequency: averageDonorFrequency(donations),
        avg_donor_frequency_3: averageDonorFrequency(donations, startTime, endTime),
      },
      revenue_by_segment: {
        1: revenueBySegment(donations, 1),
        5: revenueBySegment(donations),
      },
    });
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FileTabs fileNames={files} tabChangeHandler={tabChangeHandler} />
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          accept=".csv"
          onChange={changeHandler}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Import CSV
          </Button>
        </label>
        <Button
          variant="outlined"
          color="success"
          disabled={!Object.keys(values).length}
          onClick={handleDashboardCreate}
          // component={Link} to="/"
        >
          Generate Dashboard
        </Button>
      </div>
      {files.length ? (
        files.map((file) => {
          if (file === currentFile) {
            return (
              <TableView
                columns={columnNames[file]}
                values={values[file]}
                setColumns={setColumnNames}
                currentFile={file}
                key={file}
              />
            );
          }
        })
      ) : (
        <TableView
          columns={[]}
          values={[]}
          setColumns={setColumnNames}
          currentFile={currentFile}
        />
      )}
    </div>
  );
};
