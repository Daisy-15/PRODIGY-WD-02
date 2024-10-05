let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display'); // Assume there's an element to display time
const lapTable = document.getElementById('laps');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const settingsBtn = document.getElementById('settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const timeColorPicker = document.getElementById('time-color');
const timeFormatSelect = document.getElementById('time-format');
const digitalFontToggle = document.getElementById('digital-font-toggle');

stopBtn.style.display = 'none';
lapBtn.style.display = 'none';

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
darkModeToggle.addEventListener('click', toggleDarkMode);
settingsBtn.addEventListener('click', showSettings);
closeSettings.addEventListener('click', hideSettings);
timeColorPicker.addEventListener('change', changeTimeColor);
timeFormatSelect.addEventListener('change', changeTimeFormat);
digitalFontToggle.addEventListener('change', toggleDigitalFont);

function startTimer() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        tInterval = setInterval(updateTime, 10); // Update every 10ms
        running = true;
        toggleButtons();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0; // Reset difference
    updateTime(); // Reset displayed time
    lapTable.innerHTML = '';
    running = false;
    lapCounter = 0;
    toggleButtons();
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
    difference = Date.now() - startTime;
    toggleButtons();
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    const hours = String(Math.floor((elapsedTime / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0');
    const milliseconds = String(elapsedTime % 1000).padStart(3, '0'); // Format milliseconds

    // Get selected format
    const selectedFormat = timeFormatSelect.value;
    let formattedTime;

    switch (selectedFormat) {
        case 'hh:mm:ss.ms':
            formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            break;
        case 'hh:mm:ss':
            formattedTime = `${hours}:${minutes}:${seconds}`;
            break;
        case 'mm:ss':
            formattedTime = `${minutes}:${seconds}`;
            break;
    }

    // Display the formatted time
    timeDisplay.textContent = formattedTime; // Ensure you have an element to display this
}

function addLap() {
    lapCounter++;
    const lapTime = timeDisplay.textContent;

    // Create new table row
    const row = document.createElement('tr');

    // Create and style lap number cell
    const lapNumberCell = document.createElement('td');
    lapNumberCell.textContent = lapCounter;
    lapNumberCell.classList.add('border', 'border-black', 'px-4', 'py-2');

    // Create and style lap time cell
    const lapTimeCell = document.createElement('td');
    lapTimeCell.textContent = lapTime;
    lapTimeCell.classList.add('border', 'border-black', 'px-4', 'py-2');

    // Append cells to row
    row.appendChild(lapNumberCell);
    row.appendChild(lapTimeCell);

    // Prepend the row to the table, so new lap appears at the top
    lapTable.prepend(row);

    // Scroll to top after adding a new lap (optional)
    scrollToTop();
}

function scrollToTop() {
    const lapContainer = document.querySelector('#lap-table-container');
    lapContainer.scrollTop = 0;  // Scroll to the top of the container
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');  // Use document.documentElement to target <html> tag
    console.log('Dark mode toggled. Current mode:', document.documentElement.classList.contains('dark') ? 'Dark' : 'Light');
    updateDarkModeButtonText();
}

function updateDarkModeButtonText() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');  // Make sure to get the button element
    if (document.documentElement.classList.contains('dark')) {  // Check dark mode on the <html> tag
        darkModeToggle.textContent = 'Light Mode';
    } else {
        darkModeToggle.textContent = 'Dark Mode';
    }
}

function showSettings() {
    settingsModal.classList.remove('hidden');
}

function hideSettings() {
    settingsModal.classList.add('hidden');
}

function changeTimeColor() {
    const color = timeColorPicker.value;
    timeDisplay.style.color = color; // Change color of the time display
}

function changeTimeFormat() {
    // Update time display to reflect the new format immediately
    updateTime();
}

function toggleDigitalFont() {
    const isDigital = digitalFontToggle.checked;
    const fontClass = 'font-mono'; // Tailwind class for digital font
    
    if (isDigital) {
        timeDisplay.classList.add(fontClass);
    } else {
        timeDisplay.classList.remove(fontClass);
    }
}

function toggleButtons() {
    if (running) {
        startBtn.style.display = 'none';
        resetBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
        lapBtn.style.display = 'inline-block';
    } else {
        stopBtn.style.display = 'none';
        lapBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';
    }
}
