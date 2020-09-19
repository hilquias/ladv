-- WUMPUS - Original BASIC code by Gregory Yob.

-- ===================================================================

require "lib/util"

-- ===================================================================

local function Choose (question, choices, callbacks)
   local choices_str = " (" .. table.concat (choices, "-") .. "): "

   local answer

   repeat
      answer = string.upper (Ask (question .. choices_str))
   until callbacks[answer] ~= nil

   NewLine ()

   return callbacks[answer]
end

-- ===================================================================

local function ChooseRange (question, min, max)
   local choices_str = " (" .. min .. "-" .. max .. "): "

   local answer

   repeat
      answer = tonumber (Ask (question .. choices_str))
   until answer and min <= answer and answer <= max

   NewLine ()

   return answer
end

-- ===================================================================

local function YesOrNo (question)
   return Choose (question, { "Y", "N" }, { Y = true, N = false })
end

-- ===================================================================

if YesOrNo "INSTRUCTIONS?" then
   NewLine ()
   PrintLn ('WELCOME TO "HUNT THE WUMPUS"', Style.EMPHASIS)
   PrintLn "THE WUMPUS LIVES IN A CAVE OF 20 ROOMS EACH ROOM HAS 3 TUNNELS LEADING TO OTHER ROOMS. (LOOK AT A DODECAHEDRON TO SEE HOW THIS WORKS-IF YOU DON'T KNOW WHAT A DODECAHEDRON IS, ASK SOMEONE)"
   Cut ()
   PrintLn ("HAZARDS", Style.EMPHASIS)
   PrintLn "BOTTOMLESS PITS - TWO ROOMS HAVE BOTOMLESS PITS IN THEM IF YOU GO THERE, YOU FALL INTO THE PIT (& LOSE!)"
   Cut ()
   PrintLn "SUPER BATS - TWO OTHER ROOMS HAVE SUPER BATS. IF YOU GO THERE, A BAT GRABS YOU AND TAKES YOU TO SOME OTHER ROOM AT RANDOM. (WHICH MIGHT BE TROUBLESOME)"
   Cut ()
   PrintLn ("WUMPUS", Style.EMPHASIS)
   PrintLn "THE WUMPUS IS NOT BOTHERED BY THE HAZARDS (HE HAS A SUCKER FEET AND IS TOO BIG FOR A BAT TO LIFT). USALLY HE IS ASLEEP. TWO THINGS WAKE HIM UP: YOUR ENTERING HIS ROOM OR YOUR SHOOTING AN ARROW."
   Cut ()
   PrintLn "IF THE WUMPUS WAKES, HE MOVES (P=.75) ONE ROOM OR STAYS STILL (P=0.25). AFTER THAT, IF HE IS WHERE YOU ARE, HE EATS YOU UP (& YOU LOSE!)"
   Cut ()
   PrintLn ("YOU", Style.EMPHASIS)
   PrintLn "EACH TURN YOU MAY MOVE OR SHOOT A CROOKED ARROW"
   Cut ()
   PrintLn "MOVING: YOU CAN GO ONE ROOM (THRU ONE TUNNEL)"
   PrintLn "ARROWS: YOU HAVE 5 ARROWS. YOU LOSE WHEN YOU RUN OUT."
   PrintLn "EACH ARROW CAN GO FROM 1 TO 5 ROOMS. YOU AIM BY TELLING THE COMPUTER THE ROOMS YOU WANT THE ARROW TO GO. IF THE ARROW CAN'T GO THAT WAY (IE NO TUNNEL) IT MOVES AT RANDOM TO THE NEXT ROOM."
   Cut ()
   PrintLn "IF THE ARROW HITS THE WUMPUS, YOU WIN."
   PrintLn "IF THE ARROW HITS YOU, YOU LOSE."
   Cut ()
   PrintLn ("WARNINGS", Style.EMPHASIS)
   PrintLn "WHEN YOU ARE ONE ROOM AWAY FROM WUMPUS OR HAZARD, THE COMPUTER SAYS:"
   Cut ()
   PrintLn "WUMPUS - I SMELL A WUMPUS"
   PrintLn "BAT	- BATS NEARBY"
   PrintLn "PIT	- I FEEL A DRAFT"
   NewLine ()
   Wait ()
   NewLine ()
