import React from "react";
import { Paper, Box, Typography } from "@mui/material";

import styles from "./Organization.module.css";

interface IOrganization {
  title: string;
  organization: string;
  isSelected: boolean;
  borderColor: string;
}

const Organization: React.FC<IOrganization> = ({
  title,
  organization,
  isSelected,
  borderColor,
}) => {
  return (
    <div className={styles.container}>
      <Typography variant="h6" className={styles.title}>
        {title}
      </Typography>
      <Box
        sx={{
          transform: `scale(${isSelected ? 1.05 : 1})`,
          transition: "transform 0.3s ease",
        }}
        className={styles.boxWrapper}
      >
        <Typography className={styles.organization} sx={{ color: borderColor }}>
          {organization}
        </Typography>
        <Paper
          elevation={isSelected ? 3 : 1}
          className={styles.box}
          sx={{ borderColor }}
        />
      </Box>
    </div>
  );
};

export default Organization;
