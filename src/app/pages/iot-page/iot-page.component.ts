import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { SettingBtnComponent } from '../../components/setting-btn/setting-btn.component';
import { DataBoxComponent } from '../../components/data-box/data-box.component';
import { CtrlBoxComponent } from '../../components/ctrl-box/ctrl-box.component';
import { BleService } from '../../ble.service';
import { InputBoxComponent } from '../../components/input-box/input-box.component';
import { DeviceTitleComponent } from '../../components/device-title/device-title.component';
import { FARMING_CONFIG, SMARTHOME_CONFIG, WEATHER_CONFIG } from '../../configs/device.confit';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iot-page',
  standalone: true,
  imports: [CommonModule, LineChartComponent, SettingBtnComponent, DataBoxComponent, CtrlBoxComponent,
    InputBoxComponent,
    DeviceTitleComponent],
  templateUrl: './iot-page.component.html',
  styleUrl: './iot-page.component.scss'
})
export class IotPageComponent {

  items1 = []

  items3 = []

  currentItem;

  config;

  constructor(
    private bleService: BleService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      switch (params['devicename']) {
        case 'smarthome':
          this.config = SMARTHOME_CONFIG
          break;
        case 'farming':
          this.config = FARMING_CONFIG
          break;
        case 'weather':
          this.config = WEATHER_CONFIG
          break;
        default:
          break;
      }

      this.items1 = []
      this.items3 = []
      this.currentItem = null;

      this.config.widgets.filter(item => item.type == 'number').forEach(item => {
        this.items1.push(item)
      })
      this.config.widgets.filter(item => item.type == 'switch' || item.type === 'input').forEach(item => {
        this.items3.push(item)
      })
      this.currentItem = this.items1[0]
    });

  }

  selectItem(item) {
    this.currentItem = item
  }

  stateChange($event, item) {
    console.log('stateChange', $event);
    this.bleService.sendData(`${item.key}:${$event ? 'on' : 'off'}\n`)
  }

  textChange(text) {
    this.bleService.sendData(`text:${text}\n`)
  }
}