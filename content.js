// Create a function to append a button to the target div
function appendButtonToTarget() {
    const targetDiv = document.querySelector('div[jsname="c6xFrd"]');
    if (targetDiv) {
        console.log('target found!');
        const btn = document.createElement("button");
        btn.innerHTML = "My Button";
        btn.style.backgroundColor = "red";
        targetDiv.appendChild(btn);
        return true; // Return true to indicate the target was found
    }
    return false; // Return false if the target wasn't found
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
