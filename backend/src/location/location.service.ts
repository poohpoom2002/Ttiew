import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './location.model';
import { Review } from 'src/review/review.model';
@Injectable()
export class LocationsService {
  constructor(
    @InjectModel('Location') private readonly LocationModel: Model<Location>,
  ) {}

  async insertLocation(
    category: [string],
    keyword: [string],
    name: string,
    location: string,
    googleMap: string,
    openClose: string,
    price: string,
    phone: string,
    website: string,
    img: string,
    detail: string,
    review: Review[],
  ) {
    const newLocation = new this.LocationModel({
      category,
      keyword,
      name,
      location,
      googleMap,
      openClose,
      price,
      phone,
      website,
      img,
      detail,
      review,
    });
    const result = await newLocation.save();
    return result.id as string;
  }

  async getLocations() {
    const Locations = await this.LocationModel.find().exec();
    return Locations.map((loc) => ({
      id: loc.id,
      category: loc.category,
      keyword: loc.keyword,
      name: loc.name,
      location: loc.location,
      googleMap: loc.googleMap,
      openClose: loc.openClose,
      price: loc.price,
      phone: loc.phone,
      website: loc.website,
      img: loc.img,
      detail: loc.detail,
      review: loc.review,
    }));
  }

  async getSingleLocation(LocationId: string) {
    const Location = await this.findLocation(LocationId);
    return {
      id: Location.id,
      category: Location.category,
      keyword: Location.keyword,
      name: Location.name,
      location: Location.location,
      googleMap: Location.googleMap,
      openClose: Location.openClose,
      price: Location.price,
      phone: Location.phone,
      website: Location.website,
      img: Location.img,
      detail: Location.detail,
      review: Location.review,
    };
  }

  async updateLocation(
    LocationId: string,
    category: [string],
    keyword: [string],
    name: string,
    location: string,
    googleMap: string,
    openClose: string,
    price: string,
    phone: string,
    website: string,
    img: string,
    detail: string,
    review: Review[],
  ) {
    const updatedLocation = await this.findLocation(LocationId);

    if (category) {
      updatedLocation.category.push(...category);
    }
    if (keyword) {
      updatedLocation.keyword.push(...keyword);
    }
    if (name) {
      updatedLocation.name = name;
    }
    if (location) {
      updatedLocation.location = location;
    }
    if (googleMap) {
      updatedLocation.googleMap = googleMap;
    }
    if (openClose) {
      updatedLocation.openClose = openClose;
    }
    if (price) {
      updatedLocation.price = price;
    }
    if (phone) {
      updatedLocation.phone = phone;
    }
    if (website) {
      updatedLocation.website = website;
    }
    if (img) {
      updatedLocation.img = img;
    }
    if (detail) {
      updatedLocation.detail = detail;
    }
    if (review) {
      updatedLocation.review.push(...review);
    }
    await updatedLocation.save();
  }

