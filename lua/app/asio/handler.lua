local M = {}

local yield = coroutine.yield

function M.run (co, input)
   local value = co (input)

   if not value then
      return
   end

   local tag = assert (value[1])

   local op = assert (value[2][1])

   local args = assert (value[2][2])

   if tag == "asio" and op == "Await" then
      local function k (_, input)
	 M.run (co, input)
      end

      local function go (async, k)
	 async["then"] (async, k)
      end

      return go (args.async, k)
   end

   return M.run (co, yield (value))
end

return M
