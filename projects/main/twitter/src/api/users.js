import http from "./http";
import { setSession } from "./session";

export async function signIn({ email, password }) {
  try {
    const { data: response } = await http.post("/users/signin", {
      email,
      password,
    });

    const { data, meta } = response;
    const { token = "" } = meta;

    setSession(token);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
export async function signUp({ name, username, email, password }) {
  try {
    const { data: response } = await http.post("/users/signup", {
      name,
      username,
      email,
      password,
    });

    const { data } = response;

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
