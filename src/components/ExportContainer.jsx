import { Box, Typography } from "@mui/material";
import { BasicLineChart } from "./charts/LineChart";
import { useDashboardContext } from "./context/context";
import { BasicBarChart } from "./charts/BarChart";
import { BasicPieChart } from "./charts/PieChart";
import { HistoryCards } from "./charts/HistoryCards";
import { LetterPaper } from "./LetterPaper";
import { filterYears, transformDataByYear } from "../utils";

import { styled } from '@mui/material/styles';

// Define styles for print
const PrintStyles = styled('style')`
  @media print {
    .printable-paper {
      background-color: blue !important;
      -webkit-print-color-adjust: exact; /* For WebKit-based browsers */
      color-adjust: exact;               /* For other browsers */
    }
  }
`;

export const ExportContainer = () => {
  const { dashboardData } = useDashboardContext();
  const skipInteractions = {
    disableAxisListener: true,
    axisHighlight: { x: "none", y: "none" },
    tooltip: {
      trigger: "none",
    },
    skipAnimation: true,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        background: "grey",
      }}
    >
      <PrintStyles/>
      <LetterPaper isLandscape={true} isFirst={true}>
        {Object.keys(dashboardData).length ? (
          <>
            <Typography
              sx={{
                marginTop: "30px",
                marginBottom: "15px",
                textAlign: "center",
              }}
              variant="h4"
              fontWeight={"bold"}
            >
              FEBC Chinese Ministry Donor Analysis
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "50%" }}>
                  <BasicLineChart
                    data={[
                      filterYears(
                        dashboardData.total_annual_donors,
                        "2013",
                        "2023"
                      ),
                    ]}
                    title="Total Annual Donors"
                    hideSelector={true}
                    height={260}
                    margin={{
                      top: 15,
                      left: 63,
                    }}
                    {...skipInteractions}
                  />
                </Box>
                <Box sx={{ width: "50%" }}>
                  <BasicLineChart
                    data={[
                      filterYears(
                        dashboardData.total_annual_donations,
                        "2013",
                        "2023"
                      ),
                    ]}
                    title="Total Annual Donations"
                    height={260}
                    hideSelector={true}
                    margin={{
                      top: 15,
                      left: 63,
                    }}
                    {...skipInteractions}
                  />
                </Box>
              </Box>
              <Box display={"flex"}>
                <Box sx={{ width: "50%", display: "flex" }}>
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <BasicPieChart
                      title="Donations By Motivation"
                      year={"1 Year"}
                      width={250}
                      height={300}
                      slotProps={{
                        legend: {
                          padding: -10,
                          labelStyle: {
                            fontSize: 14,
                          },
                          itemMarkWidth: 15,
                          itemMarkHeight: 15,
                        },
                      }}
                      {...skipInteractions}
                    />
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <BasicPieChart
                      title="Donations By Motivation"
                      year={"5 Years"}
                      width={250}
                      height={300}
                      slotProps={{
                        legend: {
                          padding: -10,
                          labelStyle: {
                            fontSize: 14,
                          },
                          itemMarkWidth: 15,
                          itemMarkHeight: 15,
                        },
                      }}
                      {...skipInteractions}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <BasicBarChart
                    data={dashboardData.total_monthly_donations}
                    title="Total Monthly Donations"
                    height={260}
                    width={490}
                    hideSelector={true}
                    margin={{
                      top: 15,
                      left: 48,
                      right: 10,
                    }}
                    slotProps={{
                      legend: {
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                    {...skipInteractions}
                  />
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
      </LetterPaper>
      <LetterPaper isFirst={false} isLandscape={true} className="is-not-first">
        {Object.keys(dashboardData).length ? (
          <>
            <Typography
              sx={{
                marginTop: "30px",
                marginBottom: "15px",
                textAlign: "center",
              }}
              variant="h4"
              fontWeight={"bold"}
            >
              FEBC Chinese Ministry Donor Value
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "30px",
                  paddingLeft: "30px",
                  marginTop: "47px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "20px",
                    color: "#58595b",
                  }}
                >
                  <strong>Cumulative History</strong>
                </Typography>
                <HistoryCards
                  avg_gift={dashboardData?.history?.avg_gift}
                  avg_donor_frequency={
                    dashboardData?.history?.avg_donor_frequency
                  }
                  avg_donor_lifespan={
                    dashboardData?.history?.avg_donor_lifespan
                  }
                  sx={{
                    fontSize: "10px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                  marginTop: "47px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "20px",
                    color: "#58595b",
                  }}
                >
                  <strong>Last Three Years</strong>
                </Typography>
                <HistoryCards
                  avg_gift={dashboardData?.history?.avg_gift_3}
                  avg_donor_frequency={
                    dashboardData?.history?.avg_donor_frequency_3
                  }
                  avg_donor_lifespan={
                    dashboardData?.history?.avg_donor_lifespan_3
                  }
                  sx={{
                    fontSize: "10px",
                  }}
                />
              </Box>
            </Box>
          </>
        ) : null}
      </LetterPaper>
      <LetterPaper isFirst={false} isLandscape={true} className="is-not-first">
        {Object.keys(dashboardData).length ? (
          <>
            <Typography
              sx={{
                marginTop: "30px",
                marginBottom: "15px",
                textAlign: "center",
              }}
              variant="h4"
              fontWeight={"bold"}
            >
              FEBC Chinese Ministry Donor Profile
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  paddingRight: "50px",
                  paddingLeft: "50px",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <BasicPieChart
                    title="Donations by Segments"
                    width={325}
                    height={300}
                    year={"1 Year"}
                    data1={dashboardData.revenue_by_segment[1]}
                    data2={dashboardData.revenue_by_segment[5]}
                    slotProps={{
                      legend: {
                        padding: -10,
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                    {...skipInteractions}
                  />
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <BasicPieChart
                    title="Donations by Segments"
                    width={325}
                    height={300}
                    year={"5 Years"}
                    data1={dashboardData.revenue_by_segment[1]}
                    data2={dashboardData.revenue_by_segment[5]}
                    slotProps={{
                      legend: {
                        padding: -10,
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                    {...skipInteractions}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "33%" }}>
                  <BasicLineChart
                    data={[
                      filterYears(
                        dashboardData.first_time_donors,
                        "2013",
                        "2023"
                      ),
                    ]}
                    title="First-time Donors"
                    titleFont={"18px"}
                    margin={{
                      left: 45,
                      right: 40
                    }}
                    hideSelector={true}
                    height={260}
                    {...skipInteractions}
                  />
                </Box>
                <Box sx={{ width: "33%" }}>
                  <BasicLineChart
                    data={[
                      filterYears(
                        dashboardData.single_and_multi_donors.single,
                        "2013",
                        "2023"
                      ),
                      filterYears(
                        dashboardData.single_and_multi_donors.multi,
                        "2013",
                        "2023"
                      ),
                    ]}
                    legend={["Single Donors", "Multi Donors"]}
                    title="Single Donors & Multi Donors"
                    hideSelector={true}
                    hideLegendSelector={true}
                    margin={{
                      left: 38,
                      right: 10
                    }}
                    slotProps={{
                      legend: {
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                    titleFont={"18px"}
                    height={260}
                    {...skipInteractions}
                  />
                </Box>
                <Box sx={{ width: "33%" }}>
                  <BasicLineChart
                    data={[
                      filterYears(
                        transformDataByYear(
                          dashboardData.donor_types_by_year,
                          "Church"
                        ),
                        "2013",
                        "2023"
                      ),
                      filterYears(
                        transformDataByYear(
                          dashboardData.donor_types_by_year,
                          "Individual"
                        ),
                        "2013",
                        "2023"
                      ),
                    ]}
                    legend={["Church Donors", "Individual Donors"]}
                    title="Church Donors & Individual Donors"
                    hideSelector={true}
                    hideLegendSelector={true}
                    titleFont={"18px"}
                    height={260}
                    margin={{ right: 20 }}
                    slotProps={{
                      legend: {
                        labelStyle: {
                          fontSize: 14,
                        },
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                    {...skipInteractions}
                  />
                </Box>
              </Box>
            </Box>
          </>
        ) : null}
      </LetterPaper>
    </Box>
  );
};
