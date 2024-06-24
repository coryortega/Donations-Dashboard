import { createContext, useContext, useState, memo } from "react";

export const DashboardContext = createContext();

export const DashboardContextStore = memo(function DashboardContextStore(props) {
  const [dashboardData, setDashboardData] = useState({});
  const [files, setFiles] = useState([]);
  const [columnNames, setColumnNames] = useState({});
  const [values, setValues] = useState({});
  const [donations, setDonations] = useState([]);
  const [donors, setDonors] = useState([]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        columnNames,
        setColumnNames,
        values,
        setValues,
        files,
        setFiles,
        donations,
        setDonations,
        donors,
        setDonors
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
});

export const useDashboardContext = () => useContext(DashboardContext);
