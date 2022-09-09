// Listen to the submit event happening on the form
document.getElementById("user_input_form").addEventListener("submit", (evt) => {
  evt.preventDefault();

  //   Grab user inputs from the form and store them in variables
  const destination = document.getElementById("dest").value;
  const location = document.getElementById("location").value;
  const photoUrl = document.getElementById("photo").value;
  const description = document.getElementById("desc").value;

  //   clear user inputs from the form (for UX)
  document.getElementById("user_input_form").reset();

  //   Use the bootstap card template with the user inputs
  const card = elementFactory({
    eltType: "div",
    parentElt: document.getElementById("cards_container"),
    className: "card",
    attrs: [{ name: "style", value: "width: 18rem;" }],
  });

  const FALLBACK_PLACEHOLDER_PHOTO =
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80";

  const img = elementFactory({
    eltType: "img",
    className: "card-img-top",
    parentElt: card,
    attrs: [
      { name: "alt", value: `${destination} at ${location}` },
      {
        name: "src",
        value: photoUrl.length === 0 ? FALLBACK_PLACEHOLDER_PHOTO : photoUrl,
      },
    ],
  });

  const cardBody = elementFactory({
    parentElt: card,
    eltType: "div",
    className: "card-body",
  });

  const newDestElt = elementFactory({
    text: destination,
    parentElt: cardBody,
    className: "card-title",
    eltType: "h5",
  });

  const newLocElt = elementFactory({
    text: location,
    parentElt: cardBody,
    className: "card-text",
    eltType: "p",
  });

  //   if the user provided a description, create an elt (same as location) and put it on the card
  if (description.length !== 0) {
    const newDescElt = elementFactory({
      eltType: "p",
      className: "card-text",
      text: description,
      parentElt: cardBody,
    });
  }

  //   Add edit & remove buttons
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "btn-warning");

  editBtn.addEventListener("click", handleEdit);
  cardBody.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.classList.add("btn", "btn-danger");

  removeBtn.addEventListener("click", handleRemove);
  cardBody.appendChild(removeBtn);
});

function handleRemove(evt) {
  console.log(evt);

  const eltToRemove = evt.target.parentElement.parentElement;

  // Recursively remove each child of your container
  while (eltToRemove.firstChild) {
    eltToRemove.firstChild.remove();
  }

  //   And then, when this container is childless, remove it
  eltToRemove.remove();
}

function handleEdit(evt) {
  const editBtn = evt.target;
  const cardBody = editBtn.parentElement;
  const card = cardBody.parentElement;

  const destElt = cardBody.children[0];
  const locElt = cardBody.children[1];
  const imgElt = card.children[0];

  const newDest = prompt("Enter new destination", destElt.innerText);
  const newLoc = prompt("Enter new location", locElt.innerText);
  const newPhoto = prompt("Enter new photo url", imgElt.getAttribute("src"));

  if (newDest !== destElt.innerText) {
    destElt.innerText = newDest;
  }

  if (newLoc !== locElt.innerText) {
    locElt.innerText = newLoc;
  }

  if (newPhoto !== imgElt.getAttribute("src")) {
    imgElt.setAttribute("src", newPhoto);
  }
}

/*
eltType is required
*/
function elementFactory({ eltType, className, parentElt, text, attrs }) {
  if (!eltType) {
    return undefined;
  }

  const newElt = document.createElement(eltType);

  if (className) {
    newElt.classList.add(className);
  }

  if (text) {
    newElt.innerText = text;
  }

  if (parentElt) {
    parentElt.appendChild(newElt);
  }

  if (attrs) {
    for (const attr of attrs) {
      const { name: attrName, value: attrValue } = attr;
      newElt.setAttribute(attrName, attrValue);
    }
  }

  return newElt;
}
