-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    content VARCHAR(2000) NULL,
    thumbnail VARCHAR(1000) NULL,
    stock INT NOT NULL,
    sub_category_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);
-- migrate:down
DROP TABLE products;