

async function test(){
    console.log(1);
    await test1();
    console.log(3);
    await test1();
    console.log(4);
    await test1();
};

async function test1(){
    return new Promise(resolve => {
        setTimeout(resolve,1000)
    })
};

test();