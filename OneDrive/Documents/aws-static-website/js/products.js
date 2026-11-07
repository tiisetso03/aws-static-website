// products.js — Product catalogue data for The Bag Spot
// To use real images: replace the `image` value with e.g. "images/classic-tote.jpg"
// and upload the image file to the images/ folder (and later to S3).

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Leather Tote",
    price: 1299,
    description:
      "Timeless full-grain leather tote with spacious interior and gold-tone hardware. Perfect for everyday use.",
    image: "images/bag-canvas-tote.jpg",
    imageLabel: "Classic Leather Tote",
    category: "tote",
  },
  {
    id: 2,
    name: "Urban Shoulder Bag",
    price: 899,
    description:
      "Sleek structured shoulder bag with adjustable strap. Ideal for work or weekend outings.",
    image: "images/bag-shoulder.jpg",
    imageLabel: "Urban Shoulder Bag",
    category: "shoulder",
  },
  {
    id: 3,
    name: "Mini Crossbody",
    price: 649,
    description:
      "Compact crossbody with multiple compartments. Lightweight and stylish for on-the-go essentials.",
    image: "images/bag-crossbody.jpg",
    imageLabel: "Mini Crossbody",
    category: "crossbody",
  },
  {
    id: 4,
    name: "Executive Laptop Bag",
    price: 1599,
    description:
      'Professional laptop bag with padded compartment for up to 15". Combines function with elegance.',
    image: "images/bag-laptop.jpg",
    imageLabel: "Executive Laptop Bag",
    category: "work",
  },
  {
    id: 5,
    name: "Everyday Canvas Bag",
    price: 549,
    description:
      "Durable waxed canvas tote with leather handles. Casual, roomy and effortlessly chic.",
    image: "images/bag-canvas-tote.jpg",
    imageLabel: "Everyday Canvas Bag",
    category: "tote",
  },
  {
    id: 6,
    name: "Evening Clutch",
    price: 799,
    description:
      "Elegant satin clutch with detachable chain strap. The perfect companion for special occasions.",
    image: "images/bag-straw.jpg",
    imageLabel: "Evening Clutch",
    category: "clutch",
  },
  {
    id: 7,
    name: "Travel Weekender",
    price: 1899,
    description:
      "Spacious overnight bag with shoe compartment and trolley sleeve. Built for the stylish traveller.",
    image: "images/bag-duffel.jpg",
    imageLabel: "Travel Weekender",
    category: "travel",
  },
  {
    id: 8,
    name: "Premium Handbag",
    price: 2199,
    description:
      "Luxurious structured handbag in supple Italian-style leather. A statement piece for any wardrobe.",
    image: "images/bag-backpack.jpg",
    imageLabel: "Premium Handbag",
    category: "handbag",
  },
  {
    id: 9,
    name: "Structured Office Bag",
    price: 1149,
    description:
      "Clean-lined office bag with interior organiser pockets. Keeps your workday essentials in order.",
    image: "images/bag-laptop.jpg",
    imageLabel: "Structured Office Bag",
    category: "work",
  },
  {
    id: 10,
    name: "Casual Sling Bag",
    price: 499,
    description:
      "Relaxed sling bag in soft vegan leather. Hands-free convenience with a laid-back aesthetic.",
    image: "images/bag-crossbody.jpg",
    imageLabel: "Casual Sling Bag",
    category: "crossbody",
  },
  {
    id: 11,
    name: "Boho Fringe Bag",
    price: 749,
    description:
      "Free-spirited suede bag with tassel fringe detail. Adds a bohemian touch to any outfit.",
    image: "images/bag-shoulder.jpg",
    imageLabel: "Boho Fringe Bag",
    category: "shoulder",
  },
  {
    id: 12,
    name: "Quilted Chain Bag",
    price: 1099,
    description:
      "Chic quilted bag with gold chain strap. Inspired by classic European fashion houses.",
    image: "images/bag-straw.jpg",
    imageLabel: "Quilted Chain Bag",
    category: "handbag",
  },
];

// Format price as South African Rand
function formatPrice(amount) {
  return "R " + amount.toLocaleString("en-ZA");
}

// Build the product image element (placeholder if no image file set)
function buildProductImage(product, cssClass) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" class="${cssClass}" loading="lazy">`;
  }
  return `
    <div class="product-image-placeholder">
      <span class="ph-icon">👜</span>
      <span>${product.imageLabel}</span>
      <span style="font-size:.7rem;opacity:.6">Replace with image</span>
    </div>`;
}
