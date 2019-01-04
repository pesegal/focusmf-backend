/* 
    Run this SQL to initialize the postgres database with proper permissions and details. Note! For development only, use generated credentials
	for production.
*/

CREATE USER focus WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'focus';

CREATE DATABASE focusmf
    WITH 
    OWNER = focus
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE focusmf
    IS 'This the local development database for focus.mf project.';


-- PSQL command that sets the active database so that the 'CREATE EXTENSION' applies to the proper database.
\c focusmf
-- The activates the uuid generation functions for postgres and allows us to generate UUID's as keys.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
