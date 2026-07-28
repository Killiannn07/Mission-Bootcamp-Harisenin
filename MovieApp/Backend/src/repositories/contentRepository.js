import pool from "../config/db.js";

export const findAll = async () => {
  const query = `
        SELECT
            c.id,
            c.title,
            c.description,
            c.thumbnail,
            c.release_year,
            c.age_rating,
            c.rating,
            c.duration,
            c.type,
            c.badge,
            c.top_ten,
            c.new_release,

            COALESCE(
                ARRAY_AGG(g.name)
                FILTER (WHERE g.name IS NOT NULL),
                '{}'
            ) AS genres

        FROM content c

        LEFT JOIN content_genre cg
            ON c.id = cg.content_id

        LEFT JOIN genre g
            ON cg.genre_id = g.id

        GROUP BY c.id

        ORDER BY c.id;
    `;

  const result = await pool.query(query);

  return result.rows;
};

export const findById = async (db, id) => {
  const query = `SELECT
            c.id,
            c.title,
            c.description,
            c.thumbnail,
            c.release_year,
            c.age_rating,
            c.rating,
            c.duration,
            c.type,
            c.badge,
            c.top_ten,
            c.new_release,

            COALESCE(
                ARRAY_AGG(g.name)
                FILTER (WHERE g.name IS NOT NULL),
                '{}'
            ) AS genres

        FROM content c

        LEFT JOIN content_genre cg
            ON c.id = cg.content_id

        LEFT JOIN genre g
            ON cg.genre_id = g.id

        WHERE c.id = $1

        GROUP BY c.id;`;

  const res = await db.query(query, [id]);

  return res.rows[0];
};

export const createContent = async (client, data) => {
  const query = `
        INSERT INTO content
        (
            title,
            description,
            thumbnail,
            release_year,
            age_rating,
            rating,
            duration,
            type,
            badge,
            top_ten,
            new_release
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
        )
        RETURNING *;
    `;

  const values = [
    data.title,
    data.description,
    data.image,
    data.year,
    data.ageRating,
    data.rating,
    data.duration,
    data.type,
    data.badge,
    data.topTen,
    data.newRelease,
  ];

  const result = await client.query(query, values);

  return result.rows[0];
};

export const findGenresByNames = async (client, genres) => {
  const query = `
        SELECT id, name
        FROM genre
        WHERE name = ANY($1);
    `;

  const result = await client.query(query, [genres]);

  return result.rows;
};

export const createContentGenres = async (client, contentId, genreIds) => {
  const query = `
        INSERT INTO content_genre
        (
            content_id,
            genre_id
        )
        VALUES
        ($1,$2);
    `;

  for (const genreId of genreIds) {
    await client.query(query, [contentId, genreId]);
  }
};

export const updateContent = async (client, id, data) => {
  const query = `
        UPDATE content
        SET
            title = $1,
            description = $2,
            thumbnail = $3,
            release_year = $4,
            age_rating = $5,
            rating = $6,
            duration = $7,
            type = $8,
            badge = $9,
            top_ten = $10,
            new_release = $11
        WHERE id = $12
        RETURNING *;
    `;

  const values = [
    data.title,
    data.description,
    data.image,
    data.year,
    data.ageRating,
    data.rating,
    data.duration,
    data.type,
    data.badge,
    data.topTen,
    data.newRelease,
    id,
  ];

  const result = await client.query(query, values);

  return result.rows[0];
};

export const deleteContentGenre = async (client, contentId) => {
  const query = `DELETE from content_genre WHERE content_id= $1`

  const result = await client.query(query, [contentId])
}

export const deleteContent = async (client, id) => {
  const query = `DELETE from content WHERE id = $1 RETURNING *`

  const result = await client.query(query, [id])

  return result.rows[0]
}
