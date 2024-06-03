function toggleMenu() {
    let menu = document.getElementById('sidemenu');
    menu.classList.toggle('show');
}
// document.addEventListener('DOMContentLoaded', (event) => {
//     let button = document.getElementById('searchButton');
  
//     button.addEventListener("click", (e) => {
//         e.preventDefault();
//       goToSearchPage();
//     });
  
//     function goToSearchPage() {
//       window.location.href = 'search.html';
//     }
//   });

  const form = document.querySelector("form");
  const foodCard = document.querySelector(".food-card");
  const card = document.querySelector(".card");
  const headText = document.querySelector(".title-text");
  let searchValue = "";
  const APP_ID = "0cc1a238";
  const APP_key = "f8673989d9f8ddb1ae790e02cdedd9b8";
  

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchValue = e.target.querySelector("input").value.trim();
    if (searchValue) {
      console.log(searchValue);
      fetchApi();
    } else {
      alert("Please enter a search term.");
    }
  });
  

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
      foodCard.innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
    }
  }
  
  function generateHtml(results) {
    headText.innerHTML = `Search results for ${searchValue}`;
    let generatedHtml = "";
    results.map(result => {
      generatedHtml +=
      `
      <div class="card">
      <div class="card-box">
          <img src="${result.recipe.image}" alt="image">
      </div>
      <div class="card-content">
          <div class="card-content-detail">
              <p style="margin-top: 15px;"><b>Food Name:</b> <i>${result.recipe.label}</i></p>
              <p style="margin-top: 15px;"><b>Calories:</b> <i>${result.recipe.calories.toFixed(2)}</i></p>
              <p style="margin-top: 15px;"><b>Meal Type:</b> <i>${result.recipe.mealType}</i></p>
              <p style="margin-top: 15px;"><b>Ingredients:</b> <i>${result.recipe.ingredientLines}</i></p>
          </div>
          <div class="card-button">
              <button><a href= "${result.recipe.url}" target= "_blank">See more</a></button><br>
              <button style="width: 81px;">favourite</button>
          </div>
      </div>
  </div>

      `
    })
    foodCard.innerHTML = generatedHtml;
  }
  