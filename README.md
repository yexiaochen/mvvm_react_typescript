在写 [关于MVC模式简单代码实现](http://www.yexiaochen.com/%E5%85%B3%E4%BA%8EMVC%E6%A8%A1%E5%BC%8F%E7%AE%80%E5%8D%95%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0/) 的过程中，觉得最麻烦的就是操作 DOM。所以这次换升级了，打算用 React。用过 React 的同学都知道，React 在更新视图时，必须要通过 `setState` 方式改变状态，这一过程是需要我们主动调用的。而 Vue 是通过对 `data` 下的变量赋值直接更新了视图，Vue 之所以这么简单，是因为采用了数据劫持的方式。所以，这次的目的就是在 React 的基础上实现和 Vue 类似的效果。

实现思路就是利用高阶组件里的反向继承对包裹组件的 `state` 劫持。这是一个练手的小项目，没考虑那么多。为什么这么闲呢，那是因为之前写了 [用Type驯化JavaScript](http://www.yexiaochen.com/%E7%94%A8Type%E9%A9%AF%E5%8C%96JavaScript/) 这篇文章，所以就捣鼓出这么一个玩意。

所有代码可见[github](https://github.com/yexiaochen/mvvm_react_typescript)

<center>

![MVVM](../images/mvvm_typescript_React.gif)

</center>

```JavaScript
// Mvvm.tsx
const hocExtends = (WrapperComponent: ComponentClass) => (
  class extends WrapperComponent {
    constructor(props: any) {
      super(props);
    }
    render() {
      let self = this;
      this.state = new Proxy({ ...this.state }, {
        get: function (target, key, receiver) {
          return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver): any {
          self.setState({
            [key]: value
          })
          return Reflect.set(target, key, value, receiver);
        }
      })
      return super.render()
    }
  }
)

......
filterSearchStuff(searchStuff: string): void {
    const { stuffData } = this.state;
    let stuffItem: IStuff = stuffData.find((item: IStuff) => item.stuff === searchStuff)
    this.state.stuffItem = stuffItem;
    // this.setState({
    //   stuffItem
    // })
  }
......
```