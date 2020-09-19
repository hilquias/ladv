if not arg[1] then
   error "Usage: cli.lua model.lua"
end

local model = loadfile (arg[1])

local termlib

if type (jit) == "table" then
   termlib = require "app/term/readline"
else
   termlib = require "app/term/io"
end

local core = require "app/core/handler" (termlib)

core.run (coroutine.wrap (model))
