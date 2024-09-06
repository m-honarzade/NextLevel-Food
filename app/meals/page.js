import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
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
        <MealsGrid meals={[]} />
      </main>
    </>
  );
};
export default MealsPage;
