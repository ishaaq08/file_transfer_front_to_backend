// Access necessary elements from DOM
const form = document.getElementById("form")
const uploadFile = document.getElementById("file")
const textArea = document.getElementById("cv-details")

// Event Listener - Log file name when new file is uploaded
uploadFile.addEventListener("change", (event) => {
    console.log(event.target.value);
})

// Event Listener - actions when form is submitted
form.addEventListener("submit", async function(event) {
    // Prevent default behaviour - HTML page refresh on submit
    event.preventDefault()

    // Access the uploaded file
    // Even if only a single file is uploaded it will always be stored in a list
    const file = uploadFile.files[0]

    // Create new FormData object and append the uploaded file to it
        // Lets you create a set of key/value pairs to be sent in a Fetch or other requests
        // Automatically sets encoding type to multipart/form-data
        // No Content-Type has to be sent in the headers of the request
    const payload = new FormData()
    payload.append("cv", file, "cv.docx")

    // Iterate through FormData object to see values
    for (const value of payload.values()) {
        console.log(value);
    }

    // Fetch API
    url = "http://127.0.0.1:5000/upload-cv"
    params = {
        method: "post",
        body: payload
    }

    // Make Fetch API call
    // If the promise fails the catch block will be trigger
    // If the promise succeeds but the HTTP fails an error 
    try {
        const response = await fetch(url, params);

        // If the response status code is between 200-299 the condition will be ok and True
        if (response.ok) {
            // Logging
            console.log("Promise resolved and HTTP status is successful.");

            // Store the JSON response
            let data = await response.json()

            // Outputs
            const cv_text = data["cv_details"]
            console.log(data["cv_details"]);

            // Update the text area with the CV details
            textArea.value = cv_text 

        } else {
            console.error("Promise resolved but HTTP status failed!")
        }
    } catch {
        console.error("Promise rejected.")
    }
});