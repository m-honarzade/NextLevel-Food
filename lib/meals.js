import fs from "node:fs"; // to work with file system
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { error } from "node:console";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("something went wrong!!!");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug=? ").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  console.log(meal.image);
  // preparing image to save
  const extension = meal.image.name.split(".").pop(); // getting png or jpeg in the end of file
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image?.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) throw new Error("failed to save image.");
  });
  meal.image = `/images/${fileName}`; // to save image path in db instead of image file. so overwreite meal.image
  // STORING IN DB
  db.prepare(
    `
    INSERT INTO meals
         (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
         )
    `
  ).run(meal);
}
