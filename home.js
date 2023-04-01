/// Redirect home
const logo = document.querySelector('#logo')
logo.addEventListener('click',function(){
    location.href = "https://shizuri0901.github.io/JSA10-final/home.html"
})

/// đăng xuất
function Log_out(){
  location.href = 'https://shizuri0901.github.io/JSA10-final/sign_in.html';
  localStorage.setItem('login','false')
  localStorage.setItem('User','')
}

/// Hiển thị tài khoản (nếu có)
document.addEventListener("DOMContentLoaded", function() {
  if(localStorage.getItem('login') === "true"){
    const dis_acc = document.querySelector("#acc") /// cần sửa tiếp
    console.log(dis_acc);
    dis_acc.innerHTML = `
    <style>
    .white-on-hover:hover {
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(90deg);
    }
    </style>
    <?xml version="1.0" ?><svg height="30px" version="1.1" viewBox="0 0 20 20" width="30px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-86.000000, -2.000000)"><g id="account-circle" transform="translate(86.000000, 2.000000)"><path d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,3 C11.7,3 13,4.3 13,6 C13,7.7 11.7,9 10,9 C8.3,9 7,7.7 7,6 C7,4.3 8.3,3 10,3 L10,3 Z M10,17.2 C7.5,17.2 5.3,15.9 4,14 C4,12 8,10.9 10,10.9 C12,10.9 16,12 16,14 C14.7,15.9 12.5,17.2 10,17.2 L10,17.2 Z" id="Shape"/></g></g></g></svg>
    <a class="fw-bold text-primary ml-5 mb-10 white-on-hover link-underline-success" href="#" onclick="Log_out()"> ${localStorage.getItem('User')}
                  </a>
      `
}})

/// Chọn dropdown
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const ful_rec = ''
/// Khởi tạo local
if (localStorage.getItem("sort") == "null") {
  localStorage.setItem("sort", "ALL")
}
if (localStorage.getItem("content") == "null") {
  localStorage.setItem("content", "")
}
if (localStorage.getItem("place") == "null") {
  localStorage.setItem("place", "")
}
// if (window.location.href == "https://shizuri0901.github.io/JSA10-final/home.html"){
//   res_loc("Ho Chi Minh") /// set up sẵn
// }
/// Set up dropdown
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownMenu.textContent = item.textContent;
    localStorage.setItem("sort", item.textContent)
    const place_holder = document.querySelector('#search')
    console.log(place_holder);
    console.log(dropdownMenu.textContent);
    if (dropdownMenu.textContent == 'Restaurants'){
      place_holder.placeholder = 'Enter your city';
    }
    else if (dropdownMenu.textContent == 'Cooking recipes'){
      place_holder.placeholder = 'Enter your food'
      console.log(place_holder.placeholder);
    }
  });
});
/// Bắt đầu tìm
$(document).ready(function () {
  $('#search').on('keydown', function (event) {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      // Enter key was pressed
      // Perform action here
      const place = document.querySelector("#search")
      localStorage.setItem("place", place.value)
      // search.value = ''
      place.value = ''
      console.log(window.location.href);
      if (localStorage.getItem('sort') == 'Restaurants') {
        res_loc(localStorage.getItem("place"))
      }
      else if (localStorage.getItem('sort') == 'Cooking recipes'){
        res_rec(localStorage.getItem("place"))
      }
      if ( window.location.href == "https://shizuri0901.github.io/JSA10-final/sign_in.html#" || window.location.href == "https://shizuri0901.github.io/JSA10-final/sign_up.html#" ){
        all = document.querySelector("#all")
        all.innerHTML =''
      }
    }
  });
});

async function res_loc(place) {
  /// Tìm location id
  console.log(place);
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", `${place}`);
  encodedParams.append("language", "en_US");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '8c13b7f16emsh5b29079d3eb9308p175478jsncceee7af7bba',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
	},
	body: encodedParams
};

