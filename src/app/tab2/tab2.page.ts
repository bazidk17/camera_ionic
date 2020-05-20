import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  event={
    title:'',
    desc:'',
    startTime:'',
    endTime:'',
    allDay:false
  }

  minDate=new Date().toISOString();

  eventSource=[]

  calendar={
    mode:'month',
    currentDate:new Date()
  }

  viewTitle="";

  @ViewChild(CalendarComponent) myCal:CalendarComponent;

  constructor(private alertCtrl:AlertController, @Inject(LOCALE_ID)private locale:string) {}

  ngOnInit(){
    this.resetEvents();
  }

  resetEvents(){
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  addEvent(){
    let eventCopy={
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay
    };

    if (eventCopy.allDay){
      let start=eventCopy.startTime;
      let end = eventCopy.endTime;


      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()+1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvents();
  }

  changeMode(mode){
    this.calendar.mode=mode;
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currentDate=new Date();
  }

  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;

  }

  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}
