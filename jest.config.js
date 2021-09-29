module.exports={
  preset: "@shelf/jest-mongodb",
  setupFiles: ["dotenv/config", "<rootDir>/tests/setupEnv.js"],
  verbose: true,
  reporters: [
	"default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ],
}