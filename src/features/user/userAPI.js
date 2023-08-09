export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    //todo:  We will not hard-code server URL here
    const response = await fetch("http://localhost:8080/orders?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: update,
      // headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
