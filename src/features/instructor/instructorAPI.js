export function createInstructor(instructorData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/auth/instructor/signup",
      {
        method: "POST",
        body: JSON.stringify(instructorData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    //TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
export function checkInstructor(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/auth/instructor/login",
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}
export function signOutInstructor(instructorId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}
