import { expect, test, describe } from "vitest";
import { parseToMinutes } from "./timeUtils";

describe("parseToMinutes", () => {
  test("convert seconds to formatted minutes and seconds", () => {
    expect(parseToMinutes(0)).toBe("00:00");
    expect(parseToMinutes(360)).toBe("06:00");
    expect(parseToMinutes(122)).toBe("02:02");
    expect(parseToMinutes(30)).toBe("00:30");
  });
});