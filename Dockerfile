FROM library/postgres
COPY init-config.sql /docker-entrypoint-initdb.d/
