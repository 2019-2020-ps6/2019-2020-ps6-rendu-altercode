import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public admin = false;
  title = 'Alter-code';

  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.admin.subscribe((data) => {
      if (data != null) {
        this.admin = data;
      }
    });
  }
}
