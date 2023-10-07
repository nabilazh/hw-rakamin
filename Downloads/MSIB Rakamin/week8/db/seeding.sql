-- Active: 1695642650587@@localhost@5432@postgres
INSERT INTO actor (first_name, last_name) VALUES
  ('John', 'Doe'),
  ('Alice', 'Smith'),
  ('Bob', 'Johnson'),
  ('Eva', 'Williams'),
  ('Michael', 'Brown');

ALTER TABLE actor ADD COLUMN age INT;
