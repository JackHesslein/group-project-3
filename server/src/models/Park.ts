import { Schema, model, Document } from 'mongoose';

interface IPark extends Document {
    name: string;
    species: string[];
    code: string;
}

const parkSchema = new Schema<IPark>(
     {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    species: {
      type: [String],
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Park model
const Park = model<IPark>('Park', parkSchema);

export default Park;