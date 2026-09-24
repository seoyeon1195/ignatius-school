import {defineQuery} from "next-sanity";

export const activityImagesQuery = defineQuery(`
  *[_type == "activityGallery"][0] {
    images[] {
      _key,
      _type,
      asset,
      crop,
      hotspot,
      caption
    }
  }
`);

export type ActivityImage = {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  caption?: string;
};

export type ActivityGallery = {
  images?: ActivityImage[];
} | null;
