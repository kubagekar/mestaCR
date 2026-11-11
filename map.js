// Mapa měst ČR – Leaflet + GeoJSON

const GEOJSON_URL = "body.geojson";
const STRED_CR = [49.8175, 15.473];
const VYCHOZI_ZOOM = 7;

// Ochrana proti vložení HTML z dat do popupu
function escapeHtml(text) {
  return String(text ?? "").replace(/[&<>"']/g, (znak) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[znak]));
}

function zobrazChybu(zprava) {
  const prvek = document.createElement("div");
  prvek.className = "chyba";
  prvek.textContent = zprava;
  document.body.appendChild(prvek);
}

// Inicializace mapy
const mapa = L.map("mapa").setView(STRED_CR, VYCHOZI_ZOOM);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapa);

// Vykreslení každého bodu z GeoJSONu
function pridejBod(feature, vrstva) {
  const { id, nazev, popisek } = feature.properties;

  vrstva.bindTooltip(escapeHtml(nazev));
  vrstva.bindPopup(
    `<div class="popup">
       <h2>${escapeHtml(nazev)}</h2>
       <p>${escapeHtml(popisek)}</p>
       <small>ID: ${escapeHtml(id)}</small>
     </div>`
  );
}

// Načtení dat
fetch(GEOJSON_URL)
  .then((odpoved) => {
    if (!odpoved.ok) {
      throw new Error(`HTTP ${odpoved.status}`);
    }
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, { onEachFeature: pridejBod }).addTo(mapa);
    const hranice = vrstva.getBounds();
    if (hranice.isValid()) {
      mapa.fitBounds(hranice, { padding: [60, 60] });
    }
  })
  .catch((chyba) => {
    console.error("Nepodařilo se načíst GeoJSON:", chyba);
    zobrazChybu(
      "Data se nepodařilo načíst. Otevři stránku přes lokální server " +
        "(např. python -m http.server), ne přímo ze souboru."
    );
  });
