const useCalculateRating = (recipe) => {
  let total = 0;
  let numberOfRatings = 0;
  if (recipe) {
    for (let i = 0; i < recipe.rating.length; i++) {
      total += Number(recipe.rating[i]);
    }
    numberOfRatings = recipe.rating.length;
  }
  const rating = Math.round(total / numberOfRatings);

  return { rating };
};

export default useCalculateRating;
