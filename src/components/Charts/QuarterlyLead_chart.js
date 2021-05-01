
import { containerSizesSelector } from '@material-ui/data-grid';
import React, { Component, useState, useEffect  } from 'react';
import { Bar} from 'react-chartjs-2';
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";


export default function QuarterlyLead_chart(props)  {

  const [state, setState] =useState({
    chartData: [],
  })
 

 const  handleFetchData=async ()=>{
  
   let setData=Object?.values(props?.TaskReport)?.map((item)=>item.Leads)
   setState({chartData:setData})
  }
  useEffect(() => {
    handleFetchData()
  }, [props.TaskReport]);

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
              label: 'Quarterly Action Summary',
              data:[...state?.chartData,0],
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
        options={{ maintainAspectRatio: false,  scales: {
          xAxes: [{
              maxBarThickness: 50,
          }]
      } }}
      />
    </div>
  );
  
}
