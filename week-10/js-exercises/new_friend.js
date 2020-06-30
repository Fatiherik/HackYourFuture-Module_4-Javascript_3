const xmlBtn = document.querySelector("#xml");
const axiosBtn = document.querySelector("#axios");
const friend = document.querySelector(".response");
const url = "https://www.randomuser.me/api";

//XMLHTTPREQUEST
function xmlRequest() {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      const newFriend = JSON.parse(xhr.responseText);
      infoFriend(newFriend);
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
    .then((response) => infoFriend(response.data))
    .catch((error) => console.log(error.message));
}
axiosBtn.addEventListener("click", axiosRequest);

function infoFriend(responseObj) {
  friend.innerHTML = `
       <p>Info : ${responseObj.results[0].name.title} ${responseObj.results[0].name.first} ${responseObj.results[0].name.last}</p>
       <img src="${responseObj.results[0].picture.large}">
       `;
}
