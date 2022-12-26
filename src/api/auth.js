export const setAuthToken = (user) => {
  // jwt integration
  const currentUser = {
    email: user.email,
  };
  // get jwt token
  fetch(`${process.env.REACT_APP_ApiUrl}/jwt`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // local storage is the easiest but not the best place to store jwt token
      localStorage.setItem('mechanic-token', data.token);
    });
};

// // 69-5_2
