const { PrismaClient, Prisma } = require('@prisma/client')

const client = new PrismaClient()

exports.handler = async function (event, context, callback) {
  // await client.user.deleteMany({})
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

  const id = '12345'

  // const createUser = await client.user.create({
  //   data: {
  //     id,
  //     email: 'alice@prisma.io',
  //     name: 'Alice',
  //   },
  // })

  // const updateUser = await client.user.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //   },
  // })

  const users = await client.user.findUnique({
    where: {
      id,
    },
  })

  // const deleteManyUsers = await client.user.deleteMany()

  /*
  // list all files deployed in Lambda to debug when tests are failing
  const dirTree = require("directory-tree");
  const tree = dirTree(process.env.LAMBDA_TASK_ROOT);
  console.dir(tree, { depth: null });
  */

  return {
    statusCode: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      // createUser,
      // updateUser,
      users,
      // deleteManyUsers,
      files,
      env,
      version,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
