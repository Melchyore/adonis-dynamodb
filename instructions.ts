import { join } from 'path'
// import { mkdirSync, existsSync } from 'fs'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const configPath = app.configPath('dynamodb.ts')
  const dynamodbConfig = new sink.files.MustacheFile(projectRoot, configPath, getStub('config.txt'))
  dynamodbConfig.overwrite = true

  sink.logger.action('create').succeeded(configPath)
}
