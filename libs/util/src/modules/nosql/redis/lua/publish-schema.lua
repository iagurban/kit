--[[
  Atomically publishes a new subgraph schema if the new version is greater than the existing version.

  KEYS[1]: The versions hash (e.g., 'gateway:graphql_subgraph_versions')
  KEYS[2]: The main subgraphs hash (e.g., 'gateway:graphql_subgraphs')

  ARGV[1]: The service name (e.g., 'chats-service')
  ARGV[2]: The new version (numeric string, e.g., Unix timestamp)
  ARGV[3]: The new full subgraph object (JSON string)

  Returns:
    1 if the schema was updated.
    0 if the schema was not updated.
--]]

local service_name = ARGV[1]
local new_version = ARGV[2]
local new_schema = ARGV[3]

-- Get the currently stored version for this service
local existing_version_str = redis.call('HGET', KEYS[1], service_name)

-- Convert both versions to numbers.
-- tonumber() will return nil if the string is not a valid number (or if it's nil)
local new_version_num = tonumber(new_version)
local existing_version_num = tonumber(existing_version_str)

-- Compare versions.
-- If existing_version_num is not nil (meaning it was a valid number)
-- AND it's greater than or equal to the new version, do nothing.
if existing_version_num and new_version_num and existing_version_num >= new_version_num then
  return 0
end

-- Get the currently stored schema for this service
local existing_schema = redis.call('HGET', KEYS[2], service_name)

-- Compare schemas. If the existing schema is the same, do nothing.
if existing_schema and existing_schema == new_schema then
  return 0
end

-- If we are here, the new version is newer (or the old version was invalid)
-- and the schema has changed. Update everything.
redis.call('HSET', KEYS[1], service_name, new_version)
redis.call('HSET', KEYS[2], service_name, new_schema)

return 1
