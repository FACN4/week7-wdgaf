BEGIN;

DROP TABLE IF EXISTS USERS CASCADE;

CREATE TABLE USERS (
  user_id SERIAL PRIMARY KEY,
  git_username VARCHAR (255) NOT NULL,
  git_profile_url VARCHAR (2083) NOT NULL,
  git_photo_url VARCHAR (2083) NOT NULL,
  elo_ranking INTEGER DEFAULT 1500
);
-- INSERT INTO USERS (git_username,git_profile_url,git_photo_url,elo_ranking)
--  VALUES('spiderMAN','WWW',80),
--  ('WAKWOK','booktook',70);

DROP TABLE IF EXISTS RATINGS CASCADE;

CREATE TABLE RATINGS (
  rating_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES USERS(user_id),
  winner BOOLEAN NOT NULL,
  opponent_id TEXT NOT NULL,
  opponent_elo INTEGER DEFAULT 1500,

);
-- INSERT INTO RATINGS (user_id,winner,opponent_id,opponent_elo)
--  -- VALUES('spiderMAN','WWW',80),
--  -- ('WAKWOK','booktook',70);

COMMIT;
