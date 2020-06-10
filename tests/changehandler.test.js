let { ChangeHandler } = require("../src/changehandler");

// 1. constructor
// 1. a. amountDue is set based on an argument 
describe('ChangeHandler', function() {
    //Arrange
    it('1.a. amountDue is set based on an argument', function (){
        let cash = new ChangeHandler(100);
    //Act
        expect(cash.amountDue).toBe(100);         
    });

// 1. b. cashTendered is set to zero
    it('1.b. cashTendered is set to zero', function (){
        let cash = new ChangeHandler(100);
        expect(cash.cashTendered).toBe(0); 
    });

// 2. insertCoin
// 2.a. Inserting a quarter adds 25
    it('2.a. insertCoin: Inserting a quarter adds 25', function (){
        //arrange
        let cash = new ChangeHandler(100);
        //act
        cash.insertCoin('quarter');
        expect(cash.cashTendered).toBe(25);
    //another test
        //arrange
        let cash2 = new ChangeHandler(100);
        cash2.cashTendered = 10;
        //act
        cash2.insertCoin('quarter');
        expect(cash2.cashTendered).toBe(35);    
    });
        
// 2.b. Inserting a dime adds 10
    it('2.b. Inserting a dime adds 10', function (){
        //arrange
        let cash = new ChangeHandler(100);
        //act
        cash.insertCoin('dime');
        expect(cash.cashTendered).toBe(10);    
    });

// 2.c. Inserting a nickel adds 5
    it('2.c. Inserting a nickel adds 5', function (){
        //arrange
        let cash = new ChangeHandler(100);
        //act
        cash.insertCoin('nickel');
        expect(cash.cashTendered).toBe(5);    
    });

// 2.d. Inserting a penny adds 1
    it('2.d. Inserting a penny adds 1', function (){
        //arrange
        let cash = new ChangeHandler(100);
        //act
        cash.insertCoin('penny');
        expect(cash.cashTendered).toBe(1);    
    });
// 2.e. Calling function multiple times continues to add on to the amount
    it('2.e. Calling a function multiple times continues to add on to the amount', function (){
        //arrange
        let cash = new ChangeHandler(100);
        //act
        cash.insertCoin('quarter');
        cash.insertCoin('dime');
        cash.insertCoin('nickel');
        cash.insertCoin('penny');
        cash.insertCoin('penny');
        expect(cash.cashTendered).toBe(42);    
    });

// 3. isPaymentSufficient:
// 3.a. Returns true if cashTendered more than amountDue
    it('3.a. isPaymentSufficient: Returns true if cashTendered more than amountDue', function(){
        //arrange
        let cash = new ChangeHandler(10);
        cash.cashTendered = 25, 
        //act
        expect(cash.isPaymentSufficient()).toBeTruthy();
    });

// 3.b. Returns false if cashTendered less than amountDue 
    it('3.b. Returns false if cashTendered less than amountDue', function(){
        //arrange
        let cash = new ChangeHandler(50);
        //act
        expect(cash.isPaymentSufficient()).toBeFalsy();
    });
// 3.c. Returns true if cashTendered equal to amountDue
    it('3.c. Returns true if cashTendered equal to AmountDue', function(){
        //arrange
        let cash = new ChangeHandler(25);
        cash.cashTendered = 25;
        //act
        expect(cash.isPaymentSufficient()).toBeTruthy();
        
        //another test:
        //arrange
        let cash2 = new ChangeHandler(25);
        cash2.insertCoin('quarter');
        //act
        expect(cash2.isPaymentSufficient()).toBeTruthy();
});

// 4. giveChange
// 4.a. 32 change produces: quarters: 1, dimes: 0, nickels:1, 1, pennies: 2.
    it('4.a. giveChange: 32 change produces: quarters: 1, dimes: 0, nickels:1, 1, pennies: 2.', function(){
        //arrange
        let cash = new ChangeHandler(68)
        cash.cashTendered = 100;
        const expectedChange = {
            quarters: 1,
            dimes: 0,
            nickels: 1,
            pennies: 2
        };
        //act
        expect(cash.giveChange()).toMatchObject(expectedChange);

        //more repetitive alternate method that I came up with first:
            // expect(cash.giveChange()).toHaveProperty('quarters', 1);
            // expect(cash.giveChange()).toHaveProperty('dimes', 0);
            // expect(cash.giveChange()).toHaveProperty('nickels', 1);
            // expect(cash.giveChange()).toHaveProperty('pennies', 2);
    });

// 4.b. 10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0.
    it('4.b. 10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0.', function() {
        //arrange
        let cash = new ChangeHandler(90)
        cash.cashTendered = 100;
        const expectedChange = {
            quarters: 0,
            dimes: 1,
            nickels: 0,
            pennies: 0
        };
        //act
        expect(cash.giveChange()).toMatchObject(expectedChange);
    });

// 4.c. 27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2. 
    it('4.c. 27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2.', function() {
        //arrange
        let cash = new ChangeHandler(73)
        cash.cashTendered = 100;
        const expectedChange = {
            quarters: 1,
            dimes: 0,
            nickels: 0,
            pennies: 2
        };
        //act
        expect(cash.giveChange()).toMatchObject(expectedChange);
    });

// 4.d. 68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3. 
it('4.d. 68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3.', function() {
    //arrange
    let cash = new ChangeHandler(32)
    cash.cashTendered = 100;
    const expectedChange = {
        quarters: 2,
        dimes: 1,
        nickels: 1,
        pennies: 3
    };
    //act
    expect(cash.giveChange()).toMatchObject(expectedChange);
});
});
