const path=require("path");
let express=require("express");
let router=express.Router();
let app=express();
const devMiddleware=require("webpack-dev-middleware");
let webpack=require("webpack");
 //let config=require("../config/webpack.js");

let ctxRoot=process.argv[2];

process.env.CONTEXT_ROOT=ctxRoot;

let baseURL=`http://localhost:8080/${ctxRoot}/`;

let url=require("url");

getOptions=(proxoUrl)=>{
    let options=url.parse(proxoUrl);
    options.cookkieRewrite=true;
    return options;
}

let compiler=webpack();

app.use(
    devMiddleware(compiler,{
       // publicPath :config.output.publicPath,
        noInfo:false,
        stats:{
            colors:true,
            chunks:false
        }
    })
);

app.use(require("webpack-hot-middleware")(compiler));

let proxy= require("proxy-middleware");

app.get("/",(req,res)=>{
res.redirect(`http://localhost:8000/${ctxRoot}/`);
});

app.use(`/${ctxRoot}/`,router);

app.use("*",(req,res,next)=>{
    const filename=path.join(compiler.outputPath,"index.html");
    compiler.outputFileSystem.readFile(filename,(err,result)=>{
        if(err){
            return next(err);
        }
        res.set("content-type","text/html");
        res.send(result);
        res.end();
        return res;
    });
});

app.listen(8000);