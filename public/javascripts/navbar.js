const currentUrl = window.location.href;
const homeLink = document.getElementById("home-link");
const campgroundsLink = document.getElementById("campgrounds-link");
const newCampgroundLink = document.getElementById("new-campground-link");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const contactLink = document.getElementById("contact-link");

if (currentUrl.endsWith("/")) {
  homeLink.classList.add("active");
} else if (currentUrl.endsWith("/campgrounds")) {
  campgroundsLink.classList.add("active");
} else if (currentUrl.endsWith("/campgrounds/new")) {
  newCampgroundLink.classList.add("active");
} else if (currentUrl.endsWith("/login")) {
  loginLink.classList.add("active");
} else if (currentUrl.endsWith("/register")) {
  registerLink.classList.add("active");
}
else if (currentUrl.endsWith("/contact")) {
  contactLink.classList.add("active");
}