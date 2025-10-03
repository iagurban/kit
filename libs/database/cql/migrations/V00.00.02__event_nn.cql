-- Add a column to store the nn of the event that created this message.
ALTER TABLE messages ADD event_nn bigint;

-- Optionally, create an index if you ever need to find a message by its event_nn.
CREATE INDEX IF NOT EXISTS ON messages (event_nn);
