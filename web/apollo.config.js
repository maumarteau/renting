const path = require('path')

// Load .env files
const { loadEnv } = require('vue-cli-plugin-apollo/utils/load-env')
const env = loadEnv([
  path.resolve(__dirname, '.env'),
])

module.exports = {
  client: {
    name: "my-graphql-app",
      url: "http://localhost:3000/graphql"
  }
}
