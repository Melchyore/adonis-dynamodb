import type { Query } from '@ioc:Adonis/Addons/DynamoDB'

import { test } from '@japa/runner'

import { setup, fs, getDynamoDBConfig } from '../bin/test/config'
import Client from '../src/Client'

const dynamoDBConfig = getDynamoDBConfig()

test.group('DynamoDB Client', (group) => {
  group.each.teardown(async () => {
    await fs.cleanup()
  })

  test('client should create table and put items', async ({ expect }) => {
    console.log(0)

    try {
      const app = await setup('test', dynamoDBConfig)
      const DynamoDB = new Client(app, dynamoDBConfig).getClient()

      console.log(1)

      @DynamoDB.$Table({
        name: 'AdonisCardTableDynamoDBTest'
      })
      class Card extends DynamoDB.Table {
        @DynamoDB.$PrimaryKey('id')
        public static readonly primaryKey: Query.PrimaryKey<Card, number>

        @DynamoDB.Attribute.Number()
        public id: number

        @DynamoDB.Attribute.String()
        public title: string

        @DynamoDB.Attribute.Date()
        public expiresAt: number | Date
      }

      console.log(2)

      /*try {
        await Card.createTable()

        console.log(3)
      } catch {
        console.log('Table already created')
      }*/

      const date = +new Date() + 60 * 60 * 1000

      console.log(3)

      const card = new Card()
      card.id = 15
      card.title = 'Test'
      card.expiresAt = date
      await card.save()

      console.log(4)

      await Card.new({
        id: 99065,
        title: 'Foo',
        expiresAt: date
      }).save()

      console.log(5)

      const records = await Card.primaryKey.scan()
      const results: Array<Record<string, unknown>> = []

      for (const record of records) {
        results.push(record.toJSON())
      }

      expect(results).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 15,
            title: 'Test',
            expiresAt: date
          }),
          expect.objectContaining({
            id: 99065,
            title: 'Foo',
            expiresAt: date
          })
        ])
      )

      await Card.deleteTable()
    } catch (e) {
      console.log(10)

      throw e
    }
  }).disableTimeout()
})
