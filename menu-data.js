// Menu data — single source of truth for both the website and the TV display.
// category keys: protein, rice, side, boiled, soup

const MENU = {
  Monday: {
    note: "",
    items: [
      { name: "Honey Glazed BBQ Chicken", cat: "protein" },
      { name: "Stewed Chicken", cat: "protein" },
      { name: "Curried Mutton", cat: "protein" },
      { name: "Honey Glazed BBQ Pork", cat: "protein" },
      { name: "Ackee and Saltfish", cat: "protein" },
      { name: "Pumpkin Soup (Chicken & Chicken Foot)", cat: "soup" },
      { name: "Rice and Peas", cat: "rice" },
      { name: "Pasta Salad", cat: "side" },
      { name: "Sweet Potato Salad", cat: "side" },
      { name: "Vegetable Salad", cat: "side" },
      { name: "Yellow Yam", cat: "boiled" },
      { name: "Green Bananas", cat: "boiled" }
    ]
  },
  Tuesday: {
    note: "",
    items: [
      { name: "Pineapple Chicken", cat: "protein" },
      { name: "Fried Chicken (Wings)", cat: "protein" },
      { name: "Chicken Chop Suey", cat: "protein" },
      { name: "Curried Chicken", cat: "protein" },
      { name: "Ackee and Saltfish", cat: "protein" },
      { name: "Coconut Curried Veggie Chunks", cat: "protein" },
      { name: "Fish Filets", cat: "protein" },
      { name: "Rice and Peas", cat: "rice" },
      { name: "Sweet Potato Salad", cat: "side" },
      { name: "Pasta Salad", cat: "side" },
      { name: "Vegetable Salad", cat: "side" },
      { name: "Yellow Yam", cat: "boiled" },
      { name: "Sweet Potato", cat: "boiled" },
      { name: "Pumpkin", cat: "boiled" },
      { name: "Ripe Plantains", cat: "boiled" },
      { name: "Green Bananas", cat: "boiled" }
    ]
  },
  Wednesday: {
    note: "",
    items: [
      { name: "Pineapple Chicken", cat: "protein" },
      { name: "Fried Chicken", cat: "protein" },
      { name: "Curried Chicken", cat: "protein" },
      { name: "Stewed Peas (Pig's Tails only)", cat: "protein" },
      { name: "Fish Filets", cat: "protein" },
      { name: "Ackee and Saltfish", cat: "protein" },
      { name: "Callaloo and Saltfish", cat: "protein" },
      { name: "Rice and Peas", cat: "rice" },
      { name: "White Rice", cat: "rice" },
      { name: "Sweet Potato Salad", cat: "side" },
      { name: "Pasta Salad", cat: "side" },
      { name: "Vegetable Salad", cat: "side" },
      { name: "Yellow Yam", cat: "boiled" },
      { name: "Sweet Potato", cat: "boiled" },
      { name: "Dumplings", cat: "boiled" },
      { name: "Pumpkin", cat: "boiled" }
    ]
  },
  Thursday: {
    note: "",
    items: [
      { name: "Honey Glazed Roasted Chicken", cat: "protein" },
      { name: "Fried Chicken", cat: "protein" },
      { name: "Stewed Chicken", cat: "protein" },
      { name: "Spicy Honey Glazed BBQ Pork", cat: "protein" },
      { name: "Ackee and Saltfish", cat: "protein" },
      { name: "Fish Filets", cat: "protein" },
      { name: "Pumpkin Soup (Chicken)", cat: "soup" },
      { name: "Rice and Peas", cat: "rice" },
      { name: "Sauteed Veggies", cat: "side" },
      { name: "Pasta Salad", cat: "side" },
      { name: "Sweet Potato Salad", cat: "side" },
      { name: "Yellow Yam", cat: "boiled" },
      { name: "Sweet Potato", cat: "boiled" },
      { name: "Pumpkin", cat: "boiled" },
      { name: "Dumplings", cat: "boiled" }
    ]
  },
  Friday: {
    note: "",
    items: [
      { name: "Chilli Chicken", cat: "protein" },
      { name: "Fried Chicken", cat: "protein" },
      { name: "Curried Mutton", cat: "protein" },
      { name: "Spicy Honey Glazed BBQ Pork", cat: "protein" },
      { name: "Escoveitched Sliced Fish", cat: "protein" },
      { name: "Braised Glazed BBQ Pork Chops", cat: "protein" },
      { name: "Rice and Peas", cat: "rice" },
      { name: "Pumpkin Seasoned Rice", cat: "rice" },
      { name: "Mashed Sweet Potato", cat: "rice" },
      { name: "Baked Mac and Cheese", cat: "rice" },
      { name: "Sauteed Vegetables", cat: "side" },
      { name: "Sweet Potato Salad", cat: "side" },
      { name: "Pasta Salad", cat: "side" },
      { name: "Pumpkin Soup (Chicken Foot & Chicken)", cat: "soup" }
    ]
  }
};

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const CAT_LABEL = {
  protein: "Mains",
  rice: "Rice & Starch",
  side: "Salads & Veg",
  boiled: "Boiled Provisions",
  soup: "Soup"
};

const CAT_ORDER = ["protein", "soup", "rice", "side", "boiled"];
