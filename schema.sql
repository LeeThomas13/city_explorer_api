DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    latitude VARCHAR(255),
    longitude VARCHAR(255),
)

