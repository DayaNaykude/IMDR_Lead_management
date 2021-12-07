const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var moment = require("moment");

const reviewSchema = mongoose.Schema(
  {
    status: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const leadSchema = new mongoose.Schema(
  {
    applicationSeqNo: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    applicantName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      maxlength: 32,
      trim: true,
    },

    countryName: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    gender: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },

    category: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    nationality: {
      type: String,
      maxlength: 32,
      trim: true,
    },

    physcialDisablity: {
      type: String,
      maxlength: 32,
      trim: true,
    },

    addressLine1: {
      type: String,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
    },

    addressLine3: {
      type: String,
      trim: true,
    },
    communicationAddressCountry: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: Number,
      trim: true,
    },

    percentageVALR: {
      type: Number,
      trim: true,
    },

    percentileVALR: {
      type: Number,
      trim: true,
    },

    percentageDM: {
      type: Number,
      trim: true,
    },
    percentileDM: {
      type: Number,
      trim: true,
    },
    percentageQA: {
      type: Number,
      trim: true,
    },
    percentileQA: {
      type: Number,
      trim: true,
    },
    percentageGK: {
      type: Number,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    percentileGK: {
      type: Number,
      trim: true,
    },
    perWithoutGK: {
      type: Number,
      trim: true,
    },
    percentileWithoutGK: {
      type: Number,
      trim: true,
    },

    rankWithoutGK: {
      type: Number,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "userModel",
    },
    status: {
      type: String,
      default: "level 0",
    },
    source: {
      type: String,
      trim: true,
    },
    college_name: {
      type: String,
      trim: true,
    },
    entrance: {
      type: String,
      trim: true,
    },
    flag: {
      type: String,
      default: "Active",
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
