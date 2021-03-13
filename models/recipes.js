const mongoose = require ('mongoose');
const { Schema } = mongoose;

const recipeSchema = new mongoose.Schema({
  readyInMinutes: { type: String },
  servings: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image:{ type: String, default: 'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_7' },
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