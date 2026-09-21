import { Component } from '@angular/core';
import { ClientModel } from './client.model';
import { SectionModel } from './section-model';
export class Suggestion {
  suggestion?:string 
  email!: string;
  section!: SectionModel; // reference Section entity
  messages!: string;
  clientId!: ClientModel; // reference Client entity

}
