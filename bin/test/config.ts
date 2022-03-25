import type { DynamoDBConfig } from '@ioc:Adonis/Addons/DynamoDB'

import { Filesystem } from '@poppinss/dev-utils'
import { Application } from '@adonisjs/core/build/standalone'
import { join } from 'path'

export const fs = new Filesystem(join(__dirname, 'app'))

const dynamoConfig = {
  region: process.env.AWS_REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  endpoint: process.env.DYNAMO_ENDPOINT
}

export function getDynamoDBConfig () {
  return dynamoConfig
}

export async function setup (environment: 'test' | 'web', dynamodbConfig: DynamoDBConfig) {
  await fs.add('.env', '')
  await fs.add(
    'config/app.ts',
    `
		export const appKey = 'averylong32charsrandomsecretkey',
		export const http = {
			cookie: {},
			trustProxy: () => true,
		}
	`
  )

  await fs.add(
    'config/dynamodb.ts',
    `
		const dynamoConfig = ${JSON.stringify(dynamodbConfig, null, 2)}
		export default dynamoConfig
	`
  )

  const app = new Application(fs.basePath, environment, {
    providers: [
      '@adonisjs/core',
      '../../../providers/DynamoDBProvider'
    ],
  })

  await app.setup()
  await app.registerProviders()
  await app.bootProviders()

  return app
}
