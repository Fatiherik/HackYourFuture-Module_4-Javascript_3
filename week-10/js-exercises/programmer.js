const url = "https://xkcd.now.sh/?comic=latest";
const pic = document.querySelector("#pic");
//XMLHTTPREQUEST
function xmlrequest() {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      const responseObj = JSON.parse(xhr.responseText);
      pic.innerHTML = `<img src="${responseObj.img}">`;
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
xmlrequest();

//AXIOS REQUEST
function axiosRequest() {
  axios
    .get(url)
    .then((response) => {
      pic.innerHTML += `<img src="${response.data.img}">`;
      console.log(response.data);
    })
    .catch((error) => console.log(error.message));
}
axiosRequest();
