// URL de la API para constructor standings
const url = "https://api.jolpi.ca/ergast/f1/2024/constructorstandings";

// Función para obtener los datos de la API y mostrar en la tabla
async function obtenerDatos() {
    try {
        // Obtener los datos de la API
        const response = await fetch(url);
        const data = await response.json();

        // Extraer los standings de los constructores
        const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        // Obtener el cuerpo de la tabla
        const tableBody = document.querySelector("#constructorStandingsTable tbody");

        // Limpiar el contenido de la tabla
        tableBody.innerHTML = '';

        // Iterar sobre los standings y agregar filas a la tabla
        constructorStandings.forEach(standing => {
            const row = document.createElement("tr");

            // Crear celdas para cada columna
            const positionCell = document.createElement("td");
            positionCell.textContent = standing.position;
            row.appendChild(positionCell);

            const constructorCell = document.createElement("td");
            constructorCell.textContent = standing.Constructor.name;
            row.appendChild(constructorCell);

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