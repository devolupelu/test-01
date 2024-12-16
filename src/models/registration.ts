// src/models/EventRegistration.ts

import mongoose, { Schema, Document, Model } from "mongoose";

interface IEventRegistration extends Document {
  is_member?: boolean;
  member_area_id?: string;
  bed_option: string;
  baseAmount: number;
  bedFeeAmount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  paymentReference: number;
  paymentStatus: string;
  paymentAmount: number;
  paymentCurrency: string;
  registrationNumber: string;
}

const EventRegistrationSchema: Schema = new Schema<IEventRegistration>(
  {
    is_member: { type: Boolean, required: false },
    member_area_id: {
      type: String,
      ref: "Area",
      required: function (this: IEventRegistration) {
        return this.is_member === true;
      },
    },
    bed_option: {
      type: String,
      enum: ["registration_with_bed", "registration_only"],
      required: true,
    },
    baseAmount: { type: Number, required: true },
    bedFeeAmount: { type: Number, required: true },
    first_name: { type: String, required: true, index: true }, // Indexed for name searches
    last_name: { type: String, required: true, index: true }, // Indexed for name searches
    email: { type: String, required: true, unique: true, index: true }, // Indexed and unique
    phone_number: { type: String, required: true },
    paymentReference: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    paymentAmount: { type: Number, required: true },
    paymentCurrency: { type: String, required: true },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    }, // Indexed and unique
  },
  {
    timestamps: true,
  }
);

const EventRegistrationModel: Model<IEventRegistration> =
  mongoose.model<IEventRegistration>(
    "EventRegistration",
    EventRegistrationSchema
  );

export default EventRegistrationModel;
