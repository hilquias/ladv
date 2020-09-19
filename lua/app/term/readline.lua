local M = require "app/term/io"

local ffi = require "ffi"

ffi.cdef [[
void free(void *);
char *readline(const char *prompt);
void add_history(const char *line);
]]

local readline = ffi.load "readline"

function M.read ()
   return M.prompt ""
end

function M.prompt (prompt)
   local ptr = readline.readline (prompt)

   local line

   if ptr == nil then
      line = nil
   else
      line = ffi.string (ptr)
   end

   ffi.C.free (ptr)

   if not line then
      return
   end

   local clean = string.gsub (line, "^%s*(.-)%s*$", "%1")

   if clean ~= "" then
      readline.add_history (clean)
   end

   return clean
end

return M
