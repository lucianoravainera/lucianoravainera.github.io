// Obtener referencias a los elementos del formulario y la tabla
const teamSelect = document.getElementById('teamSelect');
const cardsContainer = document.getElementById('cardsContainer');
const baseURL = "https://api.jolpi.ca/ergast/f1";

// Cargar los datos adicionales (como los pilotos, motor, etc.) desde el archivo JSON
async function obtenerDatosEquipo() {
    try {
        const response = await fetch('js/equipos.json');  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos adicionales:", error);
    }
}

// Función para obtener los standings de un equipo y año específicos
async function obtenerDatos(team) {
    const url = `${baseURL}/2024/constructorstandings`;

    try {
        // Obtener los datos de la API
        const response = await fetch(url);
        const data = await response.json();

        // Extraer los standings de los constructores
        const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

        // Filtrar por equipo seleccionado
        const filteredStandings = constructorStandings.filter(standing =>
            standing.Constructor.name.toLowerCase() === team.toLowerCase()
        );

        // Limpiar el contenido de las cards
        cardsContainer.innerHTML = '';

        // Obtener los datos adicionales desde el JSON
        const equipoData = await obtenerDatosEquipo();
        const equipo = equipoData[team];

        // Mostrar las tarjetas con los datos filtrados y adicionales
        mostrarCards(filteredStandings, equipo);

        // Guardar los datos en localStorage
        localStorage.setItem("constructorStandings", JSON.stringify(filteredStandings));

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Función para mostrar los datos en formato card
function mostrarCards(standings, equipo) {
    standings.forEach(standing => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Imagen del equipo
        const teamImage = document.createElement('img');
        teamImage.src = `media/img/${standing.Constructor.name}.avif`; 
        teamImage.alt = standing.Constructor.name;
        card.appendChild(teamImage);

        // Nombre del constructor
        const constructorName = document.createElement('h3');
        constructorName.textContent = standing.Constructor.name;
        card.appendChild(constructorName);

        // Nacionalidad
        const nationality = document.createElement('p');
        nationality.textContent = `Nacionalidad: ${standing.Constructor.nationality}`;
        card.appendChild(nationality);

        // Datos adicionales del equipo
        const motor = document.createElement('p');
        motor.textContent = `Motor: ${equipo.motor}`;
        card.appendChild(motor);

        const chasis = document.createElement('p');
        chasis.textContent = `Chasis: ${equipo.chasis}`;
        card.appendChild(chasis);

        const anioIngreso = document.createElement('p');
        anioIngreso.textContent = `Año de Ingreso: ${equipo.anioIngreso}`;
        card.appendChild(anioIngreso);

        const vueltasRapidas = document.createElement('p');
        vueltasRapidas.textContent = `Vueltas Rápidas: ${equipo.vueltasRapidas}`;
        card.appendChild(vueltasRapidas);

        const mundiales = document.createElement('p');
        mundiales.textContent = `Mundiales Ganados: ${equipo.mundialesGanados}`;
        card.appendChild(mundiales);

        // Pilotos
        const pilotosList = document.createElement('ul');
        equipo.pilotos.forEach(piloto => {
            const pilotoItem = document.createElement('li');
            pilotoItem.textContent = `${piloto.nombre} ${piloto.apellido} (${piloto.nacionalidad}) - Edad: ${piloto.edad} - Puntos: ${piloto.puntos}`;
            pilotosList.appendChild(pilotoItem);
        });
        card.appendChild(pilotosList);

        // Agregar la card al contenedor
        cardsContainer.appendChild(card);
    });
}

// Guardar la selección del equipo en localStorage
function guardarEquipoSeleccionado() {
    const selectedTeam = teamSelect.value;
    localStorage.setItem("selectedTeam", selectedTeam);
}

// Cargar la selección del equipo desde localStorage
function cargarEquipoSeleccionado() {
    const savedTeam = localStorage.getItem("selectedTeam");
    if (savedTeam) {
        teamSelect.value = savedTeam;
        obtenerDatos(savedTeam); // Cargar datos para el equipo guardado
    }
}

// Evento para cuando el formulario se envía (se elige un equipo)
document.getElementById('filtersForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar recarga de la página
    const selectedTeam = teamSelect.value;

    // Guardar la selección en localStorage
    guardarEquipoSeleccionado();

    // Obtener y mostrar los datos filtrados
    obtenerDatos(selectedTeam);
});

// Cargar el equipo seleccionado previamente desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarEquipoSeleccionado();

    // Si ya hay datos en localStorage, mostrarlos
    const savedStandings = JSON.parse(localStorage.getItem("constructorStandings"));
    if (savedStandings) {
        mostrarCards(savedStandings, JSON.parse(localStorage.getItem("equipoData")));
    }
});
