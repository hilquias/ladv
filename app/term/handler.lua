return function (termlib)

   local M = {}

   local yield = coroutine.yield

   function M.Ask (prompt)
      local answer = termlib.prompt (prompt)

      if answer == nil then
	 termlib.write "quit\n"

	 answer = "quit"
      end

      return answer
   end

   function M.Tell (text, style)
      if style then
	 termlib.write (termlib.format (text, termlib.Style[style]))
      else
	 termlib.write (text)
      end
   end

   function M.NewLine ()
      termlib.write "\n"
   end

   function M.run1 (co, input)
      local value = co (input)

      if not value then
	 return
      end

      local tag = assert (value[1])

      local op = assert (value[2][1])

      local args = assert (value[2][2])

      if tag == "term" and op == "Ask" then
	 return M.run1 (co, M.Ask (args.prompt))
      end

      if tag == "term" and op == "Tell" then
	 return M.run1 (co, M.Tell (args.text, args.style))
      end

      if tag == "term" and op == "NewLine" then
	 return M.run1 (co, M.NewLine ())
      end

      return M.run1 (co, yield (value))
   end

   function M.run (co)
      termlib.clear ()
      return M.run1 (co)
   end

   return M

end
