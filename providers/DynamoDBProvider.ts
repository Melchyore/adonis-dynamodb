import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    this.app.container.singleton('Adonis/Addons/DynamoDB', () => {
      const DynamoDBClient = require('../src/Client').default
      const Config = this.app.container.use('Adonis/Core/Config').get('dynamodb', {})
      const clientInstance = new DynamoDBClient(this.app, Config)

      return clientInstance.getClient()
    })
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
