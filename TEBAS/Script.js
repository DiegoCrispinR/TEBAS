// Inicializar el mapa
const map = L.map('map').setView([14.6349, -90.5069], 13); // Coordenadas iniciales (ejemplo: Ciudad de Guatemala)

// Agregar capa de mapa base (usando OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Obtener elementos del DOM
const locationStatus = document.getElementById('location-status');
const searchBox = document.getElementById('search-box');
const resultsDiv = document.getElementById('results');

// Verificar si el navegador soporta geolocalización
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            locationStatus.textContent = `Ubicación detectada: Latitud ${latitude}, Longitud ${longitude}`;

            // Centrar el mapa en la ubicación del usuario
            map.setView([latitude, longitude], 15);

            // Agregar un marcador en la ubicación del usuario
            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup("¡Estás aquí!")
                .openPopup();

            // Llamar al Web Service para obtener puntos de interés cercanos
            fetchPointsOfInterest(latitude, longitude);
        },
        (error) => {
            locationStatus.textContent = "Error al obtener la ubicación.";
        }
    );
} else {
    locationStatus.textContent = "Geolocalización no soportada por el navegador.";
}

// Función para buscar puntos de interés
searchBox.addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length >= 3) {
        fetch(`/api/points-of-interest?query=${query}`)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error('Error:', error));
    }
});

// Función para mostrar resultados
function displayResults(data) {
    resultsDiv.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.name;
        div.style.cursor = 'pointer';
        div.style.padding = '5px';
        div.style.borderBottom = '1px solid #ddd';
        div.addEventListener('click', () => {
            map.setView([item.latitude, item.longitude], 15); // Centrar el mapa en el punto seleccionado
            L.marker([item.latitude, item.longitude]).addTo(map); // Agregar un marcador
        });
        resultsDiv.appendChild(div);
    });
}

// Función para obtener puntos de interés cercanos
function fetchPointsOfInterest(latitude, longitude) {
    fetch(`/api/points-of-interest?lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
            data.forEach(item => {
                L.marker([item.latitude, item.longitude])
                    .addTo(map)
                    .bindPopup(item.name); // Mostrar el nombre del punto en un popup
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para obtener lugares turísticos
function fetchLugaresTuristicos() {
    fetch(`http://localhost:5143/api/LugaresTuristicos`) // Cambia la URL si es necesario
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // Crear un marcador para cada lugar turístico
                const marker = L.marker([item.latitud, item.longitud]).addTo(map);

                // Crear un popup con la información del lugar turístico
                const popupContent = `
                    <div style="text-align: center;">
                        <h3>${item.nombre}</h3>
                        <p>${item.descripcion}</p>
                        <img src="${item.imagenUrl}" alt="${item.nombre}" style="width: 150px; height: auto; border-radius: 8px;">
                    </div>
                `;
                marker.bindPopup(popupContent);

                // Abrir el popup automáticamente (opcional)
                marker.openPopup();
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función para cargar lugares turísticos
fetchLugaresTuristicos();