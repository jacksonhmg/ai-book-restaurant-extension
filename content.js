// Create a function to append a button to the target div
function appendButtonToTarget() {
    const targetDiv = document.querySelector('div[jsname="c6xFrd"]');
    if (targetDiv) {
        console.log('target found!');
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
