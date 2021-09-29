module.exports={
  preset: "@shelf/jest-mongodb",
  setupFiles: ["dotenv/config"],
  verbose: true,
  reporters: [
	"default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Test Report"
    }]
  ],
}