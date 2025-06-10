module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageReporters": [
    "lcov",
    "text-summary"
  ],
  reporters: [
    "default",                                  // стандартный Jest-репортер
    ["jest-html-reporters", {                   // наш внешний HTML-репортер
      publicPath: "./coverage/html-report",
      filename: "report.html",
      expand: true
    }]
  ]
}
