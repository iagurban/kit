--[[
  Atomically publishes a new subgraph schema if the new version is greater than the existing version.

  KEYS[1]: The versions hash (e.g., 'gateway:graphql_subgraph_versions')
  KEYS[2]: The main subgraphs hash (e.g., 'gateway:graphql_subgraphs')

  ARGV[1]: The service name (e.g., 'chats-service')
  ARGV[2]: The new version (ISO timestamp string)
  ARGV[3]: The new full subgraph object (JSON string)

  Returns:
    1 if the schema was updated.
    0 if the schema was not updated (because the new version was older or the same, or the schema content was unchanged).
--]]

local service_name = ARGV[1]
local new_version = ARGV[2]
local new_schema = ARGV[3]

-- Get the currently stored version for this service
local existing_version = redis.call('HGET', KEYS[1], service_name)

-- Compare versions. If the existing version is the same or newer, do nothing.
if existing_version and tonumber(existing_version) >= tonumber(new_version) then
  return 0
end

-- Get the currently stored schema for this service
local existing_schema = redis.call('HGET', KEYS[2], service_name)

-- Compare schemas. If the existing schema is the same, do nothing.
if existing_schema and existing_schema == new_schema then
  return 0
end

-- If we are here, the new version is newer and the schema has changed. Update everything.
redis.call('HSET', KEYS[1], service_name, new_version)
redis.call('HSET', KEYS[2], service_name, new_schema)

return 1
