-- =================================================================
-- Step 1: Create the Keyspace
-- Defines the data container for the application.
-- =================================================================
CREATE KEYSPACE IF NOT EXISTS poslah
  WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor': 1 -- Use 1 for local development, 3 for production.
    };

-- Switch to the newly created keyspace for all subsequent commands.
USE poslah;

-- =================================================================
-- Step 2: Define User-Defined Types (UDTs)
-- These are complex data structures embedded within the messages table.
-- =================================================================

-- UDT for a single file attachment.
-- This is a denormalized snapshot of the file's metadata from the files-service.
CREATE TYPE IF NOT EXISTS attachment_info (
                                            file_id uuid,          -- The file's unique ID in the PostgreSQL `files` table.
                                            mime_type text,        -- The standard MIME type (e.g., 'image/jpeg').
                                            url text,              -- The direct CDN URL to the file.
                                            filename text,         -- The original filename for display purposes.
                                            size bigint,           -- File size in bytes.
                                            metadata map<text, text> -- Extra UI metadata (e.g., {"width": "1920", "height": "1080"}).
                                          );

-- UDT for a single forwarded message.
-- This creates a complete, immutable snapshot of the original message's content.
CREATE TYPE IF NOT EXISTS forward_info (
                                         chat_id uuid,          -- The ID of the chat where the message originated.
                                         nn bigint,             -- The user-facing `nn` of the original message in its chat.
                                         text text,             -- A copy of the original text content.
                                         author_id uuid,        -- The ID of the original author.
                                         created_at timestamp,   -- The original creation timestamp.
                                         attachments list<frozen<attachment_info>> -- A copy of the original attachments.
                                       );

-- =================================================================
-- Step 3: Create the `messages` Table
-- This table is the read-model for all chat messages.
-- =================================================================
CREATE TABLE IF NOT EXISTS messages (
  -- Partition Key: Groups all messages of a single chat on the same node(s).
                                      chat_id uuid,

  -- Clustering Key: Sorts messages within a chat. This is the user-facing, gapless message number.
                                      nn bigint,

  -- === Core Content ===
                                      text text,
                                      author_id uuid,

  -- === Features ===
  -- A list of forwarded messages, allowing for grouped forwarding. `null` if not a forward.
                                      forwarded list<frozen<forward_info>>,

  -- A list of attachments for this message.
                                      attachments list<frozen<attachment_info>>,

  -- For replies, stores the `nn` of the message being replied to within the same chat.
                                      reply_to_nn bigint,

  -- === Timestamps for State Management ===
                                      created_at timestamp,
                                      edited_at timestamp,
                                      deleted_at timestamp,

  -- === PRIMARY KEY Definition ===
  -- The combination of chat_id and nn uniquely identifies a message.
                                      PRIMARY KEY (chat_id, nn)
)
  -- CRITICAL OPTIMIZATION: Physically stores messages on disk sorted from newest to oldest.
-- This makes fetching the latest messages (`ORDER BY nn DESC`) extremely fast.
  WITH CLUSTERING ORDER BY (nn DESC);

-- =================================================================
-- Step 4: Create Secondary Indexes
-- Use with caution, primarily for low-cardinality fields or specific query patterns.
-- =================================================================

-- Allows looking up all messages sent by a specific user across all chats.
-- Note: This can be an expensive query if a user has millions of messages.
CREATE INDEX IF NOT EXISTS ON messages (author_id);
