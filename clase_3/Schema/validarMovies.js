const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must br a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2023),
  director: z.string(),
  duration: z.number().int().positive(),
  // puede ser tambien optional() el rate pero sacando el default()
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Aventurw",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Crime",
    ]),
    {
      required_error: "Movie genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
});

// con SAFEPARSE te identifica si hay o no un error
// y tambien se puede usar el SAFEPARSEASYNC para evitar el bloqueo mientras valida los datos
function validarMovies(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = {
  validarMovies,
  validatePartialMovie,
};
