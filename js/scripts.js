document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Lista de equipos y sus imágenes correspondientes
const equiposImagenes = {
    "Mercedes": "media/img/Mercedes.avif",
    "Ferrari": "media/img/Ferrari.avif",
    "Red Bull": "media/img/Redbull.avif",
    "Aston Martin": "media/img/Astonmartin.avif",
    "McLaren": "media/img/McLaren.avif",
    "Williams": "media/img/Williams.avif",
    "Alpine F1 Team": "media/img/Alpine.avif",
    "Haas F1 Team": "media/img/Haas.avif",
    "RB F1 Team": "media/img/rb.avif",
    "Sauber": "media/img/sauber.avif"
};

// Función para cargar la imagen del equipo seleccionado
function cargarImagenEquipo() {
    const teamImage = document.getElementById('teamImage');
    const equipoSeleccionado = localStorage.getItem('selectedTeam');
    
    if (equipoSeleccionado && equiposImagenes[equipoSeleccionado]) {
        // Si hay un equipo seleccionado y tiene su imagen, mostrarla
        teamImage.src = equiposImagenes[equipoSeleccionado];
    } else {
        // Si no hay equipo seleccionado, mostrar una imagen predeterminada
        teamImage.src = "media/img/f1.png";
    }
}

// Llamar a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    cargarImagenEquipo();
});