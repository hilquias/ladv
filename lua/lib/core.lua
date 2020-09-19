-- ===================================================================

local yield = coroutine.yield

-- ===================================================================

Style = {
   NORMAL = "NORMAL",
   EMPHASIS = "EMPHASIS",
   UNDERLINE = "UNDERLINE",
}

function Ask (prompt)
   return yield { "term", { "Ask", { prompt = prompt } } }
end

function Tell (text, style)
   yield { "term", { "Tell", { text = text, style = style } } }
end

function NewLine ()
   yield { "term", { "NewLine", {} } }
end

-- ===================================================================

function Cut ()
   yield { "more", { "Cut", {} } }
end

-- ===================================================================

function Break ()
   yield { "wrap", { "Break", {} } }
end

-- ===================================================================

function ReadSaveState ()
   return yield { "save", { "ReadSaveState", {} } }
end

function WriteSaveState (savedata)
   yield { "save", { "WriteSaveState", { savedata = savedata } } }
end

-- ===================================================================
