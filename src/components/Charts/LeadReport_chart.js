import { containerSizesSelector } from '@material-ui/data-grid';
import React, { Component, useState, useEffect  } from 'react';
import { Bar} from 'react-chartjs-2';
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";


export default function LeadReport_chart(props)  {

  const [state, setState] =useState({
    chartData: [],
  })
 

 const  handleFetchData=async ()=>{
  
   let setData=Object?.values(props?.data)?.map(item=>item)
   setState({chartData:setData})
  }
  useEffect(() => {
    handleFetchData()
  }, [props.data]);

  return (
    <div className="barchart">
      <Bar

        data={{
          labels: [
            // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],
           
            'Lead Assigned',
            'total leads worked',
            'call',
            'sms',
            'visit',
            'closed',
           
          ],
  
          datasets: [
            {
              label: 'Leads Assign',
              data:[...state?.chartData,0],
              backgroundColor: [
               
                '#D3AF40',
                '#2B5989',
                '#7D418A',
                '#5CAC77',
                '#B80E4E',
                '#7182A2',
              
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
