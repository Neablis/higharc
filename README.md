# Higharc Smoothie API

Description of the API

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [Ingredient](#ingredient)
    * [Smoothie](#smoothie)
    * [User](#user)
  * [Inputs](#inputs)
    * [IngredientInput](#ingredientinput)
    * [IngredientUpdateInput](#ingredientupdateinput)
    * [LoginInput](#logininput)
    * [SignupInput](#signupinput)
    * [SmoothieInput](#smoothieinput)
  * [Enums](#enums)
    * [IngredientUnits](#ingredientunits)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [DateTime](#datetime)
    * [Float](#float)
    * [ID](#id)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td>

Get the user for the passed authentication token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Get a valid auth token if user/password is correct

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#logininput">LoginInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>smoothie</strong></td>
<td valign="top"><a href="#smoothie">Smoothie</a></td>
<td>

Get a smoothie you created by its name

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>smoothies</strong></td>
<td valign="top">[<a href="#smoothie">Smoothie</a>!]</td>
<td>

Get all smoothies you made

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ingredient</strong></td>
<td valign="top"><a href="#ingredient">Ingredient</a></td>
<td>

Get the ingredient by ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>signup</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Create a new user and returns a valid login token

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#signupinput">SignupInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteRecipe</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Delete a smoothie you created by its name

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>modifyRecipe</strong></td>
<td valign="top"><a href="#smoothie">Smoothie</a>!</td>
<td>

Update the name of one of your smoothies

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">name</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">recipeName</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addRecipe</strong></td>
<td valign="top"><a href="#smoothie">Smoothie</a>!</td>
<td>

Create a new smoothie

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#smoothieinput">SmoothieInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateIngredient</strong></td>
<td valign="top"><a href="#ingredient">Ingredient</a>!</td>
<td>

Update the ingredient by its ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updates</td>
<td valign="top"><a href="#ingredientupdateinput">IngredientUpdateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteIngredient</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Delete the ingredient

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Ingredient

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

Unique identifier of the ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Name of the ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

How many of the ingredient for recipe

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>unit</strong></td>
<td valign="top"><a href="#ingredientunits">IngredientUnits</a>!</td>
<td>

Units for the quantity of the ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Last Updated

</td>
</tr>
</tbody>
</table>

### Smoothie

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

Unique identifier of the recipe

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Name of the recipe (must be longer than 3 characters)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Last Updated

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ingredients</strong></td>
<td valign="top">[<a href="#ingredient">Ingredient</a>!]</td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td>

Unique identifier of the User

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>firstName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Users first name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Users last name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Users email address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isAdmin</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Users role (only admin exists)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Created

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td>

Date Last Updated

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>smoothies</strong></td>
<td valign="top">[<a href="#smoothie">Smoothie</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### IngredientInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Name of the new ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td>

Quantity of the new ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>unit</strong></td>
<td valign="top"><a href="#ingredientunits">IngredientUnits</a>!</td>
<td>

Unit of the ingredients quantity

</td>
</tr>
</tbody>
</table>

### IngredientUpdateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

New name of the ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>quantity</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

New quantity of the ingredient

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>unit</strong></td>
<td valign="top"><a href="#ingredientunits">IngredientUnits</a></td>
<td>

New unit of the ingredients quantity

</td>
</tr>
</tbody>
</table>

### LoginInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Users email address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Users password (must be greater than 6 characters)

</td>
</tr>
</tbody>
</table>

### SignupInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Users email address

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Users password (must be greater than 6 characters)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>firstName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Users first name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Users last name

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isAdmin</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Flag to create an admin user

</td>
</tr>
</tbody>
</table>

### SmoothieInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Name of your smoothie

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ingredients</strong></td>
<td valign="top">[<a href="#ingredientinput">IngredientInput</a>!]</td>
<td>

All ingredients for this Smoothie

</td>
</tr>
</tbody>
</table>

## Enums

### IngredientUnits

Possible Units for a ingredient

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>CUP</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PINCH</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>GRAM</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>OUNCE</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### DateTime

The javascript `Date` as string. Type represents date and time as the ISO Date string.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

