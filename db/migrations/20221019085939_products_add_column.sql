-- migrate:up
ALTER TABLE products ADD manual VARCHAR(2000) NULL;

-- migrate:down
ALTER TABLE products DROP manual;
