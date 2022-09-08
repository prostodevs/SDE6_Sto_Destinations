//list to submit event on the form
document.getElementById("user_input_form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Nelly");

  //grab user inputs from the form and store them  in variables
  debugger;
  document.getElementById("user_input_form").value;

  const destination = document.getElementById("dest").value;
  const location = document.getElementById("location").value;
  const photourl = document.getElementById("photo").value;
  const description = document.getElementById("desc").value;

  document.getElementById("user_input_form").reset();
  {
    /* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
  }

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("style", "width:18rem;");
  document.getElementById("yellowbox").appendChild(card);

  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("alt", `${destination} at ${location}`);
  if (photourl.length === 0) {
    img.setAttribute(
      "src",
      "https://www.parisphoto.com/content/dam/sitebuilder/ref/paris-photo/images/prochaines-%C3%A9ditions/gpe-web.jpg/_jcr_content/renditions/original.image_file.559.699.file/gpe-web.jpg"
    );
  } else {
    img.setAttribute("src", photourl);
  }
  card.appendChild(img);
});
