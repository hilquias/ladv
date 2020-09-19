package.path = "lua/?.lua"

local js = require "js"

local window = js.global

local model = loadfile "lua/src/WUMPUS.lua"

local termlib = require "app/term/js"

local asio = require "app/asio/handler"

local core = require "app/core/handler" (termlib)

local chain = require "app/util".chain

chain (coroutine.wrap (model), { asio.run, core.run })
