import { Request, Response } from 'express'

import { doctors } from '@/../mock/employees'


export default {
    'GET /api/queryDoctors': (req: Request, res: Response) => {
        res.send({ data: doctors })
    }
}