-- migrate:up
CREATE TABLE product_tag (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
-- migrate:down
DROP TABLE product_tag;