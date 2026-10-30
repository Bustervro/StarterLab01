import { addItem, deleteItem, printReceipt, tax, total } from "./receipt";

describe("grocery receipt", () => {
  test("calculates the initial subtotal without tax", () => {
    expect(total()).toBe(47.49);
  });

  test("adds and deletes an item", () => {
    const startingSubtotal = total();
    addItem("temporary item", 2.5);
    expect(total()).toBe(startingSubtotal + 2.5);

    const items = deleteItem("temporary item");
    expect(total()).toBe(startingSubtotal);
    expect(items.some((item) => item.name === "temporary item")).toBe(false);
  });

  test("leaves the list unchanged when deleting a missing item", () => {
    const startingSubtotal = total();
    deleteItem("not on the list");
    expect(total()).toBe(startingSubtotal);
  });

  test("calculates the grand total with an 8% tax rate", () => {
    expect(tax(0.08)).toBe(51.29);
  });

  test("prints item prices and receipt totals", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => undefined);
    printReceipt(0.08);
    const receipt = String(log.mock.calls[0][0]);
    log.mockRestore();

    expect(receipt).toContain("paper towels: $21.99");
    expect(receipt).toContain("Subtotal: $47.49");
    expect(receipt).toContain("Tax: $3.80");
    expect(receipt).toContain("Total: $51.29");
  });

  test("rejects invalid item prices and tax rates", () => {
    expect(() => addItem("invalid", -1)).toThrow();
    expect(() => tax(-0.01)).toThrow();
  });

  test("handles a zero tax rate", () => {
    expect(tax(0)).toBe(total());
  });
});