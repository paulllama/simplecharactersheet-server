import { Express, Request, Response } from 'express'
import { requireAuth, getAuth } from '@clerk/express'
import Models from '../models'
import Sheet from '../models/sheet'

export const addRoutesToExpressApp = (app: Express): Express => {
    app.get("/", (req: Request, res: Response) => {
        res.send(`SimpleCharacterSheet API`)
    })
    
    /* GAME DATA */

    app.get(
        '/games',
        async (req: Request, res: Response) => {
            const games = await Models.Game.find({ active: true }).select(['_id', 'name', 'icon']).exec()
            res.json(games)
        }
    )
    
    app.get(
        '/games/:gameId', 
        async (req: Request, res: Response) => {
            const { gameId } = req.params
            const gameData = await Models.Game.findById(gameId).lean().exec()
            if (!gameData) {
                res.status(404).json({
                    error: 'game not found'
                })
            } else {
                const sheets = await Models.Sheet
                    .find({ gameId: gameData._id })
                    .select(['_id', 'name', 'icon'])
                    .exec()

                res.json({
                    ...gameData,
                    sheets,
                })
            }
        }
    )
    
    app.get(
        '/games/:gameId/sheets/:sheetId', 
        async (req: Request, res: Response) => {
            const { sheetId } = req.params
            const sheet = await Models.Sheet.findById(sheetId).exec()
            if (!sheet) {
                res.status(404).json({
                    error: 'sheet not found'
                })
            } else {
                res.json(sheet)
            }
        }
    )
    
    /* CHARACTERS */
    
    app.get(
        '/characters/', 
        requireAuth(), 
        async (req: Request, res: Response) => {
            const { userId } = getAuth(req)

            const characters = await Models.Character.find({ userId }).exec()
            res.json(characters)
        }
    )
    
    
    app.put(
        '/characters/', 
        requireAuth(), 
        async (req: Request, res: Response) => {
            const { userId } = getAuth(req)
            console.log('/characters/', req.headers['content-type'])   
            const { gameId, sheetId } = req.body

            if (gameId) {
                const character = await Models.Character.create({
                    userId,
                    gameId,
                    sheetId,
                })

                res.json(character._id)
            } else {
                res.status(403).json({
                    error: 'gameId required'
                })
            }
        }
    )
    
    /* SINGLE CHARACTER */
    
    app.get(
        '/characters/:characterId', 
        requireAuth(), // auth required to view a character, but it doesn't have to be your own
        async (req: Request, res: Response) => {
            const { characterId } = req.params

            const character = await Models.Character.findById(characterId).exec()
            
            if (!character) {
                res.status(404).json({
                    error: 'character does not exist'
                })
            } else {
                res.json(character)
            }
        }
    )
    
    app.post(
        '/characters/:characterId', 
        requireAuth(), 
        async (req: Request, res: Response): Promise<void> => {
            const { characterId } = req.params
            const { userId } = getAuth(req)
            const character = await Models.Character.findById(characterId).exec()

            if (!character) {
                res.status(404).json({
                    error: 'character does not exist'
                })
            } else if (character.userId !== userId) {
                res.status(403).json({
                    error: 'character does not belong to signed in user'
                })
            } else {
                // TODO: do stuff
            }
        }
    )

    return app
} 