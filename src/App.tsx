import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";

import { Arrow, Indicator, Organization } from "./components";

import { EventType } from "./types";

import styles from "./App.module.css";

const theme = createTheme({
  palette: {
    background: {
      default: "#f8fafc",
    },
  },
});

const componentColors = {
  component_1: "#1E40AF",
  component_2: "#7C3AED",
  component_3: "#1E3A8A",
};

const App = () => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:8080/events");

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentEvent(data);

      const isPassThrough =
        Math.abs(
          parseInt(data.source.split("_")[1]) -
            parseInt(data.destination.split("_")[1])
        ) > 1;

      setZoom(isPassThrough ? 0.7 : 1);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const isComponentActive = (component: string) => {
    return (
      currentEvent?.source === component ||
      currentEvent?.destination === component
    );
  };

  const getEventDirection = (component: string) => {
    if (!currentEvent) return null;
    if (currentEvent.source === component) return "down";
    if (currentEvent.destination === component) return "up";
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Box
          className={styles.content}
          sx={{
            transform: `scale(${zoom})`,
            transition: "transform 0.5s ease",
          }}
        >
          {["component_1", "component_2", "component_3"].map(
            (component, index) => (
              <div key={component} className={styles.componentWrapper}>
                <Organization
                  title={`Component ${index + 1}`}
                  organization={`Organization ${index + 1}`}
                  isSelected={isComponentActive(component)}
                  borderColor={
                    componentColors[component as keyof typeof componentColors]
                  }
                />

                <div className={styles.indicatorsWrapper}>
                  {(
                    [
                      "service_request",
                      "security",
                      "data_transmission",
                    ] as EventType[]
                  ).map((type) => (
                    <Indicator
                      key={type}
                      type={type}
                      active={
                        currentEvent?.type === type &&
                        isComponentActive(component)
                      }
                    />
                  ))}
                </div>

                {getEventDirection(component) && (
                  <Arrow
                    type={currentEvent!.type}
                    direction={getEventDirection(component)!}
                    visible={true}
                  />
                )}
              </div>
            )
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;
