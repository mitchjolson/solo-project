CREATE TYPE "orders_status" AS ENUM (
  'created',
  'running',
  'done',
  'failure'
);

CREATE TABLE "games" (
  "id" serial,
  "atlas_id" varchar PRIMARY KEY UNIQUE NOT NULL,
  "name" varchar(100),
  "description" varchar(10000),
  "publisher" varchar(50),
  "year_published" int,
  "min_players" int,
  "max_players" int,
  "playtime" int,
  "category" varchar,
  "rating" int,
  "image" varchar,
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "new_invite" int
);

CREATE TABLE "events" (
  "id" serial PRIMARY KEY,
  "creator_id" int,
  "title" varchar (80),
  "description" varchar (10000),
  "date" timestamp without time zone,
  "time" varchar(20),
  "location" varchar(50)
);

CREATE TABLE "user_games" (
  "id" serial PRIMARY KEY,
  "user_id" int,
  "game_id" varchar
);

CREATE TABLE "events_games" (
  "id" serial PRIMARY KEY,
  "event_id" int,
  "game_id" int,
  "user_id" int
);

CREATE TABLE "events_users" (
  "id" serial PRIMARY KEY,
  "event_id" int,
  "user_id" int,
  "status" varchar (20)
);

CREATE TABLE "friends" (
  "id" serial PRIMARY KEY,
  "user1" int,
  "user2" int,
  "status" varchar
);

CREATE TABLE "game_log" (
  "id" serial primary key,
  "user_id" int,
  "game_id" varchar,
  "action" varchar,
  "entry_date" timestamp without time zone
 );

ALTER TABLE "events" ADD FOREIGN KEY ("creator_id") REFERENCES "user" ("id");

ALTER TABLE "user_games" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_games" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("atlas_id");

ALTER TABLE "events_games" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "events_games" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("atlas_id");

ALTER TABLE "events_games" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "events_users" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "events_users" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("user1") REFERENCES "user" ("id");

ALTER TABLE "friends" ADD FOREIGN KEY ("user2") REFERENCES "user" ("id");

ALTER TABLE "game_log" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("atlas_id");


-- Trigger to log when a user adds a game
create or replace function logaddgamefunction() returns trigger as $add_game_table$
	begin
		insert into game_log(user_id, game_id, entry_date, action) VALUES (new.user_id, new.game_id, current_timestamp, 'add');
		return new;
	end;
$add_game_table$ LANGUAGE plpgsql;

create trigger logaddgametrigger after insert on user_games
for each row execute procedure logaddgamefunction();


-- Trigger to log when a user removes a game
create or replace function logremovegamefunction() returns trigger as $remove_game_table$
	begin
		insert into game_log(user_id, game_id, entry_date, action) VALUES (old.user_id, old.game_id, current_timestamp, 'delete');
		return new;
	end;
$remove_game_table$ LANGUAGE plpgsql;

create trigger logremovegametrigger after delete on user_games
for each row execute procedure logremovegamefunction();


