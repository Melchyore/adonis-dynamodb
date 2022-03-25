import { Table } from '@ioc:Adonis/Addons/DynamoDB'

import { args } from '@adonisjs/core/build/standalone'

import Base from './Base'

export default class Create extends Base {
  public static commandName = 'dynamo:create'

  public static description = 'Create DynamoDB tables on AWS from models'

  public static settings = {
    loadApp: true,
    stayAlive: true
  }

  @args.string({
    description: 'Name/path of the model class',
    required: false
  })
  public name?: string

  public async run () {
    let tables: Array<typeof Table> = []

    if (this.name) {
      tables = [await this.getTable(this.normalizeName(this.name))]
    } else {
      tables = await this.getTables()
    }

    for (const createTable of tables.map(_table => () => this.createTable(_table))) {
      await createTable()
    }

    await this.exit()
  }

  private async createTable (table: typeof Table): Promise<void> {
    const spinner = this.logger.await(`Creating table ${table.name}`, undefined, undefined)

    try {
      await table.createTable()

      this.logger.logUpdate(this.logger.colors.green(`Table ${table.name} successfully created`))
    } catch (e) {
      this.logger.logUpdate(this.logger.colors.red(`Cannot create table ${table.name}.\n${e}`))
    }

    spinner.stop()
  }
}
