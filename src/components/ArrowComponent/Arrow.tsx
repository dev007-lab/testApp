import React from "react";
import { Box } from "@mui/material";

import { EventType } from "../../types";

import styles from "./Arrow.module.css";

interface IArrow {
  type: EventType;
  direction: "up" | "down";
  visible: boolean;
}

const eventColors = {
  service_request: "#3B82F6",
  security: "#10B981",
  data_transmission: "#EF4444",
};

const Arrow: React.FC<IArrow> = ({
  type,
  direction,
  visible,
}) => {
  return (
    <Box
      className={`${styles.arrow} ${styles[direction]}`}
      sx={{
        color: eventColors[type],
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) scale(${visible ? 1 : 0})`,
        transition: "all 0.3s ease",
      }}
    >
      {direction === "up" ? "↑" : "↓"}
    </Box>
  );
};

export default Arrow;
