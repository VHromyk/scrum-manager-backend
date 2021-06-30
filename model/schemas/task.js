const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for task'],
    },
    scheduledHours: {
      type: String,
      required: [true, 'Set scheduled hours for task'],
    },
    mainSprint: {
      type: SchemaTypes.ObjectId,
      ref: 'sprint',
    },
  },
  { versionKey: false, timestamps: false },
);

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
