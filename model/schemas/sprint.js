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
    endDate: {
      type: String,
      required: [true, 'Set end date for sprint'],
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

const Sprint = mongoose.model('sprint', sprintSchema);

module.exports = Sprint;
