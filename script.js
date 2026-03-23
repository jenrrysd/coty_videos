// Configuración de videos (puedes modificar estos datos)
const videos = [
    {
        id: 1,
        title: "Día 1",
        description: "Tu vida es mas inportante que tu condición",
        src: "videos/DÍA 1 - Tu vida es más importante que tu condición.mp4",
        thumbnail: "🎥",
        size: "15 MB"
    },
    {
        id: 2,
        title: "Dí 2",
        description: "Como trabaja la fuerza de tu cadera",
        src: "videos/DÍA 2 - Cómo trabajar la fuerza de tu cadera y tener mas confianza.mp4",
        thumbnail: "🌆",
        size: "22 MB"
    },
    {
        id: 3,
        title: "Día 3",
        description: "La mejor manera de mejorar la movilidad de cadera",
        src: "videos/DÍA 3 - La mejor manera de mejorar la movilidad de cadera y sentirte libre.mp4",
        thumbnail: "🏖️",
        size: "18 MB"
    },
    {
        id: 4,
        title: "Día 4",
        description: "La estabilidad, el secreto para evitar caídas",
        src: "videos/DÍA 4 - La estabilidad, el secreto para evitar caidas.mp4",
        thumbnail: "⛰️",
        size: "25 MB"
    },
    {
        id: 5,
        title: "Día 5",
        description: "Aprende a medir tu dolor y reducir tu carga mental",
        src: "videos/DÍA 5 - Aprende a medir el dolor y reducir tu carga mental para ejecitarte con seguridad.mp4",
        thumbnail: "⛰️",
        size: "25 MB"
    },
    {
        id: 6,
        title: "Día 6",
        description: "Como ser constante con los ejercicios",
        src: "videos/DÍA 6 - Cómo ser constante con los ejercicios.mp4",
        thumbnail: "⛰️",
        size: "25 MB"
    },
    {
        id: 7,
        title: "Caderas de acero",
        description: "Caderas fuerte para soportar el trajin del día",
        src: "videos/Caderas de acero.mp4",
        thumbnail: "⛰️",
        size: "25 MB"
    }
    {
        id: 8,
        title: "Taller de uso de Microsoft Teams",
        description: "Video instructivo sobre el uso de Microsoft Teams",
        src: "videos/Taller Uso de la plataforma Microsoft Teams.mp4",
        thumbnail: "⛰️",
        size: "25 MB"
    }
];

// Elementos del DOM
const videoPlayer = document.getElementById('mainVideo');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const videoGrid = document.getElementById('videoGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const videoContainer = document.querySelector('.video-container');
const controlsWrapper = document.querySelector('.video-controls-wrapper');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');
let currentVideoIndex = -1;

// Variable para tracking del estado de pantalla completa
let isFullscreen = false;
let controlsTimeout;

// Función para entrar/salir de pantalla completa
function toggleFullscreen() {
    if (!videoContainer) return;

    if (!isFullscreen) {
        // Entrar en pantalla completa
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Safari */
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /* IE11 */
            videoContainer.msRequestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) { /* Firefox */
            videoContainer.mozRequestFullScreen();
        }
    } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        }
    }
}

// Función para actualizar el icono del botón
function updateFullscreenIcon() {
    if (!fullscreenBtn) return;

    const icon = fullscreenBtn.querySelector('i');
    if (icon) {
        if (isFullscreen) {
            icon.className = 'fas fa-compress';
            fullscreenBtn.title = 'Salir de Pantalla Completa';
            fullscreenBtn.classList.add('exit-fullscreen');
        } else {
            icon.className = 'fas fa-expand';
            fullscreenBtn.title = 'Pantalla Completa';
            fullscreenBtn.classList.remove('exit-fullscreen');
        }
    }
}

// Función para cargar los videos en la cuadrícula
function loadVideoGrid() {
    videoGrid.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.dataset.videoId = video.id;

        videoCard.innerHTML = `
            <div class="video-info">
                <h3>${video.title}</h3>
                <p class="video-desc">${video.description}</p>
            </div>
        `;

        videoCard.addEventListener('click', () => selectVideo(video));
        videoGrid.appendChild(videoCard);
    });
}


