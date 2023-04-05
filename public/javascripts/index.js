const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");
const campgroundList = document.querySelector("#campground-list");
if (nextButton) {
  let index = 5;
  nextButton.addEventListener("click", () => {
    campgroundList.innerHTML = "";
    for (let i = index; i < Math.min(Campgrounds.length, index + 5); i++) {
      const campground = Campgrounds[i];
      var avg = 0;
      for(let j=0;j<campground.reviews.length;j++){
        avg+=campground.reviews[j].rating;
      }
      avg=parseInt(avg/campground.reviews.length)
      var rating =0
      if(avg) rating=avg;

      const campgroundHTML = `
        <div class="list row mb-3 mx-2 align-items-center text-white">
          <div class="col-lg-5 ps-0 pe-0 pe-lg-1">
            <img src="${campground.images[0].url}" crossorigin class="img-fluid image" alt="">
          </div>
          <div class="col-lg-5 mt-lg-0 mt-1">
            <h6 class="title">${campground.title}</h6>
            <div class="avgRating">${rating? `<p class="starability-result mb-2" data-rating="${rating}"></p>`:`<p class="text-danger rate mb-1">Not Rated</p>`}</div>
            <div class="d-flex align-items-center">
              <span id="location-label"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill text-primary mb-1 me-1" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg></span>
              ${campground.location.length > 20 ?
                `<small>${campground.location.substring(0, 23)}...</small>` :
                `<small>${campground.location}</small>`
              }
            </div>
          </div>
          <div class="col-lg-2 d-flex justify-content-center mt-2 mt-lg-0">
          <a class="btn btn-primary mb-3" href="/campgrounds/${campground._id}">view</a>
          </div>
        </div>
      `;
      campgroundList.innerHTML += campgroundHTML;
    }
    index += 5;
    if (index >= Campgrounds.length) {
      nextButton.style.display = "none";
    }
    if (index > 5) {
      prevButton.style.display = "inline";
    }
    else prevButton.style.display="none";
  });

  prevButton.addEventListener("click", () => {
    index -= 5;
    if (index <= 5) {
      index = 5;
      prevButton.style.display = "none";
    }
    nextButton.style.display = "inline-block";
    campgroundList.innerHTML = "";
    for (let i = index - 5; i < Math.min(Campgrounds.length, index); i++) {
      const campground = Campgrounds[i];
      var avg = 0;
      for(let j=0;j<campground.reviews.length;j++){
        avg+=campground.reviews[j].rating;
      }
      avg=parseInt(avg/campground.reviews.length)
      var rating =0
      if(avg) rating=avg;
      const campgroundHTML = `
        <div class="list row mb-3 mx-2 align-items-center text-white">
          <div class="col-lg-5 ps-0 pe-0 pe-lg-1">
            <img src="${campground.images[0].url}" crossorigin class="img-fluid image" alt="">
          </div>
          <div class="col-lg-5 mt-lg-0 mt-1">
            <h6 class="title">${campground.title}</h6>
            <div class="avgRating">${rating? `<p class="starability-result mb-2" data-rating="${rating}"></p>`:`<p class="text-danger rate mb-1">Not Rated</p>`}</div>
            <div class="d-flex align-items-center">
              <span id="location-label"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill text-primary mb-1 me-1" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg></span>
              ${campground.location.length > 20 ?
                `<small>${campground.location.substring(0, 23)}...</small>` :
                `<small>${campground.location}</small>`
              }
            </div>
          </div>
          <div class="col-lg-2 d-flex justify-content-center mt-2 mt-lg-0">
          <a class="btn btn-primary mb-3" href="/campgrounds/${campground._id}">view</a>
          </div>
        </div>
      `;
      campgroundList.innerHTML += campgroundHTML;
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
    averageRating(0,5);
});

function averageRating(index,limit){
  var avgRatingElements = document.querySelectorAll(".avgRating");
    for(let i=index;i < Math.min(Campgrounds.length, limit);i++){
      var avg=0;
      for(let j in Campgrounds[i].reviews){
        avg+=Campgrounds[i].reviews[j].rating;
      }
      avg=parseInt(avg/Campgrounds[i].reviews.length);
      if(!avg) rating = 0;
      else rating = avg;
      if(rating) avgRatingElements[i].innerHTML = `<p class="starability-result mb-2 " data-rating="${rating}"></p>`;
      else avgRatingElements[i].innerHTML = `<p class="text-danger rate mb-1"> Not Rated</p>`;
    } 
      
}



