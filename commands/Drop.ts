import { Table } from '@ioc:Adonis/Addons/DynamoDB'

import { args } from '@adonisjs/core/build/standalone'

import Base from './Base'

export default class Drop extends Base {
  public static commandName = 'dynamo:drop'

  public static description = 'Drop one or many DynamoDB tables'

  public static settings = {
    loadApp: true,
    stayAlive: true
  }

  @args.string({
    description: 'Name/path of the model class',
    required: false
  })
  public name?: string

  public async run() {
    let tables: Array<typeof Table> = []
    let question = 'Are you sure you want to delete '

    if (this.name) {
      const transformedName = this.normalizeName(this.name)

      question += `${transformedName} table`

      tables = [await this.getTable(transformedName)]
    } else {
      question += 'all tables'

      tables = await this.getTables()
    }

    question += '?'

    const confirmation = await this.prompt.confirm(question)

    if (confirmation) {
      for (const deleteTable of tables.map((_table) => () => this.deleteTable(_table))) {
        await deleteTable()
      }

      await this.exit()
    }
  }

  private async deleteTable(table: typeof Table): Promise<void> {
    const spinner = this.logger.await(`Deleting table ${table.name}`, undefined, undefined)

    try {
      await table.deleteTable()

      this.logger.logUpdate(this.logger.colors.green(`Table ${table.name} successfully deleted`))
    } catch (e) {
      this.logger.logUpdate(this.logger.colors.red(`Cannot delete table ${table.name}.\n${e}`))
    }

    spinner.stop()
  }
}
