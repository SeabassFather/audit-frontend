// Comprehensive USDA Regions Database
// Includes all major US produce regions and international growing regions

export const usdaRegions = [
  // UNITED STATES - West Coast
  { 
    id: "california_central_valley",
    name: "Central Valley",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["tomatoes", "lettuce", "grapes_table", "almonds", "peaches", "nectarines"],
    climate: "Mediterranean"
  },
  {
    id: "california_salinas",
    name: "Salinas Valley",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["lettuce_head", "lettuce_romaine", "spinach", "broccoli", "cauliflower"],
    climate: "Mediterranean"
  },
  {
    id: "california_coachella",
    name: "Coachella Valley",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["dates", "citrus", "peppers_bell", "melons"],
    climate: "Desert"
  },
  {
    id: "california_imperial",
    name: "Imperial Valley",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["lettuce", "carrots", "broccoli", "cauliflower"],
    climate: "Desert"
  },
  {
    id: "california_watsonville",
    name: "Watsonville",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["strawberries", "raspberries", "blackberries", "apples"],
    climate: "Mediterranean"
  },
  {
    id: "california_oxnard",
    name: "Oxnard",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["strawberries", "celery", "lima_beans"],
    climate: "Mediterranean"
  },
  {
    id: "california_santa_maria",
    name: "Santa Maria Valley",
    state: "California",
    country: "USA",
    region: "West Coast",
    majorCrops: ["strawberries", "broccoli", "lettuce"],
    climate: "Mediterranean"
  },
  {
    id: "washington_yakima",
    name: "Yakima Valley",
    state: "Washington",
    country: "USA",
    region: "Pacific Northwest",
    majorCrops: ["apples", "cherries", "pears", "hops"],
    climate: "Continental"
  },
  {
    id: "washington_wenatchee",
    name: "Wenatchee",
    state: "Washington",
    country: "USA",
    region: "Pacific Northwest",
    majorCrops: ["apples", "pears", "cherries"],
    climate: "Continental"
  },
  {
    id: "oregon_willamette",
    name: "Willamette Valley",
    state: "Oregon",
    country: "USA",
    region: "Pacific Northwest",
    majorCrops: ["berries", "hazelnuts", "wine_grapes"],
    climate: "Marine West Coast"
  },
  {
    id: "oregon_hood_river",
    name: "Hood River",
    state: "Oregon",
    country: "USA",
    region: "Pacific Northwest",
    majorCrops: ["pears", "apples", "cherries"],
    climate: "Continental"
  },

  // UNITED STATES - Southwest
  {
    id: "arizona_yuma",
    name: "Yuma",
    state: "Arizona",
    country: "USA",
    region: "Southwest",
    majorCrops: ["lettuce", "broccoli", "cauliflower", "melons"],
    climate: "Desert"
  },
  {
    id: "arizona_phoenix",
    name: "Phoenix",
    state: "Arizona",
    country: "USA",
    region: "Southwest",
    majorCrops: ["lettuce", "citrus", "dates"],
    climate: "Desert"
  },
  {
    id: "new_mexico_mesilla",
    name: "Mesilla Valley",
    state: "New Mexico",
    country: "USA",
    region: "Southwest",
    majorCrops: ["chile_peppers", "pecans", "onions"],
    climate: "Desert"
  },
  {
    id: "texas_rio_grande",
    name: "Rio Grande Valley",
    state: "Texas",
    country: "USA",
    region: "Southwest",
    majorCrops: ["citrus", "onions", "cabbage"],
    climate: "Subtropical"
  },
  {
    id: "texas_winter_garden",
    name: "Winter Garden",
    state: "Texas",
    country: "USA",
    region: "Southwest",
    majorCrops: ["spinach", "carrots", "onions"],
    climate: "Subtropical"
  },

  // UNITED STATES - Southeast
  {
    id: "florida_central",
    name: "Central Florida",
    state: "Florida",
    country: "USA",
    region: "Southeast",
    majorCrops: ["citrus", "strawberries", "blueberries"],
    climate: "Subtropical"
  },
  {
    id: "florida_south",
    name: "South Florida",
    state: "Florida",
    country: "USA",
    region: "Southeast",
    majorCrops: ["tomatoes", "peppers_bell", "tropical_fruits"],
    climate: "Tropical"
  },
  {
    id: "florida_plant_city",
    name: "Plant City",
    state: "Florida",
    country: "USA",
    region: "Southeast",
    majorCrops: ["strawberries"],
    climate: "Subtropical"
  },
  {
    id: "georgia_vidalia",
    name: "Vidalia",
    state: "Georgia",
    country: "USA",
    region: "Southeast",
    majorCrops: ["onions", "peaches", "pecans"],
    climate: "Humid Subtropical"
  },
  {
    id: "georgia_south",
    name: "South Georgia",
    state: "Georgia",
    country: "USA",
    region: "Southeast",
    majorCrops: ["peanuts", "pecans", "blueberries"],
    climate: "Humid Subtropical"
  },
  {
    id: "north_carolina",
    name: "North Carolina",
    state: "North Carolina",
    country: "USA",
    region: "Southeast",
    majorCrops: ["sweet_potatoes", "tobacco", "blueberries"],
    climate: "Humid Subtropical"
  },
  {
    id: "south_carolina",
    name: "South Carolina",
    state: "South Carolina",
    country: "USA",
    region: "Southeast",
    majorCrops: ["peaches", "watermelons"],
    climate: "Humid Subtropical"
  },

  // UNITED STATES - Midwest
  {
    id: "michigan",
    name: "Michigan",
    state: "Michigan",
    country: "USA",
    region: "Midwest",
    majorCrops: ["cherries", "blueberries", "apples"],
    climate: "Continental"
  },
  {
    id: "wisconsin",
    name: "Wisconsin",
    state: "Wisconsin",
    country: "USA",
    region: "Midwest",
    majorCrops: ["cranberries", "potatoes", "snap_beans"],
    climate: "Continental"
  },
  {
    id: "ohio",
    name: "Ohio",
    state: "Ohio",
    country: "USA",
    region: "Midwest",
    majorCrops: ["tomatoes", "cucumbers", "sweet_corn"],
    climate: "Continental"
  },
  {
    id: "indiana",
    name: "Indiana",
    state: "Indiana",
    country: "USA",
    region: "Midwest",
    majorCrops: ["tomatoes", "cantaloupes", "watermelons"],
    climate: "Continental"
  },
  {
    id: "illinois",
    name: "Illinois",
    state: "Illinois",
    country: "USA",
    region: "Midwest",
    majorCrops: ["pumpkins", "sweet_corn", "watermelons"],
    climate: "Continental"
  },

  // UNITED STATES - Northeast
  {
    id: "new_york_hudson",
    name: "Hudson Valley",
    state: "New York",
    country: "USA",
    region: "Northeast",
    majorCrops: ["apples", "grapes", "cabbage"],
    climate: "Continental"
  },
  {
    id: "pennsylvania",
    name: "Pennsylvania",
    state: "Pennsylvania",
    country: "USA",
    region: "Northeast",
    majorCrops: ["mushrooms", "apples", "peaches"],
    climate: "Continental"
  },
  {
    id: "new_jersey",
    name: "New Jersey",
    state: "New Jersey",
    country: "USA",
    region: "Northeast",
    majorCrops: ["tomatoes", "blueberries", "cranberries"],
    climate: "Continental"
  },
  {
    id: "maine",
    name: "Maine",
    state: "Maine",
    country: "USA",
    region: "Northeast",
    majorCrops: ["potatoes", "blueberries"],
    climate: "Continental"
  },

  // UNITED STATES - Mountain States
  {
    id: "idaho",
    name: "Idaho",
    state: "Idaho",
    country: "USA",
    region: "Mountain",
    majorCrops: ["potatoes", "sugar_beets", "onions"],
    climate: "Continental"
  },
  {
    id: "colorado",
    name: "Colorado",
    state: "Colorado",
    country: "USA",
    region: "Mountain",
    majorCrops: ["cantaloupes", "onions", "peaches"],
    climate: "Semi-arid"
  },

  // UNITED STATES - Hawaii
  {
    id: "hawaii_big_island",
    name: "Big Island",
    state: "Hawaii",
    country: "USA",
    region: "Pacific",
    majorCrops: ["coffee", "macadamia", "papayas"],
    climate: "Tropical"
  },
  {
    id: "hawaii_oahu",
    name: "Oahu",
    state: "Hawaii",
    country: "USA",
    region: "Pacific",
    majorCrops: ["pineapples", "bananas"],
    climate: "Tropical"
  },

  // MEXICO - Major Regions
  {
    id: "sinaloa",
    name: "Sinaloa",
    state: "Sinaloa",
    country: "Mexico",
    region: "Northwest Mexico",
    majorCrops: ["tomatoes", "cucumbers", "peppers_bell", "squash_summer"],
    climate: "Semi-arid"
  },
  {
    id: "sonora",
    name: "Sonora",
    state: "Sonora",
    country: "Mexico",
    region: "Northwest Mexico",
    majorCrops: ["asparagus", "grapes_table", "peppers_bell"],
    climate: "Desert"
  },
  {
    id: "baja_california",
    name: "Baja California",
    state: "Baja California",
    country: "Mexico",
    region: "Northwest Mexico",
    majorCrops: ["tomatoes", "strawberries", "cucumbers"],
    climate: "Mediterranean"
  },
  {
    id: "baja_california_sur",
    name: "Baja California Sur",
    state: "Baja California Sur",
    country: "Mexico",
    region: "Northwest Mexico",
    majorCrops: ["organic_vegetables", "dates"],
    climate: "Desert"
  },
  {
    id: "jalisco",
    name: "Jalisco",
    state: "Jalisco",
    country: "Mexico",
    region: "Central Mexico",
    majorCrops: ["berries", "agave", "corn"],
    climate: "Subtropical Highland"
  },
  {
    id: "michoacan",
    name: "Michoacán",
    state: "Michoacán",
    country: "Mexico",
    region: "Central Mexico",
    majorCrops: ["avocados", "berries", "limes"],
    climate: "Subtropical Highland"
  },
  {
    id: "guanajuato",
    name: "Guanajuato",
    state: "Guanajuato",
    country: "Mexico",
    region: "Central Mexico",
    majorCrops: ["broccoli", "cauliflower", "carrots", "lettuce"],
    climate: "Semi-arid"
  },
  {
    id: "queretaro",
    name: "Querétaro",
    state: "Querétaro",
    country: "Mexico",
    region: "Central Mexico",
    majorCrops: ["broccoli", "lettuce", "cauliflower", "spinach"],
    climate: "Semi-arid"
  },
  {
    id: "puebla",
    name: "Puebla",
    state: "Puebla",
    country: "Mexico",
    region: "Central Mexico",
    majorCrops: ["corn", "beans", "squash"],
    climate: "Subtropical Highland"
  },
  {
    id: "chihuahua",
    name: "Chihuahua",
    state: "Chihuahua",
    country: "Mexico",
    region: "Northern Mexico",
    majorCrops: ["apples", "pecans", "peppers_hot"],
    climate: "Semi-arid"
  },
  {
    id: "coahuila",
    name: "Coahuila",
    state: "Coahuila",
    country: "Mexico",
    region: "Northern Mexico",
    majorCrops: ["melons", "onions", "nuts"],
    climate: "Semi-arid"
  },
  {
    id: "tamaulipas",
    name: "Tamaulipas",
    state: "Tamaulipas",
    country: "Mexico",
    region: "Northeast Mexico",
    majorCrops: ["citrus", "sorghum"],
    climate: "Subtropical"
  },
  {
    id: "veracruz",
    name: "Veracruz",
    state: "Veracruz",
    country: "Mexico",
    region: "Gulf Coast Mexico",
    majorCrops: ["coffee", "sugarcane", "citrus", "pineapples"],
    climate: "Tropical"
  },
  {
    id: "chiapas",
    name: "Chiapas",
    state: "Chiapas",
    country: "Mexico",
    region: "Southern Mexico",
    majorCrops: ["coffee", "cacao", "bananas", "mangoes"],
    climate: "Tropical"
  },
  {
    id: "nayarit",
    name: "Nayarit",
    state: "Nayarit",
    country: "Mexico",
    region: "Pacific Mexico",
    majorCrops: ["mangoes", "tobacco"],
    climate: "Tropical"
  },
  {
    id: "colima",
    name: "Colima",
    state: "Colima",
    country: "Mexico",
    region: "Pacific Mexico",
    majorCrops: ["limes", "coconuts"],
    climate: "Tropical"
  },
  {
    id: "guerrero",
    name: "Guerrero",
    state: "Guerrero",
    country: "Mexico",
    region: "Pacific Mexico",
    majorCrops: ["mangoes", "coconuts", "sesame"],
    climate: "Tropical"
  },
  {
    id: "oaxaca",
    name: "Oaxaca",
    state: "Oaxaca",
    country: "Mexico",
    region: "Southern Mexico",
    majorCrops: ["coffee", "mangoes", "mezcal_agave"],
    climate: "Subtropical Highland"
  },
  {
    id: "yucatan",
    name: "Yucatán",
    state: "Yucatán",
    country: "Mexico",
    region: "Yucatan Peninsula",
    majorCrops: ["citrus", "papaya", "habanero"],
    climate: "Tropical"
  },

  // CENTRAL AMERICA
  {
    id: "guatemala_central",
    name: "Central Highlands",
    state: "Multiple Departments",
    country: "Guatemala",
    region: "Central America",
    majorCrops: ["coffee", "vegetables", "berries"],
    climate: "Subtropical Highland"
  },
  {
    id: "guatemala_pacific",
    name: "Pacific Coast",
    state: "Multiple Departments",
    country: "Guatemala",
    region: "Central America",
    majorCrops: ["sugar_cane", "bananas", "palm_oil"],
    climate: "Tropical"
  },
  {
    id: "honduras",
    name: "Honduras",
    state: "Multiple Departments",
    country: "Honduras",
    region: "Central America",
    majorCrops: ["coffee", "bananas", "palm_oil"],
    climate: "Tropical"
  },
  {
    id: "costa_rica",
    name: "Costa Rica",
    state: "Multiple Provinces",
    country: "Costa Rica",
    region: "Central America",
    majorCrops: ["pineapples", "bananas", "coffee"],
    climate: "Tropical"
  },
  {
    id: "panama",
    name: "Panama",
    state: "Multiple Provinces",
    country: "Panama",
    region: "Central America",
    majorCrops: ["bananas", "coffee", "cacao"],
    climate: "Tropical"
  },
  {
    id: "el_salvador",
    name: "El Salvador",
    state: "Multiple Departments",
    country: "El Salvador",
    region: "Central America",
    majorCrops: ["coffee", "sugar_cane"],
    climate: "Tropical"
  },
  {
    id: "nicaragua",
    name: "Nicaragua",
    state: "Multiple Departments",
    country: "Nicaragua",
    region: "Central America",
    majorCrops: ["coffee", "bananas", "sugar_cane"],
    climate: "Tropical"
  },
  {
    id: "belize",
    name: "Belize",
    state: "Multiple Districts",
    country: "Belize",
    region: "Central America",
    majorCrops: ["citrus", "bananas", "sugar_cane"],
    climate: "Tropical"
  },

  // SOUTH AMERICA
  {
    id: "chile_central",
    name: "Central Valley",
    state: "Multiple Regions",
    country: "Chile",
    region: "South America",
    majorCrops: ["grapes_table", "apples", "pears", "stone_fruits", "berries"],
    climate: "Mediterranean"
  },
  {
    id: "chile_north",
    name: "Northern Chile",
    state: "Multiple Regions",
    country: "Chile",
    region: "South America",
    majorCrops: ["grapes_table", "citrus", "avocados"],
    climate: "Desert/Semi-arid"
  },
  {
    id: "peru_north",
    name: "Northern Peru",
    state: "Multiple Departments",
    country: "Peru",
    region: "South America",
    majorCrops: ["mangoes", "bananas", "grapes_table"],
    climate: "Tropical/Desert"
  },
  {
    id: "peru_south",
    name: "Southern Peru",
    state: "Multiple Departments",
    country: "Peru",
    region: "South America",
    majorCrops: ["avocados", "asparagus", "blueberries"],
    climate: "Desert"
  },
  {
    id: "peru_highlands",
    name: "Peruvian Highlands",
    state: "Multiple Departments",
    country: "Peru",
    region: "South America",
    majorCrops: ["quinoa", "potatoes", "coffee"],
    climate: "Subtropical Highland"
  },
  {
    id: "ecuador",
    name: "Ecuador",
    state: "Multiple Provinces",
    country: "Ecuador",
    region: "South America",
    majorCrops: ["bananas", "cacao", "roses"],
    climate: "Tropical"
  },
  {
    id: "colombia",
    name: "Colombia",
    state: "Multiple Departments",
    country: "Colombia",
    region: "South America",
    majorCrops: ["coffee", "bananas", "flowers"],
    climate: "Tropical"
  },
  {
    id: "brazil_south",
    name: "Southern Brazil",
    state: "Multiple States",
    country: "Brazil",
    region: "South America",
    majorCrops: ["soybeans", "coffee", "citrus"],
    climate: "Subtropical"
  },
  {
    id: "argentina_mendoza",
    name: "Mendoza",
    state: "Mendoza",
    country: "Argentina",
    region: "South America",
    majorCrops: ["grapes_wine", "olives", "garlic"],
    climate: "Semi-arid"
  },
  {
    id: "argentina_patagonia",
    name: "Patagonia",
    state: "Multiple Provinces",
    country: "Argentina",
    region: "South America",
    majorCrops: ["apples", "pears", "cherries"],
    climate: "Cold Semi-arid"
  },

  // CANADA
  {
    id: "british_columbia",
    name: "British Columbia",
    state: "British Columbia",
    country: "Canada",
    region: "Western Canada",
    majorCrops: ["apples", "cherries", "berries"],
    climate: "Marine West Coast"
  },
  {
    id: "ontario",
    name: "Ontario",
    state: "Ontario",
    country: "Canada",
    region: "Central Canada",
    majorCrops: ["apples", "grapes", "tender_fruits"],
    climate: "Continental"
  },
  {
    id: "quebec",
    name: "Quebec",
    state: "Quebec",
    country: "Canada",
    region: "Eastern Canada",
    majorCrops: ["apples", "berries", "maple_syrup"],
    climate: "Continental"
  }
];

// Helper functions
export function getRegionsByCountry(country) {
  return usdaRegions.filter(r => r.country === country);
}

export function getRegionById(id) {
  return usdaRegions.find(r => r.id === id);
}

export function getAllCountries() {
  const countries = [...new Set(usdaRegions.map(r => r.country))];
  return countries.sort();
}

export function searchRegions(searchTerm) {
  const term = searchTerm.toLowerCase();
  return usdaRegions.filter(r => 
    r.name.toLowerCase().includes(term) || 
    r.state.toLowerCase().includes(term) ||
    r.country.toLowerCase().includes(term)
  );
}

// Formatted regions for dropdown display
export function getFormattedRegions() {
  return usdaRegions.map(r => ({
    value: r.id,
    label: `${r.name}, ${r.state}`,
    country: r.country,
    fullLabel: `${r.name}, ${r.state} (${r.country})`
  })).sort((a, b) => a.label.localeCompare(b.label));
}
