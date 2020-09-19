local M = {}

local ref = { {} }

function M.list_save_states ()
   return pairs (ref[1])
end

function M.check_read_save_state (savename)
   return ref[1][savename] ~= nil
end

function M.check_write_save_state (savename)
   return true
end

function M.read_save_state (savename)
   return ref[1][savename]
end

function M.write_save_state (savename, savedata)
   ref[1][savename] = savedata
end

function M.clear_save_state (savename)
   ref[1][savename] = nil
end

function M.clear_save_states (savename)
   ref[1] = {}
end

return M
