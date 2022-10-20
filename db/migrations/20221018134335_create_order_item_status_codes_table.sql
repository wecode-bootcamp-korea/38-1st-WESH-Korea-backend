-- migrate:up
CREATE TABLE order_item_statuses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_description VARCHAR(50) NOT NULL
);
-- migrate:down
DROP TABLE order_item_statuses;