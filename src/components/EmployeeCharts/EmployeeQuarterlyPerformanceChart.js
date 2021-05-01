

import { containerSizesSelector } from "@material-ui/data-grid";
import React, { Component, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";

export default function EmployeeQuarterlyPerformancechart(props) {
  const [state, setState] = useState({
    chartData: [],
  });

  const handleFetchData = async () => {
    let setData = Object?.values(props?.quarterlyTask)?.map((item) => item);
    setState({ chartData: setData });
  };
  useEffect(() => {
    handleFetchData();
  }, [props.quarterlyTask]);

  return (
    <div className="barchart">
      <Bar
        data={{
          labels: [
            // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],

            "Lead Complete",
            "Lead Loss",
          ],

          datasets: [
            {
              label: "Quarterly Lead performance",
              data: [...state?.chartData, 0],
              backgroundColor: ["#2B5989", "#7D418A"],
            },
          ],
        }}
        width={100}
        height={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                maxBarThickness: 50,
              },
            ],
          },
        }}
      />
    </div>
  );
}
