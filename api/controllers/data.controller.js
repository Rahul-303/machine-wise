import Data from "../models/data.model.js";

// export const test = (req, res) => {
//   res.send("hi there rahul");
// };

export const getData = async (req, res) => {
  const filter = req.query.filter;
  console.log(filter);

    const count = await Data.countDocuments();
    console.log("count : " + count);
    
    let sampleDataFinal = [];
    let allData = [];
    allData = await Data.find();
    sampleDataFinal = addMissingValue(allData);

    console.log(sampleDataFinal.length);
    console.log(allData.length);

    if(filter > 0 && filter < count){
      const finalData = [];
      for(let i = sampleDataFinal.length - filter; i<sampleDataFinal.length; i++){
        finalData.push(sampleDataFinal[i]);
      }
      res.json({posts : finalData});
    }
    else{
      res.json({ posts: sampleDataFinal });
    }
};

function addMissingValue(allData) {
  const sampleDataFinal = [];

  for (let i = 0; i < allData.length - 1; i++) {
    const currentItem = allData[i];
    const nextItem = allData[i + 1];

    const startDate = new Date(currentItem.ts);
    const endDate = new Date(nextItem.ts);

    sampleDataFinal.push(currentItem);

    // Check if there's a gap between current and next data points
    if ((endDate - startDate) / 1000 > 1) {
      const missingSeconds = Math.floor((endDate - startDate) / 1000);

      // Add missing timestamps with status 2
      for (let j = 1; j < missingSeconds; j++) {
        const missingTimestamp = new Date(startDate.getTime() + j * 1000);
        sampleDataFinal.push({
          ts: missingTimestamp.toISOString(),
          machine_status: 2, // Status 2 for missing values
          vibration: null, // Set vibration to null for missing values
        });
      }
    }
  }
  // Add the last item from sampleData
  sampleDataFinal.push(allData[allData.length - 1]);
  return sampleDataFinal;
}
