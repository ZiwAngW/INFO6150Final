import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Bookings from "../models/Bookings.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const getHotelsByType = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ type: req.params.type });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

// get all the bookings from the Booking model
export const getBookings = async (req, res, next) => {
  try {
    let dummy_response = {
      "status": 200,
      "count": 3,
      "data": [
          {
              "_id": "644168c1ff51de3706b310cf",
              "hotel": {
                  "_id": "6440999da0e468be1458aca8",
                  "name": "Hotel sexy",
                  "type": "hotel",
                  "city": "Boston",
                  "address": "15 Highgate Street",
                  "distance": "500",
                  "photos": [
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/feqoynmopbcmkseugq4h.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/wop3h8dzi8fibyjjtg7g.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/xpwfzpjsxosl2ukh36cq.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/k8akewke6p2lvsofkm8o.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/jflkweoxyqzauq8pva2i.jpg"
                  ],
                  "title": "The Sexy one",
                  "desc": "dsdsds",
                  "rooms": [
                      "643c8f8f2e30242a1a433035"
                  ],
                  "cheapestPrice": 100,
                  "featured": true,
                  "__v": 0
              },
              "room": {
                "title": "Single Room",
                "desc": "Single Room",
                "price": 100,
              },
              "user": {
                  "_id": "643c6f8b415c5820ececafbc",
                  "username": "jainal09",
                  "email": "jainal09gosalia@gmail.com",
                  "country": "USA",
                  "city": "Boston",
                  "phone": "+1123",
                  "password": "$2a$10$Za764bEZ575CEGQ1eq2G6OnPsCjSgGNTYx/nWrPhNDXKShXrt1jnO",
                  "isAdmin": true,
                  "createdAt": "2023-04-16T21:58:35.696Z",
                  "updatedAt": "2023-04-16T21:58:35.696Z",
                  "__v": 0
              },
              "createdAt": "2023-04-20T16:30:57.334Z",
              "updatedAt": "2023-04-20T16:30:57.334Z",
              "__v": 0
          },
          {
              "_id": "64416efa1b0e9bbcc5bf2ca4",
              "hotel": {
                  "_id": "6440999da0e468be1458aca8",
                  "name": "Hotel sexy",
                  "type": "hotel",
                  "city": "Boston",
                  "address": "15 Highgate Street",
                  "distance": "500",
                  "photos": [
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/feqoynmopbcmkseugq4h.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/wop3h8dzi8fibyjjtg7g.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/xpwfzpjsxosl2ukh36cq.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/k8akewke6p2lvsofkm8o.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/jflkweoxyqzauq8pva2i.jpg"
                  ],
                  "title": "The Sexy one",
                  "desc": "dsdsds",
                  "rooms": [
                      "643c8f8f2e30242a1a433035"
                  ],
                  "cheapestPrice": 100,
                  "featured": true,
                  "__v": 0
              },
              "room": {
                "title": "Double Room",
                "desc": "Double Room",
                "price": 1000,
              },
              "user": {
                  "_id": "643c6f8b415c5820ececafbc",
                  "username": "jainal09",
                  "email": "jainal09gosalia@gmail.com",
                  "country": "USA",
                  "city": "Boston",
                  "phone": "+1123",
                  "password": "$2a$10$Za764bEZ575CEGQ1eq2G6OnPsCjSgGNTYx/nWrPhNDXKShXrt1jnO",
                  "isAdmin": true,
                  "createdAt": "2023-04-16T21:58:35.696Z",
                  "updatedAt": "2023-04-16T21:58:35.696Z",
                  "__v": 0
              },
              "createdAt": "2023-04-20T16:57:30.937Z",
              "updatedAt": "2023-04-20T16:57:30.937Z",
              "__v": 0
          },
          {
              "_id": "644172c10fdc9bebab6dda20",
              "hotel": {
                  "_id": "6440999da0e468be1458aca8",
                  "name": "Hotel sexy",
                  "type": "hotel",
                  "city": "Boston",
                  "address": "15 Highgate Street",
                  "distance": "500",
                  "photos": [
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/feqoynmopbcmkseugq4h.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/wop3h8dzi8fibyjjtg7g.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/xpwfzpjsxosl2ukh36cq.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/k8akewke6p2lvsofkm8o.jpg",
                      "http://res.cloudinary.com/dui5pbcjj/image/upload/v1681955228/upload/jflkweoxyqzauq8pva2i.jpg"
                  ],
                  "title": "The Sexy one",
                  "desc": "dsdsds",
                  "rooms": [
                      "643c8f8f2e30242a1a433035"
                  ],
                  "cheapestPrice": 100,
                  "featured": true,
                  "__v": 0
              },
              "room": {
                "title": "Double Delux Room",
                "desc": "Double Delux Room",
                "price": 2000,
              },
              "user": {
                  "_id": "643c6f8b415c5820ececafbc",
                  "username": "jainal09",
                  "email": "jainal09gosalia@gmail.com",
                  "country": "USA",
                  "city": "Boston",
                  "phone": "+1123",
                  "password": "$2a$10$Za764bEZ575CEGQ1eq2G6OnPsCjSgGNTYx/nWrPhNDXKShXrt1jnO",
                  "isAdmin": true,
                  "createdAt": "2023-04-16T21:58:35.696Z",
                  "updatedAt": "2023-04-16T21:58:35.696Z",
                  "__v": 0
              },
              "createdAt": "2023-04-20T17:13:37.879Z",
              "updatedAt": "2023-04-20T17:13:37.879Z",
              "__v": 0
          }
      ]
  }
    // const bookings = await Bookings.find()
    // .populate("hotel") // Populate the 'hotel' field with all its data
    // .populate("user") // Populate the 'user' field with all its data
    // .populate("room");
    // const response = {
    //   status: 200,
    //   count: bookings.length,
    //   data: bookings,
    // }
    res.status(200).json(dummy_response);
  } catch (err) {
    next(err);
  }
}