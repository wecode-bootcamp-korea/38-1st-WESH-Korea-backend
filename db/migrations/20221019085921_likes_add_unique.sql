-- migrate:up
ALTER TABLE likes ADD UNIQUE (user_id, product_id);

-- migrate:down
ALTER TABLE likes DROP UNIQUE (user_id, product_id);