let addToy = false;

function getToyList() {
  const toysUrl = "http://localhost:3000/toys";
  return fetch(toysUrl).then((response) => response.json());
}

function clearToyList() {
  const toyCollection = document.querySelector("#toy-collection");
  while (toyCollection.firstChild) {
    toyCollection.removeChild(toyCollection.firstChild);
  }
}

function renderToyList() {
  clearToyList();
  return getToyList().then((toysList) => {
    console.log("json returned");
    toysList.forEach((toy) => {
      processToy(toy);
    });
  });
}

function processToy(toy) {
  const toyCollection = document.querySelector("#toy-collection");

  const toyDiv = document.createElement("div");
  toyDiv.className = "card";

  const nameHead = document.createElement("h2");
  nameHead.innerText = toy.name;

  const toyImage = document.createElement("img");
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";

  const likesP = document.createElement("p");
  likesP.innerText = toy.likes;

  const likeButton = document.createElement("button");
  likeButton.innerText = "like ❤";
  likeButton.className = "like-btn";

  toyDiv.appendChild(nameHead);
  toyDiv.appendChild(toyImage);
  toyDiv.appendChild(likesP);
  toyDiv.appendChild(likeButton);

  toyCollection.appendChild(toyDiv);
}

function newToy(toyParams) {
  let toyObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyParams),
  };
  return fetch("http://localhost:3000/toys", toyObject)
    .then((response) => response.json())
    .then((object) => console.log(object))
    .then(renderToyList());
}

function clickToy() {
  const toyForm = document.querySelector(".add-toy-form");
  let paramArr = [];
  let params = {};

  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    new FormData(toyForm);
  });

  toyForm.addEventListener("formdata", (e) => {
    console.log("form fired");
    let data = e.formData;
    for (const value of data.values()) {
      paramArr.push(value);
    }
    params.name = paramArr[0];
    params.image = paramArr[1];
    params.likes = 0;

    newToy(params);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  renderToyList();

  clickToy();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
