const version = process.version
const { NETLIFY_BETA_PG_URL, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_ACCESS_KEY_ID, ...env } = process.env

console.debug(
  JSON.stringify(
    {
      env,
      version,
    },
    null,
    2,
  ),
)

// list all files in node_modules/.prisma/client
const fs = require('fs')
const path = require('path')
const dirPath = path.dirname(require.resolve('.prisma/client'))
const files = fs.readdirSync(dirPath)
console.log({ dirPath })
console.log({ files })
