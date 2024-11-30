var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var siteInfo = document.getElementById('siteInfo');
var siteList = [];

// To check if there is old data in localStorage
if (localStorage.getItem('siteList') !== null) {
    siteList = JSON.parse(localStorage.getItem('siteList'));
    displayWebsite();
}

// Create Website Function
function createWebsite() {
    var websiteName = siteName.value;
    var websiteURL = siteURL.value;

    // Check if both fields are filled
    if (websiteName === "" || websiteURL === "") {
        alert("Both fields are required!");
        return;
    }

    // Check if website name is already in the list
    for (var i = 0; i < siteList.length; i++) {
        if (siteList[i].name.toLowerCase() === websiteName.toLowerCase()) {
            alert("This website name already exists!");
            clearInputs()
            return;
        }
    }

    // Object to store the website data
    var website = {
        name: websiteName,
        url: websiteURL
    };

    // Add the new website to the list
    siteList.push(website);

    // Save to localStorage
    localStorage.setItem('siteList', JSON.stringify(siteList));

    // Display the updated list and clear inputs
    displayWebsite();
    clearInputs();
}

// Display Websites
function displayWebsite() {
    siteInfo.innerHTML = "";  // Clear current list
    for (var i = 0; i < siteList.length; i++) {
        siteInfo.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${siteList[i].name}</td>
                <td><a href="${siteList[i].url}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    }
}

// Clear input fields
function clearInputs() {
    siteName.value = "";
    siteURL.value = "";
    siteName.classList.remove('is-valid');
    siteURL.classList.remove('is-valid');
}

// Delete Website
function deleteWebsite(index) {
    siteList.splice(index, 1);
    // Update localStorage
    localStorage.setItem('siteList', JSON.stringify(siteList));
    // Display the updated list
    displayWebsite();
}

// Validate Name
function validateName() {
    var rgexName = /^.{3,}$/;
    var nameError = document.getElementById("nameError");

    if (rgexName.test(siteName.value)) {
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
        nameError.classList.add('d-none');
    } else {
        siteName.classList.remove('is-valid');
        siteName.classList.add('is-invalid');
        nameError.classList.remove('d-none');
    }
}

// Validate URL
function validateURL() {
    var rgexURL = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    var urlerror = document.getElementById("URLerror");

    if (rgexURL.test(siteURL.value)) {
        siteURL.classList.add('is-valid');
        siteURL.classList.remove('is-invalid');
        urlerror.classList.add('d-none');
    } else {
        siteURL.classList.remove('is-valid');
        siteURL.classList.add('is-invalid');
        urlerror.classList.remove('d-none');
    }
}
