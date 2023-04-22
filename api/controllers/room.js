import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Bookings from "../models/Bookings.js";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
import {sendEmail} from "../utils/sendEmail.js";



export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
// Import the 'promisify' function from the 'util' module

export const updateRoomAvailability = async (req, res, next) => {
  try {
    if (!req.body?.dates || !req.body?.hotels) {
      throw createError(400, "Bad request");
    }


    const session = await mongoose.startSession(); // Start a new session
    session.startTransaction(); // Start a transaction

    try {
      // Update room status
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      const room = await Room.findOne({ "roomNumbers._id": req.params.id });

      // Save new booking
      const newBooking = new Bookings({
        hotel: mongoose.Types.ObjectId(req.body.hotels),
        room: mongoose.Types.ObjectId(room._id),
        user: mongoose.Types.ObjectId(req.user.id),
      });
      await newBooking.save();

      console.log("Bookings and Room status saved");



      // Populate the user field with the corresponding User document
    // Populate the user, hotel, and room fields with corresponding documents
  await Bookings.populate(newBooking, { path: 'user hotel room' });

      // Commit the transaction
      await session.commitTransaction();
      // End the session
      session.endSession();
      res.status(200).json("Room status has been updated.");
      console.log(`user.email: ${newBooking.user.email}`);
      sendEmail(
        newBooking.user.email,
        newBooking.user.username,
        // trim the booking id to 5 characters
        newBooking._id.toString().slice(0, 5),
        // format the date to a readable format
        newBooking.createdAt.toDateString(),
        newBooking.hotel.name,
        newBooking.room.title,
        newBooking.hotel.city,
        newBooking.room.price

      );

    } catch (err) {
      // An error occurred, so rollback the transaction
      await session.abortTransaction();
      session.endSession();

      console.log(err);
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};


export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
