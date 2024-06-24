import { HistoryCard } from "../HistoryCard";
import Box from "@mui/material/Box";
import { formatDollar } from "../../utils";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import TimelineIcon from "@mui/icons-material/Timeline";

export const HistoryCards = ({
  avg_gift,
  avg_donor_lifespan,
  avg_donor_frequency,
  ...rest
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <HistoryCard
          iconComponent={PaidIcon}
          description="Average Gift"
          number={formatDollar(avg_gift)}
          {...rest}
        />
        <HistoryCard
          iconComponent={PersonIcon}
          description="Average Donor Lifespan"
          number={avg_donor_lifespan + "yrs"}
          {...rest}
        />
        <HistoryCard
          iconComponent={TimelineIcon}
          description="Average Donor Frequency"
          number={avg_donor_frequency + " / yr"}
          {...rest}
        />
        <HistoryCard
          iconComponent={PaidIcon}
          description="Lifetime Value"
          number={formatDollar(
            avg_gift * avg_donor_frequency * avg_donor_lifespan
          )}
          {...rest}
        />
      </Box>
    </Box>
  );
};
