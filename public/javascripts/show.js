const reviewsHtml = document.getElementById("reviews").children;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let index = 0;
const increment = 5;

// Show the first set of reviews
showReviews();

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index -= increment;
    showReviews();
  }
});

nextBtn.addEventListener("click", () => {
  if (index + increment < reviewsHtml.length) {
    index += increment;
    showReviews();
  }
});

function showReviews() {
    if(reviewsHtml.length==0){
        nextBtn.style.display = "none";
        document.getElementById("reviews").innerHTML = `<div class="text-danger mt-3 fs-5">No Reviews</div>`;
    } 
  for (let i = 0; i < reviewsHtml.length; i++) {
    if (i >= index && i < index + increment) {
      reviewsHtml[i].style.display = "block";
    } else {
      reviewsHtml[i].style.display = "none";
    }
    if(index>=5) prevBtn.style.display="inline";
    else prevBtn.style.display="none";

    if(index+5>reviewsHtml.length-1) nextBtn.style.display = "none";
    else nextBtn.style.display="inline";
  }
}

// show avg rating
document.addEventListener("DOMContentLoaded", function() {
    const avgRating = document.querySelector(".avgRating");
    let rating = 0;
  
    function showRating(){
      for(let i of reviews){
        rating += i.rating;
      }
      rating = parseInt(rating/reviews.length);

      if(rating >0) avgRating.innerHTML += `<p class="starability-result " data-rating="${rating}"></p>`;
      else{
        avgRating.innerHTML+=`<div class="text-danger fs-5">Not Rated</div>`
        avgRating.classList.add("align-items-center","mb-2");
      } 
    }
  
    showRating();
  });