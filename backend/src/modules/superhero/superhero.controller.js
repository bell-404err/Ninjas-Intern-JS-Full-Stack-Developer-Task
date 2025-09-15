import SuperheroService from './superhero.service.js';
import { createError } from '../../utils/errors.js';

class SuperheroController {

  async listCharacters(req, res, next) {
    try {

      const page = +req.query.page || 1;
      const limit = +req.query.limit || 5;

      const charactersList = await SuperheroService.getAll();

      const start = (page - 1) * limit;
      const end = start + limit;

      const slicedCharactersList = charactersList.slice(start, end);

      return res.json(slicedCharactersList);

    } catch (e) {
      console.error(e);
      return next(createError(500, 'Internal server error'));
    }
  }

  async getCharacter(req, res, next) {
    try {

      const { characterId } = req.params;
      if (!characterId) {
        return next(createError(400, 'Character id is required'));
      }

      const character = await SuperheroService.getById(characterId);
      return res.json(character);

    } catch (e) {
      console.error(e);
      return next(createError(500, 'Internal server error'));
    }
  }

  async createCharacter(req, res, next) {
    try {

      const createdCharacter = await SuperheroService.create(req.body, req.images);
      return res.status(201).json(createdCharacter);

    } catch (e) {
      console.error(e);
      return next(createError(500, 'Internal server error'));
    }
  }

  async updateCharacter(req, res, next) {
    try {

      const { characterId } = req.params;
      if (!characterId) {
        return next(createError(400, 'Character id is required'));
      }

      const updatedCharacter = await SuperheroService.updateById(characterId, req.body, req.images);
      return res.status(200).json(updatedCharacter);

    } catch (e) {
      console.error(e);
      return next(createError(500, 'Internal server error'));
    }
  }

  async removeCharacter(req, res, next) {
    try {

      const { characterId } = req.params;
      if (!characterId) {
        return next(createError(400, 'Character id is required for removing character'));
      }

      const deletedCharacter = await SuperheroService.deleteById(characterId);
      return res.status(200).json(deletedCharacter);

    } catch (e) {
      console.error(e);
      return next(createError(500, 'Internal server error'));
    }
  }
}

export default new SuperheroController();