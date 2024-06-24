import { useState } from "react";
import { BasicLineChart } from "./charts/LineChart";
import { useDashboardContext } from "./context/context";
import { HistoryCards } from "./charts/HistoryCards";
import { BasicPieChart } from "./charts/PieChart";
import { BasicBarChart } from "./charts/BarChart";
import { TabsContainer } from "./TabsContainer";
import { EmptyDashboardState } from "./EmptyDashboardState";
import { ChartContainer } from "./charts/ChartContainer";
import { transformDataByYear } from "../utils";
import Box from "@mui/material/Box";

export const Dashboard = () => {
  const [value, setValue] = useState("1 Year");
  const [value2, setValue2] = useState("1 Year");
  const { dashboardData } = useDashboardContext();
  if (Object.keys(dashboardData).length) {
    const { history } = dashboardData
    return (
      <Box>
        <HistoryCards
          avg_gift={history?.avg_gift}
          avg_donor_frequency={history?.avg_donor_frequency}
          avg_donor_lifespan={history?.avg_donor_lifespan}
        />
        <Box sx={{ width: "99%" }}>
          <ChartContainer>
            <BasicLineChart
              data={[dashboardData.total_annual_donors]}
              title="Total Annual Donors"
              margin={{
                top: 15,
              }}
              sx={{
                "& .MuiMarkElement-root": {
                  strokeWidth: "0",
                  fill: "#c91b63",
                },
                "& .MuiLineElement-root": {
                  stroke: "#e0e0e0",
                },
              }}
            />
          </ChartContainer>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "65%" }}>
            <ChartContainer>
              <BasicLineChart
                data={[dashboardData.total_annual_donations]}
                title="Total Annual Donations"
                margin={{
                  top: 15,
                  left: 68,
                }}
                sx={{
                  "& .MuiMarkElement-root": {
                    strokeWidth: "0",
                    fill: "#c91b63",
                  },
                  "& .MuiLineElement-root": {
                    stroke: "#e0e0e0",
                  },
                }}
              />
            </ChartContainer>
          </Box>
          <TabsContainer setValue={setValue} value={value}>
            <BasicPieChart title="Donations by Motivation" year={value} />
          </TabsContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ width: "65%" }}>
            <ChartContainer>
              <BasicBarChart
                data={dashboardData.total_monthly_donations}
                title="Total Monthly Donations"
                margin={{
                  left: 60,
                }}
              />
            </ChartContainer>
          </Box>
          <TabsContainer setValue={setValue2} value={value2}>
            <BasicPieChart
              title="Revenue by Segment"
              year={value2}
              data1={dashboardData.revenue_by_segment[1]}
              data2={dashboardData.revenue_by_segment[5]}
            />
          </TabsContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <ChartContainer>
            <BasicLineChart
              data={[
                dashboardData.first_time_donors,
                dashboardData.single_and_multi_donors.single,
                dashboardData.single_and_multi_donors.multi,
                transformDataByYear(
                  dashboardData.donor_types_by_year,
                  "Church"
                ),
                transformDataByYear(
                  dashboardData.donor_types_by_year,
                  "Individual"
                ),
              ]}
              legend={[
                "First Time Donors",
                "Single Donors",
                "Multi Donors",
                "Church Donors",
                "Individual Donors",
              ]}
              title="Donor Insights"
              margin={{
                top: 15,
                bottom: 65,
              }}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 5,
                },
              }}
            />
          </ChartContainer>
        </Box>
      </Box>
    );
  }
  return <EmptyDashboardState />;
};
