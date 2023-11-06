// function help fetch the data from backend
export const apiCall = async (path, method, body) => {
  const options = {
    method,
    headers: {
      "Content-type": "application/json",
    },
  };
  if (method === "GET") {
    // Come back to this
  } else {
    options.body = JSON.stringify(body);
  }
  if (localStorage.getItem("token")) {
    options.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  const response = await fetch(`http://localhost:5000${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    if (response.status == 422) {
      localStorage.clear();
      window.location.href = '/'
    }

    const errorData = { error: data.msg };
    return errorData;
  }

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
export function fileToDataUrl(file) {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
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
export function checkEmail(email) {
  const emailmatch = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}";
  if (!email.match(emailmatch)) {
    alert("Please enter a valid email address");
    return false;
  }
  return true;
}

// function to check whether the password is valid
export function checkPassword(password1) {
  const passwordmatch = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}";
  if (!password1.match(passwordmatch)) {
    alert("The password must meet the following criteria:\nAt least 8-digit long\nAt Least 1 number\nAt Least 1 letter");
    return false;
  }
  return true;
}

export function verifyPassword(password1, password2) {
  if (password1 !== password2) {
    alert("Ensure that the two passwords are the same");
    return false;
  }
  return true;
}

// function to check whether the name is valid
export function checkName(name) {
  if (name.length < 4) {
    alert("the length of name must be larger than 3");
    return false;
  }
  return true;
}

export function checkWorkRight(workRight) {
  if (workRight.length === 0) {
    alert("Select at least one option");
    return false;
  }
  return true;
}

export function checkSkills(skill) {
  if (skill.trim() === "") {
    alert("You have to fill in your skills");
    return false;
  }
  return true;
}

export function checkTitle(title) {
  if (title.trim() === "") {
    alert("The title of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkClassification(classification) {
  if (classification === "") {
    alert("The Project Classification of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkLocation(location) {
  if (location.trim() === "") {
    alert("The location of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkOpportunity(opportunity) {
  if (opportunity === "") {
    alert("The Opportunity Type of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkProblemStatement(problem) {
  if (problem.trim() === "") {
    alert("The Problem Statement of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkRequirement(requirement) {
  if (requirement.trim() === "") {
    alert("The Availability Requiremnet of the project you create cannot be empty");
    return false;
  }
  return true;
}

export function checkPaymentType(paymentType) {
  if (paymentType === "") {
    alert("The Project Classification of the project you create cannot be empty");
    return false;
  }
  return true;
}
