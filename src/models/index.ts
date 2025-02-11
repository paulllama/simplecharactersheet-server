import dotenv from 'dotenv'
import User from './user'

dotenv.config();

const mongoUsername: string = process.env.MONGODB_USERNAME || '';
const mongoPassword: string = process.env.MONGODB_PASSWORD || '';
const mongoCluserUri: string = process.env.MONGODB_CLUSTER_URI || '';
const mongoDbName: string = process.env.MONGODB_NAME || '';
const mongoConnectionOptions = 'retryWrites=true&w=majority&appName=simplecharactersheet'
const MONGO_CONNECTION_URI: string = 
    `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluserUri}/${mongoDbName}?${mongoConnectionOptions}`

export default {
    User,
    MONGO_CONNECTION_URI
}