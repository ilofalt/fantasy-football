import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  {
    ignores: [".next/**", "out/**", "coverage/**", "test-results/**", "playwright-report/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
];
