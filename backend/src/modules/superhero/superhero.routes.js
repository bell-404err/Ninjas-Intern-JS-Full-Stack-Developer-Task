import express from 'express';
import SuperheroController from './superhero.controller.js';
import { payloadValidatorMiddleware } from '../middlewares/superhero/payload/payload-validator.middleware.js';
import { imagesHandlerMiddleware } from '../middlewares/superhero/images/images-handler.middleware.js';
import { imagesMapperMiddleware } from '../middlewares/superhero/images/images-mapper.middleware.js'

const superheroRouter = express.Router();

superheroRouter.get('/', SuperheroController.listCharacters);
superheroRouter.get('/:characterId', SuperheroController.getCharacter);
superheroRouter.post('/', imagesHandlerMiddleware, imagesMapperMiddleware, payloadValidatorMiddleware, SuperheroController.createCharacter);
superheroRouter.patch('/:characterId', imagesHandlerMiddleware, imagesMapperMiddleware, payloadValidatorMiddleware, SuperheroController.updateCharacter);
superheroRouter.delete('/:characterId', SuperheroController.removeCharacter);

export default superheroRouter;