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
  { versionKey: false, timestamps: false },
);

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
