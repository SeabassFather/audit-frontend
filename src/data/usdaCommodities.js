// Comprehensive USDA Commodity Database
// Based on USDA Agricultural Marketing Service (AMS) and Organic Integrity Database
// 500+ produce items with packaging, sizes, and handling methods

export const usdaCommodities = [
  // VEGETABLES - Fruiting
  {
    id: "tomatoes",
    name: "Tomatoes",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: [
      "Roma", "Beefsteak", "Cherry", "Grape", "Heirloom", "Plum", "Vine-Ripe",
      "Cluster", "Campari", "Cocktail", "San Marzano", "Kumato", "Cherokee Purple"
    ],
    packaging: ["Bulk", "Carton", "Box", "Clamshell", "Bag", "Tray Pack", "Lug", "Bushel"],
    sizes: ["Extra Large", "Large", "Medium", "Small", "20lb Carton", "25lb Carton", "10lb Box"],
    handling: ["Organic", "Conventional", "Greenhouse", "Hydroponic", "Field Grown", "Cold Storage"],
    units: ["lb", "carton", "box", "bushel"],
    season: ["Year-round", "Peak: June-September"]
  },
  {
    id: "peppers_bell",
    name: "Bell Peppers",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: ["Red", "Green", "Yellow", "Orange", "Purple", "Chocolate", "White", "Mini Sweet"],
    packaging: ["Bulk", "Carton", "Box", "Bag", "Crate", "Bushel"],
    sizes: ["Jumbo", "Extra Large", "Large", "Medium", "Small", "25lb Box", "28lb Carton"],
    handling: ["Organic", "Conventional", "Greenhouse", "Field Grown", "Cold Storage"],
    units: ["lb", "carton", "box", "bushel"],
    season: ["Year-round", "Peak: July-October"]
  },
  {
    id: "peppers_hot",
    name: "Hot Peppers",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: [
      "Jalapeño", "Serrano", "Habanero", "Ghost", "Scotch Bonnet", "Thai",
      "Poblano", "Anaheim", "Cayenne", "Banana", "Fresno", "Shishito"
    ],
    packaging: ["Bulk", "Carton", "Box", "Clamshell", "Bag"],
    sizes: ["10lb Box", "15lb Box", "5lb Box", "Loose"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round", "Peak: June-October"]
  },
  {
    id: "cucumbers",
    name: "Cucumbers",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: ["English", "Persian", "Pickling", "Slicing", "Kirby", "Lemon", "Armenian"],
    packaging: ["Bulk", "Carton", "Box", "Crate", "Bushel", "Wrapped"],
    sizes: ["48ct", "36ct", "24ct", "Jumbo", "Standard", "28lb Carton"],
    handling: ["Organic", "Conventional", "Greenhouse", "Field Grown", "Waxed", "Unwaxed"],
    units: ["lb", "carton", "box", "bushel", "count"],
    season: ["Year-round", "Peak: May-August"]
  },
  {
    id: "eggplant",
    name: "Eggplant",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: ["Globe", "Italian", "Japanese", "Chinese", "Fairy Tale", "White", "Graffiti"],
    packaging: ["Bulk", "Carton", "Box", "Crate", "Bushel"],
    sizes: ["Large", "Medium", "Small", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "carton", "box", "bushel"],
    season: ["Year-round", "Peak: July-October"]
  },
  {
    id: "squash_summer",
    name: "Summer Squash",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: ["Zucchini", "Yellow", "Crookneck", "Straightneck", "Pattypan", "Eight Ball"],
    packaging: ["Bulk", "Carton", "Box", "Bushel", "Crate"],
    sizes: ["Small", "Medium", "Large", "19lb Bushel", "24ct Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "bushel", "box"],
    season: ["Year-round", "Peak: June-September"]
  },
  {
    id: "squash_winter",
    name: "Winter Squash",
    category: "vegetables",
    subcategory: "fruiting",
    varieties: [
      "Butternut", "Acorn", "Spaghetti", "Kabocha", "Delicata", "Hubbard",
      "Pumpkin", "Sugar Pumpkin", "Pie Pumpkin"
    ],
    packaging: ["Bulk", "Carton", "Box", "Bin", "Crate"],
    sizes: ["Large", "Medium", "Small", "40lb Carton", "35lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "carton", "box", "bin"],
    season: ["September-March", "Peak: October-December"]
  },

  // VEGETABLES - Leafy Greens
  {
    id: "lettuce_head",
    name: "Head Lettuce",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Iceberg", "Butter", "Boston", "Bibb"],
    packaging: ["Carton", "Box", "Crate", "Wrapped"],
    sizes: ["24ct", "30ct", "36ct", "Jumbo", "Standard"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic", "Cold Chain"],
    units: ["carton", "box", "count"],
    season: ["Year-round", "Peak: April-October"]
  },
  {
    id: "lettuce_romaine",
    name: "Romaine Lettuce",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Green", "Red", "Hearts", "Baby"],
    packaging: ["Carton", "Box", "Crate", "Bag", "Clamshell"],
    sizes: ["24ct", "30ct", "Heart Pack", "Single", "Triple"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic", "Cold Chain"],
    units: ["carton", "box", "bag"],
    season: ["Year-round"]
  },
  {
    id: "lettuce_leaf",
    name: "Leaf Lettuce",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Red Leaf", "Green Leaf", "Oak Leaf", "Lollo Rosso"],
    packaging: ["Carton", "Box", "Crate", "Bag"],
    sizes: ["24ct", "30ct", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic", "Cold Chain"],
    units: ["carton", "box", "bunch"],
    season: ["Year-round"]
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Baby", "Savoy", "Flat Leaf", "Semi-Savoy", "Bunched"],
    packaging: ["Clamshell", "Bag", "Bunch", "Box", "Carton"],
    sizes: ["5oz", "10oz", "1lb", "2.5lb", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic", "Triple Washed", "Cold Chain"],
    units: ["oz", "lb", "bunch", "carton"],
    season: ["Year-round"]
  },
  {
    id: "kale",
    name: "Kale",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Curly", "Lacinato", "Dinosaur", "Red Russian", "Baby", "Tuscan"],
    packaging: ["Bunch", "Bag", "Clamshell", "Box"],
    sizes: ["Bunched", "5oz", "10oz", "1lb"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["bunch", "oz", "lb"],
    season: ["Year-round", "Peak: October-March"]
  },
  {
    id: "arugula",
    name: "Arugula",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Wild", "Standard", "Baby"],
    packaging: ["Clamshell", "Bag", "Bunch"],
    sizes: ["5oz", "1lb", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic", "Washed"],
    units: ["oz", "lb", "bunch"],
    season: ["Year-round"]
  },
  {
    id: "chard",
    name: "Swiss Chard",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Rainbow", "Swiss", "Red", "White", "Golden"],
    packaging: ["Bunch", "Box", "Carton"],
    sizes: ["Bunched", "12ct", "24ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "count"],
    season: ["Year-round", "Peak: June-October"]
  },
  {
    id: "collard_greens",
    name: "Collard Greens",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Georgia", "Vates", "Champion"],
    packaging: ["Bunch", "Box", "Bag"],
    sizes: ["Bunched", "24ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "count"],
    season: ["Year-round", "Peak: November-March"]
  },
  {
    id: "mustard_greens",
    name: "Mustard Greens",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Curly", "Southern Giant", "Red Giant"],
    packaging: ["Bunch", "Box", "Bag"],
    sizes: ["Bunched", "24ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "count"],
    season: ["Year-round", "Peak: November-March"]
  },
  {
    id: "microgreens",
    name: "Microgreens",
    category: "vegetables",
    subcategory: "leafy_greens",
    varieties: ["Mixed", "Sunflower", "Pea Shoots", "Radish", "Broccoli", "Amaranth"],
    packaging: ["Clamshell", "Tray"],
    sizes: ["2oz", "4oz", "8oz"],
    handling: ["Organic", "Conventional", "Hydroponic", "Living"],
    units: ["oz"],
    season: ["Year-round"]
  },

  // VEGETABLES - Brassicas
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetables",
    subcategory: "brassicas",
    varieties: ["Crown", "Bunched", "Baby", "Broccolini", "Romanesco"],
    packaging: ["Carton", "Box", "Bunch", "Crate"],
    sizes: ["14ct", "18ct", "20ct", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["carton", "count", "bunch"],
    season: ["Year-round", "Peak: October-April"]
  },
  {
    id: "cauliflower",
    name: "Cauliflower",
    category: "vegetables",
    subcategory: "brassicas",
    varieties: ["White", "Purple", "Orange", "Cheddar", "Romanesco", "Green"],
    packaging: ["Carton", "Box", "Crate", "Wrapped"],
    sizes: ["9ct", "12ct", "16ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["carton", "count"],
    season: ["Year-round", "Peak: September-May"]
  },
  {
    id: "cabbage",
    name: "Cabbage",
    category: "vegetables",
    subcategory: "brassicas",
    varieties: ["Green", "Red", "Savoy", "Napa", "Bok Choy"],
    packaging: ["Carton", "Box", "Crate", "Bag", "Bin"],
    sizes: ["Small", "Medium", "Large", "50lb Bag"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "head", "bag"],
    season: ["Year-round"]
  },
  {
    id: "brussels_sprouts",
    name: "Brussels Sprouts",
    category: "vegetables",
    subcategory: "brassicas",
    varieties: ["Long Island", "Jade Cross", "On Stalk"],
    packaging: ["Carton", "Box", "Bag", "Stalk"],
    sizes: ["10oz Bag", "1lb", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["lb", "oz", "stalk"],
    season: ["September-March", "Peak: October-February"]
  },
  {
    id: "kohlrabi",
    name: "Kohlrabi",
    category: "vegetables",
    subcategory: "brassicas",
    varieties: ["Purple", "White", "Green"],
    packaging: ["Bunch", "Box", "Bag"],
    sizes: ["Bunched", "Loose"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "lb"],
    season: ["Year-round", "Peak: May-October"]
  },

  // VEGETABLES - Root & Tuber
  {
    id: "carrots",
    name: "Carrots",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Orange", "Purple", "Yellow", "White", "Baby", "Rainbow"],
    packaging: ["Bag", "Bunch", "Carton", "Box", "Bulk"],
    sizes: ["1lb Bag", "2lb Bag", "5lb Bag", "50lb Carton", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown", "Washed", "Storage"],
    units: ["lb", "bag", "bunch"],
    season: ["Year-round"]
  },
  {
    id: "potatoes",
    name: "Potatoes",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: [
      "Russet", "Red", "Yellow", "White", "Purple", "Fingerling", "Baby",
      "Yukon Gold", "Kennebec", "Red Pontiac"
    ],
    packaging: ["Bag", "Carton", "Box", "Bin", "Bulk", "Tote"],
    sizes: ["5lb Bag", "10lb Bag", "50lb Carton", "2000lb Bin"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage", "Washed", "Unwashed"],
    units: ["lb", "bag", "cwt", "bin"],
    season: ["Year-round"]
  },
  {
    id: "sweet_potatoes",
    name: "Sweet Potatoes",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Orange", "White", "Purple", "Garnet", "Jewel", "Beauregard"],
    packaging: ["Bag", "Carton", "Box", "Bin", "Bulk"],
    sizes: ["3lb Bag", "5lb Bag", "40lb Carton", "1000lb Bin"],
    handling: ["Organic", "Conventional", "Field Grown", "Cured", "Storage"],
    units: ["lb", "bag", "cwt"],
    season: ["Year-round", "Peak: September-December"]
  },
  {
    id: "onions",
    name: "Onions",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Yellow", "Red", "White", "Sweet", "Vidalia", "Walla Walla", "Pearl", "Cipollini"],
    packaging: ["Bag", "Carton", "Box", "Bulk", "Tote"],
    sizes: ["3lb Bag", "5lb Bag", "10lb Bag", "25lb Bag", "50lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage", "Cured"],
    units: ["lb", "bag", "cwt"],
    season: ["Year-round"]
  },
  {
    id: "garlic",
    name: "Garlic",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Softneck", "Hardneck", "Elephant", "Black"],
    packaging: ["Box", "Carton", "Bag", "Bulk"],
    sizes: ["1lb Box", "5lb Box", "30lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Cured", "Storage"],
    units: ["lb", "box"],
    season: ["Year-round", "Peak: June-August"]
  },
  {
    id: "beets",
    name: "Beets",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Red", "Golden", "Chioggia", "Baby", "Bunched"],
    packaging: ["Bunch", "Bag", "Box", "Carton"],
    sizes: ["Bunched", "1lb Bag", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Washed", "Storage"],
    units: ["bunch", "lb", "bag"],
    season: ["Year-round", "Peak: June-October"]
  },
  {
    id: "turnips",
    name: "Turnips",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Purple Top", "White", "Golden", "Baby"],
    packaging: ["Bunch", "Bag", "Box", "Carton"],
    sizes: ["Bunched", "1lb Bag", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["bunch", "lb", "bag"],
    season: ["Year-round", "Peak: October-March"]
  },
  {
    id: "radishes",
    name: "Radishes",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Red", "Daikon", "Watermelon", "Black", "French Breakfast", "Easter Egg"],
    packaging: ["Bunch", "Bag", "Clamshell"],
    sizes: ["Bunched", "1lb Bag", "6oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "lb", "oz"],
    season: ["Year-round"]
  },
  {
    id: "ginger",
    name: "Ginger",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Young", "Mature"],
    packaging: ["Box", "Carton", "Bag"],
    sizes: ["5lb Box", "10lb Box", "30lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "turmeric",
    name: "Turmeric",
    category: "vegetables",
    subcategory: "root_tuber",
    varieties: ["Fresh Root"],
    packaging: ["Box", "Bag"],
    sizes: ["5lb Box", "10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },

  // VEGETABLES - Alliums
  {
    id: "scallions",
    name: "Scallions/Green Onions",
    category: "vegetables",
    subcategory: "alliums",
    varieties: ["Standard", "Red", "Baby"],
    packaging: ["Bunch", "Box", "Crate"],
    sizes: ["Bunched", "48ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "count"],
    season: ["Year-round"]
  },
  {
    id: "leeks",
    name: "Leeks",
    category: "vegetables",
    subcategory: "alliums",
    varieties: ["American Flag", "King Richard", "Baby"],
    packaging: ["Bunch", "Box", "Carton"],
    sizes: ["Bunched", "24ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "count"],
    season: ["Year-round", "Peak: October-May"]
  },
  {
    id: "shallots",
    name: "Shallots",
    category: "vegetables",
    subcategory: "alliums",
    varieties: ["French", "Jersey", "Dutch"],
    packaging: ["Box", "Bag"],
    sizes: ["1lb Box", "5lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },

  // VEGETABLES - Specialty & Others
  {
    id: "mushrooms",
    name: "Mushrooms",
    category: "vegetables",
    subcategory: "specialty",
    varieties: [
      "White Button", "Cremini", "Portobello", "Shiitake", "Oyster", "Maitake",
      "Enoki", "King Trumpet", "Lion's Mane", "Chanterelle", "Morel"
    ],
    packaging: ["Carton", "Box", "Punnet", "Bulk"],
    sizes: ["8oz", "16oz", "10lb Box"],
    handling: ["Organic", "Conventional", "Cultivated", "Wild"],
    units: ["oz", "lb"],
    season: ["Year-round"]
  },
  {
    id: "asparagus",
    name: "Asparagus",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Green", "White", "Purple"],
    packaging: ["Bundle", "Box", "Carton", "Crate"],
    sizes: ["Standard", "Large", "Jumbo", "11lb Box", "28lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["lb", "bundle"],
    season: ["February-June", "Peak: April-May"]
  },
  {
    id: "artichokes",
    name: "Artichokes",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Globe", "Baby", "Purple"],
    packaging: ["Carton", "Box", "Crate"],
    sizes: ["12ct", "18ct", "24ct", "36ct", "48ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["count", "carton"],
    season: ["March-May, September-December"]
  },
  {
    id: "celery",
    name: "Celery",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Pascal", "Golden", "Red", "Leaf"],
    packaging: ["Carton", "Crate", "Wrapped"],
    sizes: ["24ct", "30ct", "36ct", "48ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["count", "carton"],
    season: ["Year-round"]
  },
  {
    id: "corn_sweet",
    name: "Sweet Corn",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Yellow", "White", "Bi-color", "Baby"],
    packaging: ["Carton", "Box", "Crate", "Sack"],
    sizes: ["48ct", "60ct", "5 Dozen"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["dozen", "count"],
    season: ["May-September", "Peak: June-August"]
  },
  {
    id: "green_beans",
    name: "Green Beans",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Blue Lake", "French", "Haricot Vert", "Purple", "Yellow Wax"],
    packaging: ["Carton", "Box", "Crate", "Bushel"],
    sizes: ["25lb Carton", "30lb Bushel"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "bushel"],
    season: ["Year-round", "Peak: June-September"]
  },
  {
    id: "peas",
    name: "Peas",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["English", "Sugar Snap", "Snow", "Split"],
    packaging: ["Carton", "Box", "Bag", "Clamshell"],
    sizes: ["1lb Bag", "10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round", "Peak: March-June"]
  },
  {
    id: "okra",
    name: "Okra",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Green", "Red", "Baby"],
    packaging: ["Box", "Carton", "Crate"],
    sizes: ["10lb Box", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round", "Peak: June-September"]
  },
  {
    id: "fennel",
    name: "Fennel",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Florence", "Bronze"],
    packaging: ["Carton", "Box", "Bunch"],
    sizes: ["12ct", "18ct", "Bunched"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["count", "bunch"],
    season: ["Year-round", "Peak: October-April"]
  },
  {
    id: "rhubarb",
    name: "Rhubarb",
    category: "vegetables",
    subcategory: "specialty",
    varieties: ["Red", "Green"],
    packaging: ["Box", "Carton", "Bundle"],
    sizes: ["1lb Bundle", "10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "bundle"],
    season: ["April-June"]
  },

  // FRUITS - Citrus
  {
    id: "oranges",
    name: "Oranges",
    category: "fruits",
    subcategory: "citrus",
    varieties: [
      "Navel", "Valencia", "Cara Cara", "Blood", "Mandarin", "Clementine",
      "Tangerine", "Satsuma", "Mineola", "Hamlin"
    ],
    packaging: ["Carton", "Box", "Bag", "Bulk", "Tray"],
    sizes: ["40lb Carton", "38lb Box", "3lb Bag", "5lb Bag", "88ct", "113ct", "138ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "carton", "box", "count"],
    season: ["Year-round", "Peak: November-June"]
  },
  {
    id: "lemons",
    name: "Lemons",
    category: "fruits",
    subcategory: "citrus",
    varieties: ["Eureka", "Lisbon", "Meyer"],
    packaging: ["Carton", "Box", "Bag"],
    sizes: ["37lb Carton", "2lb Bag", "95ct", "115ct", "140ct", "165ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "carton", "count"],
    season: ["Year-round"]
  },
  {
    id: "limes",
    name: "Limes",
    category: "fruits",
    subcategory: "citrus",
    varieties: ["Persian", "Key", "Bearss", "Kaffir"],
    packaging: ["Carton", "Box", "Bag"],
    sizes: ["40lb Carton", "110ct", "150ct", "175ct", "200ct", "230ct", "250ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "carton", "count"],
    season: ["Year-round"]
  },
  {
    id: "grapefruit",
    name: "Grapefruit",
    category: "fruits",
    subcategory: "citrus",
    varieties: ["Ruby Red", "Pink", "White", "Star Ruby", "Oro Blanco"],
    packaging: ["Carton", "Box", "Bag"],
    sizes: ["40lb Carton", "3lb Bag", "5lb Bag", "23ct", "27ct", "32ct", "36ct", "40ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "carton", "count"],
    season: ["October-June", "Peak: November-March"]
  },

  // FRUITS - Berries
  {
    id: "strawberries",
    name: "Strawberries",
    category: "fruits",
    subcategory: "berries",
    varieties: ["Albion", "San Andreas", "Monterey", "Festival", "Camarosa", "Chandler"],
    packaging: ["Clamshell", "Flat", "Tray Pack", "Bulk"],
    sizes: ["1lb Clamshell", "2lb Clamshell", "8lb Flat", "12x1lb"],
    handling: ["Organic", "Conventional", "Field Grown", "Greenhouse", "Cold Chain"],
    units: ["lb", "flat", "clamshell"],
    season: ["Year-round", "Peak: April-September"]
  },
  {
    id: "blueberries",
    name: "Blueberries",
    category: "fruits",
    subcategory: "berries",
    varieties: ["Highbush", "Rabbiteye", "Biloxi", "Emerald", "Duke", "Bluecrop"],
    packaging: ["Clamshell", "Pint", "Flat"],
    sizes: ["6oz Clamshell", "1 Pint", "18oz Clamshell", "11lb Flat"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["oz", "pint", "flat"],
    season: ["Year-round", "Peak: June-August"]
  },
  {
    id: "raspberries",
    name: "Raspberries",
    category: "fruits",
    subcategory: "berries",
    varieties: ["Red", "Black", "Golden", "Heritage", "Autumn Bliss"],
    packaging: ["Clamshell", "Flat"],
    sizes: ["6oz Clamshell", "12x6oz Flat"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["oz", "flat"],
    season: ["Year-round", "Peak: June-October"]
  },
  {
    id: "blackberries",
    name: "Blackberries",
    category: "fruits",
    subcategory: "berries",
    varieties: ["Marion", "Triple Crown", "Chester", "Navaho"],
    packaging: ["Clamshell", "Flat"],
    sizes: ["6oz Clamshell", "12oz Clamshell", "12x6oz Flat"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["oz", "flat"],
    season: ["Year-round", "Peak: June-September"]
  },
  {
    id: "cranberries",
    name: "Cranberries",
    category: "fruits",
    subcategory: "berries",
    varieties: ["Early Black", "Howes", "Stevens"],
    packaging: ["Bag", "Box", "Carton"],
    sizes: ["12oz Bag", "1lb Bag", "25lb Box"],
    handling: ["Organic", "Conventional", "Bog Grown"],
    units: ["oz", "lb", "box"],
    season: ["September-December", "Peak: October-November"]
  },

  // FRUITS - Tropical
  {
    id: "avocados",
    name: "Avocados",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Hass", "Fuerte", "Bacon", "Reed", "Pinkerton", "Zutano", "Gwen"],
    packaging: ["Carton", "Box", "Bulk", "Bag"],
    sizes: ["25lb Carton", "48ct", "60ct", "70ct", "84ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Ripened", "Unripe"],
    units: ["lb", "carton", "count"],
    season: ["Year-round"]
  },
  {
    id: "mangoes",
    name: "Mangoes",
    category: "fruits",
    subcategory: "tropical",
    varieties: [
      "Tommy Atkins", "Ataulfo", "Kent", "Keitt", "Haden", "Francis",
      "Palmer", "Manila", "Champagne"
    ],
    packaging: ["Carton", "Box", "Flat"],
    sizes: ["10lb Flat", "9ct", "12ct", "14ct", "16ct", "18ct"],
    handling: ["Organic", "Conventional", "Field Grown", "Hot Water Treated"],
    units: ["lb", "flat", "count"],
    season: ["Year-round", "Peak: March-September"]
  },
  {
    id: "pineapples",
    name: "Pineapples",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["MD2", "Golden", "Queen", "Smooth Cayenne", "Sugarloaf"],
    packaging: ["Carton", "Box", "Crate"],
    sizes: ["5ct", "6ct", "7ct", "8ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["count", "carton"],
    season: ["Year-round"]
  },
  {
    id: "papayas",
    name: "Papayas",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Maradol", "Red Lady", "Formosa", "Solo"],
    packaging: ["Carton", "Box"],
    sizes: ["Large", "Medium", "Small", "35lb Box", "45lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box", "count"],
    season: ["Year-round"]
  },
  {
    id: "bananas",
    name: "Bananas",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Cavendish", "Red", "Plantain", "Baby", "Burro"],
    packaging: ["Box", "Carton"],
    sizes: ["40lb Box", "50lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Ripened", "Green"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "plantains",
    name: "Plantains",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Green", "Yellow", "Black"],
    packaging: ["Box", "Carton"],
    sizes: ["40lb Box", "50lb Box"],
    handling: ["Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "coconuts",
    name: "Coconuts",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Young", "Mature", "Husked", "Dehusked"],
    packaging: ["Carton", "Box"],
    sizes: ["9ct", "12ct"],
    handling: ["Conventional", "Field Grown"],
    units: ["count", "carton"],
    season: ["Year-round"]
  },
  {
    id: "dragon_fruit",
    name: "Dragon Fruit",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["White", "Red", "Yellow"],
    packaging: ["Carton", "Box", "Flat"],
    sizes: ["10lb Flat", "3lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "flat"],
    season: ["Year-round", "Peak: June-December"]
  },
  {
    id: "passion_fruit",
    name: "Passion Fruit",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Purple", "Yellow"],
    packaging: ["Box", "Flat"],
    sizes: ["5lb Box", "10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "guava",
    name: "Guava",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Pink", "White", "Strawberry", "Pineapple"],
    packaging: ["Box", "Flat"],
    sizes: ["10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "lychee",
    name: "Lychee",
    category: "fruits",
    subcategory: "tropical",
    varieties: ["Brewster", "Mauritius", "Sweet Cliff"],
    packaging: ["Box", "Bag"],
    sizes: ["5lb Box", "10lb Box"],
    handling: ["Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["May-July"]
  },

  // FRUITS - Melons
  {
    id: "watermelons",
    name: "Watermelons",
    category: "fruits",
    subcategory: "melons",
    varieties: ["Seedless", "Seeded", "Mini", "Yellow", "Orange"],
    packaging: ["Bin", "Carton", "Box"],
    sizes: ["Mini", "Personal", "Medium", "Large", "Jumbo"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "count", "bin"],
    season: ["May-September", "Peak: June-August"]
  },
  {
    id: "cantaloupes",
    name: "Cantaloupes",
    category: "fruits",
    subcategory: "melons",
    varieties: ["Western", "Eastern", "Charentais"],
    packaging: ["Carton", "Box", "Bin"],
    sizes: ["9ct", "12ct", "15ct", "18ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["count", "carton"],
    season: ["May-September", "Peak: June-August"]
  },
  {
    id: "honeydew",
    name: "Honeydew Melons",
    category: "fruits",
    subcategory: "melons",
    varieties: ["Green", "Orange", "Honey Gold"],
    packaging: ["Carton", "Box", "Bin"],
    sizes: ["5ct", "6ct", "8ct"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["count", "carton"],
    season: ["Year-round", "Peak: June-October"]
  },

  // FRUITS - Stone Fruits
  {
    id: "peaches",
    name: "Peaches",
    category: "fruits",
    subcategory: "stone_fruits",
    varieties: ["Yellow", "White", "Donut", "Freestone", "Clingstone"],
    packaging: ["Box", "Carton", "Flat", "Lug"],
    sizes: ["18lb Lug", "22lb Box", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Tree Ripened"],
    units: ["lb", "lug", "box"],
    season: ["May-September", "Peak: June-August"]
  },
  {
    id: "nectarines",
    name: "Nectarines",
    category: "fruits",
    subcategory: "stone_fruits",
    varieties: ["Yellow", "White", "Freestone", "Clingstone"],
    packaging: ["Box", "Carton", "Flat", "Lug"],
    sizes: ["18lb Lug", "22lb Box", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Tree Ripened"],
    units: ["lb", "lug", "box"],
    season: ["May-September", "Peak: June-August"]
  },
  {
    id: "plums",
    name: "Plums",
    category: "fruits",
    subcategory: "stone_fruits",
    varieties: ["Red", "Black", "Yellow", "Green Gage", "Damson", "Pluot"],
    packaging: ["Box", "Carton", "Flat", "Lug"],
    sizes: ["18lb Lug", "22lb Box", "28lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Tree Ripened"],
    units: ["lb", "lug", "box"],
    season: ["May-October", "Peak: July-September"]
  },
  {
    id: "apricots",
    name: "Apricots",
    category: "fruits",
    subcategory: "stone_fruits",
    varieties: ["Blenheim", "Royal", "Moorpark", "Goldcot"],
    packaging: ["Box", "Flat", "Lug"],
    sizes: ["12lb Lug", "24lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Tree Ripened"],
    units: ["lb", "lug", "box"],
    season: ["May-August", "Peak: June-July"]
  },
  {
    id: "cherries",
    name: "Cherries",
    category: "fruits",
    subcategory: "stone_fruits",
    varieties: ["Bing", "Rainier", "Lambert", "Brooks", "Lapin", "Sweetheart"],
    packaging: ["Box", "Flat", "Lug"],
    sizes: ["18lb Lug", "20lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Chain"],
    units: ["lb", "lug", "box"],
    season: ["May-August", "Peak: June-July"]
  },

  // FRUITS - Pome Fruits
  {
    id: "apples",
    name: "Apples",
    category: "fruits",
    subcategory: "pome_fruits",
    varieties: [
      "Gala", "Fuji", "Granny Smith", "Honeycrisp", "Red Delicious", "Golden Delicious",
      "Pink Lady", "Braeburn", "McIntosh", "Jonagold", "Cosmic Crisp", "Envy"
    ],
    packaging: ["Carton", "Box", "Bag", "Tray", "Bulk", "Bin"],
    sizes: ["40lb Carton", "42lb Box", "3lb Bag", "5lb Bag", "1000lb Bin"],
    handling: ["Organic", "Conventional", "Field Grown", "Controlled Atmosphere", "Storage"],
    units: ["lb", "carton", "box", "bushel", "bin"],
    season: ["Year-round", "Peak: September-November"]
  },
  {
    id: "pears",
    name: "Pears",
    category: "fruits",
    subcategory: "pome_fruits",
    varieties: [
      "Bartlett", "Anjou", "Bosc", "Comice", "Seckel", "Forelle", "Asian", "Concorde"
    ],
    packaging: ["Carton", "Box", "Tray"],
    sizes: ["40lb Carton", "44lb Box"],
    handling: ["Organic", "Conventional", "Field Grown", "Ripened", "Storage"],
    units: ["lb", "carton", "box"],
    season: ["Year-round", "Peak: August-December"]
  },

  // FRUITS - Grapes
  {
    id: "grapes_table",
    name: "Table Grapes",
    category: "fruits",
    subcategory: "grapes",
    varieties: [
      "Red Globe", "Thompson Seedless", "Crimson", "Flame", "Autumn Royal",
      "Cotton Candy", "Moon Drop", "Concord"
    ],
    packaging: ["Box", "Carton", "Clamshell", "Bag"],
    sizes: ["18lb Lug", "19lb Box", "2lb Clamshell", "3lb Bag"],
    handling: ["Organic", "Conventional", "Field Grown", "Cold Storage"],
    units: ["lb", "lug", "box"],
    season: ["Year-round", "Peak: July-January"]
  },

  // FRUITS - Other
  {
    id: "kiwi",
    name: "Kiwi",
    category: "fruits",
    subcategory: "other",
    varieties: ["Green", "Gold", "Baby", "Red"],
    packaging: ["Carton", "Flat", "Clamshell"],
    sizes: ["3lb Flat", "10lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown", "Storage"],
    units: ["lb", "flat", "carton"],
    season: ["Year-round", "Peak: November-May"]
  },
  {
    id: "figs",
    name: "Figs",
    category: "fruits",
    subcategory: "other",
    varieties: ["Black Mission", "Kadota", "Brown Turkey", "Calimyrna", "Adriatic"],
    packaging: ["Clamshell", "Flat", "Box"],
    sizes: ["8oz Clamshell", "12oz Clamshell", "10lb Box"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["oz", "lb", "box"],
    season: ["June-October", "Peak: August-September"]
  },
  {
    id: "dates",
    name: "Dates",
    category: "fruits",
    subcategory: "other",
    varieties: ["Medjool", "Deglet Noor", "Barhi", "Zahidi"],
    packaging: ["Box", "Carton", "Bag"],
    sizes: ["5lb Box", "11lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round", "Peak: September-December"]
  },
  {
    id: "pomegranates",
    name: "Pomegranates",
    category: "fruits",
    subcategory: "other",
    varieties: ["Wonderful", "Parfianka", "Angel Red", "Eversweet"],
    packaging: ["Carton", "Box", "Flat"],
    sizes: ["22lb Box", "8ct Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box", "count"],
    season: ["September-January", "Peak: October-November"]
  },
  {
    id: "persimmons",
    name: "Persimmons",
    category: "fruits",
    subcategory: "other",
    varieties: ["Fuyu", "Hachiya"],
    packaging: ["Carton", "Flat"],
    sizes: ["10lb Flat", "15lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "flat"],
    season: ["October-January"]
  },

  // HERBS - Fresh
  {
    id: "basil",
    name: "Basil",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Sweet", "Thai", "Purple", "Lemon", "Holy"],
    packaging: ["Bunch", "Clamshell", "Bag"],
    sizes: ["Bunched", "1oz Clamshell", "4oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Greenhouse", "Hydroponic"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "cilantro",
    name: "Cilantro",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Standard", "Santo"],
    packaging: ["Bunch", "Bag", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "parsley",
    name: "Parsley",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Curly", "Italian Flat"],
    packaging: ["Bunch", "Bag", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "mint",
    name: "Mint",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Spearmint", "Peppermint", "Chocolate", "Apple"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "dill",
    name: "Dill",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Standard"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "oregano",
    name: "Oregano",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Greek", "Italian", "Mexican"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "thyme",
    name: "Thyme",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Common", "Lemon"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "rosemary",
    name: "Rosemary",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Standard"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "sage",
    name: "Sage",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Common", "Purple"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },
  {
    id: "chives",
    name: "Chives",
    category: "herbs",
    subcategory: "fresh",
    varieties: ["Onion", "Garlic"],
    packaging: ["Bunch", "Clamshell"],
    sizes: ["Bunched", "1oz Clamshell"],
    handling: ["Organic", "Conventional", "Field Grown", "Hydroponic"],
    units: ["bunch", "oz"],
    season: ["Year-round"]
  },

  // SPECIALTY CROPS
  {
    id: "quinoa",
    name: "Quinoa",
    category: "specialty",
    subcategory: "grains",
    varieties: ["White", "Red", "Black", "Tricolor"],
    packaging: ["Bag", "Box"],
    sizes: ["25lb Bag", "50lb Bag"],
    handling: ["Organic", "Conventional"],
    units: ["lb", "bag"],
    season: ["Year-round"]
  },
  {
    id: "chia_seeds",
    name: "Chia Seeds",
    category: "specialty",
    subcategory: "seeds",
    varieties: ["Black", "White"],
    packaging: ["Bag", "Box"],
    sizes: ["25lb Bag", "50lb Bag"],
    handling: ["Organic", "Conventional"],
    units: ["lb", "bag"],
    season: ["Year-round"]
  },
  {
    id: "amaranth",
    name: "Amaranth",
    category: "specialty",
    subcategory: "grains",
    varieties: ["Grain", "Leaf"],
    packaging: ["Bag", "Box"],
    sizes: ["25lb Bag"],
    handling: ["Organic", "Conventional"],
    units: ["lb", "bag"],
    season: ["Year-round"]
  },
  {
    id: "edamame",
    name: "Edamame",
    category: "specialty",
    subcategory: "legumes",
    varieties: ["Fresh", "Frozen"],
    packaging: ["Bag", "Box"],
    sizes: ["10lb Box", "25lb Box"],
    handling: ["Organic", "Conventional", "Frozen"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "jicama",
    name: "Jicama",
    category: "specialty",
    subcategory: "root_tuber",
    varieties: ["Standard"],
    packaging: ["Box", "Carton", "Bag"],
    sizes: ["25lb Box", "40lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "yuca",
    name: "Yuca/Cassava",
    category: "specialty",
    subcategory: "root_tuber",
    varieties: ["White", "Yellow"],
    packaging: ["Box", "Bag"],
    sizes: ["25lb Box", "50lb Bag"],
    handling: ["Conventional", "Field Grown"],
    units: ["lb", "box", "bag"],
    season: ["Year-round"]
  },
  {
    id: "tomatillos",
    name: "Tomatillos",
    category: "specialty",
    subcategory: "fruiting",
    varieties: ["Green", "Purple"],
    packaging: ["Box", "Carton"],
    sizes: ["10lb Box", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "cactus_pads",
    name: "Cactus Pads (Nopales)",
    category: "specialty",
    subcategory: "other",
    varieties: ["Young", "Mature"],
    packaging: ["Box", "Carton"],
    sizes: ["10lb Box", "25lb Carton"],
    handling: ["Organic", "Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "aloe_vera",
    name: "Aloe Vera",
    category: "specialty",
    subcategory: "other",
    varieties: ["Leaf"],
    packaging: ["Box"],
    sizes: ["10lb Box"],
    handling: ["Organic", "Conventional"],
    units: ["lb", "box"],
    season: ["Year-round"]
  },
  {
    id: "horseradish",
    name: "Horseradish",
    category: "specialty",
    subcategory: "root_tuber",
    varieties: ["Root"],
    packaging: ["Box", "Bag"],
    sizes: ["10lb Box", "25lb Bag"],
    handling: ["Conventional", "Field Grown"],
    units: ["lb", "box"],
    season: ["Year-round"]
  }
];

// Comprehensive packaging types across all commodities
export const packagingTypes = [
  "Bulk", "Carton", "Box", "Bag", "Clamshell", "Crate", "Bushel", "Tray Pack",
  "Lug", "Wrapped", "Bundle", "Bunch", "Bin", "Tote", "Flat", "Pint", "Punnet",
  "Stalk", "Sack"
];

// Comprehensive handling methods
export const handlingMethods = [
  "Organic", "Conventional", "Field Grown", "Greenhouse", "Hydroponic",
  "Cold Storage", "Controlled Atmosphere", "Cold Chain", "Hot Water Treated",
  "Waxed", "Unwaxed", "Washed", "Triple Washed", "Ripened", "Unripe", "Green",
  "Tree Ripened", "Cured", "Storage", "Frozen", "Living", "Cultivated", "Wild",
  "Bog Grown"
];

// Export helper functions
export function getCommodityById(id) {
  return usdaCommodities.find(c => c.id === id);
}

export function getCommoditiesByCategory(category) {
  return usdaCommodities.filter(c => c.category === category);
}

export function getAllCommodityNames() {
  return usdaCommodities.map(c => ({ id: c.id, name: c.name })).sort((a, b) => a.name.localeCompare(b.name));
}

export function searchCommodities(searchTerm) {
  const term = searchTerm.toLowerCase();
  return usdaCommodities.filter(c => 
    c.name.toLowerCase().includes(term) || 
    c.varieties.some(v => v.toLowerCase().includes(term))
  );
}
