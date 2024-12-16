// src/models/RegistrationModel.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegistration extends Document {
  firstName: string;
  lastName: string;
  Email: string;
  PhoneNumber: string;
  isMember: boolean;
  MemberArea?: string;
  RegistrationOption: string;
  registrationNumber: string;
}

const RegistrationSchema: Schema = new Schema<IRegistration>(
  {
    firstName: { type: String, required: true, index: true }, // Indexed for name searches
    lastName: { type: String, required: true, index: true }, // Indexed for name searches
    Email: { type: String, required: true, unique: true, index: true }, // Indexed and unique
    PhoneNumber: { type: String, required: true },
    isMember: { type: Boolean, required: true },
    MemberArea: {
      type: String,
      required: function (this: IRegistration) {
        return this.isMember;
      },
    },
    RegistrationOption: { type: String, required: true },
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

const RegistrationModel: Model<IRegistration> = mongoose.model<IRegistration>(
  "whatsapp_registration",
  RegistrationSchema
);

export default RegistrationModel;
