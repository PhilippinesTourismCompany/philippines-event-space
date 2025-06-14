/*
  # Add Message Delete and Highlight Features

  1. Changes
    - Add `is_deleted` column to messages table
    - Add `is_highlighted` column to messages table  
    - Add `deleted_at` column to messages table
    - Add `highlighted_at` column to messages table
    - Update RLS policies to handle deleted messages
    - Update unread count function to exclude deleted messages

  2. Security
    - Users can only delete their own messages
    - Deleted messages show as "This message has been deleted"
    - Highlighted messages are visible to all conversation participants
*/

-- Add new columns to messages table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'is_deleted'
  ) THEN
    ALTER TABLE messages ADD COLUMN is_deleted boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'is_highlighted'
  ) THEN
    ALTER TABLE messages ADD COLUMN is_highlighted boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE messages ADD COLUMN deleted_at timestamptz;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'highlighted_at'
  ) THEN
    ALTER TABLE messages ADD COLUMN highlighted_at timestamptz;
  END IF;
END $$;

-- Create index for better performance on deleted messages
CREATE INDEX IF NOT EXISTS idx_messages_is_deleted ON messages(is_deleted);
CREATE INDEX IF NOT EXISTS idx_messages_is_highlighted ON messages(is_highlighted);

-- Update the unread message count function to exclude deleted messages
CREATE OR REPLACE FUNCTION get_unread_message_count(user_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM messages m
    JOIN conversations c ON c.id = m.conversation_id
    WHERE (c.client_id = user_id OR c.vendor_id = user_id)
    AND m.sender_id != user_id
    AND m.read_at IS NULL
    AND m.is_deleted = false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS policy for message deletion (users can only delete their own messages)
CREATE POLICY "Users can delete their own messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid())
  WITH CHECK (sender_id = auth.uid());

-- Update existing data to set default values
UPDATE messages 
SET is_deleted = false, is_highlighted = false 
WHERE is_deleted IS NULL OR is_highlighted IS NULL;

-- Make the columns NOT NULL now that we have default values
ALTER TABLE messages ALTER COLUMN is_deleted SET NOT NULL;
ALTER TABLE messages ALTER COLUMN is_highlighted SET NOT NULL;