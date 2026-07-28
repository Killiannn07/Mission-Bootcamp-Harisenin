import pool from "../config/db.js";
import * as contentRepository from "../repositories/contentRepository.js";
import AppError from "../utils/appError.js";

export const getAllMovie = async () => {
  const result = await contentRepository.findAll();

  return result;
};

export const getMoviebyId = async (id) => {
  const res = await contentRepository.findById(pool, id);
  if (!res) {
    throw AppError("Data not found", 404);
  }
  return res;
};

export const createContent = async (data) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const content = await contentRepository.createContent(client, data);

    const genres = await contentRepository.findGenresByNames(
      client,
      data.genres,
    );

    const genresId = genres.map((g) => g.id);

    await contentRepository.createContentGenres(client, content.id, genresId);

    await client.query("COMMIT");

    const newContent = await contentRepository.findById(pool, content.id);

    return newContent;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const updateContent = async (id, data) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const existing = await contentRepository.findById(client, id);

    if (!existing) {
      throw new AppError("Movie not found", 404);
    }

    await contentRepository.updateContent(client, id, data);

    const genres = await contentRepository.findGenresByNames(
      client,
      data.genres,
    );

    if (genres.length !== data.genres.length) {
      throw new AppError("One or more genres are invalid", 400);
    }

    await contentRepository.deleteContentGenre(client, id);

    await contentRepository.createContentGenres(
      client,
      id,
      genres.map((g) => g.id),
    );

    await client.query("COMMIT");

    return await contentRepository.findById(pool, id);
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const deleteContent = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const content = await contentRepository.deleteContent(client, id);

    if (!content) {
      throw new AppError("Movie not found", 404);
    }

    await client.query("COMMIT");

    return content;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
