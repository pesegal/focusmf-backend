import { Request } from "express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "connect";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  }
}
