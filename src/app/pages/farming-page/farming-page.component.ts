import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { SettingBtnComponent } from '../../components/setting-btn/setting-btn.component';
import { DataBoxComponent } from '../../components/data-box/data-box.component';
import { CtrlBoxComponent } from '../../components/ctrl-box/ctrl-box.component';
import { BleService } from '../../ble.service';

@Component({
  selector: 'app-farming-page',
  standalone: true,
  imports: [CommonModule, LineChartComponent, SettingBtnComponent, DataBoxComponent, CtrlBoxComponent],
  templateUrl: './farming-page.component.html',
  styleUrl: './farming-page.component.scss'
})
export class FarmingPageComponent {
  items1 = [
    {
      name: '环境温度',
      icon: 'iconfont icon-temperature',
      unit: '℃',
      key: 'temperature'
    }, {
      name: '空气湿度',
      icon: 'iconfont icon-humidity',
      unit: '%',
      key: 'humidity'
    }, {
      name: '光照',
      icon: 'iconfont icon-sun',
      unit: 'LX',
      key: 'light'
    }, {
      name: '气压',
      icon: 'iconfont icon-pressure',
      unit: 'pa',
      key: 'pressure'
    }, {
      name: '风向',
      icon: 'iconfont icon-wind-direction',
      unit: '°',
      key: 'windDirection'
    }, {
      name: '风速',
      icon: 'iconfont icon-wind-speed',
      unit: 'm/s',
      key: 'windSpeed'
    }
  ]

  currentName = this.items1[0].name

  items2 = [
    {
      name: '水质',
      icon: 'iconfont icon-water',
      unit: 'mg/L',
      key: 'waterQuality'
    }, {
      name: '降雨量',
      icon: 'iconfont icon-rainfall',
      unit: 'mm/h',
      key: 'rainfall'
    }
  ]

  items3 = [
    {
      name: '灌溉',
      icon: 'iconfont icon-pipe',
      key: 'irrigation',
      state: false
    }, {
      name: '通风',
      icon: 'iconfont icon-fan',
      key: 'fan',
      state: false
    }, {
      name: '补光灯',
      icon: 'iconfont icon-light2',
      key: 'light',
      state: false
    }, {
      name: '风车',
      icon: 'iconfont icon-windmill',
      key: 'windmill',
      state: false
    }, {
      name: '功能1',
      icon: 'iconfont icon-setting',
      key: 'c1',
      state: false
    }, {
      name: '功能2',
      icon: 'iconfont icon-setting',
      key: 'c2',
      state: false
    }
  ]

  constructor(
    private bleService: BleService
  ) { }

  selectItem(item) {
    this.currentName = item.name
  }

  stateChange($event,item) {
    console.log('stateChange',$event);
    this.bleService.sendData(`${item.key}:${$event ? 'on' : 'off'}\n`)
  }
}
