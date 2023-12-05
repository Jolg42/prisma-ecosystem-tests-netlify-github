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
