import { Product, ProductCategory } from '@/types';

export const products: Product[] = [
  {
    id: 'headrest-handles-001',
    name: 'Paracord Headrest Grab Handles (Pair)',
    description:
      'These 100% handmade paracord grab handles come as a pair of two for both headrests and are the perfect addition to any truck, Jeep, or SUV for off-roading or extra assistance entering the back seat. Measuring approximately 11–12 inches in length, these handles are exceptionally strong, durable, and guaranteed to last through all weather conditions and heavy use. Each set is custom-made in any color combination you choose, with the primary color running down the middle of the handle and the secondary color accenting the sides. While pictured here in a Toyota Tacoma, they are a versatile fit for any vehicle and provide a reliable safety step-up for children and adults alike; if you need specific color combinations or custom length adjustments, please message us directly to ensure your order perfectly meets your needs.',
    price: 30.00,
    image: '/products/headrest-handles.jpg',
    categories: ['headrest-handles'],
    inStock: true,
    featured: true,
    colors: ['Red', 'Black','Blue', 'Gray', 'White', 'Green', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: ['Universal'],
  },
  {
    id: 'headrest-handles-002',
    name: 'Paracord Kid Assist Grab Handle: Lifted Vehicle Accessory (single)',
    description:
      `Custom Paracord Kid Assist Grab Handle for Lifted Trucks & Jeeps. Struggling to get your kids (or anyone!) safely into your lifted truck, Jeep, or SUV? This custom-made Paracord Kid Assist Handle is the perfect solution for easier, safer back seat entry! Boosted Independence: Gives children the leverage they need to step up and climb in on their own. Safety First: Provides a secure, stable handhold, preventing slips and tumbles during entry and exit. Heavy Duty: Made from 100% durable Paracord, built to withstand the elements and hold substantial weight—this is an accessory that truly lasts. Length: Approximately 24 inches (2 feet) long. Vehicle Fit: Perfect for Lifted Trucks, SUVs, Jeeps, and all Off-Road Vehicles with back seat headrest posts. Quantity: Every order is for ONE (1) single grab handle. If you need a pair, please order two.`,
    price: 25.00,
    image: '/products/kid-grab-handle.jpg',
    categories: ['headrest-handles'],
    inStock: true,
    featured: true,
    colors: ['Black', 'Red', 'Blue', 'Gray', 'White', 'Green', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: ['Universal'],
  },
  {
    id: 'headrest-handles-003',
    name: 'Headrest Paracord Clips (2 pack)',
    description:
      'These handmade paracord headrest clips provide a heavy-duty solution for organizing your vehicle, featuring a high-strength carabiner designed to secure grocery bags, backpacks, and water bottles to prevent them from rolling around while you drive. Engineered for versatility, these clips attach directly to your headrest and rotate easily from front to back to accommodate your storage needs in either the front or rear seat. Every unit is made to order and built to support significant weight, offering full customization for both color and length to match your vehicles interior. When selecting your options, the primary color serves as the center of the braid while the secondary color accents the sides; if you have a specific color request or need a custom length adjustment, please message us directly so we can create the perfect set for your needs.',
    price: 20.00,
    image: '/products/headrest-clips.jpg',
    categories: ['headrest-handles', 'accessories'],
    inStock: true,
    featured: true,
    colors: ['Black', 'Red', 'Blue', 'Gray', 'White', 'Green', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: [ 'Universal'],
  },
  {
    id: 'roof-rack-handle-001',
    name: 'Paracord Roof Rack Handle (pair)',
    description:
      'These 100% handmade paracord roof rack handles are the ultimate utility upgrade for off-roaders and outdoor enthusiasts, specifically designed to help you pull yourself up to easily access gear or secure loads on top of your vehicle. Shown here on a Prinsu rack for a Toyota Tacoma, these rugged handles are compatible with a wide variety of SUV roof racks and are built to remain incredibly strong and durable through the most extreme weather conditions. Each order comes as a pair of two and includes all necessary heavy-duty hardware for a secure installation, including an eyebolt, two washers, a lock washer, and a nut for each handle. Every set is fully customizable to match your specific build, with the primary color running down the center of the braid and the secondary color accenting the sides. If you are looking for a specific color combination or require custom length adjustments, please message us directly so we can tailor these handles perfectly to your adventure rig.',
    price: 40.00,
    image: '/products/roof-rack-handles.jpg',
    categories: ['roof-rack-handles'],
    inStock: true,
    featured: false,
    colors: ['Black', 'Green', 'Blue', 'Gray', 'White', 'Red', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: ['Prinsu Roof Rack'],
  },
  {
    id: 'pet-zipline-001',
    name: 'Paracord Backseat Zip Line For Pets',
    description:
      'Take your furry friends on your next adventure with peace of mind using this handcrafted paracord pet zip line, designed to give your pets the freedom to move across the backseat while ensuring they remain safely secured. This heavy-duty system attaches easily to the overhead grab handles on both sides of your vehicle, creating a stable track with a sliding center attachment that clips directly to your pet’s harness or collar. While the standard 42-inch length is tailored for a Toyota Tacoma backseat, each unit is made to order, and we can easily customize the length to provide a perfect fit for any truck or SUV. Every setup comes complete with three high-strength black carabiner clips for immediate use and is fully customizable to match your vehicles style. Simply choose your primary color for the center of the braid and a secondary color for the sides; if you need a specific length adjustment or a unique color combination, please message us directly so we can build the ideal travel solution for you and your pet.',
    price: 50.00,
    image: '/products/pet-zipline.jpg',
    categories: ['pets'],
    inStock: true,
    featured: true,
    colors: ['Black', 'Red', 'Blue', 'Gray', 'White', 'Green', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: [ 'Universal'],
  },
  {
    id: 'camera-strap-001',
    name: 'Paracord Camera Neck Strap',
    description:
      'This universal camera neck strap is meticulously handcrafted from high-strength 550 paracord, offering a rugged yet sophisticated solution for photographers who need their gear to withstand any element or environment. Engineered for both maximum durability and everyday comfort, the strap remains exceptionally flexible and is designed for easy, all-day wear during long shoots or outdoor expeditions. Compatible with any camera model, each strap is built to order with the same military-grade dedication to quality found in all our gear. If you would like a custom length tailored to your specific height or shooting style, please feel free to send a message or leave a note with your order so we can create the perfect fit for your next adventure.',
    price: 30.00,
    image: '/products/camera-strap.jpg',
    categories: ['accessories'],
    inStock: true,
    featured: false,
    colors: ['Cream', 'Olive Green', 'Blue', 'Gray', 'White', 'Green', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Black', 'Red', 'Teal', 'Brown'],
    vehicleCompatibility: [ 'Universal'],
  },
  {
    id: 'jeep-grab-handles-001',
    name: 'Jeep Wrangler Roll Cage Paracord Grab Handles',
    description:
      'Upgrade your Jeep Wrangler with these heavy-duty, handcrafted paracord grab handles, specifically engineered to provide a secure and stable grip on your vehicle’s roll cage. Whether you’re navigating technical off-road trails or simply looking for a reliable assist for entering and exiting your rig, these handles are built from high-strength 550 paracord to withstand the toughest environments and weather conditions. Proudly veteran owned and operated in Las Vegas, we ensure every set is made with a commitment to quality and durability that mass-produced accessories can’t match. These handles are fully customizable to fit your Jeep\'s unique style; your primary color choice will run down the center of the braid, while the secondary color accents the sides. Sold as a pair, these handles are designed for a universal fit on standard Wrangler roll bars, but we are always happy to accommodate custom length adjustments or unique color combinations—just send us a message to tailor a set for your next adventure.',
    price: 40.00,
    image: '/products/jeep-wrangler-grab-handles.jpg',
    categories: ['jeep-wrangler'],
    inStock: true,
    featured: false,
    colors: ['Gray', 'Blue', 'Green', 'Black', 'White', 'Red', 'Orange', 'Light Pink', 'Hot Pink', 'Yellow', 'Purple', 'Gold', 'Rainbow', 'Cream', 'Olive Green', 'Teal', 'Brown'],
    vehicleCompatibility: ['Jeep Wrangler'],
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((product) => product.categories.includes(category));
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
