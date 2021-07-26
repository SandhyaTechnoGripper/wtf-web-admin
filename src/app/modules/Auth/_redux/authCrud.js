import axios from "axios";

export const LOGIN_URL = "http://13.232.102.139:9000/user/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "http://13.232.102.139:9000/user";

export function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  };
  const val = fetch(LOGIN_URL, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      let t = myJson.data;
      localStorage.setItem("token", myJson.data.token);
      return t;
      // console.log("2")
      // console.log(myJson.status)
      // if (myJson.status== true){
      //   console.log("true")
      //   window.location = "/users"
      // }
    })
    .catch((error) => {
      localStorage.removeItem("token");
    });

  return val;
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get("http://13.232.102.139:9000/user");
}
