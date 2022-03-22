// let searchResults = [];
// let searchARG = [];
// ~~~~~Done~~~~~~~~~
// search button to seach by key ingredient
const searchKEYingredient = async (event) =>{
  event.preventDefault();

  const searchKEY = document.querySelector('#ingredient_search').value.trim();

  const response = await fetch(`/api/search/key_ingredient/${searchKEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',}
  });

  if(response.ok){ 
    document.cookie = "name="+searchKEY;
    document.cookie = "namePATH=key_ingredient";  
    document.location.replace(`/api/search/key_ingredient/${searchKEY}`);}
  else {document.location.replace('/');}
};

// ~~~~~Done~~~~~~~~~
// search button to seach by key ingredient
const searchTitleRecipe = async (event) =>{
  event.preventDefault();

  const searchKEY = document.querySelector('#recipe_search').value.trim();

  const response = await fetch(`/api/search/title/${searchKEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',}
  });

  if(response.ok){ 
    document.cookie = "name="+searchKEY;
    document.cookie = "namePATH=title";
    document.location.replace(`/api/search/title/${searchKEY}`);}
  else {document.location.replace('/');}
};

// ~~~~~Done~~~~~~~~~
// search button to seach by key ingredient
const searchbyAUTHOR = async (event) =>{
  event.preventDefault();

  const searchKEY = document.querySelector('#author_search').value.trim();

  const response = await fetch(`/api/search/author_id/${searchKEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',}
  });

  if(response.ok){ 
    document.cookie = "name="+searchKEY;
    document.cookie = "namePATH=author_id";
    document.location.replace(`/api/search/author_id/${searchKEY}`);}
  else {document.location.replace('/');}
};

// ~~~~~Done~~~~~~~~~
// add a recipe to the data base
const addRecipe = async (event) =>{
  event.preventDefault();

  const course = document.querySelector('#reipecourse').value.trim();
  const title = document.querySelector('#recipeTitle').value.trim();
  const key_ingredient = document.querySelector('#keyIngredient').value.trim();
  const cook_time = parseInt(document.querySelector('#cookTime').value.trim());
  const serving_size = parseInt(document.querySelector('#servingSize').value.trim());
  const vegitarian = (document.querySelector('#vegitarian').value.trim() === 'yes');
  const hot = (document.querySelector('#hot').value.trim() === 'yes');  
  const Ingredients = document.querySelector('#ingredients').value;
  const instructions = document.querySelector('#instructions').value;

  const ingredients = Ingredients.split(',');
  
  if(course && title && key_ingredient && Ingredients && instructions){
    const response = await fetch(`/api/recipes/`, {
      method: 'POST',
      body: JSON.stringify({course,
                            title,
                            key_ingredient,
                            cook_time,
                            serving_size,
                            vegitarian,
                            hot,
                            instructions,
                            ingredients,}),
      headers: { 'Content-Type': 'application/json',}
    });
    if(response.ok){ document.location.replace('/api/users/');}
    else {alert('failed to create recipe');}
  }
};

// ~~~~~Done~~~~~~~~~
// delete one recipe
const deleteRecipe = async (event) => {
  // event.preventDefault();
  console.log("im om dlete");
  if(event.target.hasAttribute('data-id')){
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipes/${id}` , {
      method: 'DELETE',
    });

    if (response.ok){ document.location.replace('/api/users/'); }
    else { alert('failed to delete the recipe')}
  }
};

document.querySelector("#search1").addEventListener("click", searchKEYingredient);
document.querySelector("#search2").addEventListener("click", searchTitleRecipe);
document.querySelector("#search3").addEventListener("click", searchbyAUTHOR);

const create = document.querySelectorAll('.new-project-form');
create.forEach((create) => {
  create.addEventListener('submit', addRecipe);
});

const deleteRES = document.querySelectorAll('.delete-recipes');
deleteRES.forEach((deleteRES) => {
  deleteRES.addEventListener('click', deleteRecipe);
});

// localStorage.setItem("searchResults",JSON.stringify(searchResults));
// localStorage.setItem("searchARG",JSON.stringify(searchARG));
