-- migrate:up
CREATE TABLE order_status_codes (
    id INT NOT NULL AUTO_INCREMENT,
    status_description VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
-- migrate:down
DROP TABLE order_status_codes;