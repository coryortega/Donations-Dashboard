import Button from "@mui/material/Button";
import { TableView } from "./TableView";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { FileTabs } from "./FileTabs";
import { useDashboardContext } from "./context/context";
import { useNavigate } from "react-router-dom";
import { COLUMNS_NEEDED } from "../constants";
import Tooltip from "@mui/material/Tooltip";
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
  getSingleAndMultiDonors,
  averageDonorGift,
  donorsBySegment,
  getDonorsPerYear,
  totalDonations,
  countUniqueDonors,
  getDateRange,
} from "../utils";

const transformArrayToObject = (array) => {
  return array.reduce((acc, obj) => {
    const { "Constituent ID": id, ...rest } = obj;
    acc[id] = rest;
    return acc;
  }, {});
};

const validateHeaders = (columnsNeeded, headers) => {
  const needed = [];
  for (const header of columnsNeeded) {
    if (!headers.includes(header)) {
      needed.push(header);
    }
  }
  return needed;
};

export const Import = () => {
  const [columnNames, setColumnNames] = useState({});
  const [values, setValues] = useState({});
  const [files, setFiles] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [headersNeeded, setHeadersNeeded] = useState(COLUMNS_NEEDED);
  const navigate = useNavigate();

  const { setDashboardData } = useDashboardContext();

  const tabChangeHandler = (newValue) => {
    setCurrentFile(newValue);
  };

  const changeHandler = (event) => {
    const fileName = event.target.files[0].name;
    setFiles([...files, fileName]);
    setCurrentFile(fileName);
    const currHeaders = [];
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
          currHeaders.push(columnName);
        });
        setHeaders([...headers, ...currHeaders]);
        setColumnNames({ ...columnNames, [fileName]: columnsArray });
        setValues({ ...values, [fileName]: valuesArray });
      },
    });
  };

  const getCorrectFileNames = () => {
    let fileNames = { donors: "", donations: "" };
    files.forEach((name) => {
      if ("Account Amount" in values[name][0]) {
        fileNames.donations = name;
      } else if ("Name" in values[name][0]) {
        fileNames.donors = name;
      }
    });

    return fileNames;
  };

  const handleDashboardCreate = () => {
    const donors = values[getCorrectFileNames().donors];
    const donorsObj = transformArrayToObject(donors);
    const donations = values[getCorrectFileNames().donations];
    const lastYear = new Date().getFullYear() - 1;
    const endTime = lastYear;
    setDashboardData({
      total_donations: totalDonations(donations),
      total_unique_donors: countUniqueDonors(donations),
      total_annual_donors: countGiftsByYear(donations),
      date_range: getDateRange(donations),
      donors_per_year: getDonorsPerYear(donations),
      total_annual_donations: accumulateAmountByYear(donations),
      total_monthly_donations: revenuByMonth(donations),
      first_time_donors: getFirstTimeDonors(donations),
      single_and_multi_donors: getSingleAndMultiDonors(donations),
      donor_types_by_year: getDonorTypesByYear(donations, donorsObj),
      history: {
        avg_gift: averageGift(donations),
        avg_gift_1: averageGift(donations, lastYear, lastYear),
        avg_gift_3: averageGift(donations, lastYear - 5, lastYear),
        avg_donor_gift: averageDonorGift(donations),
        avg_donor_gift_1: averageDonorGift(donations, lastYear, lastYear),
        avg_donor_gift_3: averageDonorGift(donations, lastYear - 5, lastYear),
        avg_donor_lifespan: averageDonorLifespan(donations),
        avg_donor_lifespan_1: averageDonorLifespan(
          donations,
          lastYear,
          lastYear
        ),
        avg_donor_lifespan_3: averageDonorLifespan(
          donations,
          lastYear - 5,
          lastYear
        ),
        avg_donor_frequency: averageDonorFrequency(donations),
        avg_donor_frequency_1: averageDonorFrequency(
          donations,
          lastYear,
          endTime
        ),
        avg_donor_frequency_3: averageDonorFrequency(
          donations,
          lastYear - 5,
          endTime
        ),
      },
      revenue_by_segment: {
        1: revenueBySegment(donations, lastYear, lastYear),
        5: revenueBySegment(donations, lastYear - 4, lastYear),
      },
      donors_by_segment: {
        1: donorsBySegment(donations, lastYear, lastYear),
        5: donorsBySegment(donations, lastYear - 4, lastYear),
      },
    });
    navigate("/");
  };

  useEffect(() => {
    const needed = validateHeaders(COLUMNS_NEEDED, headers);
    setHeadersNeeded(needed);
  }, [headers]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%" }}>
          <FileTabs fileNames={files} tabChangeHandler={tabChangeHandler} />
        </div>
        <div style={{ display: "flex", width: "500px", justifyContent: "end" }}>
          <input
            style={{ display: "none" }}
            id="raised-button-file"
            multiple={false}
            type="file"
            accept=".csv"
            onChange={changeHandler}
          />{" "}
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Import CSV
            </Button>
          </label>
          <Tooltip
            disableHoverListener={!headersNeeded.length}
            title={
              headersNeeded.length ? (
                <p style={{ fontSize: "15px" }}>
                  Missing required headers:{" "}
                  <strong>
                    {headersNeeded.map((header, i) => {
                      return `${header}${
                        headersNeeded.length !== i + 1 ? "," : ""
                      } `;
                    })}
                  </strong>
                </p>
              ) : (
                ""
              )
            }
          >
            <div
              style={{
                display: "inline-block", // Maintain the button's inline-block display
                cursor: "not-allowed", // Show not-allowed cursor on hover
                marginLeft: "10px",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                disabled={headersNeeded.length}
                onClick={handleDashboardCreate}
              >
                Generate Dashboard
              </Button>
            </div>
          </Tooltip>
        </div>
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
