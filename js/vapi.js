document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    function initializeVapi() {
        // Check if Vapi is loaded
        if (typeof window.Vapi !== 'undefined') {
            console.log('Vapi SDK loaded successfully');

            let vapi;

            try {
                // Initialize Vapi with your public API key
                vapi = new Vapi('719370ff-6109-4894-9898-e8b96d7934af');
                console.log('Vapi instance created');
            } catch (error) {
                console.error('Error initializing Vapi:', error);
                return;
            }

            // Function to start the assistant
            function startAssistant() {
                try {
                    // Start the Vapi assistant
                    vapi.start('d0f2ed71-d98c-4027-ab7b-25d13d52eb06');
                    console.log('Vapi assistant started');

                    // Handle various events
                    vapi.on('call-start', () => {
                        console.log('Call has started');
                    });

                    vapi.on('call-end', () => {
                        console.log('Call has ended');
                    });

                    vapi.on('speech-start', () => {
                        console.log('Speech has started');
                    });

                    vapi.on('speech-end', () => {
                        console.log('Speech has ended');
                    });

                } catch (error) {
                    console.error('Error starting Vapi assistant:', error);
                }
            }

            // Add event listener to the button to request microphone access and start the assistant
            document.getElementById('startAssistantButton').addEventListener('click', function() {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(function(stream) {
                        console.log('Microphone access granted');
                        startAssistant();
                    })
                    .catch(function(err) {
                        console.error('Microphone access denied:', err);
                    });
            });

        } else {
            console.error('Vapi SDK not loaded');
        }
    }

    // Wait for the SDK to load
    if (typeof window.Vapi === 'undefined') {
        window.addEventListener('load', initializeVapi);
    } else {
        initializeVapi();
    }
});
