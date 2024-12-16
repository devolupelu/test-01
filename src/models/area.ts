// src/models/Area.ts
import mongoose, { Schema, Document } from "mongoose";

interface IArea extends Document {
  id: number;
  name: string;
}

const AreaSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

export default mongoose.model<IArea>("Area", AreaSchema);
