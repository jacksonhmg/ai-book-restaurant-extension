const getKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['api-key'], (result) => {
        if (result['api-key']) {
          const decodedKey = atob(result['api-key']);
          resolve(decodedKey);
        } else {
          reject('API key not found');
        }
      });
    });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendRequest') {
        getKey()
        .then(apiKey => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${apiKey}`
            };
            
            console.log("Headers:", headers);

            const data = {
                phone_number: message.phone_number || "",
                task: message.task || "",
                voice_id: 1,
                reduce_latency: true,
                request_data: {
                    number_of_people: message.number_of_people || "",
                    reservation_time: message.reservation_time || "",
                    reserved_for: message.reserved_for || ""
                },
                wait_for_greeting: true,
            };
  
            return fetch('https://api.bland.ai/call', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`API error: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            sendResponse(data);
        })
        .catch(error => {
            console.error("API call failed:", error);
            sendResponse({ error: error.message });
        });

        return true; // This keeps the message channel open for asynchronous response
    }
});
