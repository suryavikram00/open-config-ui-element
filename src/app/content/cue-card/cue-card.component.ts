import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigDataService } from '../service/config-data.service';



@Component({
  selector: 'app-cue-card',
  templateUrl: './cue-card.component.html',
})
export class CueCardComponent {
  @Input() text: string = ''; // Original text to display
  @Input() configName!: string; // Key to identify which header data to update
  @Output() textUpdated = new EventEmitter<void>(); // Event emitter to notify parent


  updatedText: string = ''; // Local copy for editing

  constructor(private configDataService: ConfigDataService) {}

  ngOnInit() {
    this.updatedText = this.text; // Initialize updatedText with the original text
  }

  // Method to update the text in the header data service
  updateText() {    
    this.configDataService.updateConfigData({ name: this.configName, value: this.updatedText });
    this.textUpdated.emit(); // Emit event to notify parent
  }
}
