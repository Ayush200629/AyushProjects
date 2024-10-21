// Select elements from the DOM
const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to fetch recipes from the API
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        // Check if there are any recipes returned
        if (data.meals && data.meals.length > 0) {
            recipeContainer.innerHTML = "";
            data.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs to <span>${meal.strCategory}</span> category</p>
                `;

                const button = document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);

                // Add event listener to the "View Recipe" button
                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                });

                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = "<h2>No recipes found.</h2>";
        }
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error fetching recipes. Please try again later.</h2>";
        console.error('Error fetching recipes:', error);
    }
}

// Function to fetch spell suggestions from Datamuse API
const fetchSpellSuggestions = async (query) => {
    try {
        const response = await fetch(`https://api.datamuse.com/sug?s=${query}`);
        const suggestions = await response.json();
        return suggestions.length > 0 ? suggestions[0].word : query; // Use first suggestion or original query
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return query; // Return original query if error occurs
    }
}

// Function to open the recipe details popup
const openRecipePopup = (meal) => {
    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    const ingredientsHtml = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

    const instructions = meal.strInstructions
        .split('.') // Split the instructions by periods (.)
        .filter(instruction => instruction.trim() !== '') // Filter out empty steps
        .map(instruction => instruction.trim()); // Trim spaces

    const instructionsHtml = instructions.map(step => `<li>${step}</li>`).join('');

    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>${ingredientsHtml}</ul> <!-- Display ingredients as unordered list -->
        <h3>Instructions:</h3>
        <ol>${instructionsHtml}</ol> <!-- Display instructions as ordered list -->
    `;

    recipeDetails.style.display = "block";
}

// Function to close the recipe details popup
const closeRecipePopup = () => {
    recipeDetails.style.display = "none";
}

// Event listener for the search button with spell correction
searchbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();

    // Check if input is empty
    if (!searchInput) {
        alert('Please enter a recipe to search.');
        return;
    }

    // Fetch the corrected spelling for the search term
    const correctedQuery = await fetchSpellSuggestions(searchInput);

    // Inform the user if a correction was made
    if (correctedQuery.toLowerCase() !== searchInput.toLowerCase()) {
        const userConfirmed = confirm(`Did you mean: ${correctedQuery}?`);
        if (!userConfirmed) {
            return; // If the user rejects the suggestion, don't search
        }
    }

    // Fetch recipes with the corrected query
    fetchRecipes(correctedQuery);
});

// Event listener for the close button in the recipe details popup
recipeCloseBtn.addEventListener('click', () => {
    closeRecipePopup();
});

