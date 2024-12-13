const url = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzExOTA3ZGI3MzAwMTU0MDYzYWYiLCJpYXQiOjE3MzQwODIyMjksImV4cCI6MTczNTI5MTgyOX0.ujuAF-j1Yt7gBoYAMOgRfjZen5zppgKqNa9RTSCFO7c";

// Hompage
const empty = document.getElementById("empty");
const row = document.getElementById("row");

// Form BackOffice
const myForm = document.getElementById("myForm");
const productName = document.getElementById("productName");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const imageUrl = document.getElementById("imageUrl");
const description = document.getElementById("description");
const save = document.getElementById("save");
const reset = document.getElementById("reset");

// Array di appoggio
let product;

const productList = [];

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

window.onload = () => {
  loadProduct();
};

const loadProduct = async () =>
  await fetch(url, {
    headers: {
      Authorization: key,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      product = data;
      console.log(data);
      productList.push(product);
      console.log(productList);
      if (product.length > 0) {
        printData();
      } else {
        empty.innerText = "Nessun prodotto registrato";
        return;
      }
    })
    .catch((err) => console.log(err));

const printData = () => {
  empty.innerText = "";
  row.innerHTML = "";
  product.forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "p-3 col-sm-6 col-md-3 col-lg-2");
    let newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    let newImgCard = document.createElement("img");
    newImgCard.setAttribute("src", element.imageUrl);
    newImgCard.setAttribute("class", "card-img-top mb-5");
    let cardBody = document.createElement("div");
    cardBody.setAttribute(
      "class",
      "card-body d-flex flex-column justify-content-between"
    );
    let newTitleCard = document.createElement("h5");
    newTitleCard.setAttribute("class", "card-title h-50");
    newTitleCard.innerText = element.brand;
    let newParagCard = document.createElement("h6");
    newParagCard.setAttribute("class", "card-text py-3 overflow-hidden");
    newParagCard.innerText = element.description;
    let newCardButtonEdit = document.createElement("button");
    newCardButtonEdit.setAttribute("class", "btn btn-warning mb-3");
    newCardButtonEdit.setAttribute("type", "button");
    newCardButtonEdit.setAttribute(
      "onclick",
      `modifyProduct("${element._id}")`
    );
    newCardButtonEdit.innerText = "MODIFICA";
    let newCardButtonDelete = document.createElement("button");
    newCardButtonDelete.setAttribute("class", "btn btn-danger");
    newCardButtonDelete.setAttribute("type", "button");
    newCardButtonDelete.setAttribute(
      "onclick",
      `deleteProduct("${element._id}")`
    );
    newCardButtonDelete.innerText = "ELIMINA";

    cardBody.appendChild(newTitleCard);
    cardBody.appendChild(newParagCard);
    cardBody.appendChild(newCardButtonEdit);
    cardBody.appendChild(newCardButtonDelete);

    newCard.appendChild(newImgCard);
    newCard.appendChild(cardBody);
    newDiv.appendChild(newCard);

    row.appendChild(newDiv);
  });
};

const addProduct = async () => {
  let newProduct = new Product(
    productName.value,
    description.value,
    brand.value,
    imageUrl.value,
    price.value
  );
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  loadProduct();
};

const modifyProduct = async (id) => {
  editProduct(id);

  edit.setAttribute("style", "display: block");

  //   product.name = productName.value;
  //   product.description = productName.description;
  //   product.brand = productName.brand;
  //   product.imageUrl = productName.imageUrl;
  //   product.price = productName.price;

  try {
    await fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  product = "";
  loadProduct();
};

const editProduct = async (id) => {
  await fetch(url + id, {
    headers: {
      Authorization: key,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      window.location.href = "backoffice.html/?=" + id;
      let edit = document.createElement('button');
      edit.setAttribute('type', 'button');
      edit.setAttribute('id', 'edit')
      edit.setAttribute('class', 'btn btn-danger text-light py-2 w-100')
      edit.innerText = 'Modifica';
      myForm.appendChild(edit) ; 
      productName.value = data.name;
      description.value = data.description;
      brand.value = data.brand;
      imageUrl.value = data.imageUrl;
      price.value = data.price;
    })
    .catch((err) => console.log(err));
};

