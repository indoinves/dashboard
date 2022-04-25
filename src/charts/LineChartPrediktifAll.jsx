import React, { useRef, useEffect } from "react";

import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

function LineChartPrediktifAll({ data, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        chartArea: {
          backgroundColor: tailwindConfig().theme.colors.white,
        },
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            
            display: true,
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                return value.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumSignificantDigits:"2"
                });
              },
            },
          },
          x: {
            type: "time",
            time: {
              parser: "DD-MM-YYYY",
              unit: "month",
            },
            display: true,
          },
        },
        plugins: {
          tooltip: {},
          legend: {
            display: true,
          },
        },

        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default LineChartPrediktifAll;
