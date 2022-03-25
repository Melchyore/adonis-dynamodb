import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class DynamoDBProvider {
  public static needsApplication = true

  constructor (protected app: ApplicationContract) {}

  public register () {
    this.app.container.singleton('Adonis/Addons/DynamoDB', () => {
      const DynamoDBClient = require('../src/Client').default
      const Config = this.app.container.use('Adonis/Core/Config').get('dynamodb', {})
      const clientInstance = new DynamoDBClient(this.app, Config)

      return {
        DynamoDB: clientInstance.getClient()
      }
    })
  }

  public async boot () {}

  public async ready () {}

  public async shutdown () {}
}
