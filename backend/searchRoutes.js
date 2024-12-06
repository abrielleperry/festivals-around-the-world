import express from "express";
import logger from "./logger.js";

/* example usage:
http://localhost:5001/api/search-festivals?name=Trotamundo
http://localhost:5001/api/search-festivals?city=Houston
http://localhost:5001/api/search-festivals?city=Groningen&countryName=Netherlands
http://localhost:5001/api/search-festivals?countryIdentifier=MX
http://localhost:5001/api/search-festivals?timezone=Europe/Vienna
http://localhost:5001/api/search-festivals?startDate=2025-01-24
http://localhost:5001/api/search-festivals?startDate=2025-01-24&endDate=2025-01-25
*/

const router = express.Router();

const createSearchRoutes = (festivalsCollection) => {
  router.get("/search-festivals", async (req, res) => {
    const {
      name,
      startDate,
      endDate,
      locationName,
      streetAddress,
      addressLocality,
      postalCode,
      countryIdentifier,
      country,
      timezone,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum <= 0 || limitNum <= 0) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (startDate) {
      query.startDate = { $gte: startDate };
    }

    if (endDate) {
      query.endDate = { $lte: endDate };
    }


    if (locationName) {
      query["location/name"] = { $regex: locationName, $options: "i" };
    }

    if (streetAddress) {
      query["location/address/streetAddress"] = { $regex: streetAddress, $options: "i" };
    }

    if (addressLocality) {
      query["location/address/addressLocality"] = { $regex: addressLocality, $options: "i" };     }

    if (postalCode) {
      query["location/address/postalCode"] = { $regex: postalCode, $options: "i" };
    }

    if (countryIdentifier) {
      query["location/address/addressCountry/identifier"] = { $regex: countryIdentifier, $options: "i" };
    }

    if (country) {
      query["location/address/addressCountry/name"] = { $regex: country, $options: "i" };
    }

    if (timezone) {
      query["location/address/x-timezone"] = { $regex: timezone, $options: "i" };
    }

    try {
      const festivals = await festivalsCollection
        .find(query)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .toArray();

      const total = await festivalsCollection.countDocuments(query);

      res.status(200).json({
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        data: festivals,
      });
    } catch (error) {
      logger.error("Error searching festivals:", error.message);
      res.status(500).json({ message: "Failed to search festivals" });
    }
  });

  return router;
};

export default createSearchRoutes;
