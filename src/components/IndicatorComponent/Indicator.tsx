import React from "react";
import { Box, Typography } from "@mui/material";

import { EventType } from "../../types";

import styles from "./Indicator.module.css";

interface IIndicator {
  type: EventType;
  active: boolean;
}

const eventColors = {
  service_request: "#3B82F6",
  security: "#10B981",
  data_transmission: "#EF4444",
};

const Indicator: React.FC<IIndicator> = ({ type, active }) => {
  return (
    <Box
      className={styles.indicator}
      sx={{
        backgroundColor: eventColors[type],
        opacity: active ? 1 : 0.2,
      }}
    >
      <Typography variant="body2">{type.replace("_", " ")}</Typography>
    </Box>
  );
};

export default Indicator;
