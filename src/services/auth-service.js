/**
 * Sends a login api request
 *
 * @param {Object} credentials The username and password
 * @return {Promise} A promise containing the results of the fetch
 */
export async function login(credentials) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((r) => {
    if (r.status === 200) {
      return;
    }

    return Promise.reject(r);
  });
}

/**
 * Sends a logout api request
 *
 * @return {Promis} A promise containing the result of the fetch
 */
export async function logout() {
  return fetch('/api/auth/logout', {
    method: 'POST',
  }).then((r) => {
    if (r.status === 200) {
      return;
    }

    return Promise.reject(r);
  });
}
