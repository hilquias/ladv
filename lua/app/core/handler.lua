return function (termlib)

   local M = {}

   local chain = require "app/util".chain

   local handlers = {
      require "app/term/handler" (termlib).run,
      require "app/more/handler" (termlib).run,
      require "app/wrap/handler" (termlib).run,
   }

   function M.run (co)
      chain (co, handlers)
   end

   return M

end
