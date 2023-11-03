// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendRequest') {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': ""
      };
  
      const data = {
        phone_number: message.phone_number || "",
        task: message.task || "",
        voice_id: 1,
        reduce_latency: true,
        request_data: {
          number_of_people: message.number_of_people || "",
          reservation_time: message.reservation_time || ""
        },
        wait_for_greeting: true,
      };
  
      fetch('https://api.bland.ai/call', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => response.json()) 
      .then(data => {
          sendResponse(data);
      })
      .catch(error => {
          sendResponse({ error: error.message });
      });
  
      return true; // This keeps the message channel open for asynchronous response
    }
});
