import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  ts: String,
  machine_status: Number,
  vibration: Number,
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
