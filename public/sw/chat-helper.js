// chat-helper.js

self.addEventListener('message', (event) => {
    if (event.data) {
        switch (event.data.type) {
            case 'chat-new-message':
                self.postMessage({ type: event.data.type, message: event.data.message })
                break
        }
    }
});
