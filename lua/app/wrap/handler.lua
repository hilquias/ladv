return function (termlib)

   local M = {}

   local util = require "app/util"

   local yield = coroutine.yield

   -- ================================================================

   local charcounter = util.new_bucket (1, 80)

   local function update_max_cols ()
      local cols = termlib.get_cols ()

      if rows then
	 local maxcol = cols

	 if maxcol ~= charcounter:get_max () then
	    charcounter:set_max (maxcol)
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

      if tag == "wrap" and op == "Break" then
	 if charcounter:check (9) then
	    Tell " "
	    charcounter:add (1)
	 else
	    NewLine ()
	    charcounter:reset ()
	 end

	 return M.run1 (co)
      end

      if tag == "term" and op == "Ask" then
	 charcounter:reset ()
      end

      if tag == "term" and op == "Tell" then
	 charcounter:add (#args.text)
      end

      if tag == "term" and op == "NewLine" then

	 -- ==========================================================

	 update_max_cols ()

	 -- ==========================================================

	 charcounter:reset ()

      end

      if tag == "term" and op == "Cut" then

	 -- ==========================================================

	 update_max_cols ()

	 -- ==========================================================

	 charcounter:reset ()

      end

      return M.run1 (co, yield (value))
   end

   function M.run (co)

      -- =============================================================

      update_max_cols ()

      -- =============================================================

      M.run1 (co)

   end

   return M

end
