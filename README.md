# Higharc Takehome
A Simple Restful server for 
- Creating & Deleting Users
- Creating Smoothies with ingredients
- Modifying smoothies
- Modifying ingredients

## File structure
+ /src
	+ /api
		+ Folders for each router
	+ /entity
		+ DB models for orm
	+ /migration
		+ Generated DB migration folder
	+ /types
		+ All types for graphql + Global overrides
	+ /utils
		+ Middleware and helper functions

## API
Root of the application
> https://higharc-rest.herokuapp.com

### Authentication
`Header: Bearer <JWT Token from login/signup>`

### Auth
- **Login**: POST /auth/login
```
{
	email: "Your email",
	password: "Your password"
}

returns: Token: String
```
- **Signup**: POST /auth/signup
```
{
	email: "Your email",
	password: "Your password"
	firstName: "First name",
	lastName: "Last name",
	isAdmin: "Boolean indicator of admin"
}

returns: Token: String
```
### User
- **Get User**: GET /user
```
Returns user of jwt token
```
- **Delete Current User**: DELETE /user
```
Returns true if succeeded
```
- **Delete Another User**: DELETE /user/:userId
Must be a administrative user
```
Returns true if succeeded
```
### Smoothies
- **Get all Smoothies by current user**: GET /smoothies
```
Returns array of smoothie objects
```
- **Get a specific Smoothie**: GET /smoothies/:smoothieId
```
Returns a specific smoothie
```
- **Create a Smoothie**: POST /smoothie
```
{
	"name": "Name of smoothie",
	"ingredients": [
		{
			"name": "Name of ingredient",
			"quantity": "Integer of amount of ingredient",
			"unit": "String of Unit type (Must be cup, pinch, gram, ounce)"
		}
	]
}
```
- **Update a smoothies name**: PATCH /smoothies/:smoothieId
```
{
	"name": "Name of smoothie"
}
```
- **Delete a smoothie**: DELETE /smoothies/:smoothieId
```
Returns true if successfully deleted
```

### Ingredients
- **Get all ingredients of a specific smoothie**: GET /smoothies/:smoothieId/ingredients
 ```
Returns array of ingredients for a smoothie
```
- **Get specific ingredient for a smoothie**: /GET /smoothies/:smoothieId/ingredient/:ingredientId
```
Returns a ingredient
```
- **Update a ingredient**: /PATCH /smoothies/:smoothieId/ingredient/:ingredientId
```
{
	"name": "New Ingredient Name",
	"quantity": "New Ingredient amount (INT),
	"unit": "String of Unit type (Must be cup, pinch, gram, ounce)"
}
```
- **Delete an ingredient**: /DELETE /smoothies/:smoothieId/ingredient/:ingredientId
```
Returns true if it succeeds
```
- **Create a new ingredient for Smoothie**: /POST /smoothies/:smoothieId/ingredient/:ingredientId
```
{
	"name": "New Ingredient Name",
	"quantity": "New Ingredient amount (INT),
	"unit": "String of Unit type (Must be cup, pinch, gram, ounce)"
}
```