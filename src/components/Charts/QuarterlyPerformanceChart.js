import { containerSizesSelector } from '@material-ui/data-grid';
import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";
class LeadReport_chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
     chartData:[],
    };
  }

 async handleFetchData(){
  
   try{
    var res = await GET(ApiUrls.GET_LEAD_REPORT_DATA);
   }catch(e){
     console.log(e);
   }
  
//    let res={data:{
//      leads:40,
//      alucations:20,
//     //  calls:60,
//     //  sms:75,
//     //  visits:20,
//     //  closed:50,
//    }}

  console.log(res);
   let setData=Object.values(res?.quarterly).map(item=>item)
      this.setState({chartData:setData})
  }

  componentDidMount(){
    setTimeout(() => {
      this.handleFetchData()
    }, 2000);
  }
  render() {
    return (
      <div className="barchart">
        <Bar

          data={{
            labels: [
              // 'jan','feb','mar','apr','may','jun','july','aug','sep','oct','nov','dec'],
             
              'Lead Complete',
              'Lead Loss',
              
             
            ],
    
            datasets: [
              {
                label: 'Quarterly Lead performance',
                data:[...this.state?.chartData,0],
                backgroundColor: [
                 
                  
                  '#2B5989',
                  '#7D418A',
                 
                  // '#D3AF40',
                  // '#2B5989',
                  // '#7D418A',
                  // '#5CAC77',
                  // '#544CF9',
                  // '#7182A2',
                  // '#D3AF40',
                  // '#2B5989',
                  // '#7D418A',
                  // '#5CAC77',
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
}
export default LeadReport_chart;
