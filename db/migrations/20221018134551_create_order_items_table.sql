-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_item_quantity INT NOT NULL,
    order_item_price INT NOT NULL,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    order_item_status_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (order_item_status_id) REFERENCES order_item_statuses(id)
);
-- migrate:down
DROP TABLE order_items;