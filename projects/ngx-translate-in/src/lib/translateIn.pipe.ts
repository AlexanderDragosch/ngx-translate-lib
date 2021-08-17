import { Pipe, PipeTransform } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'translateIn',
})
export class TranslateInPipe implements PipeTransform {
  constructor(
    private readonly translateLoader: TranslateLoader,
    private readonly translate: TranslateService) {}

  transform(key: string, lang: string): Observable<string> {
    const translateIn = this.translate.getLangs().includes(lang)
      ? lang
      : this.translate.currentLang;
    
    return this.translateLoader.getTranslation(translateIn)
      .pipe(
        map((res) => {
          let translation = res;
          key.split('.').forEach((k) => {
            translation = translation[k];
          });
          return translation as string;
        })
      );
  }
}
