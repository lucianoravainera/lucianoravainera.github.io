// URL de la API
const url = "https://api.jolpi.ca/ergast/f1/2025/driverstandings";

// Función para obtener los datos de la API y mostrar en la tabla
async function obtenerDatos() {
    try {
        // Obtener los datos de la API
        const response = await fetch(url);
        const data = await response.json();

        // Extraer los standings de los pilotos
        const driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

        // Obtener el cuerpo de la tabla
        const tableBody = document.querySelector("#driverStandingsTable tbody");

        // Limpiar el contenido de la tabla
        tableBody.innerHTML = '';

        // Iterar sobre los standings y agregar filas a la tabla
        driverStandings.forEach(standing => {
            const row = document.createElement("tr");

            // Crear celdas para cada columna
            const positionCell = document.createElement("td");
            positionCell.textContent = standing.position;
            row.appendChild(positionCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = standing.Driver.givenName;
            row.appendChild(nameCell);

            const surnameCell = document.createElement("td");
            surnameCell.textContent = standing.Driver.familyName;
            row.appendChild(surnameCell);

            const nationalityCell = document.createElement("td");
            nationalityCell.textContent = standing.Driver.nationality;
            row.appendChild(nationalityCell);

            const pointsCell = document.createElement("td");
            pointsCell.textContent = standing.points;
            row.appendChild(pointsCell);

            // Agregar la fila a la tabla
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Llamar a la función para obtener los datos cuando la página cargue
document.addEventListener("DOMContentLoaded", obtenerDatos);