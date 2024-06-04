function toggleMenu() {
    let menu = document.getElementById('sidemenu');
    menu.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const favContainer = document.querySelector('.fav-card');

    function loadFavourites() {
        let favourites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favourites.length === 0) {
            favContainer.innerHTML = "<p>No favourite recipes found.</p>";
            return;
        }

        let generatedHtml = "";
        favourites.forEach(recipe => {
            generatedHtml += `
                <div class="card">
                    <div class="card-box">
                        <img src="${recipe.imgSrc}" alt="image">
                    </div>
                    <div class="card-content">
                        <div class="card-content-detail">
                            <p style="margin-top: 15px;"><b>Food Name:</b> <i>${recipe.foodName}</i></p>
                            <p style="margin-top: 15px;"><b>Calories:</b> <i>${recipe.calories}</i></p>
                            <p style="margin-top: 15px;"><b>Meal Type:</b> <i>${recipe.mealType}</i></p>
                            <p style="margin-top: 15px;"><b>Ingredients:</b> <i>${recipe.ingredients}</i></p>
                        </div>
                        <div class="card-button">
                            <button><a href="${recipe.detailsUrl}" target="_blank">See more</a></button><br>
                            <button class="delete-fav" data-recipe='${JSON.stringify(recipe)}' style="width: 81px;">Delete Fav</button>
                        </div>
                    </div>
                </div>
            `;
        });
        favContainer.innerHTML = generatedHtml;
        addDeleteButtonListeners();
    }

    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-fav');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const recipe = JSON.parse(e.target.getAttribute('data-recipe'));
                deleteFromFavourites(recipe);
            });
        });
    }

    function deleteFromFavourites(recipe) {
        let favourites = JSON.parse(localStorage.getItem('favorites')) || [];
        favourites = favourites.filter(fav => fav.foodName !== recipe.foodName);
        localStorage.setItem('favorites', JSON.stringify(favourites));
        loadFavourites();
        alert('Recipe removed from favourites!');
    }

    loadFavourites();
});
