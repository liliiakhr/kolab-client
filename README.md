# Backlog Quest

<br>

## Description

This is an app that organizes and manages backlog for different types of media. Mainly from streaming and other monthly services.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my backlog
- **Login:** As a user I can login to the platform so that I can start creating and managing my backlog
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Toogle media** As a user I can toogle between different types of media
- **Add elements** As a user I can add elements to my backlog
- **Delete elements** As a user I can delete elements from my backlog
- **Mark elements** As a user I can mark elements in my backlog as done
- **Random element** As a user I can get a random element from my backlog
- **Check profile** As a user I can check my profile and stats

## Backlog

- Friends list
- Recommendations from friends
- Books media
- Comics media

<br>

# Client / Frontend

## React Router Routes (React App)

| Path              | Component                      | Permissions                | Behavior                                                      |
| ----------------- | ------------------------------ | -------------------------- | ------------------------------------------------------------- |
| `/`               | SplashPage                     | public `<Route>`           | Home page                                                     |
| `/signup`         | SignupPage                     | anon only `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`          | LoginPage                      | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login  |
| `/logout`         | n/a                            | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session             |
| `/backlog/series` | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all tv series on backlog                                |
| `/backlog/films`  | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all films on backlog                                    |
| `/backlog/games`  | NavBar, ElementList, FooterBar | user only `<PrivateRoute>` | Shows all games on backlog                                    |
| `/search/series`  | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a tv series to be added                                |
| `/search/films`   | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a film to be added                                     |
| `/search/games`   | SearchForm, SearchResults      | user only `<PrivateRoute>` | Search a game to be added                                     |
| `/add/:id`        | ElementInfo                    | user only `<PrivateRoute>` | Add an element to the backlog                                 |
| `/profile`        | Profile, Stats                 | user only `<PrivateRoute>` | Check profile with stat information                           |
| `/done/series`    | Done list for Series           | user only `<PrivateRoute>` | Shows all tv series finished                                  |
| `/done/films`     | Done list for films            | user only `<PrivateRoute>` | Shows all films finished                                      |
| `/done/games`     | Done list for games            | user only `<PrivateRoute>` | Shows all videogames finished                                 |

## Components

- LoginPage

- SignupPage

- NavBar

- FooterBar

- BackBar

- ElementList

- SearchForm

- SearchResults

- ElementInfo

- Stats

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Backlog Service
  - backlog.filter(type, status) // for different types of media and if they are done or not
  - backlog.detail(id)
  - backlog.add(id)
  - backlog.delete(id)
  - backlog.update(id)
- External API
  - API for games
  - API for series
  - API for films

<br>

# Server / Backend

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  platform: [platforms]
  elements: [{type: Schema.Types.ObjectId,ref:'Media'}]
}
```

Media model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   done: {type: Boolean, required: true},
   platform: {type: String, required: true},
   image: {type: String, required: true}
   description: {type, String, required: true}
   user: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL               | Request Body                | Success status | Error Status | Description                                                                                                                     |
| ----------- | ----------------- | --------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile `  | Saved session               | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`    | {name, email, password}     | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`     | {username, password}        | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`    | (empty)                     | 204            | 400          | Logs out the user                                                                                                               |
| POST        | `/search/add`     | {platform, title, type, id} |                | 400          | Add new backlog element and add to user                                                                                         |
| GET         | `/backlog/series` |                             |                | 400          | Show series elements                                                                                                            |
| GET         | `/backlog/films`  |                             |                |              | Show film elements                                                                                                              |
| GET         | `/backlog/games`  |                             |                |              | Show games elements                                                                                                             |
| GET         | `/media/:id`      |                             | 201            | 400          | Show specific element                                                                                                           |
| PUT         | `/media/:id`      |                             | 200            | 400          | edit element                                                                                                                    |
| DELETE      | `/media/:id`      |                             | 201            | 400          | delete element                                                                                                                  |
| GET         | `/done/series`    |                             |                | 400          | Show series elements                                                                                                            |
| GET         | `/done/films`     |                             |                |              | Show film elements                                                                                                              |
| GET         | `/done/games`     |                             |                |              | Show games elements                                                                                                             |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/iloDccrZ/backlog-quest)
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/jorgeberrizbeitia/backlog-quest)

[Server repository Link](https://github.com/jorgeberrizbeitia/backlog-quest-server)

[Deployed App Link](https://backlog-quest.herokuapp.com/login)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)
{"mode":"full","isActive":false}
