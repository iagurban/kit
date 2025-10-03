-- Add a column to store the nn of the event that created this message.
ALTER TABLE messages ADD edited_nn bigint;
