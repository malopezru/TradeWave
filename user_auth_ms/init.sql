CREATE TABLE users (id int, name varchar(255), email varchar(255), createdAt timestamp, updatedAt timestamp);
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH PRIVILEGES;