require "app/asio"

local M = {}

local ANSI = {
   CLEAR = "\27[2J",
   RESET = "\27[0m",
   BOLD = "\27[1m",
   UNDERLINE = "\27[4m",
}

local js = require "js"

local window = js.global

local termApi = window.termApi

M.Style = {
   NORMAL = ANSI.RESET,
   EMPHASIS = ANSI.BOLD,
   UNDERLINE = ANSI.UNDERLINE,
}

function M.get_cols ()
   return Await (termApi:getCols ())
end

function M.get_rows ()
   return Await (termApi:getRows ())
end

function M.clear ()
   M.write (ANSI.CLEAR)
end

function M.format (text, style)
   return style .. text .. M.Style.NORMAL
end

function M.read ()
   return M.prompt ""
end

function M.write (text)
   Await (termApi:write (text))
end

function M.prompt (text)
   return Await (termApi:prompt (text))
end

return M
