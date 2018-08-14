BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  git_username VARCHAR(255)
);

DROP TABLE IF EXISTS cohorts CASCADE;

CREATE TABLE cohorts (
  id SERIAL PRIMARY KEY,
  fac_name VARCHAR (255) NOT NULL
);

DROP TABLE IF EXISTS git_profiles CASCADE;

CREATE TABLE git_profiles (
  user_id SERIAL PRIMARY KEY,
  git_username VARCHAR (255) NOT NULL,
  git_profile_url VARCHAR (2083) NOT NULL,
  git_photo_url VARCHAR (2083) NOT NULL,
  elo_ranking INTEGER DEFAULT 1500,
  fac_id INTEGER REFERENCES cohorts(id)
);

DROP TABLE IF EXISTS fac_preferences CASCADE;

CREATE TABLE fac_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  fac_id INTEGER NOT NULL REFERENCES cohorts(id)
);

DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY,
  winner_id INTEGER NOT NULL REFERENCES git_profiles(user_id),
  winner_elo INTEGER NOT NULL,
  loser_id INTEGER NOT NULL REFERENCES git_profiles(user_id),
  loser_elo INTEGER NOT NULL,
  rater_id INTEGER NOT NULL REFERENCES users(id)
);

COMMIT;
