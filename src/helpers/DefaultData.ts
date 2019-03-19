import { InjectRepository } from "typeorm-typedi-extensions";
import { Color } from "../models/Color";
import { Repository } from "typeorm";
import { logger } from "../middleware/Logger"
import config from "config"
import { Service } from "typedi";


/**
 * DefaultData class is used to check and populate default data if it doesn't
 * exist. Upon startup of the application server.
 */
@Service()
export class DefaultData {

    constructor(
        @InjectRepository(Color) private readonly colorRepository: Repository<Color>
    ) {
    }

    async initDefaultColorData(): Promise<void> {
        // Check to make sure that default project color exists.
        const defaultColorName = config.get("defaultProjectColorName") as string
        const defaultColor = await this.colorRepository.findOne({ name: defaultColorName })
        if (!defaultColor) {
            const defaultColorHex = config.get("defaultProjectColorValue") as string
            logger.info(`Default color not found. Initializing as: ${defaultColorHex}`)
            let color = this.colorRepository.create({
                name: defaultColorName,
                hex: defaultColorHex
            })
            color = await this.colorRepository.save(color)
            logger.info(`Default project color record created with id: ${color.id}`)
        }
    }
}
