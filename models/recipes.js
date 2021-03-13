const mongoose = require ('mongoose');
const { Schema } = mongoose;

const recipeSchema = new mongoose.Schema({
  readyInMinutes: { type: String },
  servings: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image:{ type: String, default: 'https://res.cloudinary.com/djbctmfeq/image/upload/v1615613731/anna-pelzer-IGfIGP5ONV0-unsplash_mxnefd.jpg' },
  sourceUrl: { type: String },
  description: { type: String },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "To create a recipe you need a username"]
},
},
{
  timestamps: true,
}
);
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;