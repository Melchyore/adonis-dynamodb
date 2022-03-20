import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import type { DynamoDBConfig, DynamoDBContract } from '@ioc:Adonis/Addons/DynamoDB'

import { Dyngoose } from 'dyngoose'

export default class Client {
  constructor (private app: ApplicationContract, private config: DynamoDBConfig) {
    // @ts-ignore
    Dyngoose.Config.default.setConnection = function (connection: typeof Dyngoose.Connection) {
      this.__defaultConnection = connection
    }

    // @ts-ignore
    Dyngoose.Config.default.setConnection(new Dyngoose.Connection.DynamoDBConnection(this.config))
  }

  public getClient (): DynamoDBContract {
    return Dyngoose
  }
}
