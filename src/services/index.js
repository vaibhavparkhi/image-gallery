import axios from "axios";

const KEY = "6473511-0417f2cad683f1bee54cafe15";
export const GET_PHOTO_URL = `https://pixabay.com/api/?key=${KEY}&`; // q=yellow+flowers&image_type=photo

export const getPhotos = async () => {
  try {
    return await axios.get(GET_PHOTO_URL);
  } catch (err) {
    console.error(err);
  }
};
