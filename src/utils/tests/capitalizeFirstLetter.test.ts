import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("luke")).toBe("Luke");
  });

  it("capitalizes the first letter of an uppercase word (no change)", () => {
    expect(capitalizeFirstLetter("Leia")).toBe("Leia");
  });

  it("handles a single character", () => {
    expect(capitalizeFirstLetter("x")).toBe("X");
  });

  it("returns empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("returns empty string if input is undefined or null-ish", () => {
    expect(capitalizeFirstLetter(undefined as unknown as string)).toBe("");
    expect(capitalizeFirstLetter(null as unknown as string)).toBe("");
  });
});
