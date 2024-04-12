//PLANNING...

// 1. deposit some money
// 2. to determine a number of line user want to bet
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. give the user the money
// 7. play again


//a library or package that helps in taking the value from the user
const prompt = require("prompt-sync")();

const ROWS= 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}




//new way of declaring function in javascript
const deposit = () =>{
    while(true){

        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositamount = parseFloat(depositAmount) //it checks the validity of a number from the user string gets converted into float
        
        if(isNaN(numberDepositamount) || numberDepositamount<=0){
            console.log("invalid for a deposit amount,try again")
        }
        else{
            return numberDepositamount;
        }
    }
}

const getNumberofLines=()=>{
    while (true) {
        const lines = prompt("Enter the Number of lines You wanna bet(1-3): ")
        const numberofLines = parseFloat(lines)

        if(isNaN(numberofLines) || numberofLines >3 || numberofLines <=0){
            console.log("invalid number of lines, try again")
        }
        else{
            return numberofLines
        }
    }
}

const getBet = (balance, lines) =>{
    while (true) {
        const bet = prompt("Enter the total bet: ")
        const numberBet = parseFloat(bet)

        if(isNaN(numberBet) || numberBet<=0 || numberBet >balance / lines){
            console.log("invalid bet, try again")
        }
        else{
            return numberBet
        }
    }
}

const spin = () =>{
    const symbols = [];
    for( const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol)
        }
    }
     const reels = []
     for(let i=0;i<COLS;i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j=0;j<ROWS;j++){
            const RandomIndex = Math.floor(Math.random() * reelSymbols.length)
            const Selectedsymbols = reelSymbols[RandomIndex]
            reels[i].push(Selectedsymbols)
            reelSymbols.splice(RandomIndex,1);
        
        }
     }
     return reels;
}

const transpose = (reels) =>{
    const rows =[]
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j = 0;j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
}

const Printrows = (rows)=>{
    for(const row of rows){
        let rowString = ""
        for(const [i,symbol] of row.entries()){
            rowString+=symbol
            if(i!=row.length-1){
                rowString += "|"
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows,bet,lines)=>{
    let winnings = 0
    for(let row = 0 ; row<lines;row++){
        const symbols = rows[row];
        let allsame = true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allsame= false;
                break;
            }
        }
        if(allsame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings
}

const game =()=>{
let balance = deposit()
while(true){
    console.log("you have a balance of $"+balance)
const getlines = getNumberofLines()
const bet = getBet(balance, getlines)
balance-=bet * getlines
const reels =  spin();
const rows = transpose(reels)

Printrows(rows)

const winnigs = getWinnings(rows,bet,getlines) 
balance+=winnigs
console.log("you won, $"+winnigs.toString())

if(balance<=0){
    console.log("you ran out of money!!")
    break;
}
const playagain = prompt("do you want to play again (y/n)" )

if(playagain!="y") break;
}
}

game();