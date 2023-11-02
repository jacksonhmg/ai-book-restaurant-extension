// // background.js
// const getKey = () => {
//     return new Promise((resolve, reject) => {
//       chrome.storage.local.get(['openai-key'], (result) => {
//         if (result['openai-key']) {
//           const decodedKey = atob(result['openai-key']);
//           resolve(decodedKey);
//         }
//       });
//     });
// };

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log('listener for simplifyContent')
//     if (message.type === "simplifyContent") {
//         simplifyContent(message.title, message.description).then(simplified => {
//             chrome.tabs.sendMessage(sender.tab.id, {
//                 action: 'updateContent',
//                 divId: message.divId, // Include the div ID in the message sent back
//                 title: simplified.title,
//                 description: simplified.description
//             });
//         });
//     }
// });

// async function simplifyContent(title, description) {
//     console.log('simplifyContent')
//     let simplifiedTitle = await callGPT(title);
//     let simplifiedDescription = await callGPT(description);

//     return {
//         title: simplifiedTitle,
//         description: simplifiedDescription
//     };
// }

// async function callGPT(content) {
//     console.log('callGPT')
//     const OPENAI_API_KEY = await getKey();
//     console.log('the content is: ' + content)
//     const data = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//             role: "system",
//             content: "You are a helpful assistant. You are helping a student understand a concept. You need to simplify it. Only return a dumbed-down version of the description. Use easy to understand words. If the content is short, keep your description short. If the content is long, you can write a longer description. Make it easier to understand and explain what it is."
//             },
//             {
//             role: "user",
//             content: content
//             }
//         ]
//     };

//     return fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OPENAI_API_KEY}`
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.choices && data.choices.length > 0) {
//             console.log('the returned text is ' + data.choices[0].message.content);
//             return data.choices[0].message.content;
//         } else {
//             throw new Error('No content found in the response');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         return null;
//     });
// }

