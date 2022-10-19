-- migrate:up
CREATE TABLE event_comments (
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(500) NULL,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
-- migrate:down
DROP TABLE event_comments;