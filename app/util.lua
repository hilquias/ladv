local M = {}

local wrap = coroutine.wrap

function M.chain (co, fns)
   local fn1 = assert (table.remove (fns, 1))
   if #fns > 0 then
      fn1 (wrap (function () M.chain (co, fns) end))
   else
      fn1 (co)
   end
end

function M.new_bucket (min, max)
   local bucket = {
      min = min or 1,
      max = max or 1,
      value = min or 1,
   }

   function bucket:add (d)
      bucket.value = bucket.value + assert (d)
   end

   function bucket:get (d)
      return bucket.value + (d or 0)
   end

   function bucket:get_min ()
      return bucket.min
   end

   function bucket:set_min (new_min)
      bucket.min = new_min
   end

   function bucket:get_max ()
      return bucket.max
   end

   function bucket:set_max (new_max)
      bucket.max = new_max
   end

   function bucket:reset (n)
      bucket.value = n or bucket.min
   end

   function bucket:overflow (d)
      return bucket:get (d) > bucket.max
   end

   function bucket:underflow (d)
      return bucket:get (d) < bucket.min
   end

   function bucket:check (d)
      return not (bucket:overflow (d) or bucket:underflow (d))
   end

   return bucket
end

return M
