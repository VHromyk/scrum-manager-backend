const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for project'],
    },
    description: {
      type: String,
    },
    sprints: {
      type: Array,
      default: [],
    },
    owners: {
      type: [SchemaTypes.ObjectId],
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false },
);

projectSchema.plugin(mongoosePaginate);

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
