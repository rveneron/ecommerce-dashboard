type Value = {
  label: string;
};

export const VALUES_KEY_LABELS: Record<string, Value> = {
  CO: { label: 'CO(GT)' },
  PT08S1: { label: 'PT08.S1(CO)' },
  NMHC: { label: 'NMHC(GT)' },
  C6H6: { label: 'C6H6(GT)' },
  PT08S2: { label: 'PT08.S2(NMHC)' },
  NOx: { label: 'NOx(GT)' },
  PT08S3: { label: 'PT08.S3(NOx)' },
  NO2: { label: 'NO2(GT)' },
  PT08S4: { label: 'PT08.S4(NO2)' },
  PT08S5: { label: 'PT08.S5(O3)' },
  T: { label: 'T' },
  RH: { label: 'RH' },
  AH: { label: 'AH' },
};
