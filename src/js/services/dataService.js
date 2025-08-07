const basePath = window.location.pathname.split('/')[1];
const CSV_FILE_PATH = '/${basePath}/assets/data/superheroes.csv';

export async function loadSuperheroesData() {
    try {
        const response = await fetch(CSV_FILE_PATH);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("Error loading superheroes data:", error);
        return [];
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) {
        return [];
    }

    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;

        const values = [];
        let inQuote = false;
        let currentField = '';

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                values.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        values.push(currentField.trim()); // Add the last field

        const row = {};
        headers.forEach((header, index) => {
            let value = values[index];
            // Remove leading/trailing quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1);
            }
            row[header] = value;
        });
        data.push(row);
    }
    return data;
}
 