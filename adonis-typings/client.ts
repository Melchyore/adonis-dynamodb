declare module '@ioc:Adonis/Addons/DynamoDB' {
  import type {
    Dyngoose,
    AttributeType,
    BatchGet,
    BatchWrite,
    Config,
    Connection,
    Decorator,
    DynamoAttributeType,
    Errors,
    Events,
    Filters,
    Metadata,
    Query,
    QueryOutput,
    Table,
    Transaction,
    DocumentClient,
    $,
    $DocumentClient,
    $GlobalSecondaryIndex,
    GlobalSecondaryIndexOptions,
    $LocalSecondaryIndex,
    $PrimaryKey,
    $Table,
    Attribute,
    TableOperations
  } from 'dyngoose'

  export interface DynamoDBConfig {
    region: string

    accessKeyId: string

    secretAccessKey: string

    endpoint?: string
  }

  export {
    $,
    $DocumentClient,
    $GlobalSecondaryIndex,
    $LocalSecondaryIndex,
    $PrimaryKey,
    $Table,
    AttributeType,
    BatchGet,
    BatchWrite,
    Config,
    Connection,
    Decorator,
    DynamoAttributeType,
    Errors,
    Events,
    Filters,
    Metadata,
    Query,
    QueryOutput,
    Table,
    Transaction,
    DocumentClient,
    GlobalSecondaryIndexOptions,
    Attribute,
    TableOperations
  }

  export type DynamoDBContract = typeof Dyngoose

  export const DynamoDB: DynamoDBContract
}
