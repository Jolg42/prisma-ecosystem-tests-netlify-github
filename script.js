const fs = require('fs')
const path = require('path')

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

const filestmp = fs.readdirSync('/tmp/prisma-engines')
console.log({ filestmp })
const sourceDir = '/tmp/prisma-engines'
const destDir = '/opt/build/repo/node_modules/.prisma/client'
const library1xName = 'libquery_engine-rhel-openssl-1.0.x.so.node'
const library3xName = 'libquery_engine-rhel-openssl-3.0.x.so.node'

// Copy the 3.0.x engine to the expected location
fs.copyFileSync(path.join(sourceDir, library3xName), path.join(destDir, library3xName))

// Delete the 1.0.x engine
// Only log if that fails
await fs.unlink(path.join(destDir, library1xName)).catch((e) => console.log(e))

// list all files in node_modules/.prisma/client
const dirPath = path.dirname(require.resolve('.prisma/client'))
const files = fs.readdirSync(dirPath)
console.log({ dirPath })
console.log({ files })