// Función para seleccionar un video
function selectVideo(video) {
    // Encontrar el índice del video seleccionado
    currentVideoIndex = videos.findIndex(v => v.id === video.id);

    // Remover selección anterior
    document.querySelectorAll('.video-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Agregar selección al video actual
    const selectedCard = document.querySelector(`[data-video-id="${video.id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    // Cargar el video
    videoPlayer.src = video.src;
    videoPlayer.load();
    currentVideo = video;

    // Actualizar estado de los botones de navegación
    updateNavButtons();

    // Auto-scroll al reproductor y reproducir
    const playerSection = document.querySelector('.video-player-section');
    if (playerSection) {
        playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Pequeño retraso para asegurar que la carga esté lista
    setTimeout(() => {
        playVideo();
    }, 300);

    console.log(`Video seleccionado: ${video.title} (índice: ${currentVideoIndex})`);
}
// Función para actualizar botones de navegación
function updateNavButtons() {
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentVideoIndex <= 0;
        nextBtn.disabled = currentVideoIndex >= videos.length - 1 || currentVideoIndex === -1;
    }
}

// Función para video anterior
function previousVideo() {
    if (currentVideoIndex > 0) {
        selectVideo(videos[currentVideoIndex - 1]);
        playVideo(); // Opcional: reproducir automáticamente
    }
}

// Función para video siguiente
function nextVideo() {
    if (currentVideoIndex < videos.length - 1 && currentVideoIndex !== -1) {
        selectVideo(videos[currentVideoIndex + 1]);
        playVideo(); // Opcional: reproducir automáticamente
    } else if (currentVideoIndex === -1 && videos.length > 0) {
        selectVideo(videos[0]);
        playVideo();
    }
}


// Función para reproducir
function playVideo() {
    if (videoPlayer.src) {
        videoPlayer.play()
            .then(() => {
                console.log('Video reproduciéndose');
            })
            .catch(error => {
                console.error('Error al reproducir:', error);
                alert('No se puede reproducir el video. Asegúrate de que el archivo existe.');
            });
    } else {
        alert('Por favor, selecciona un video primero');
    }
}

// Event listener para cambios en pantalla completa
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    isFullscreen = !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.msFullscreenElement;

    updateFullscreenIcon();

    // Ajustar el video si es necesario
    if (isFullscreen) {
        videoPlayer.style.objectFit = 'contain';
    } else {
        videoPlayer.style.objectFit = 'contain';
    }

    console.log('Pantalla completa:', isFullscreen ? 'activada' : 'desactivada');
}

// Event listener para el botón de pantalla completa
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
}

// Para móviles: detectar orientación y ajustar
window.addEventListener('orientationchange', () => {
    if (isFullscreen) {
        setTimeout(() => {
            // Pequeño ajuste para cambios de orientación
            console.log('Orientación cambiada en modo pantalla completa');
        }, 100);
    }
});

// Prevenir que el video se detenga al cambiar a pantalla completa en móviles
videoPlayer.addEventListener('webkitbeginfullscreen', () => {
    console.log('Entrando a pantalla completa en iOS');
});

videoPlayer.addEventListener('webkitendfullscreen', () => {
    console.log('Saliendo de pantalla completa en iOS');
});

// Función para manejar el doble click en el video (alternativa para entrar/salir)
videoContainer.addEventListener('dblclick', (e) => {
    e.preventDefault();
    toggleFullscreen();
});

// Para móviles: gesto de doble toque
let lastTap = 0;
videoContainer.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        // Doble tap detectado
        e.preventDefault();
        toggleFullscreen();
    }

    lastTap = currentTime;
});



// Función para pausar
function pauseVideo() {
    if (videoPlayer.src) {
        videoPlayer.pause();
        console.log('Video pausado');
    }
}

// Función para detener
function stopVideo() {
    if (videoPlayer.src) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        console.log('Video detenido');
    }
}

// Función para formatear el tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const { duration, currentTime } = videoPlayer;
    if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressHandle.style.left = `${progressPercent}%`;

        currentTimeEl.textContent = formatTime(currentTime);
        durationTimeEl.textContent = formatTime(duration);
    }
}

// Función para cambiar el tiempo del video al hacer click en la barra
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = videoPlayer.duration;

    if (duration > 0) {
        videoPlayer.currentTime = (clickX / width) * duration;
    }
}

// Funciones para mostrar/ocultar controles
function showControls() {
    controlsWrapper.classList.remove('hide-controls');
    videoContainer.style.cursor = 'default';

    // Reiniciar el temporizador
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideControls, 4000);
}

function hideControls() {
    // Solo ocultar si el video está reproduciéndose
    if (!videoPlayer.paused) {
        controlsWrapper.classList.add('hide-controls');
        videoContainer.style.cursor = 'none';
    }
}

// Función para descargar
function downloadVideo() {
    if (!currentVideo) {
        alert('Por favor, selecciona un video para descargar');
        return;
    }

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = currentVideo.src;
    link.download = currentVideo.title + '.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Descargando: ${currentVideo.title}`);
}

// Función para manejar errores de video
function handleVideoError(e) {
    console.error('Error en el video:', e);
    alert('Error al cargar el video. Verifica que el archivo existe en la ruta especificada.');
}

// Event Listeners
prevBtn.addEventListener('click', previousVideo);
playBtn.addEventListener('click', playVideo);
pauseBtn.addEventListener('click', pauseVideo);
stopBtn.addEventListener('click', stopVideo);
nextBtn.addEventListener('click', nextVideo);
downloadBtn.addEventListener('click', downloadVideo);

// Eventos de progreso
videoPlayer.addEventListener('timeupdate', updateProgress);
videoPlayer.addEventListener('loadedmetadata', updateProgress);
progressBar.addEventListener('click', setProgress);

// Eventos para mostrar controles
videoContainer.addEventListener('mousemove', showControls);
videoContainer.addEventListener('touchstart', showControls);
videoContainer.addEventListener('mousedown', showControls);

// También mostrar controles si el video se pausa
videoPlayer.addEventListener('pause', showControls);
videoPlayer.addEventListener('play', () => {
    // Iniciar el temporizador de ocultado al reproducir
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(hideControls, 4000);
});

// Inicializar controles visibles
showControls();

// Evento de error del video
videoPlayer.addEventListener('error', handleVideoError);

// Eventos táctiles para móviles
videoPlayer.addEventListener('touchstart', (e) => {
    e.preventDefault();
});

// Prevenir que el menú contextual aparezca en los botones de control
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loadVideoGrid();

    // Verificar si es un dispositivo móvil
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('mobile-device');
        console.log('Dispositivo móvil detectado');
    }

    console.log('Reproductor de videos inicializado');
});

// Función para simular videos (en caso de que no tengas archivos reales)
function setupDemoVideos() {
    console.log('Configurando modo demo...');
    // Aquí puedes agregar lógica para videos de demostración
}

// Manejar cambios en la orientación del dispositivo
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            if (isLandscape && !isFullscreen) {
                // Entrar en pantalla completa automáticamente al girar a horizontal
                toggleFullscreen();
            } else if (!isLandscape && isFullscreen) {
                // Opcional: Salir de pantalla completa al volver a vertical
                toggleFullscreen();
            }
        }
        console.log('Orientación cambiada. Horizontal:', isLandscape);
    }, 200); // Pequeño retraso para asegurar que las dimensiones se actualicen
});

// Exportar funciones para uso global si es necesario
window.videoPlayer = {
    preview: previousVideo,
    play: playVideo,
    pause: pauseVideo,
    stop: stopVideo,
    next: nextVideo,
    download: downloadVideo
};