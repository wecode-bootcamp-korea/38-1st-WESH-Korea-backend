-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_item_quantity INT NOT NULL,
    order_item_price INT NOT NULL,
    other_order_item_detail VARCHAR(1000) NULL,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    order_item_status_code_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES order_items(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (order_item_status_code_id) REFERENCES order_item_status_codes(id)
);
-- migrate:down
DROP TABLE order_items;