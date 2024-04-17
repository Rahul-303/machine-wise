export function generateSampleData(startDate, endDate, intervalSeconds) {
    let currentTimestamp = new Date(startDate);
    const data = [];

    while (currentTimestamp <= endDate) {
        // Randomly decide if the timestamp is missing
        if (Math.random() < 0.3) { // Adjust this probability as needed
            currentTimestamp = new Date(currentTimestamp.getTime() + intervalSeconds * 1000);
            continue;
        }

        // Generate timestamp
        const timestamp = currentTimestamp.toISOString();

        // Generate machine status (either 0 or 1)
        const machineStatus = Math.random() < 0.5 ? 1 : 0;

        // Generate vibration value (random value for example purposes)
        const vibration = Math.floor(Math.random() * 1000);

        // Add data point to the array
        data.push({
            ts: timestamp,
            machine_status: machineStatus,
            vibration: vibration
        });

        // Move to the next timestamp
        currentTimestamp = new Date(currentTimestamp.getTime() + intervalSeconds * 1000);
    }

    return data;
}

