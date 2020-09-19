require "lib/core"

function Print (text, style)
   local words = {}

   for word in string.gmatch (text, "%g+") do
      table.insert (words, word)
   end

   for _, word in ipairs (words) do
      Tell (word, style)

      if next (words, _) then
	 Break ()
      end
   end
end

function PrintLn (text, style)
   Print (text, style)
   NewLine ()
end

function Wait ()
   Ask "Hit ENTER to continue..."
end
