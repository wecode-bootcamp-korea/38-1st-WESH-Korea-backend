const { appDataSource } = require('./appDataSource');

const checkOwnReview = async (userId, eventReviewId) => {
    return await appDataSource.query(
        `SELECT
            user_id,
            event_id
        FROM event_comments
        WHERE user_id=? AND event_id=?    
        `, [userId, eventReviewId]
    )
}

const getEventReview = async (eventReviewId) => {
    return await appDataSource.query(
        `SELECT 
            ec.content AS event_comment,
            ec.created_at,
            e.title AS event_title,
            e.image_url AS event_img,
            u.name AS user_name
        FROM event_comments ec
        INNER JOIN events e
        ON ec.event_id = e.id
        INNER JOIN users u
        ON ec.user_id = u.id
        WHERE ec.event_id = ${eventReviewId}
    
        `
    );
}

const createEventReview = async (userId, content, eventReviewId) => {
    return await appDataSource.query(
        `INSERT INTO event_comments(
            user_id,
            content,
            event_id
        ) VALUES (?, ?, ?) 
        `, [userId, content, eventReviewId]
    );
}

const modifyEventReview = async (userId, content, eventReviewId) => {
    return await appDataSource.query(
        `UPDATE event_comments
        SET content=?
        WHERE user_id=? AND event_id=?
        `, [content, userId, eventReviewId]
    )
}

const deleteEventReview = async (userId ,eventReviewId) => {
    await appDataSource.query(
        `DELETE FROM event_comments
        WHERE user_id=? AND event_id=?
        `, [userId, eventReviewId]
    )
}

module.exports = {
    getEventReview,
    createEventReview,
    checkOwnReview,
    modifyEventReview,
    deleteEventReview
}