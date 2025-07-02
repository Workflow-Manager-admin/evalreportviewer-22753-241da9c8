import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EvaluationReportComponent } from './components/evaluation-report/evaluation-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EvaluationReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Evaluation Report Viewer';
}
