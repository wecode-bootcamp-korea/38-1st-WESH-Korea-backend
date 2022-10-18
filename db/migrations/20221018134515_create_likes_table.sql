-- migrate:up
CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- migrate:down
DROP TABLE likes;