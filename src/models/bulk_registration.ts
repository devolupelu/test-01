// src/models/BulkEventRegistration.ts

import mongoose, { Document, Schema, Model } from "mongoose";

interface IParticipant {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_member: boolean;
  member_area_id?: string;
  bed_option: "registration_only" | "registration_with_bed";
  registrationNumber: string;
}

interface IEventRegistration extends Document {
  organizerData: {
    organizerName: string;
    organizerEmail: string;
  };
  participants: IParticipant[];
  paymentReference: number;
  paymentStatus: "completed" | "pending" | "failed" | "successful";
  paymentAmount: number;
  paymentCurrency: "NGN" | "USD" | "EUR";
}

const ParticipantSchema: Schema = new Schema<IParticipant>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, index: true }, // Indexed for faster email searches
  phone_number: { type: String, required: true },
  is_member: { type: Boolean, required: true },
  member_area_id: { type: String, default: "" },
  bed_option: {
    type: String,
    enum: ["registration_only", "registration_with_bed"],
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  }, // Indexed and unique
});

const EventRegistrationSchema: Schema = new Schema<IEventRegistration>({
  organizerData: {
    organizerName: { type: String, required: true, index: true }, // Indexed
    organizerEmail: { type: String, required: true, index: true }, // Indexed
  },
  participants: { type: [ParticipantSchema], required: true },
  paymentReference: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["completed", "pending", "failed", "successful"],
    required: true,
  },
  paymentAmount: { type: Number, required: true },
  paymentCurrency: {
    type: String,
    enum: ["NGN", "USD", "EUR"],
    required: true,
  },
});

const BulkEventRegistration: Model<IEventRegistration> =
  mongoose.model<IEventRegistration>(
    "Bulk-EventRegistration",
    EventRegistrationSchema
  );

export default BulkEventRegistration;
