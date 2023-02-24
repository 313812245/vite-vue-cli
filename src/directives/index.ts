export default {
  /**
   * 监听元素宽高变化
   */
  resize: {
    bind(el: any, binding) {
      let width = '',
        height = '';
      function isReize() {
        const defaultView: any = document.defaultView;
        const style = defaultView.getComputedStyle(el);
        if (width !== style.width || height !== style.height) {
          binding.value({ width: style.width, height: style.height });
        }
        width = style.width;
        height = style.height;
      }

      el.__vueSetInterval__ = setInterval(isReize, 300);
    },
    unbind(el: any) {
      clearInterval(el.__vueSetInterval__);
    },
  },
  /**
   * 点击url下载文件
   */
  download: {
    bind(el, binding) {
      el.addEventListener('click', () => {
        console.log(binding.value); // url,fileName
        const a = document.createElement('a');
        //   let url = baseUrl + binding.value // 若是不完整的url则需要拼接baseURL
        const url = binding.value.url; // 完整的url则直接使用
        // 这里是将url转成blob地址，
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob);
            a.download = binding.value.fileName; // 下载文件的名字
            // a.download = url.split('/')[url.split('/').length -1] //  // 下载文件的名字
            document.body.appendChild(a);
            a.click();
          });
      });
    },
  },
};
