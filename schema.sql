DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude decimal,
    longitude decimal
);

DROP TABLE IF EXISTS weather;

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    forecast VARCHAR(255),
    time VARCHAR(255),
    date_entered VARCHAR(255)
);

