npm run install 依赖

npm run start 运行

```
experss_serve （结构树声明）
├─ @types                   //声明文件
│  └─ express.d.ts
├─ app.ts 
├─ common                    //公共模块
│  ├─ IP.ts
│  ├─ returned.ts
│  └─ setting.ts
├─ controllers               //接口配置
│  ├─ cateContrologin.ts
│  ├─ cateControsign.ts
│  └─ cateControUploder.ts
├─ package-lock.json
├─ package.json              //资源配置
├─ public                    //公共资源
│  ├─ images
│  ├─ javascripts
│  └─ stylesheets
├─ README.md
├─ routes                    //路由配置
│  ├─ login.ts
│  ├─ sign.ts
│  └─ uploader.ts
├─ token //token配置
│  └─ token.ts
├─ tsconfig.json
├─ util                     //接口封装 || sql语句封装
│  ├─ dbconfig.ts
│  ├─ json.js
│  ├─ mysqlConfig.ts
│  └─ sql.ts
└─ views 
   ├─ error.jade
   ├─ index.jade
   └─ layout.jade

```

备注:端口配置在common stting 里面修改端口号

留名:YD

状态:更新中。。。。