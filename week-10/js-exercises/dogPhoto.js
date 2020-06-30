const xmlBtn = document.querySelector("#xml");
const axiosBtn = document.querySelector("#axios");
const dogs = document.querySelector("#dogs");
const url = "https://dog.ceo/api/breeds/image/random";

//XMLHTTPREQUEST
function xmlRequest() {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      const newDog = JSON.parse(xhr.responseText);
      photoDog(newDog);
    } else {
      console.log("Http error: ", xhr.status);
    }
  };
  xhr.onerror = function (error) {
    console.log("Request failed: ", error);
  };
  xhr.open("GET", url);
  xhr.send();
}
xmlBtn.addEventListener("click", xmlRequest);

//AXIOS REQUEST
function axiosRequest() {
  axios
    .get(url)
    .then((response) => {
      photoDog(response.data);
    })
    .catch((error) => console.log(error.message));
}
axiosBtn.addEventListener("click", axiosRequest);

function photoDog(responseObj) {
  dogs.innerHTML += `<li>
    <img src="${responseObj.message}">
    </li>
    `;
}
