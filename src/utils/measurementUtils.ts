import type { MeasurementRecord, UnitSystem } from '../data/mockMeasurements';

const M_TO_FT = 3.28084;
const SQM_TO_SQFT = 10.7639;
const CUBICM_TO_CUBICFT = 35.3147;

export function formatMeasurement(record: MeasurementRecord, unitSystem: UnitSystem): string {
  if (unitSystem === 'metric') {
    switch (record.type) {
      case 'distance':
        return `${record.value.toFixed(1)} m`;
      case 'area':
        return `${record.value.toLocaleString(undefined, { maximumFractionDigits: 1 })} m²`;
      case 'volume':
        return `${record.value.toLocaleString(undefined, { maximumFractionDigits: 1 })} m³`;
    }
  } else {
    switch (record.type) {
      case 'distance':
        return `${(record.value * M_TO_FT).toFixed(1)} ft`;
      case 'area':
        return `${(record.value * SQM_TO_SQFT).toLocaleString(undefined, { maximumFractionDigits: 1 })} ft²`;
      case 'volume':
        return `${(record.value * CUBICM_TO_CUBICFT).toLocaleString(undefined, { maximumFractionDigits: 1 })} ft³`;
    }
  }
}
