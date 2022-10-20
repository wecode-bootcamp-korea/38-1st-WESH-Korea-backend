-- migrate:up
ALTER TABLE likes ADD CONSTRAINT unique_likes UNIQUE (user_id, product_id);

-- migrate:down
ALTER TABLE likes DROP CONSTRAINT unique_likes;