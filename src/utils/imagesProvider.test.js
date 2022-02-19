import { getImages } from "./imagesProvider";

describe("It takes the path of each image and returns a proper url", () => {
  it("returns the pathname along with proper domain", () => {
    const pathname = "/sdbjksdbfjjsbkjdfnvkjsdf";
    const expectedUrlStr = `https://image.tmdb.org/t/p/w500${pathname}`;
    expect(typeof getImages(pathname)).toBe("string");
    expect(getImages(pathname)).toEqual(expectedUrlStr);
  });
});

describe("If pathname is not provided", () => {
  it("returns empty string", () => {
    const emptyPathname = "";
    const expectedUrlStr = "";
    expect(getImages(emptyPathname)).toEqual(expectedUrlStr);
  });
});
