const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const sprintSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for sprint'],
    },
    date: {
      type: String,
      required: [true, 'Set start date for sprint'],
    },
    duration: {
      type: Number,
      required: [true, 'Set duration for sprint'],
    },
    mainProject: {
      type: SchemaTypes.ObjectId,
      ref: 'project',
    },
  },
  { versionKey: false, timestamps: false },
);

const Sprint = mongoose.model('sprint', sprintSchema);

module.exports = Sprint;
