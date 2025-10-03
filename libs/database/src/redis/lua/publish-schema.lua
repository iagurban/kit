--[[
  Atomically publishes a new subgraph schema if the new version is greater than the existing version.

  KEYS[1]: The versions hash (e.g., 'gateway:graphql_subgraph_versions')
  KEYS[2]: The hashes hash (e.g., 'gateway:graphql_subgraph_hashes')
  KEYS[3]: The main subgraphs hash (e.g., 'gateway:graphql_subgraphs')

  ARGV[1]: The service name (e.g., 'chats-service')
  ARGV[2]: The new version (ISO timestamp string)
  ARGV[3]: The new schema hash (SHA-256)
  ARGV[4]: The new full subgraph object (JSON string)

  Returns:
    1 if the schema was updated.
    0 if the schema was not updated (because the new version was older or the same).
--]]

local service_name = ARGV[1]
local new_version = ARGV[2]

-- Get the currently stored version for this service
local existing_version = redis.call('HGET', KEYS[1], service_name)

-- Compare versions. If the existing version is the same or newer, do nothing.
if existing_version and existing_version >= new_version then
  return 0
end

-- If we are here, the new version is newer. Update everything.
redis.call('HSET', KEYS[1], service_name, new_version)
redis.call('HSET', KEYS[2], service_name, ARGV[3])
redis.call('HSET', KEYS[3], service_name, ARGV[4])

return 1