end

-- ===================================================================

-- 0068 REM- SET UP CAVE (DODECAHEDRAL NODE LIST)

local CAVE = {
   { 2, 5, 8 },
   { 1, 3, 10 },
   { 2, 4, 12 },
   { 3, 5, 14 },
   { 1, 4, 6 },
   { 5, 7, 15 },
   { 6, 8, 17 },
   { 1, 7, 9 },
   { 8, 10, 18 },
   { 2, 9, 11 },
   { 10, 12, 19 },
   { 3, 11, 13 },
   { 12, 14, 20 },
   { 4, 13, 15 },
   { 6, 14, 16 },
   { 15, 17, 20 },
   { 7, 16, 18 },
   { 9, 17, 19 },
   { 11, 18, 20 },
   { 13, 16, 19 },
}

local CAVE_B = {}

for J = 1, #CAVE do
   CAVE_B[J] = {}

   for K = 1, 3 do
      CAVE_B[J][CAVE[J][K]] = true
   end
end

local THING = {
   PLAYER = 1, WUMPUS = 2, PIT1 = 3, PIT2 = 4, BAT1 = 5, BAT2 = 6,
}

local DANGER = {
   THING.WUMPUS, THING.PIT1, THING.PIT2, THING.BAT1, THING.BAT2
}

local ACTION = { MOVE = 1, SHOOT = 2 }

-- ===================================================================

local function FNA () return math.random (1, 20) end

local function FNB () return math.random (1, 3) end

local function FNC () return math.random (1, 4) end

-- ===================================================================

::SETUP::

do
   local SEED

   if YesOrNo "RANDOM GAME?" then
      SEED = os.time ()
      PrintLn ("SEED IS " .. SEED)
   else
      repeat
	 SEED = tonumber (Ask "SEED: ")
      until SEED ~= nil
   end

   NewLine ()

   math.randomseed (SEED)
end

-- 0200 REM-LOCATE L ARRAY ITEMS

local SHUFFLED = {}

