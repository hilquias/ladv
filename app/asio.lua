local yield = coroutine.yield

function Await (async)
   return yield { "asio", { "Await", { async = async } }}
end
