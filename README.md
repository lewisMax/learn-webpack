# learn-webpack
learn-webpack

### 缓存：
 - babel缓存：让第二次构建速度更快
   - cacheDirectory: true
 - 文件资源缓存：让代码上线运行缓存更好使用
    - hash：每次webpack构建时，会生成一个唯一的hash值。因为js和css同时使用一个hash值，当我们只改动一个文件时，如果重新构建，会导致所有缓存失效。
    - chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就相同。同一个入口引入的资源属于同一个chunk。
    - contenthash：根据文件的内容生成的hash值。不同文件hash值一定不相同。

### tree shaking
  - 作用：去除无用代码，减少代码体积
  - 前提：
    1. 必须使用ES6模块化
    2. 开启production环境
  - 在packpage.json中配置
    - "sideEffects": false，表示所有代码都没有副作用(都可以进行tree shaking)
    - 问题：可能会把css、@babel/polyfill等文件干掉
    - "sideEffects": ["*.css", "*.scss"]表示css文件和scss文件不需要tree shaking

 ### code split
    ```js
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
    ```
    ```js
    // code split
    import(/* webpackChunkName: 'test' */'./test').then(console.log)
    ```
  1. 可以将node_modules中的代码单独打包成一个chunk最终输出。
  2. 自动分析多入口chunk中，有没有公共的文件。如果有，会打包成单独一个chunk。
  3. import动态导入语法，能将某个文件单独打包。

### 懒加载和预加载
- 懒加载：当文件需要使用时才会加载。import动态导入语法，可以实现懒加载(异步加载)
- 预加载 prefetch：会在使用之前，提前加载js文件。会等到其他资源加载完毕，浏览器空闲了，再偷偷加载资源。
- 正常加载：并行加载(同一时间加载多个文件)

```js
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test.js').then(({ add }) => {
    console.log(add(1, 2))
  })
}
```

