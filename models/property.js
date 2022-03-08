const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TimingSchema = mongoose.Schema({
  timeId: {
    type: String,
  },
  day: {
    type: String,
  },
  date: {
    type: String,
  },
  opening: {
    type: String,
  },
  closing: {
    type: String,
  },
});
const RoomDimensionSchema = mongoose.Schema({
  roomId: {
    type: String,
  },
  attachBathRoom: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  levels: {
    type: String,
  },
});

const propertySchema = mongoose.Schema(
  {
    images: {
      type: Array,
      required: false,
    },
    des: {
      type: String,
      // required: true,
    },
    priceOfProperty: {
      type: String,
      // required: true,
    },

    location: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    community: {
      type: String,
      // required: true,
    },
    dateForRent: {
      type: String,
      // required: true,
    },
    yearBuild: {
      type: String,
      // required: true,
    },
    parkingSpots: {
      type: String,
      // required: true,
    },
    bedrooms: {
      type: String,
      // required: true,
    },
    floors: {
      type: String,
      // required: true,
    },
    bathrooms: {
      type: String,
      // required: true,
    },
    houseType: {
      type: String,
      // required: true,
    },
    viewType: {
      type: String,
      // required: true,
    },
    frontType: {
      type: String,
      // required: true,
    },
    squareFeet: {
      type: String,
      // required: true,
    },
    //   array
    siteAmenities: {
      type: Array,
      required: false,
    },
    constructionMaterial: {
      type: Array,
      required: false,
    },
    homeAmenities: {
      type: Array,
      required: false,
    },
    roomAmenities: {
      type: Array,
      required: false,
    },
    kitchenAmenities: {
      type: Array,
      required: false,
    },
    bathAmenities: {
      type: Array,
      required: false,
    },
    flooring: {
      type: Array,
      required: false,
    },
    ownershipDoc: {
      type: Object,
      required: true,
    },
    driverLicence: {
      type: Object,
      required: false,
    },
    buildingType: {
      type: String,
      required: false,
    },
    heatingType: {
      type: String,
      required: false,
    },
    basement: {
      type: Array,
      required: false,
    },
    coolingType: {
      type: String,
      required: false,
    },
    heatingFuel: {
      type: String,
      required: false,
    },
    waterType: {
      type: String,
      required: false,
    },
    propertyBy: {
      type: ObjectId,
      ref: "User",
    },
    propertyStatus: {
      type: String,
      default: "pending",
    },
    propertyExpiry: {
      type: Boolean,
      required: false,
    },
    soldStatus: {
      type: String,
      default: null,
    },
    soldStatusExpiry: {
      type: Boolean,
      default: false,
    },
    propertyViewed: {
      type: Number,
      default: 0,
    },
    paymentVerified: {
      type: String,
      default: "unpaid",
    },
    transactionId: {
      type: ObjectId,
      ref: "Transaction",
    },
    // new addition
    // houseTiming: {
    //   type: [TimingSchema],
    //   required: false,
    // },
    // roomDimension: {
    //   type: [RoomDimensionSchema],
    //   required: false,
    // },
    roomDimension: [RoomDimensionSchema],
    houseTiming: [TimingSchema],
    // houseTiming: [
    //   {
    //     timeId: {
    //       type: String,
    //     },
    //     day: {
    //       type: String,
    //     },

    //     opening: {
    //       type: String,
    //     },
    //     closing: {
    //       type: String,
    //     },
    //   },
    // ],
    // roomDimension: [
    //   {
    //     roomId: {
    //       type: String,
    //     },
    //     attachBathroom: {
    //       type: String,
    //     },
    //     dimensions: {
    //       type: String,
    //     },
    //     levels: {
    //       type: String,
    //     },
    //   },
    // ],
    // roomDimension: [RoomDimensionSchema],
    firePlaces: {
      type: String,
      required: false,
    },
    roofingType: {
      type: String,
      required: false,
    },
    neighbouringAmenities: {
      type: Array,
      required: false,
    },
    exteriorConstruction: {
      type: Array,
      required: false,
    },
    propertyTax: {
      type: String,
      required: false,
    },
    propertyTaxYear: {
      type: String,
      required: false,
    },
    firePlacesFuel: {
      type: String,
      required: false,
    },
    associationPOTLFee: {
      type: String,
      required: false,
    },
    assessmentAmount: {
      type: String,
      required: false,
    },
    assessmentYear: {
      type: String,
      required: false,
    },
    appliances: {
      type: Array,
      required: false,
    },
    sewerType: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
