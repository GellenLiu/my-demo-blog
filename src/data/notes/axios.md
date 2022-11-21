       
   二次封装    
       params替换url中的#{},赋值给axios的url
       body赋值给axios的data
       query赋值给axios的params
       
        _config.url = _config.url?.replace(/#{(.*?)}/g, (_, name: string) => (`${params?.param?.[name] ?? ''}`).trim());
            _config.data = params?.body;
            _config.params = params?.query;


// replace可以是函数，第一个参数是整个字符串，第二个参数是当前匹配到的字符串。每次replace都调用这个函数。


{
    // url上的路径参数#{}
    params: {

    },
    // url后端接的？参数
    query: {

    },
    // 请求数据，json/form-data
    body: {}
}
