export const loadTweets = (callBack) => {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/tweets/";
  const responsetype = "json";

  xhr.responseType = responsetype;
  xhr.open(method, url);
  xhr.onload = function () {
    callBack(xhr.response, xhr.status);
  };
  xhr.onerror = function () {
    callBack({ message: "Not found" }, 400);
  };
  xhr.send();
};
