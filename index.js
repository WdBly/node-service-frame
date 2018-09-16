class Copycat {
    constructor(){
        this.queue = [];
        this.index = 0;
        this.res = {
            url:"app/home",
            body:{
                userName:"Jim",
                password:123456
            }
        }
    }

    use(fn){
        this.queue.push(fn);
    }

    start(){
        //应为 next方法需要在class外部被调用，所以如果需要在next方法内部使用this 需要先bind this
        this.queue[this.index](this.res,this.next.bind(this));
    }

    async next(){
        if(this.index < this.queue.length - 1){
            this.index++;
            this.start();
        }

        return new Promise(resolve => {
            resolve()
        })
    }

    listen(timing,fn){
        setTimeout(() => {
            this.queue.length ? fn(this) : "暂无中间件";
        },timing);
    }
}



var app = new Copycat();

//使用 await暂缓移交执行权限
app.use(async (res,next) => {
    console.log(1);

    await new Promise(resolve => {
        setTimeout(resolve,500)
    });

    next();
    console.log(6);
});

//如果有多个next 只有第一个 next会移交执行权 这与我们写的方式有关系 
app.use(async (res,next) => {
    console.log(2);
    next();
    console.log(5);
    //await next();
    next();
    console.log(55);
});

app.use(async (res,next) => {
    console.log(3);
    next();
    console.log(4);
});


app.listen(0,res => {
    res.start();
})