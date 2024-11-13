const festivals = {
    "2024-11-12": { name: "Diwali (India)", color: "green" },  // Indian festival
    "2024-11-15": { name: "Shichi-Go-San (Japan)", color: "yellow" },  // Japanese festival
    "2024-11-20": { name: "Karthigai Deepam (India)", color: "orange" },
    "2024-11-25": { name: "Christmas (Japan)", color: "pink" },
    "2024-12-11": { name: "Mokshada Ekadashi (India)", color: "red" },
    "2024-12-15": { name: "Margashirsha Purnima (India)", color: "yellow" },
    "2024-12-26": { name: "Shapala Ekadashi (India)", color: "pink" },
    "2024-12-26": { name: "Nagasaki Lantern Festival☘︎ (Japan)", color: "yellow" },
    "2024-12-13~2024-11-14": { name: "Dai Nagoya Winter Illumination✧ (Japan)", color: "blue" },
    "2024-11-17": { name: "Tokushima Yokai Festival✯ (Japan)", color: "black" },

};

let currentMonth = new Date().getMonth();  // Current month (0-11)
let currentYear = new Date().getFullYear();  // Current year
const monthNames = [
    "January ♥︎", " February ⭐︎", "March ☘︎", "April ☸︎", "May ⚉", "June ☼",
    "July ✌︎", "August ⚙︎", "September ❇︎", "October ✾", "November ❆", "December 💮"
];

function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    const monthName = document.getElementById('monthName');
    monthName.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = "";

    // Render days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(currentYear, currentMonth, i);
        const dayString = day.toISOString().split('T')[0];  // e.g., "2024-11-12"
        
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        
        // Check if it's a festival
        if (festivals[dayString]) {
            const festivalDot = document.createElement('span');
            festivalDot.classList.add('festival-dot', festivals[dayString].color);
            dayDiv.appendChild(festivalDot);
        }

        // Mark date with green dot
        dayDiv.addEventListener('click', function() {
            if (!dayDiv.classList.contains('marked')) {
                dot = document.createElement('span');
                dot.classList.add('festival-dot', 'green');
                dayDiv.appendChild(dot);
                dayDiv.classList.add('marked');
            } else {
                dayDiv.querySelector('.green').classList.add('hidden');
                dayDiv.classList.remove('marked');
                dayDiv.removeChild(dot);
            }

            // Show festival details if there's a festival
            if (festivals[dayString]) {
                const festivalInfo = document.getElementById('festivalInfo');
                const festivalName = document.getElementById('festivalName');
                festivalInfo.classList.remove('hidden');
                festivalName.textContent = festivals[dayString].name;
            } else {
                const festivalInfo = document.getElementById('festivalInfo');
                festivalInfo.classList.add('hidden');
            }
        });

        calendarBody.appendChild(dayDiv);
    }
}

// Handle month change
document.getElementById('prevMonth').addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    animateMonthTransition();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    animateMonthTransition();
});

// Animate month change
function animateMonthTransition() {
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.style.opacity = 0;
    setTimeout(function() {
        renderCalendar();
        calendarBody.style.transition = "opacity 1s";
        calendarBody.style.opacity = 1;
    }, 1000);
}

// Initial render
renderCalendar();
