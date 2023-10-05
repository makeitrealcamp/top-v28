import http from '../http';

export async function syncAccount(payload, token) {
  try {
    const { data: response } = await http.put(`/users/account`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getBlue({ line_items = [], customer_email }) {
  try {
    const { data: response } = await http.post(`/users/blue`, {
      line_items,
      customer_email,
    });

    return {
      url: response.url,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function validateBlue(session_id) {
  try {
    const { data: response } = await http.get(
      `/users/blue/validate/${session_id}`,
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
