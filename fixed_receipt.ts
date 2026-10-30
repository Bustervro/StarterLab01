// Items can be added to and deleted from the grocery list.
// The subtotal excludes tax, the total includes tax, and a receipt can be printed.

type GroceryItem = {
  name: string;
  price: number;
};

const ITEMS: GroceryItem[] = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

function subtotalInCents(): number {
  return ITEMS.reduce((sum, item) => sum + Math.round(item.price * 100), 0);
}

function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function addItem(name: string, price: number): void {
  const cleanName = name.trim();
  if (!cleanName) {
    throw new Error("Item name must not be empty.");
  }
  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Item price must be a non-negative number.");
  }

  ITEMS.push({ name: cleanName, price: Math.round(price * 100) / 100 });
}

export function deleteItem(name: string): GroceryItem[] {
  const index = ITEMS.findIndex((item) => item.name === name);
  if (index !== -1) {
    ITEMS.splice(index, 1);
  }
  return ITEMS.map((item) => ({ ...item }));
}

// Returns the subtotal before tax.
export function total(): number {
  return subtotalInCents() / 100;
}

// taxRate is a decimal fraction, such as 0.08 for 8%.
// Returns the grand total, including tax.
export function tax(taxRate: number): number {
  if (!Number.isFinite(taxRate) || taxRate < 0) {
    throw new Error("Tax rate must be a non-negative number.");
  }

  const subtotalCents = subtotalInCents();
  const taxCents = Math.round(subtotalCents * taxRate);
  return (subtotalCents + taxCents) / 100;
}

export function printReceipt(taxRate: number): void {
  if (!Number.isFinite(taxRate) || taxRate < 0) {
    throw new Error("Tax rate must be a non-negative number.");
  }

  const subtotalCents = subtotalInCents();
  const taxCents = Math.round(subtotalCents * taxRate);
  const lines = [
    "************************",
    ...ITEMS.map((item) => `${item.name}: ${formatMoney(Math.round(item.price * 100))}`),
    "************************",
    `Subtotal: ${formatMoney(subtotalCents)}`,
    `Tax: ${formatMoney(taxCents)}`,
    `Total: ${formatMoney(subtotalCents + taxCents)}`,
  ];

  console.log(lines.join("\n"));
}

// AI transparency: AI was used to clean up this code.