await fetch('https://worldwide-restaurants.p.rapidapi.com/typeahead', options)
	.then(response => response.json())
	.then(response =>
    {
      console.log(response);
      console.log(response.results.data[0].result_object.location_id);
      const fet1 = response.results.data[0].result_object.location_id
      localStorage.setItem("location",fet1)
      res_res()
    })
	.catch(err => console.error(err));
}

/// Tìm theo nhà hàng
async function res_res(){
  document.querySelector(".row").textContent = ``
  const encodedParams = new URLSearchParams();
  encodedParams.append("language", "en_US");
  encodedParams.append("limit", "30");
  encodedParams.append("location_id", `${localStorage.getItem("location")}`);
  encodedParams.append("currency", "USD");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '8c13b7f16emsh5b29079d3eb9308p175478jsncceee7af7bba',
		'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
	},
	body: encodedParams
};

await fetch('https://worldwide-restaurants.p.rapidapi.com/search', options)
	.then(response => response.json())
  .then(response => 
    {console.log(response)
    response.results.data.forEach(item =>{
      if(item.address_obj.street2 == null){return;}
      var root = document.querySelector(".row")
      img = item.photo.images.medium.url
      Name = item.name
      des = item.description
      star = Math.round(item.rating)
      price = item.price_level
      address = item.address_obj.street2
      sample_star_check= `<span class="fa fa-star checked"></span>`
      sample_star= `<span class="fa fa-star"></span>`
      console.log(star);
      console.log(Math.round(star)*"⭐");
      var text = ''
      const sample = `<div class="col-lg-3 col-md-6 mb-4">
      <div class="card">
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light">
          <img src= ${img}
            class="w-100" alt="" />
          <a href="#!">
            <div class="mask">
              <div class="d-flex justify-content-center h-100">
                <h5><span class="badge bg-dark ms-2">${price}</span></h5>
              </div>
            </div>
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </div>
          </a>
        </div>
        <div class="card-body">
          <a href="" class="text-reset">
            <h5 class="card-title mb-2">${Name}</h5>
          </a>
          <a href="" class="text-reset ">
            <p>${address}</p>
          </a>
          <h6 class="mb-3 price">
            ${sample_star_check.repeat(star)}
            ${sample_star.repeat(5 - star)}
          </h6>
        </div>
      </div>
    </div>`
      text += sample
      root.innerHTML += text
    })}
  )
	.catch(err => console.error(err))
}
async function res_rec(food){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '163049fdb5msh17990d9aeac49a2p191ebfjsne3fa26f62c4d',
      'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    }
  };
  
  fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${food}`, options)
  .then(response => response.json())
	.then(response => {
    console.log(response)
    response.hits.forEach(item =>{
      const root = document.querySelector(".mt-5")
      Name = item.recipe.label
      img = item.recipe.image
      localStorage.setItem("ingredients",item.recipe.ingredients)
      const ingredients = item.recipe.ingredientLines.join("\n");
      const price = item.recipe.dietLabels.join(", ");
      const address = item.recipe.totalNutrients.CHOCDF.quantity.toFixed(2);
      const health = item.recipe.healthLabels.join(", ");
      console.log(health);
      var text = ''
      const sample = `<div class="col-lg-3 col-md-6 mb-4">
        <div class="card">
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src= ${img}
              class="w-100" alt="" />
            <a href="#!">
              <div class="mask">
                <div class="d-flex justify-content-center h-100">
                  <h5><span class="badge bg-dark ms-2">${price}</span></h5>
                </div>
              </div>
              <div class="hover-overlay">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              </div>
            </a>
          </div>
          <div class="card-body">
            <a href="" class="text-reset">
              <h5 class="card-title mb-2">${Name}</h5>
            </a>
            <p href="" class="text-reset ">
              <p>Carbohydrates (net):${address}g</p>
            </p>
            <h6 class="mb-3 price">
              ${ingredients}
            </h6>
          </div>
        </div>
      </div>`
        text = text + sample
        root.innerHTML += text
      })
    })
	.catch(err => console.error(err));
}
