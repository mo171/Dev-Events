import mongoose, { Document, Model, Schema, Types } from "mongoose";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Add index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

/**
 * Pre-save hook to verify that the referenced event exists
 * Prevents orphaned bookings
 */
BookingSchema.pre("save", async function (next) {
  const booking = this;

  // Only validate eventId if it's new or modified
  if (booking.isNew || booking.isModified("eventId")) {
    try {
      // Dynamically import Event model to avoid circular dependency
      const Event = mongoose.models.Event || (await import("./event.model")).default;
      
      const eventExists = await Event.exists({ _id: booking.eventId });
      
      if (!eventExists) {
        return next(new Error("Referenced event does not exist"));
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new Error("Failed to validate event reference"));
    }
  }

  next();
});

// Prevent model overwrite in development (Next.js hot reload)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
