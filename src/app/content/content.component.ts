import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  ConfigDataService } from './service/config-data.service'; // Adjust the path accordingly


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() configName!: string; // Key to fetch data
  @Input() allowEdit!: boolean; // Flag to allow editing
  text: string = ''; // Variable to hold the text value
  isCueCardVisible: boolean = false; // To control the visibility of the cue card

  constructor(private configDataService: ConfigDataService) {}

  ngOnInit() {
    console.log('allow edit', this.allowEdit);
    // this.observeConfig();
  }

  private observeConfig() {
    this.configDataService.configData$.subscribe((data) => {
      const configData = data.find((item) => item.name === this.configName); // Find the config data by name
      this.text = configData?.value || 'missing config name';
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allowEdit) {
      console.log('allow edit changed', this.allowEdit);
      this.allowEdit = changes.allowEdit.currentValue;
      // Re-render the HTML view here
    }
    this.observeConfig();
  }

  toggleCueCard() {
    this.isCueCardVisible = !this.isCueCardVisible;
  }

  // Method to handle the emitted event from CueCardComponent
  onTextUpdated() {
    this.isCueCardVisible = false; // Set the cue card visibility to false
  }
}
