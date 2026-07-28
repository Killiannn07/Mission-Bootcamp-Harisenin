import { mapContent } from "../mappers/contentMappers.js";
import * as contentService from "../services/contentService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getAllMovie = async (req, res, next) => {
  try {
    const content = await contentService.getAllMovie();

    const movie = content.map(mapContent);
    return successResponse(res, "Movie fetched", movie, 200);
  } catch (error) {
    return next(error);
  }
};

export const getMoviebyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await contentService.getMoviebyId(id);
    const movie = mapContent(content);
    return successResponse(res, "Movie Fetched", movie, 200);
  } catch (error) {
    return next(error);
  }
};

export const createContent = async (req, res, next) => {
  try {
    const content = await contentService.createContent(req.body);

    const movie = mapContent(content);

    return successResponse(res, "Movie created successfully", movie, 201);
  } catch (error) {
    next(error);
  }
};

export const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const content = await contentService.updateContent(id, req.body);

    return successResponse(res, "Movie Updated", mapContent(content), 200);
  } catch (error) {
    return next(error);
  }
};

export const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const content = await contentService.deleteContent(id);

    return successResponse(res, "Movie Deleted",content, 200);
  } catch (error) {
    next(error);
  }
};
