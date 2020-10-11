import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
import app from './config/app'

const server = awsServerlessExpress.createServer(app)

export const handler = (event: APIGatewayProxyEvent, context: Context): any => {
    awsServerlessExpress.proxy(server, event, context)
}
