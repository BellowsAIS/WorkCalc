// Conversion factors into metric base units
const TO_METRIC = {
  ft:   v => v * 0.3048,          // → m
  in:   v => v * 25.4,            // → mm
  ft2:  v => v * 0.092903,        // → m²
  ft3:  v => v * 0.028317,        // → m³
  gal:  v => v * 3.78541,         // → L
};

// Conversion factors from metric base units
const TO_IMPERIAL = {
  m:    v => v * 3.28084,         // → ft
  mm:   v => v * 0.0393701,       // → in
  m2:   v => v * 10.7639,         // → ft²
  m3:   v => v * 35.3147,         // → ft³
  L:    v => v * 0.264172,        // → gal (US)
};

export function toMetric(value, imperialUnit) {
  return TO_METRIC[imperialUnit]?.(value) ?? value;
}

export function toImperial(value, metricUnit) {
  return TO_IMPERIAL[metricUnit]?.(value) ?? value;
}

export function round(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function fmt(value, decimals = 2) {
  return round(value, decimals).toLocaleString('en-CA');
}
