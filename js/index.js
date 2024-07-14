let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");


$(document).ready(() => {
    $(".loading").removeClass("d-none");

    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
});


function closeNav(){
    let tabWidth = $(".side-nav .nav-tab").outerWidth();
    
    $(".side-nav").animate({
        left: -tabWidth 
    }, 500);

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    
    $(".side-nav .nav-tab .tab-links ul li ").animate({
        top: 300
    }, 500);
}

function openNav(){
    $(".side-nav").animate({
        left: 0
    }, 500);

    $(".open-close-icon").addClass("fa-x");
    $(".open-close-icon").removeClass("fa-align-justify");

    for (let i = 0; i < 5; i++) {
        $(".side-nav .nav-tab .tab-links ul li ").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}


closeNav();

$(".open-close-icon").click(()=>{
    if ($(".side-nav").css("left") == "0px"){
        closeNav();
    } else {
        openNav();
    }
});


// categories data

document.getElementById('categories').addEventListener('click', async function() {
    closeNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();

    displayCategories(data.categories);

    $(".inner-loading-screen").fadeOut(300)

});

function displayCategories(categories){
    let cartoona = "";

    for( let i=0 ; i < categories.length ; i++ ){
        cartoona+=` <div class="col-md-3">
                <div onclick="getCategoryMeals('${categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img src="${categories[i].strCategoryThumb}" alt="food" class="w-100">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }

    rowData.innerHTML = cartoona;
}






// area data

document.getElementById('area').addEventListener('click', async function() {
    closeNav();
        rowData.innerHTML = '';
        $(".inner-loading-screen").fadeIn(300)
        searchContainer.innerHTML = "";

        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await response.json();

        displayAreas(data.meals);

        $(".inner-loading-screen").fadeOut(300)

 
});


function displayAreas(area){
    let cartoona = "";
    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3">
                    <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartoona;
}




// ingredients data

document.getElementById('ingredients').addEventListener('click', async function() {
    closeNav();

    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();

    displayIngredients(data.meals.slice(0, 20));

    $(".inner-loading-screen").fadeOut(300)

});

function displayIngredients(ingredients) {
    let cartoona = "";

    for (let i = 0; i < ingredients.length; i++) {
        cartoona += `
        <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${ingredients[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredients[i].strIngredient}</h3>
                        <p>${ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        `
    }

    rowData.innerHTML = cartoona;
}





// Category Meals

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json()


    displayMeals(data.meals.slice(0, 20))

    $(".inner-loading-screen").fadeOut(300)

}

// Area Meals

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const data = await response.json()


    displayMeals(data.meals.slice(0, 20))

    $(".inner-loading-screen").fadeOut(300)

}



//  Ingredient Meals

async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    const data = await response.json()


    displayMeals(data.meals.slice(0, 20))

    $(".inner-loading-screen").fadeOut(300)

}



// display meals 

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}



// meals details 

async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

     const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
     const data = await response.json();

    displayMealDetails(data.meals[0])

    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}





document.getElementById('search').addEventListener('click', function() {
    closeNav();
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
});





async function searchByName(term) {
    closeNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();

    response.meals ? displayMeals(response.meals) : displayMeals([]);
    
    $(".inner-loading-screen").fadeOut(300);
}

async function searchByFLetter(term) {
    closeNav();
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    term = term.trim() === "" ? "a" : term.trim();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();

    response.meals ? displayMeals(response.meals) : displayMeals([]);
    
    $(".inner-loading-screen").fadeOut(300);
}






document.getElementById('contact').addEventListener('click', function() {
    closeNav();
    searchContainer.innerHTML = "";
    rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="validateField('name')" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="validateField('email')" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="validateField('phone')" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="validateField('age')" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" onkeyup="validateField('password')" type="password" class="form-control" placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="validateField('repassword')" type="password" class="form-control" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>`;

    submitBtn = document.getElementById("submitBtn");
});

function validateField(field) {
    let isValid = false;
    switch(field) {
        case 'name':
            isValid = /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
            toggleAlert('nameAlert', isValid);
            break;
        case 'email':
            isValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value);
            toggleAlert('emailAlert', isValid);
            break;
        case 'phone':
            isValid = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
            toggleAlert('phoneAlert', isValid);
            break;
        case 'age':
            isValid = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);
            toggleAlert('ageAlert', isValid);
            break;
        case 'password':
            isValid = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
            toggleAlert('passwordAlert', isValid);
            break;
        case 'repassword':
            isValid = document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;
            toggleAlert('repasswordAlert', isValid);
            break;
    }

    checkAllValid();
}

function toggleAlert(alertId, isValid) {
    document.getElementById(alertId).classList.toggle("d-none", isValid);
}

function checkAllValid() {
    const isFormValid = 
        /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value) &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value) &&
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value) &&
        /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value) &&
        /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value) &&
        document.getElementById("repasswordInput").value === document.getElementById("passwordInput").value;

    submitBtn.disabled = !isFormValid;
}



