// import React, {Component} from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';

// class PendingTaskForToday extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             chartData:{
//                 labels:[
//                     // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],
//                     'OverDue','Grace Period','Follow Up','New'],

//                 datasets:[

//                     {
//                         label:'Quarterly Action Summary',
//                         data:[
//                             20,40,60,30,0
//                         ],
//                         backgroundColor:[
//                             // '',
//                             // '#D3AF40',
//                             // '#2B5989',
//                             //  '#7D418A',
//                             // '#5CAC77',
//                             //  '#B80E4E',
//                             // '#7182A2',
//                             //  '#D3AF40',
//                             // // '#2B5989',
//                             // //  '#7D418A',
//                             // // '#5CAC77',
//                             // //  '#544CF9',
//                             // // '#7182A2',
//                              '#D3AF40',
//                             '#2B5989',
//                              '#7D418A',
//                              '#7182A2',
//                         ]
//                     }
//                 ]
//             }
//         }
//     }
//     render(){
//         return(
//             <div className="barchart">
//               <Bar

//   data={this.state.chartData}
//   width={100}
//   height={300}
//   options={{ maintainAspectRatio: false }}
// />

//             </div>
//         )
//     }
// }
// export default PendingTaskForToday;

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";
class PendingTaskForToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  async handleFetchData() {
    try{
        var res = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
       }catch(e){
         console.log(e);
       }
    let setData = Object.values(res.pending).map((item) => item);
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

              "OverDue",
              "Grace Period",
              "Follow Up",
              "New",
            ],

            datasets: [
              {
                label: "Quarterly Action Summary",
                data: [...this.state.chartData, 0],
                backgroundColor: ["#D3AF40", "#2B5989", "#7D418A", "#7182A2"],
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
export default PendingTaskForToday;
