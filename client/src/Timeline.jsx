import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

export function Timeline({filter}) {
  console.log(filter);
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [datePairs, setDatePairs] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await axios.get(`http://localhost:3000/?filter=${filter}`);
        console.log(res.data.posts);
        console.log(res.data.posts[0]);
        let length = res.data.posts.length;

        if(filter > 0){
          sampleData.splice(0, sampleData.length);
          datePairs.splice(0, datePairs.length);
          data.splice(0, data.length);
        }
        
        if(length > 0){
          for (let i = 0; i < length; i++) {
            sampleData.push(res.data.posts[i]);
          }
          console.log(sampleData);

  
  
          sampleData.map((item, index, array) => {
            const statusColor =
              item.machine_status === 0
                ? "yellow"
                : item.machine_status === 1
                ? "green"
                : "red";
            const startDate = new Date(item.ts);
            let endDate = null; // Initialize end date as null
            let status = item.machine_status.toString();
  
            // If it's not the last item, set the end date
            if (index < array.length - 1) {
              endDate = new Date(item.ts);
            }
  
            datePairs.push([
              "cycle-status",
              status,
              statusColor,
              new Date(
                0,
                0,
                0,
                startDate.getHours(),
                startDate.getMinutes(),
                startDate.getSeconds()
              ),
              endDate
                ? new Date(
                    0,
                    0,
                    0,
                    endDate.getHours(),
                    endDate.getMinutes(),
                    endDate.getSeconds()
                  )
                : new Date(
                    0,
                    0,
                    0,
                    startDate.getHours(),
                    startDate.getMinutes(),
                    startDate.getSeconds()
                  ),
            ]);
          });
          console.log(datePairs);
          setData([
            [
              { type: "string", id: "cycle-status" },
              { type: "string", id: "machine_status" },
              { type: "string", role: "style" },
              { type: "date", id: "Start" },
              { type: "date", id: "End" },
            ],
            ...datePairs,
            // [
            //   "cycle-status",
            //   "null",
            //   new Date(0, 0, 0, 15, 0, 15),
            //   new Date(0, 0, 0, 15, 0, 16),
            // ],
          ]);
          setOptions({
            timeline: { showRowLabels: false },
            avoidOverlappingGridLines: false,
            colors: ["green", "red", "yellow"],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter]);

  if(!data){
    return(<div>
      loading...
    </div>)
  }

  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      height="400px"
      options={options}
    />
  );
}

// const sampleData = [
//   {
//     ts: "2024-01-21T15:00:00Z",
//     machine_status: 1,
//     vibration: 529,
//   },
//   {
//     ts: "2024-01-21T15:00:01Z",
//     machine_status: 0,
//     vibration: 536,
//   },
//   {
//     ts: "2024-01-21T15:00:06Z",
//     machine_status: 1,
//     vibration: 574,
//   },
//   {
//     ts: "2024-01-21T15:00:07Z",
//     machine_status: 1,
//     vibration: 518,
//   },
//   {
//     ts: "2024-01-21T15:00:08Z",
//     machine_status: 1,
//     vibration: 519,
//   },
//   {
//     ts: "2024-01-21T15:00:09Z",
//     machine_status: 1,
//     vibration: 568,
//   },
//   {
//     ts: "2024-01-21T15:00:10Z",
//     machine_status: 0,
//     vibration: 577,
//   },
//   {
//     ts: "2024-01-21T15:00:11Z",
//     machine_status: 0,
//     vibration: 545,
//   },
//   {
//     ts: "2024-01-21T15:00:12Z",
//     machine_status: 1,
//     vibration: 538,
//   },
//   {
//     ts: "2024-01-21T15:00:13Z",
//     machine_status: 1,
//     vibration: 560,
//   },
//   {
//     ts: "2024-01-21T15:00:14Z",
//     machine_status: 1,
//     vibration: 564,
//   },
//   {
//     ts: "2024-01-21T15:00:15Z",
//     machine_status: 1,
//     vibration: 531,
//   },
//   {
//     ts: "2024-01-21T15:00:16Z",
//     machine_status: 1,
//     vibration: 565,
//   },
// ];