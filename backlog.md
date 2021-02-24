 - - - - - - - - ISSUE / BUG BACKLOG - - - - - - - -
// mines being assinged to cells that already have mines. Have work around, but not 100% fix. Fixed, but can cause issues when implementing the reveal 0 cell function with recusion
// make it so that ${mines} is static for updateMinesFlagged()
// get it so that bonus plays, and then game won audio after each other
// when a mine gets flagged and 
// using createGrid() for the reset game function creates a new grid, how do I remove the old grid and build a new one?
// 

while is the next one is not a number, use that for the function, create an empyy array an then once its clicked it checks the ones next to it, if its a vlaid square amd nt a number add it to the array.






 - - - - - - - - FEATURES TO ADD BACKLOG - - - - - - - -
0. add a win function
0.1 finished win function, but the flag and win play at the same time, need to resolve.
1. needs a game timer
2. needs a easy, medium, and hard difficulty
2.1 Easy = width 10 * 10, 5 wrong, timer = 3 mins
2.2 Medium = width 15 * 15, 3 wrong, timer = 2 mins
2.3 hard = width 25 * 25, 1 wrong flag allowed, timer = 1.30
3. recursion function so that when a 0 value cell activates, it runs the function on itself and so on. Using class lists for all the data which is getting very muddy.
4. issue that players can easily inspect board or console.log to see where mines are and win. 
5. make a start button that stars the game and then gets replaced with a reset button