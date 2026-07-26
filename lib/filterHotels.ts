import { Hotel, HotelFiltersState, SortOption } from "@/types/Hotel";

export function filterHotels(
  hotels: Hotel[],
  filters: HotelFiltersState,
): Hotel[] {
  const {
    priceRange,
    starRatings,
    minGuestRating,
    amenities,
    propertyTypes,
    roomTypes,
  } = filters;

  return hotels.filter((hotel) => {
    const priceOk =
      hotel.minPrice <= priceRange[1] && hotel.maxPrice >= priceRange[0];
    if (!priceOk) return false;

    if (starRatings.length > 0 && !starRatings.includes(hotel.starRating))
      return false;

    if (minGuestRating !== null && hotel.guestRating < minGuestRating)
      return false;

    if (amenities.length > 0) {
      const hasAll = amenities.every((a) => hotel.amenities.includes(a));
      if (!hasAll) return false;
    }

    if (propertyTypes.length > 0 && !propertyTypes.includes(hotel.propertyType))
      return false;

    if (roomTypes.length > 0) {
      const hasRoomType = hotel.rooms.some((r) =>
        roomTypes.includes(r.roomType),
      );
      if (!hasRoomType) return false;
    }

    return true;
  });
}

export function sortHotels(hotels: Hotel[], sort: SortOption): Hotel[] {
  const sorted = [...hotels];

  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.minPrice - b.minPrice);
    case "price_desc":
      return sorted.sort((a, b) => b.maxPrice - a.maxPrice);
    case "guest_rating":
      return sorted.sort((a, b) => b.guestRating - a.guestRating);
    case "star_rating":
      return sorted.sort((a, b) => b.starRating - a.starRating);
    case "default":
    default:
      // Featured order: highest-rated 5★/4★ hotels first, stable otherwise
      return sorted.sort(
        (a, b) =>
          b.starRating * 10 +
          b.guestRating -
          (a.starRating * 10 + a.guestRating),
      );
  }
}

export function filterAndSortHotels(
  hotels: Hotel[],
  filters: HotelFiltersState,
  sort: SortOption,
): Hotel[] {
  return sortHotels(filterHotels(hotels, filters), sort);
}
