const newContactButton = document.querySelector("#new-contact-btn")
const newContactForm = document.querySelector("#new-contact-form");
const updateContactForm = document.querySelector("#update-contact-form");
const contactList = document.querySelector("#contact-list");
const URL = "http://localhost:9090";

let apiData = [];

fetch(URL + "/api/contacts").then((response) => {
    return response.json();
}).then(data=>{
    apiData = data;
    console.log(apiData);
    apiData.forEach(contactData => {
        showContact(contactData);
    });
})

function showContact(contactData) {
    const contactDiv = document.createElement("div");
    contactDiv.setAttribute("class", "contact-container");
    contactDiv.innerHTML = `
                <div class="contact">
                    <span class="name">${contactData.name}</span><br>
                    <span class="mobile">${contactData.mobile}</span>
                </div>
                <div class="action-button-container">
                    <i class="fa-solid fa-trash delete-icon"></i>
                    <i class="fa-solid fa-edit edit-icon"></i>
                </div>
    `;
    contactList.appendChild(contactDiv);

    const editButton = contactDiv.querySelector(".edit-icon");
    editButton.addEventListener("click", function () {
        updateContactForm.classList.add("active");
        // Pre-fill the form
        document.getElementById("edit-name").value = contactData.name;
        document.getElementById("edit-mobile").value = contactData.mobile;

        // Remove any previous event listeners on the edit[edit-save] button
        const editBtn = document.getElementById("edit-btn");
        const newEditBtn = editBtn.cloneNode(true);
        editBtn.parentNode.replaceChild(newEditBtn, editBtn);

        // Add new event listener to the fresh edit button
        newEditBtn.addEventListener("click", function () {
            contactData.name = document.getElementById("edit-name").value;
            contactData.mobile = document.getElementById("edit-mobile").value;
            // api call 
            fetch(URL + "/api/contacts", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            })
                .then(response => {
                    if (response.status !== 202) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    // Update the UI with the new data
                    console.log(data);
                    alert("updated!")
                    contactDiv.querySelector(".name").textContent = contactData.name;
                    contactDiv.querySelector(".mobile").textContent = contactData.mobile;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            updateContactForm.classList.remove("active");
        });

        // cancel button functionality
        const editCancelBtn = document.getElementById("edit-cancel-btn");
        editCancelBtn.addEventListener("click", function () {
            updateContactForm.classList.remove("active");
        });

    });

    const deleteButton = contactDiv.querySelector(".delete-icon");
    deleteButton.addEventListener("click", () => {
        fetch(URL + `/api/contacts/${contactData.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            alert("deleted!");
            // remove from dom
            contactDiv.remove();
        });
    })
}

newContactButton.addEventListener("click", () => {
    if (newContactForm.classList.contains("inactive")) {
        newContactForm.classList.replace("inactive", "active");
    }
});

document.getElementById("add-btn").addEventListener("click", function () {
    const nameInput = newContactForm.querySelector('input[name="name"]');
    const mobileInput = newContactForm.querySelector('input[name="mobile"]');
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();

    const contactData ={name, mobile};
    // api call
    fetch(URL + "/api/contacts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
    })
    .then(response => {
        if (response.status !== 201) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("added!")
        showContact(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // clear the form
    nameInput.value="";
    mobileInput.value="";
    newContactForm.classList.remove("active");
    newContactForm.classList.add("inactive");
});

// Hide the form when "Cancel" button is clicked
document.getElementById("add-cancel-btn").addEventListener("click", function () {
    newContactForm.classList.remove("active");
    newContactForm.classList.add("inactive");
});