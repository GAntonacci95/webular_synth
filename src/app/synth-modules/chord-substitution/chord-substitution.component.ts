import { Component, OnInit } from '@angular/core';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';
import { MessageService } from 'src/app/services/message.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { Chord } from './Chord';
import {  } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

@Component({
  selector: 'app-chord-substitution',
  templateUrl: './chord-substitution.component.html',
  styleUrls: ['./chord-substitution.component.scss']
})
export class ChordSubstitutionComponent implements OnInit, IObserver<Chord> {

  private prova: number;
  private a: number;
  private chord1: Chord;
  private chord2: Chord;

  constructor(
    private substitutionManager: SubstitutionManagerService,
    private messageService: MessageService
    ) { }

  update(arg: Chord): void {
    console.log('received', arg);

  }

  ngOnInit() {
    this.chord1 = new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('maj7'));
    this.chord2 = new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'));
    this.substitutionManager.attach(this);
    // console.log(this.chord1);
  }

  sendMessage() {
    this.messageService.sendMessage([this.chord1, this.chord2, 3]);
  }
}