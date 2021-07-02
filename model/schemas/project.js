const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for project'],
    },
    description: {
      type: String,
    },
    owners: {
      type: [SchemaTypes.ObjectId],
      ref: 'user',
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

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
