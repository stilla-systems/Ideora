# API Routes

## Structure

```
/api
  /auth
    /signup        - Create new user account
    /login         - Authenticate user
    /logout        - End session
  /newsletter
    /subscribe     - Subscribe email to newsletter
  /user
    /profile       - Get/update user profile
    /preferences   - User preferences
  /content
    /ideas         - Get content ideas
    /analytics     - Content analytics
```

## Conventions

- All endpoints return JSON responses with consistent structure
- Authentication required endpoints use session cookies
- Query parameters for filtering/pagination
- POST/PUT for mutations, GET for queries
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

## Example Response

```json
{
  "success": true,
  "data": {},
  "error": null
}
```
