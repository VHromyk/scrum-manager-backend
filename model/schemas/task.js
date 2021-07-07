const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for task'],
    },
    scheduledHours: {
      type: Number,
      required: [true, 'Set scheduled hours for task'],
    },
    spentTime: {
      type: Number,
      default: 0,
    },
    taskDate: {
      type: String,
      required: [true, 'Set task date'],
    },
    mainSprint: {
      type: SchemaTypes.ObjectId,
      ref: 'sprint',
    },
  },
  {
    versionKey: false,
    timestamps: false,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;

        return ret;
      },
    },
  },
);

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
