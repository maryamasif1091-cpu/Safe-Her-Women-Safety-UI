document.addEventListener('DOMContentLoaded', () => {
    const sosButton = document.getElementById('sosButton');
    const modal = document.getElementById('countdownModal');
    const timerDisplay = document.getElementById('countdownTimer');
    const cancelBtn = document.getElementById('cancelSosBtn');
    const sosStatus = document.getElementById('sosStatus');
    const pulseRing = document.querySelector('.pulse-ring');

    let countdownInterval;
    let secondsLeft = 5;
    let isSosActive = false;

    // SOS Button Click Event
    sosButton.addEventListener('click', () => {
        if (!isSosActive) {
            startSosCountdown();
        }
    });

    // Cancel Button Click Event
    cancelBtn.addEventListener('click', () => {
        cancelSos();
    });

    function startSosCountdown() {
        modal.classList.remove('hidden');
        secondsLeft = 5;
        timerDisplay.textContent = secondsLeft;
        
        countdownInterval = setInterval(() => {
            secondsLeft--;
            timerDisplay.textContent = secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                executeSos();
            }
        }, 1000);
    }

    function cancelSos() {
        clearInterval(countdownInterval);
        modal.classList.add('hidden');
    }

    function executeSos() {
        modal.classList.add('hidden');
        isSosActive = true;
        
        // Change UI to active SOS state
        sosButton.style.background = 'linear-gradient(135deg, #d90429, #8d021f)';
        pulseRing.style.animation = 'pulse 0.5s infinite ease-out';
        sosStatus.innerHTML = '<span style="color: var(--danger)">SOS ALERT ACTIVE - Location Shared</span>';
        sosStatus.style.color = 'var(--danger)';
        
        // In a real app, API calls would happen here
        console.log("SOS TRIGGERED! Contacts notified. Location sharing started.");
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate([500, 200, 500, 200, 500]);
        }
        
        alert("SOS Alert Sent! Your trusted contacts have received your location.");
    }
});

// Quick Actions functions
function triggerSiren() {
    // In a real app, this would play a loud audio file
    alert("SIREN TRIGGERED! Playing loud alarm sound...");
    if (navigator.vibrate) {
        navigator.vibrate([1000, 500, 1000, 500, 1000]);
    }
}

function fakeCall() {
    alert("Initiating fake call... Your phone will ring in 5 seconds.");
    setTimeout(() => {
        alert("Incoming Call: Mom\n[Accept] [Decline]");
    }, 5000);
}

function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                alert(`Location Shared Successfully!\nLat: ${position.coords.latitude}\nLng: ${position.coords.longitude}`);
            },
            (error) => {
                alert("Error getting location. Please enable location services.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
