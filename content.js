// content.js

function getAriaLabel(selector) {
    let element = document.querySelector(selector);
    return element ? element.getAttribute('aria-label') : "Not found";
}

// Create a function to append a button to the target div
function appendButtonToTarget() {
    const targetDiv = document.querySelector('div[jsname="c6xFrd"]');
    const prevButton = document.querySelector('.save-and-book-button');
    if (targetDiv && !prevButton) {
        //console.log('target found!');

        // const existingButton = targetDiv.querySelector('.save-and-book-button');
        // if (existingButton) {
        //     //console.log('Button already exists. No need to add another one.');
        //     return false;
        // }

        const btn = document.createElement("button");
        
        // Set the button's innerHTML and styles
        btn.innerHTML = "Save & Book";
        btn.style.backgroundColor = "#d93025"; // Red color similar to Google's branding
        btn.style.color = "#ffffff"; // White text color
        btn.style.border = "none"; 
        btn.style.borderRadius = "4px"; // Rounded corners
        btn.style.padding = "8px 16px"; // Padding to make it similar in size to the "Save" button
        btn.style.marginLeft = "8px"; // Space between "Save" and the new button
        btn.style.cursor = "pointer"; // Hand cursor on hover
        btn.style.fontFamily = "'Roboto', sans-serif"; // Font similar to Google's branding
        btn.style.fontSize = "14px"; // Font size similar to the "Save" button
        btn.classList.add("save-and-book-button"); // Add a class to the button so we can identify it later


        btn.addEventListener("click", async function(event) {
            // Your logic here
            // For instance, grab details from the form
            // let events = document.querySelectorAll(".ayClmf .FAxxKc");
            // let latestEventText;

            // if (events && events.length) {
            //     latestEventText = events[events.length - 1].textContent.trim();
            //     console.log("Latest event text:", latestEventText);
            // } else {
            //     console.log("No events found");
            // }

                        
            let dataElement = document.querySelector('span[data-key="startDate"]');
            let dateText = dataElement ? dataElement.textContent : "Not found";

            let startTimeText = getAriaLabel('.i04qJ > .ky6s2b:nth-child(1)');
            let endTimeText = getAriaLabel('.i04qJ > .ky6s2b:nth-child(3)');

            // let parentDiv = document.querySelector('div[jsname="yrriRe"]');
            // let nestedDivText;

            // if (parentDiv) {
            //     let nestedDiv = parentDiv.querySelector('div');
            //     if (nestedDiv) {
            //         nestedDivText = nestedDiv.textContent.trim();
            //         //console.log("Text inside the nested div:", nestedDivText);
            //     } else {
            //         //console.log("Nested div not found");
            //     }
            // } else {
            //     //console.log("Parent div not found");
            // }

            function countChildrenOfElement(selector) {
                const element = document.querySelector(selector);
                return element ? element.children.length : 0;
            }
            
            // Using the function
            const numberOfChildren = countChildrenOfElement('div[class="Rzij1d"]');
            //console.log(`The element has ${numberOfChildren} children.`);
            


            //console.log(dateText, startTimeText, endTimeText);

            const concatenatedString = `${dateText} ${startTimeText}`;
            //console.log("Concatenated string:", concatenatedString);



            // console.log("date value is " + dateText);
            // console.log("start time value is " + startTimeText);
            // console.log("end time value is " + endTimeText);


            // toUqff DbpAnb mARxl AL18ce Xxy0Rd HRaT6d
            let topLevelDiv = document.querySelector('.toUqff.DbpAnb.mARxl.AL18ce.Xxy0Rd.HRaT6d');

            let lowestSpan = topLevelDiv.querySelector('span.QReV7');

            let textContent = lowestSpan.textContent.trim();
            let firstName = textContent.split(' ')[0];

            console.log(firstName);



            let location = document.querySelector('input[placeholder="Add location"]').value;


            const corsProxy = "https://cors-anywhere.herokuapp.com/";


            // Replace 'YOUR_API_KEY' with your actual API key
            const api_key = '';

            // Step 1: Find Place from Text Request
            const find_place_url = corsProxy + "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
            const find_place_params = new URLSearchParams({
            input: location,
            inputtype: 'textquery',
            fields: 'place_id',
            key: api_key
            });

            const details_url = corsProxy + "https://maps.googleapis.com/maps/api/place/details/json";
            


            



            try {
                let place_details = await fetch(`${find_place_url}?${find_place_params}`, {
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest'
                    }
                  }).then(response => response.json());
              
                  let phoneNumber = ""; // Moved this line outside of the fetch block
                  if (place_details.status === "OK" && place_details.candidates.length > 0) {
                    const place_id = place_details.candidates[0].place_id;
                    const details_params = new URLSearchParams({
                        fields: 'formatted_phone_number',
                        place_id: place_id,
                        key: api_key
                    });
              
                    // Await the second fetch call as well
                    let details = await fetch(`${details_url}?${details_params}`, {
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                      }
                    }).then(response => response.json());
              
                    if (details.status === "OK") {
                      console.log("Place Details Response JSON:");
                      console.log(details);
                      phoneNumber = details.result.formatted_phone_number;
                      console.log(`Phone number: ${phoneNumber}`);
                    } else {
                      console.error(`Error getting place details: ${details.error_message}`);
                    }
                  } else {
                    console.error("No place_id found in the response.");
                  }
              
                  // Check if phoneNumber is set before making the request
                  if (!phoneNumber) {
                    phoneNumber = "No phone number found";
                  }
              
                  console.log(phoneNumber);
                  console.log(`Making a phone call for ${firstName} to ${phoneNumber} for ${numberOfChildren} people at ${concatenatedString}`);
              



                  function makeRequest(phone_number, number_of_people, reservation_time, firstName) {
                    chrome.runtime.sendMessage({
                        action: 'sendRequest',
                        phone_number: phone_number,
                        task: "Book a reservation at the restaurant for the user. You will be connected to the restaurant.",
                        number_of_people: number_of_people,
                        reservation_time: reservation_time,
                        reserved_for: firstName
                    }, response => {
                        if (response.error) {
                        console.error(response.error);
                        } else {
                        if (response.status === "success") {
                            console.log("API call was successful. Call ID:", response.call_id);
                        } else {
                            console.log("API call was not successful. Status:", response.status);
                        }
                        }
                    });
                    
                }  
                
                // Example usage:
                await makeRequest(phoneNumber, numberOfChildren, concatenatedString, firstName);
              
            } catch (error) {
                console.error('Error in the event listener:', error);
            }







    
            // If you want to programmatically trigger the blue Save button click afterwards:
            const saveButton = document.querySelector(".VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.LQeN7.pEVtpe"); // adjust the selector accordingly
            if (saveButton) {
                saveButton.click();
            }
        });

        
        // Append the button to the target div
        targetDiv.appendChild(btn);
        return true;
    }
    return false;
}


// Create a MutationObserver instance
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
            mutation.addedNodes.forEach((node) => {
                if (node.matches && node.matches('div[data-eventchip]')) {
                    console.log('Calendar event clicked!');
                    
                    // Check immediately if the target div exists
                    if (!appendButtonToTarget()) {
                        // If the target div isn't found immediately, set up an interval
                        let checkInterval = setInterval(() => {
                            if (appendButtonToTarget()) {
                                clearInterval(checkInterval); // Clear the interval once the target div is found
                            }
                        }, 100); // Check every 100ms
                    }
                }
            });
        }
    });
});
  
// Start observing the target with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });


