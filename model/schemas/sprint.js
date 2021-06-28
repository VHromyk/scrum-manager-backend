const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const sprintSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for sprint'],
    },
    startDate: {
      type: String,
      required: [true, 'Set start date for sprint'],
    },
    duration: {
      type: String,
      required: [true, 'Set duration for sprint'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'project',
    },
  },
  { versionKey: false, timestamps: false },
);

const Sprint = mongoose.model('sprint', sprintSchema);

module.exports = Sprint;