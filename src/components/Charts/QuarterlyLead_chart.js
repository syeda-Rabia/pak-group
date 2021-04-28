
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";
class QuarterlyLead_chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  async handleFetchData() {
    var res = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
    // let res = {
    //   data: {
    //     leads: 40,
    //     alucations: 30,
    //     calls: 60,
    //     sms: 75,
    //     visits: 20,
    //     closed: 50,
    //     fdcflk:70,
    //   },
    // };
    let setData = Object.values(res?.data).map((item) => item.Leads);
    this.setState({ chartData: setData });
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleFetchData();
    }, 2000);
  }
  render() {
    return (
      <div className="barchart">
        <Bar
          data={{
            labels: [
              // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],

              'task 1','task 2','task 3','task 4','task 5','task 6','task 7+'
            ],

            datasets: [
              {
                label:'Quarterly Action Summary',
                data: [...this.state?.chartData, 0],
                backgroundColor: [
                  "#2B5989",
                  "#7D418A",
                  "#5CAC77",
                  "#B80E4E",
                  "#7182A2",
                  "#D3AF40",
                  "#2B5989",
                ],
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
}
export default QuarterlyLead_chart;
