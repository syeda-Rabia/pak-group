import { containerSizesSelector } from '@material-ui/data-grid';
import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';
import ApiUrls from "./../../utils/ApiUrls";
import { GET } from "./../../utils/Functions";
class CallReportChart extends Component {
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
  


  console.log(res);
   let setData=Object.values(res.call_report).map(item=>item)
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
             
              'Total Number of calls',
              'Call Recieved',
              
             
            ],
    
            datasets: [
              {
                label: 'Quarterly Lead performance',
                data:[...this.state.chartData,0],
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
export default CallReportChart;
