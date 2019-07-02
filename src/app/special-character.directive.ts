import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[appSpecialCharacter]'
})

export class SpecialCharacterDirective {

  regexStr = '^[a-zA-Z0-9_]*$';
  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: ClipboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').replace(/[^a-zA-Z0-9 ]/g, '');
    document.execCommand('insertHTML', false, pasteData);
  }
}
