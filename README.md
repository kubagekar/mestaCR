# Mapa měst ČR

Jednoduchá webová mapa postavená na [Leafletu](https://leafletjs.com/). Body měst se načítají ze souboru GeoJSON.

## Struktura

| Soubor          | Účel                                           |
|-----------------|------------------------------------------------|
| `index.html`    | Stránka, načítá Leaflet, styly a skript        |
| `map.js`        | Inicializace mapy a načtení GeoJSONu           |
| `styl.css`      | Vzhled stránky a popupů                        |
| `body.geojson`  | Data měst (id, název, popisek, souřadnice)     |
| `README.md`     | Tento soubor                                   |

## Spuštění

Data se načítají přes `fetch`, takže stránka **nefunguje po otevření souboru dvojklikem** (`file://`). Spusť lokální server ve složce projektu:

```bash
python -m http.server 8000
```

a otevři <http://localhost:8000>.

Alternativy: `npx serve`, rozšíření Live Server ve VS Code apod.

K načtení Leafletu a dlaždic mapy je potřeba připojení k internetu.

## Formát dat (`body.geojson`)

Standardní `FeatureCollection` s bodovými prvky. Každý prvek má atributy:

- `id` – číselný identifikátor
- `nazev` – název města
- `popisek` – krátký popis zobrazený v popupu

**Pozor:** v GeoJSONu je pořadí souřadnic `[délka, šířka]` (lon, lat), tedy opačně než v Leafletu.

### Přidání města

Do pole `features` přidej další objekt:

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

Mapa se po obnovení stránky automaticky přiblíží tak, aby byly vidět všechny body.

## Použité technologie

- Leaflet 1.9.4
- Dlaždice © přispěvatelé OpenStreetMap
