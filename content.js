
function handleEventClick(event) {
    console.log('Calendar event clicked!');
    // Insert content or perform actions here
  }
  
  // Create a MutationObserver instance
  const observer = new MutationObserver((mutations) => {
    console.log('Mutation detected');
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (node.matches && node.matches('div[data-eventchip]')) {
            console.log('Calendar event clicked!');
        }
        });
      }
    });
  });
  
  // Start observing the target with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
  
