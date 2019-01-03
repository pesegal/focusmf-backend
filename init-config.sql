/* 
    Run this SQL to initialize the postgres database with proper permissions and details.
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