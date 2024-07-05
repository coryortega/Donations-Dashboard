import { HistoryCard } from "../HistoryCard";
import Box from "@mui/material/Box";
import { formatDollar } from "../../utils";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import TimelineIcon from "@mui/icons-material/Timeline";

export const HistoryCards = ({
  avg_gift,
  avg_donor_gift,
  avg_donor_lifespan,
  avg_donor_frequency,
  ...rest
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <HistoryCard
          iconComponent={PaidIcon}
          description="Average Gift"
          number={formatDollar(avg_gift)}
          message="Average Gift = Total revenue received divided by total number of unique donors."
          {...rest}
        />
        <HistoryCard
          iconComponent={PaidIcon}
          description="Average Donor Gift"
          number={formatDollar(avg_donor_gift)}
          message={
            "Average Donor Gift = Total revenue received divided by total number of donations."
          }
          {...rest}
        />
        <HistoryCard
          iconComponent={PersonIcon}
          description="Average Donor Lifespan"
          number={avg_donor_lifespan + "yrs"}
          sx={{ width: "86%" }}
          message="Average Donor Lifespan = Average number of years a donor stays engaged financially over a specified time
period."
          {...rest}
        />
        <HistoryCard
          iconComponent={TimelineIcon}
          description="Average Donor Frequency"
          number={avg_donor_frequency + " / yr"}
          sx={{ width: "86%" }}
          message="Average Donor Frequency = Average number of donations made per year by donors."
          {...rest}
        />
        <HistoryCard
          iconComponent={PaidIcon}
          description="Lifetime Value"
          number={formatDollar(
            avg_donor_gift * avg_donor_frequency * avg_donor_lifespan
          )}
          sx={{ width: "86%" }}
          message="Lifetime Value = Expected total contribution to ministry by a single donor."
          {...rest}
        />
      </Box>
    </Box>
  );
};
