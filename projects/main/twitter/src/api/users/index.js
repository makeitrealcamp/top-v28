import http from "../http";
import { setSession } from "../session";
import { decodeUserOutput } from "./decoders";

export async function signIn({ email, password }) {
  try {
    const { data: response } = await http.post("/users/signin", {
      email,
      password,
    });

    const data = await decodeUserOutput(response.data);

    const { token = "" } = response.meta;

    setSession(token);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signUp(payload) {
  try {
    // destructurar el payload
    const { data: response } = await http.post("/users/signup", payload);

    const data = await decodeUserOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}
