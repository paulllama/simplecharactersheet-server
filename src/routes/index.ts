import { Express, Request, Response } from 'express'
import { requireAuth, getAuth } from '@clerk/express'
import Controllers from '../controllers'


const requestHandler = (handler: (req: Request) => Promise<any>): ((req: Request, res: Response) => Promise<void>) => 
    async (req: Request, res: Response) => {
        try {
            const result = await handler(req)
            if (result) {
                res.json(result)
            } else {
                res.status(404).json({
                    error: 'resource not found'
                })
            }
        } catch (e) {
            res.status(404).json({
                error: `${e}`
            })
        }
    }

export const addRoutesToExpressApp = (app: Express): Express => {
    app.get("/", (_: Request, res: Response) => {
        res.send(`SimpleCharacterSheet API`)
    })
    
    /* GAME DATA */

    app.get(
        '/games',
        requestHandler(async () => {
            return Controllers.Game.getAllActive()
        })
    )
    
    app.get(
        '/games/:gameId', 
        requestHandler(async (req: Request) => {
            const { gameId } = req.params
            return Controllers.Game.getOneWithSheetSummaries(gameId)
        })
    )
    
    /* CHARACTERS */
    
    app.get(
        '/characters/', 
        requireAuth(), 
        requestHandler(async (req: Request) => {
            const { userId } = getAuth(req)
            return Controllers.Character.getAllForUser(userId)
        })
    )
    
    app.put(
        '/characters/', 
        requireAuth(), 
        requestHandler(async (req: Request) => {
            const { userId } = getAuth(req)
            const { gameId, sheetId } = req.body
            const character = await Controllers.Character.create(
                userId,
                gameId,
                sheetId,
            )
            return character._id
        })
    )
    
    /* SINGLE CHARACTER */
    
    app.get(
        '/characters/:characterId', 
        requireAuth(), // auth required to view a character, but it doesn't have to be your own
        requestHandler(async (req: Request) => {
            const { characterId } = req.params
            return Controllers.Character.getOne(characterId)
        })
    )
    
    app.post(
        '/characters/:characterId', 
        requireAuth(), 
        requestHandler(async (req: Request): Promise<void> => {
            const { characterId } = req.params
            const { userId } = getAuth(req)
            return Controllers.Character.update(userId, characterId, req.body)
        })
    )

    return app
} 