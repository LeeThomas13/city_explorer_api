DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(255),
    latitude VARCHAR(255),
    longitude VARCHAR(255)
)

