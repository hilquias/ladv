return function (termlib)

   local M = {}

   local util = require "app/util"

   local yield = coroutine.yield

   -- ================================================================

   local linecounter = util.new_bucket (1, 25)

   local function update_max_rows ()
      local rows = termlib.get_rows ()

      if rows then
	 local maxrow = rows - 2

	 if maxrow ~= linecounter:get_max () then
	    linecounter:set_max (maxrow)
	 end
      end
   end

   -- ================================================================

   function M.run1 (co, input)
      local value = co (input)

      if not value then
	 return
      end

      local tag = assert (value[1])

      local op = assert (value[2][1])

      local args = assert (value[2][2])

      if tag == "more" and op == "Cut" then

	 -- ==========================================================

	 update_max_rows ()

	 -- ==========================================================

	 if not linecounter:check (2) then
	    Ask "[MORE]"
	    linecounter:reset ()
	 end

	 NewLine ()
	 linecounter:add (1)
	 return M.run1 (co)
      end

      if tag == "term" and op == "Ask" then
	 linecounter:reset ()
      end

      if tag == "term" and op == "NewLine" then
	 linecounter:add (1)
      end

      return M.run1 (co, yield (value))
   end

   function M.run (co)

      -- =============================================================

      update_max_rows ()

      -- =============================================================

      M.run1 (co)

   end

   return M

end
