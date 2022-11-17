import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const mealsFetch = async () => {
      // try {
      setIsLoading(true);
      const response = await fetch(
        "https://udemy-2-d6288-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        const singleItem = {
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          img: responseData[key].img,
        };
        loadedMeals.push(singleItem);
      }

      setMealsData(loadedMeals);
      setIsLoading(false);
    };

    mealsFetch().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading Dishes....</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const meals_list = mealsData.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        img={meal.img}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <h2>Our Menu</h2>
      <ul>{meals_list}</ul>
    </section>
  );
};

export default AvailableMeals;