for J = 1, #CAVE do
   table.insert (SHUFFLED, math.random (1, #SHUFFLED + 1), J)
end

local LOCATION = {}

for _, IX in pairs (THING) do
   LOCATION[IX] = SHUFFLED[IX]
end

-- ===================================================================

-- 0350 REM-SET# ARROWS

::START::

local ARROWS_P = { 5 }

local ALIVE_P = { 0 }

-- ===================================================================

-- 0370 REM-RUN THE GAME

PrintLn ('"HUNT THE WUMPUS"', Style.EMPHASIS)

NewLine ()

::LOOP::

-- ===================================================================

-- 2000 REM-PRINT LOCATION & HAZARD WARNINGS

do
   local HERE = LOCATION[THING.PLAYER]

   PrintLn ("YOU ARE IN ROOM " .. HERE, Style.EMPHASIS)

   for _, X in ipairs (DANGER) do
      if CAVE_B[HERE][LOCATION[X]] then
	 if X == THING.WUMPUS then
	    PrintLn "I SMELL A WUMPUS!"
	 end
	 if X == THING.PIT1 or X == THING.PIT2 then
	    PrintLn "I FEEL A DRAFT"
	 end
	 if X == THING.BAT1 or X == THING.BAT2 then
	    PrintLn "BATS NEARBY!"
	 end
      end
   end

   PrintLn ("TUNNELS LEAD TO " .. table.concat (CAVE[HERE], ", "))
end

-- ===================================================================

-- 3370 REM-MOVE WUMPUS ROUTINE

local function MoveWumpus ()
   local K = FNC ()

   if K ~= 4 then
      LOCATION[THING.WUMPUS] = CAVE[LOCATION[THING.WUMPUS]][K]
   end

   if LOCATION[THING.WUMPUS] == LOCATION[THING.PLAYER] then
      PrintLn "TSK TSK TSK - WUMPUS GOT YOU!"
      NewLine ()
      ALIVE_P[1] = -1
   end
end

-- ===================================================================

-- 2500 REM-CHOOSE OPTION

NewLine ()

local action = Choose ("SHOOT OR MOVE?", { "S", "M" }, { M = ACTION.MOVE, S = ACTION.SHOOT })

-- ===================================================================

if action == ACTION.MOVE then

   -- ================================================================

   -- 4000 REM-MOVE ROUTINE

   local L

   ::RETRY::

   -- 4060 REM-CHECK IF LEGAL MOVE

   L = ChooseRange ("WHERE TO?", 1, 20)

   if not CAVE_B[LOCATION[THING.PLAYER]][L] then
      PrintLn "NOT POSSIBLE"
      NewLine ()
      goto RETRY
   end

   ::CHECK::

   LOCATION[THING.PLAYER] = L

   -- 4120 REM-CHECK FOR HAZARDS

   if L == LOCATION[THING.WUMPUS] then
      PrintLn "...OOPS! BUMPED A WUMPUS!"
      NewLine ()
      MoveWumpus ()
   end

   if ALIVE_P[1] == 0 and (L == LOCATION[THING.PIT1] or L == LOCATION[THING.PIT2]) then
      PrintLn "YYYIIIIEEEE ... FELL IN PIT"
      NewLine ()
      ALIVE_P[1] = -1
   end

   if ALIVE_P[1] == 0 and (L == LOCATION[THING.BAT1] or L == LOCATION[THING.BAT2]) then
      PrintLn "ZAP--SUPER BAT SNATCH! ELSEWHEREVILLE FOR YOU!"
      NewLine ()
      L = FNA ()
      goto CHECK
   end

   -- ================================================================

end

if action == ACTION.SHOOT then

   -- ================================================================

   -- 3020 REM-PATH OF ARROW

   local COUNT = ChooseRange ("NO. OF ROOMS", 1, 5)

   local PATH = {}

   for K = 1, COUNT do
      while true do
	 local I = ChooseRange ("Room #" .. K .. "?", 1, 20)

	 PATH[K] = I

	 if K <= 2 then
	    break
	 end

	 if PATH[K] ~= PATH[K - 2] then
	    break
	 end

	 PrintLn "ARROWS AREN'T THAT CROOKED - TRY ANOTHER ROOM"

	 NewLine ()
      end
   end

   assert (COUNT == #PATH)

   -- ================================================================

   -- 3120 REM-SHOOT ARROW

   local HERE = LOCATION[THING.PLAYER]

   for K = 1, #PATH do
      if CAVE_B[HERE][PATH[K]] then
	 HERE = PATH[K]
      else
	 -- 3180 REM-NO TUNNEL FOR ARROW
	 HERE = CAVE[HERE][FNB ()]
      end

      -- 3290 REM-SEE IF ARROW IS AT L(1) OR L(2)

      if HERE == LOCATION[THING.WUMPUS] then
	 PrintLn "AHA! YOU GOT THE WUMPUS!"
	 NewLine ()
	 ALIVE_P[1] = 1
      end

      if ALIVE_P[1] ~= 1 and HERE == LOCATION[THING.PLAYER] then
	 PrintLn "OUCH! ARROW GOT YOU!"
	 NewLine ()
	 ALIVE_P[1] = -1
      end
   end

   -- ================================================================

   if ALIVE_P[1] == 0 then

      -- =============================================================

      PrintLn "MISSED"
      NewLine ()
      MoveWumpus ()

      -- =============================================================

      -- 3250 REM-AMMO CHECK

      ARROWS_P[1] = ARROWS_P[1] - 1

      if ARROWS_P[1] <= 0 then
	 ALIVE_P[1] = -1
      end

      -- =============================================================

   end

   -- ================================================================

end

-- ===================================================================

if ALIVE_P[1] == 0 then
   goto LOOP
end

-- ===================================================================

-- 0520 REM-LOSE

if ALIVE_P[1] < 0 then
   PrintLn ("HA HA HA - YOU LOSE!", Style.EMPHASIS)
end

-- 0540 REM-WIN

if ALIVE_P[1] > 0 then
   PrintLn ("HEE HEE HEE - THE WUMPUS'LL GETCHA NEXT TIME!!", Style.EMPHASIS)
end

NewLine ()

-- ===================================================================

for _, IX in pairs (THING) do
   LOCATION[IX] = SHUFFLED[IX]
end

if YesOrNo "SAME SET-UP?" then
   goto START
else
   goto SETUP
end

-- ===================================================================
