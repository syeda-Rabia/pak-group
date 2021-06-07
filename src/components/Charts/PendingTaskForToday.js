import { containerSizesSelector } from "@material-ui/data-grid";
import React, { Component, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";

export default function PendingTaskForToday(props) {
  const [state, setState] = useState({
    chartData: [],
  });

  const handleFetchData = async () => {
    let setData = Object?.values(props?.pendingTask)?.map((item) => item);
    setState({ chartData: setData });
  };
  useEffect(() => {
    handleFetchData();
  }, [props.pendingTask]);

  return (
    <div className="barchart">
      <Bar
        data={{
          labels: [
            // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],

            "OverDue",
            "Grace Period",
            "Follow Up",
            "Allocated",
            "New",
          ],

          datasets: [
            {
              label: "Pending Task",
              data: [...state?.chartData, 0],
              backgroundColor: ["#D3AF40", "#2B5989", "#7D418A", "#7182A2","#A8A8A8"],
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
