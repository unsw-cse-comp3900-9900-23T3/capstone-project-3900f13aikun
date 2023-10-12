// function help fetch the data from backend
export const apiCall = async (path, method, body) => {
  const options = {
    method,
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (method === 'GET') {
    // Come back to this
  } else {
    options.body = JSON.stringify(body);
  }
  if (localStorage.getItem('token')) {
    options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`http://127.0.0.1:5000${path}`, options);
  const data = await response.json();
  return data;
};

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

// function to check whether the email is valid
export function checkEmail (email) {
  const emailmatch = '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}';
  if (!email.match(emailmatch)) {
    alert('Please enter a valid email address');
    return false;
  }
  return true;
}

// function to check whether the password is valid
export function checkPassword (password1) {
  const passwordmatch = '(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}';
  if (!password1.match(passwordmatch)) {
    alert(
      'The password must meet the following criteria:\nAt least 8-digit long\nAt Least 1 number\nAt Least 1 letter'
    );
    return false;
  }
  return true;
}

export function verifyPassword (password1, password2) {
  if (password1 !== password2) {
    alert(
      'Ensure that the two passwords are the same'
    );
    return false;
  }
  return true;
}

// function to check whether the name is valid
export function checkName (name) {
  if (name.length < 4) {
    alert('the length of name must be larger than 3');
    return false;
  }
  return true;
}

export function checkWorkRight(workRight) {
  if (workRight.length === 0) {
    alert('Select at least one option');
    return false;
  }
  return true;
}

export function checkSkills(skill) {
  if (skill.trim() === '') {
    alert('You have to fill in your skills');
    return false;
  }
  return true;
}

// function to sort the game list
export function sortGame (gamelist) {
  return gamelist.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else {
      return 1;
    }
  })
}
