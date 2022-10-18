-- migrate:up
CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    score INT NOT NULL,
    content VARCHAR(2000) NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
-- migrate:down
DROP TABLE reviews;