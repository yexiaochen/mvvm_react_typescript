import React, { Component, KeyboardEvent, ComponentClass } from 'react';
import Search from './tsx/Search';
import StuffTable from './tsx/StuffTable';
import ModifyStuff from './tsx/ModifyStuff';
import { IStuff, IState, } from './tsx/interface'
import './Mvvm.css';

const stuffData = [
  {
    stuff: 'person_1',
    scale: '甲',
    salary: '6000'
  },
  {
    stuff: 'person_2',
    scale: '乙',
    salary: '5000'
  },
  {
    stuff: 'person_3',
    scale: '丙',
    salary: '9000'
  }
];

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


class Mvvm extends Component<{}, IState> {
  state: IState = {
    stuffItem: {} as IStuff,
    stuffData: [] as Array<any>
  }
  componentDidMount() {
    this.state.stuffData = stuffData;
    // this.setState({
    //   stuffData: stuffData
    // })
  }
  filterSearchStuff(searchStuff: string): void {
    const { stuffData } = this.state;
    let stuffItem: IStuff = stuffData.find((item: IStuff) => item.stuff === searchStuff)
    this.state.stuffItem = stuffItem;
    // this.setState({
    //   stuffItem
    // })
  }
  modifystuffData(modifyItem: IStuff): void {
    const { stuffData } = this.state;
    let newStuffData = stuffData.map((item: IStuff) => (item.stuff == modifyItem.stuff) && modifyItem || item);
    console.log('this', this)
    this.state.stuffData = newStuffData;
    // this.setState({
    //   stuffData: newStuffData
    // })
  }
  handleSearchChange(event: KeyboardEvent<HTMLInputElement>) {
    let searchStuff = event.currentTarget.value;
    let keyName = event.key;
    if (keyName.toLowerCase() == 'enter') {
      this.filterSearchStuff(searchStuff);
    }
  }
  handleModifyChange(item: IStuff, event: KeyboardEvent<HTMLInputElement>) {
    let modifyItem = event.currentTarget.value;
    let type = event.currentTarget.dataset.type;
    let keyName = event.key;
    item[type!] = modifyItem;
    if (keyName.toLowerCase() == 'enter') {
      this.modifystuffData(item);
    }
  }
  render() {
    const { stuffData, stuffItem } = this.state;
    const searchProps = {
      handleSearchChange: this.handleSearchChange.bind(this)
    }
    const stuffTableProps = {
      stuffData
    }
    const modifyStuff = {
      stuffItem,
      handleModifyChange: this.handleModifyChange.bind(this),
    }
    return (
      <div className="Mvvm">
        <Search  {...searchProps} />
        <StuffTable {...stuffTableProps} />
        <ModifyStuff {...modifyStuff} />
      </div>
    );
  }
}

export default hocExtends(Mvvm);
