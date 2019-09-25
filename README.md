# 开发准备
    全局安装 : npm i -g umi
    Git地址 : https://git.dev.tencent.com/DAWi/3D-UMI.git


# 路由
    配置文件路径: '/src/pages/routers.js'
    配置方式和之前差不多,只注意下补充组件的后缀名! 如果修改了路由,需要重新执行 **umi dev**


# 命令
    开发模式: umi dev
    访问地址: http://127.0.0.1:8000
    打包部署: umi build

# 开发
- 与之前一样的模式,只是不用在单独跨越几个文件进行路由操作
- import组件的时候路径可以引用 `@/*` 的模式来弄,以 `/src` 目录为基础 , 建议如果路径跨越两层的时候使用