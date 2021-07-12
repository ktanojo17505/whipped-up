import React from 'react';
import { Radar } from 'react-chartjs-2';


function TasteWidget(props) {
    const data = {
        labels: ["Sweet","Salty","Sour","Bitter","Savory","Fatty"],
        datasets: [
          {
              label:"",
              backgroundColor:"rgb(75, 192, 192, 0.2)",
              borderColor:"rgb(75, 192, 192)",
              pointBackgroundColor:"rgb(75, 192, 192)",
              data:[20.31,100,43.67,26.8,30.94,53.45]
          },
        ],
      };
      
      const options = {
          legend:{display:!1},
          title:{display:!1},
          scale:{
              pointLabels: {fontSize:20},
              angleLines:{display:!0},
              ticks:{display:!1,min:0,max:100,stepSize:20}
          }
      }
    return (
        <Radar data={data} options={options} />
    )
}

export default TasteWidget

