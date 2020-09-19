local M = {}

local ANSI = {
   CLEAR = "\27[2J",
   RESET = "\27[0m",
   BOLD = "\27[1m",
   UNDERLINE = "\27[4m",
}

M.Style = {
   NORMAL = ANSI.RESET,
   EMPHASIS = ANSI.BOLD,
   UNDERLINE = ANSI.UNDERLINE,
}

function M.get_cols ()
   return tonumber ((os.getenv "COLUMNS") or (os.getenv "COLS"))
end

function M.get_rows ()
   return tonumber ((os.getenv "LINES") or (os.getenv "ROWS"))
end

function M.clear ()
   io.write (ANSI.CLEAR)
end

function M.format (text, style)
   return style .. text .. M.Style.NORMAL
end

function M.read ()
   return io.read ()
end

function M.write (s)
   io.write (s)
end

function M.prompt (s)
   io.write (s)

   local line = io.read ()

   if not line then
      return
   end

   local clean = string.gsub (line, "^%s*(.-)%s*$", "%1")

   return clean
end

return M
