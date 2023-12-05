const version = process.version
const { NETLIFY_BETA_PG_URL, ...env } = process.env

console.debug(
  JSON.stringify({
    env,
    version,
  }),
)
