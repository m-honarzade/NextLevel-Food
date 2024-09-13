import Link from "next/link";
import { Suspense } from "react";
import { getMeals } from "@/lib/meals";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";

export const metadata = {
  title: "All Meals",
  description: "Brows the delicious meals shared by our vibrant community",
};

const Meals = async () => {
  const mealsData = await getMeals();
  return <MealsGrid meals={mealsData} />;
};

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.heighlight}> by you</span>
        </h1>

        <p>
          Choose your favorite recepie and cook it yourself! it is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals....</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};
export default MealsPage;
