export type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Traveler",
    text: "Amazing experience! Booking flights and hotels was super smooth.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Ali Rezaei",
    role: "Customer",
    text: "واقعا یکی از بهترین تجربه‌های سفرم بود 🔥",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "John Carter",
    role: "Explorer",
    text: "UI is beautiful and very easy to use.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "Client",
    text: "Best travel platform I've used so far.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];