  async deleteLocation(locId: string) {
    const result = await this.LocationModel.deleteOne({ _id: locId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find Location.');
    }
  }

  async findLocation(id: string): Promise<Location> {
    let location: Location | null;
    try {
      location = await this.LocationModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Location 1.');
    }
    if (!location) {
      throw new NotFoundException('Could not find Location 2.', id);
    }
    return location;
  }

  async getLocationsBySearch(
    searchName: string,
    searchCategory: string[],
    searchKeyword: string[],
    user,
  ) {
    try {
      const locations = await this.LocationModel.find().exec();
      const uniqueIds = new Set(); // To store unique IDs
      console.log(user);
      user.likeItem.forEach((like) => uniqueIds.add(like.placeId));
      const filteredLocations = locations
        .filter(
          (loc) =>
            searchName.trim() !== '' &&
            loc.name.toLowerCase().includes(searchName.toLowerCase()) &&
            !uniqueIds.has(loc.id),
        )
        .map((loc) => ({
          id: loc.id,
          category: loc.category,
          keyword: loc.keyword,
          name: loc.name,
          location: loc.location,
          googleMap: loc.googleMap,
          openClose: loc.openClose,
          price: loc.price,
          phone: loc.phone,
          website: loc.website,
          img: loc.img,
          detail: loc.detail,
          review: loc.review,
        }));
      if (filteredLocations.length >= 20) {
        filteredLocations.sort(() => Math.random() - 0.5);
        const first20Locations = filteredLocations.slice(0, 20);

        first20Locations.sort((a, b) => {
          // Count the number of matching keywords for a and b
          const aMatchingKeywords = a.keyword.filter((kw) =>
            searchKeyword.includes(kw.toLowerCase()),
          );
          const bMatchingKeywords = b.keyword.filter((kw) =>
            searchKeyword.includes(kw.toLowerCase()),
          );

          // Count the number of matching categories for a and b
          const aMatchingCategories = a.category.filter((cat) =>
            searchCategory.includes(cat.toLowerCase()),
          );
          const bMatchingCategories = b.category.filter((cat) =>
            searchCategory.includes(cat.toLowerCase()),
          );

          // Assign weights to keyword and category matches (you can adjust these weights as needed)
          const keywordWeight = 1; // Weight for matching keywords
          const categoryWeight = 2; // Weight for matching categories

          // Calculate the total weight for a and b
          const totalWeightA =
            aMatchingKeywords.length * keywordWeight +
            aMatchingCategories.length * categoryWeight;
          const totalWeightB =
            bMatchingKeywords.length * keywordWeight +
            bMatchingCategories.length * categoryWeight;

          // Sort in descending order based on total weight
          return totalWeightB - totalWeightA;
        });

        return first20Locations;
      } else {
        filteredLocations.forEach((location) => uniqueIds.add(location.id));

        const relateLocations = locations
          .filter(
            (loc) =>
              (!uniqueIds.has(loc.id) &&
                searchCategory.length > 0 &&
                searchCategory.some((cat) => loc.category.includes(cat))) ||
              (searchKeyword.length > 0 &&
                searchKeyword.some((cat) => loc.keyword.includes(cat))),
          )
          .map((loc) => ({
            id: loc.id,
            category: loc.category,
            keyword: loc.keyword,
            name: loc.name,
            location: loc.location,
            googleMap: loc.googleMap,
            openClose: loc.openClose,
            price: loc.price,
            phone: loc.phone,
            website: loc.website,
            img: loc.img,
            detail: loc.detail,
            review: loc.review,
          }));
        const relateLocationCount = Math.min(
          20 - filteredLocations.length,
          relateLocations.length,
        );

        if (
          filteredLocations.length + relateLocations.length > 20 &&
          relateLocations.length > 0
        ) {
          const maxRelateLocationsCount = 20 - filteredLocations.length;
          relateLocations.sort(() => Math.random() - 0.5);
          relateLocations.splice(maxRelateLocationsCount);
        }

        relateLocations.sort((a, b) => {
          // Count the number of matching keywords for a and b
          const aMatchingKeywords = a.keyword.filter((kw) =>
            searchKeyword.includes(kw.toLowerCase()),
          );
          const bMatchingKeywords = b.keyword.filter((kw) =>
            searchKeyword.includes(kw.toLowerCase()),
          );

          // Count the number of matching categories for a and b
          const aMatchingCategories = a.category.filter((cat) =>
            searchCategory.includes(cat.toLowerCase()),
          );
          const bMatchingCategories = b.category.filter((cat) =>
            searchCategory.includes(cat.toLowerCase()),
          );

          // Assign weights to keyword and category matches (you can adjust these weights as needed)
          const keywordWeight = 1; // Weight for matching keywords
          const categoryWeight = 2; // Weight for matching categories

          // Calculate the total weight for a and b
          const totalWeightA =
            aMatchingKeywords.length * keywordWeight +
            aMatchingCategories.length * categoryWeight;
          const totalWeightB =
            bMatchingKeywords.length * keywordWeight +
            bMatchingCategories.length * categoryWeight;

          // Sort in descending order based on total weight
          return totalWeightB - totalWeightA;
        });

        for (let i = 0; i < relateLocationCount; i++) {
          if (!uniqueIds.has(relateLocations[i].id)) {
            filteredLocations.push(relateLocations[i]);
            uniqueIds.add(relateLocations[i].id);
          }
        }

        // Fill in gaps with random locations to reach a total of 20
        while (filteredLocations.length < 20) {
          const randomLocation =
            locations[Math.floor(Math.random() * locations.length)];

          // Check if the random location's ID is not in the uniqueIds set
          if (!uniqueIds.has(randomLocation.id)) {
            filteredLocations.push({
              id: randomLocation.id,
              category: randomLocation.category,
              keyword: randomLocation.keyword,
              name: randomLocation.name,
              location: randomLocation.location,
              googleMap: randomLocation.googleMap,
              openClose: randomLocation.openClose,
              price: randomLocation.price,
              phone: randomLocation.phone,
              website: randomLocation.website,
              img: randomLocation.img,
              detail: randomLocation.detail,
              review: randomLocation.review,
            });

            // Add the random location's ID to the uniqueIds set
            uniqueIds.add(randomLocation.id);
          }
        }
      }
      return filteredLocations;
    } catch (error) {
      throw new Error('An error occurred while fetching locations.');
    }
  }
}
