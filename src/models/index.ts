import dotenv from 'dotenv'
import Game from './game'
import Character from './character'
import Sheet from './sheet'

dotenv.config();

const mongoUsername: string = process.env.MONGODB_USERNAME || '';
const mongoPassword: string = process.env.MONGODB_PASSWORD || '';
const mongoCluserUri: string = process.env.MONGODB_CLUSTER_URI || '';
const mongoDbName: string = process.env.MONGODB_NAME || '';
const mongoConnectionOptions = 'retryWrites=true&w=majority&appName=simplecharactersheet'
const MONGO_CONNECTION_URI: string = 
    `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoCluserUri}/${mongoDbName}?${mongoConnectionOptions}`

export default {
    Character,
    Game,
    Sheet,
    MONGO_CONNECTION_URI
}