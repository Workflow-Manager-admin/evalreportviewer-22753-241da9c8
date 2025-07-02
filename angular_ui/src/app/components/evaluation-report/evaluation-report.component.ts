import { Component, ViewChild, ElementRef, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evaluation-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <button class="btn btn-primary" (click)="openReport()">
        View Evaluation Report
      </button>
    </div>

    <ng-template #reportModal let-modalRef="ngbModal">
      <div class="modal-header">
        <h4 class="modal-title">Evaluation Report</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="modalRef.dismiss()"></button>
      </div>
      <div class="modal-body">
        <div class="report-content">
          {{ reportContent }}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modalRef.dismiss()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="downloadReport()">Download Report</button>
      </div>
    </ng-template>
  `,
  styles: [`
    .report-content {
      white-space: pre-line;
      max-height: 70vh;
      overflow-y: auto;
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      padding: 10px;
    }
    
    .modal-header {
      background-color: #8a39c0;
      color: white;
    }
    
    .btn-primary {
      background-color: #8a39c0;
      border-color: #8a39c0;
    }
    
    .btn-primary:hover {
      background-color: #7329a1;
      border-color: #7329a1;
    }
    
    .btn-secondary {
      background-color: #6c757d;
      border-color: #6c757d;
    }
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
    }
  `]
})
export class EvaluationReportComponent {
  @ViewChild('reportModal') reportModal!: ElementRef;
  private modalService = inject(NgbModal);
  private isBrowser: boolean;
  private document = inject(DOCUMENT);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  reportContent: string = `Performance Evaluation Report
[... same report content as before ...]`;

  openReport() {
    if (this.isBrowser) {
      this.modalService.open(this.reportModal, { 
        size: 'lg',
        centered: true,
        scrollable: true
      });
    }
  }

  downloadReport() {
    if (this.isBrowser) {
      const blob = new Blob([this.reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = this.document.createElement('a');
      link.href = url;
      link.download = 'evaluation_report.txt';
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}
