document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');

    // Input configuration
    const inputs = {
        sla: document.getElementById('sla'),
        days: document.getElementById('days'),
        cost: document.getElementById('cost'),
        downHours: document.getElementById('down-hours'),
        downMinutes: document.getElementById('down-minutes')
    };

    // Result displays
    const displays = {
        totalTime: document.getElementById('res-total-time'),
        allowed: document.getElementById('res-allowed'),
        actual: document.getElementById('res-actual'),
        diff: document.getElementById('res-diff'),
        restitution: document.getElementById('res-total'),
        badge: document.getElementById('status-badge')
    };

    calculateBtn.addEventListener('click', calculateSLA);

    // Initial calculation based on valid defaults if desired, or let user click
});

function formatCurrencyInput(input) {
    // Remove non-numeric characters
    let value = input.value.replace(/\D/g, '');
    if (value === '') return;
    
    // Format with thousand separators
    value = parseInt(value, 10).toLocaleString('id-ID');
    input.value = value;
}

function parseCurrency(valueStr) {
    return parseInt(valueStr.replace(/\./g, ''), 10) || 0;
}

function formatDuration(totalHours) {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    // Handle case where minutes round up to 60
    if (minutes === 60) {
        return `${hours + 1} jam 00 menit`;
    }
    
    // Pad minutes with zero if needed
    const minStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours} jam ${minStr} menit`;
}

function calculateSLA() {
    // 1. Get Values
    const sla = parseFloat(document.getElementById('sla').value);
    const days = parseInt(document.getElementById('days').value);
    const cost = parseCurrency(document.getElementById('cost').value);
    const downH = parseInt(document.getElementById('down-hours').value) || 0;
    const downM = parseInt(document.getElementById('down-minutes').value) || 0;

    if (isNaN(sla) || isNaN(days) || isNaN(cost)) {
        alert('Mohon lengkapi semua data dengan benar.');
        return;
    }

    // 2. Calculate Total Month Time (Hours)
    const totalMonthHours = days * 24;

    // 3. Calculate Allowed Downtime (Y)
    // Formula: ((100% - SLA) / 100%) * Total Month Hours
    const allowedDowntimeHours = ((100 - sla) / 100) * totalMonthHours;

    // 4. Calculate Actual Downtime (X)
    const actualDowntimeHours = downH + (downM / 60);

    // 5. Calculate Difference
    const diffHours = actualDowntimeHours - allowedDowntimeHours;
    
    // 6. Calculate Restitution
    // Formula: ((X - Y) / Total Month Hours) * Monthly Cost
    let restitution = 0;
    if (diffHours > 0) {
        restitution = (diffHours / totalMonthHours) * cost;
    }

    // 7. Update UI
    const resultSection = document.getElementById('result-section');
    resultSection.classList.remove('hidden');

    // Display formatted values
    document.getElementById('res-total-time').textContent = `${totalMonthHours} jam`;
    document.getElementById('res-allowed').textContent = formatDuration(allowedDowntimeHours);
    document.getElementById('res-actual').textContent = formatDuration(actualDowntimeHours);

    const diffDisplay = document.getElementById('res-diff');
    const badge = document.getElementById('status-badge');
    const totalDisplay = document.getElementById('res-total');

    if (diffHours > 0) {
        // Violated
        diffDisplay.textContent = `+ ${formatDuration(diffHours)}`;
        diffDisplay.parentElement.classList.add('highlight');
        diffDisplay.style.color = '#dc2626'; // Red text for emphasis
        
        badge.textContent = 'SLA MELANGGAR';
        badge.className = 'badge danger';
        
        totalDisplay.textContent = `Rp ${Math.round(restitution).toLocaleString('id-ID')}`;
    } else {
        // Compliant
        diffDisplay.textContent = '0 (Dalam Batas)';
        diffDisplay.style.color = 'var(--text-main)';
        
        badge.textContent = 'SLA TERPENUHI';
        badge.className = 'badge success';
        
        totalDisplay.textContent = 'Rp 0';
    }
}
