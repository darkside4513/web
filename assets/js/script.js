/**
 * Angloamericana de Seguros - Verificación de Seguro/Servicio
 * Lógica dinámica y funcional en JavaScript
 */

(function () {
    'use strict';

    // Elementos del DOM
    const elHora = document.getElementById('hora-verificacion');
    const elStatusBox = document.getElementById('status-box');
    const elStatusIcon = document.getElementById('status-icon');
    const elStatusText = document.getElementById('status-text');
    const elYear = document.getElementById('current-year');

    // Configuración por defecto
    let estadoActual = 'valido'; // 'valido' o 'vencido'
    let fechaActual = '09/12/2026';

    /**
     * Formatea la fecha y hora actual en el formato exacto del servidor original:
     * "DD/MM/YYYY hh:mm a/p" (ejemplo: "31/10/2026 10:35 p")
     */
    function formatearHoraVerificacion(fechaObj = new Date()) {
        const pad = (n) => String(n).padStart(2, '0');
        const dia = pad(fechaObj.getDate());
        const mes = pad(fechaObj.getMonth() + 1);
        const anio = fechaObj.getFullYear();

        let horas = fechaObj.getHours();
        const minutos = pad(fechaObj.getMinutes());
        const ampm = horas >= 12 ? 'p' : 'a';

        horas = horas % 12;
        horas = horas ? horas : 12; // Formato 12 horas
        const strHoras = pad(horas);

        return `${dia}/${mes}/${anio} ${strHoras}:${minutos} ${ampm}`;
    }

    /**
     * Aplica el estado visual (Válido o Vencido) en la página
     */
    function aplicarEstado(estado, fecha) {
        estadoActual = estado === 'vencido' ? 'vencido' : 'valido';
        fechaActual = fecha || (estadoActual === 'vencido' ? '09/02/2026' : '09/12/2026');

        if (estadoActual === 'valido') {
            elStatusBox.className = 'status-box valid';
            elStatusBox.style.backgroundColor = 'lightgreen';
            elStatusIcon.src = 'assets/img/valid.png';
            elStatusIcon.alt = 'Certificado Válido';
            elStatusText.innerHTML = `El certificado es valido hasta el ${fechaActual}.`;
        } else {
            elStatusBox.className = 'status-box expired';
            elStatusBox.style.backgroundColor = 'lightpink';
            elStatusIcon.src = 'assets/img/Error.png';
            elStatusIcon.alt = 'Certificado Vencido';
            elStatusText.innerHTML = `El certificado est&aacute; vencido desde el ${fechaActual}.`;
        }
    }

    /**
     * Inicialización al cargar la página
     */
    function init() {
        // 1. Mostrar la hora de verificación en tiempo real
        if (elHora) {
            elHora.textContent = formatearHoraVerificacion();
            // Actualizar automáticamente cada 30 segundos
            setInterval(() => {
                elHora.textContent = formatearHoraVerificacion();
            }, 30000);
        }

        // 2. Año actual para el footer
        if (elYear) {
            elYear.textContent = new Date().getFullYear();
        }

        // 3. Leer parámetros de la URL si existen (ej: ?estado=vencido&fecha=09/02/2026)
        const params = new URLSearchParams(window.location.search);
        const paramEstado = params.get('estado') || params.get('status');
        const paramFecha = params.get('fecha') || params.get('date');

        if (paramEstado) {
            aplicarEstado(paramEstado.toLowerCase(), paramFecha);
        } else {
            // Por defecto: Válido (con fecha 09/12/2026)
            aplicarEstado('valido', '09/12/2026');
        }
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
