// for toggling the menu items when it is in smaller screen

function toggleMenu() {
    let menu = document.getElementById('sidemenu');
    menu.classList.toggle('show');
}
// for active pages

let menuItems = document.querySelectorAll("#sidemenu a");

menuItems.forEach(function(item) {
  item.addEventListener("click", () =>{
    console.log("clicked");
    menuItems.forEach(function(item){
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
})



// all the main javaScript
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector("form");
  const foodCard = document.querySelector(".food-card");
  const headText = document.querySelector(".title-text");
  let searchValue = ""; 
  const APP_ID = "0cc1a238";
  const APP_key = "f8673989d9f8ddb1ae790e02cdedd9b8";

// adding event listner to search box
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      searchValue = e.target.querySelector("input").value.trim();
      if (searchValue) {
          fetchApi();
          console.log(searchValue);
      } else {
          alert("Please enter a search term.");
      }
  });

//   fetching api
  async function fetchApi() {
      try {
          const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
          let response = await fetch(baseURL);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          generateHtml(data.hits);
          console.log(data);
      } catch (error) {
          console.error("Fetch error: ", error);
          if (foodCard) {
              foodCard.innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
          }
      }
  }

//   function for generating results
  function generateHtml(results) {
      if (!foodCard) {
          console.error("Required elements not found in the DOM.");
          return;
      }
      
      let generatedHtml = "";
      results.forEach(result => {
          headText.innerHTML = `Recipes for ${searchValue}`;
          const recipe = result.recipe;
          generatedHtml += `
              <div class="card">
                  <div class="card-box">
                      <img src="${recipe.image}" alt="image">
                  </div>
                  <div class="card-content">
                      <div class="card-content-detail">
                          <p style="margin-top: 15px;"><b>Food Name:</b> <i>${recipe.label}</i></p>
                          <p style="margin-top: 15px;"><b>Calories:</b> <i>${recipe.calories.toFixed(2)}</i></p>
                          <p style="margin-top: 15px;"><b>Meal Type:</b> <i>${recipe.mealType}</i></p>
                          <p style="margin-top: 15px;"><b>Ingredients:</b> <i>${recipe.ingredientLines.join(', ')}</i></p>
                      </div>
                      <div class="card-button">
                          <button><a href="${recipe.url}" target="_blank">See more</a></button><br>
                          <button class="fav-button" data-recipe='${JSON.stringify({
                              imgSrc: recipe.image,
                              foodName: recipe.label,
                              calories: recipe.calories.toFixed(2),
                              mealType: recipe.mealType,
                              ingredients: recipe.ingredientLines,
                              detailsUrl: recipe.url
                          })}' style="width: 81px;">Favourite</button>
                      </div>
                  </div>
              </div>
          `;
      });
      foodCard.innerHTML = generatedHtml;
      addFavouriteButtonListeners();
  }

//   function for adding event listner to fav button
  function addFavouriteButtonListeners() {
      const favButtons = document.querySelectorAll('.fav-button');
      favButtons.forEach(button => {
          button.addEventListener('click', (e) => {
              const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
              saveToFavourites(recipe);
          });
      });
  }

//   function for saving recipe in local storage
  function saveToFavourites(recipe) {
      let favourites = JSON.parse(localStorage.getItem('favorites')) || [];
      favourites.push(recipe);
      localStorage.setItem('favorites', JSON.stringify(favourites));
      alert('Recipe added to favourites!');
  }
});
