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

    <ng-template #reportModal let-modal>
      <div class="modal-header">
        <h4 class="modal-title">Evaluation Report</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <div class="report-content">
          {{ reportContent }}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.dismiss()">Cancel</button>
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
Quarter: Q4 2023

Executive Summary:
This comprehensive evaluation report provides an in-depth analysis of performance metrics, achievements, and areas for improvement during the fourth quarter of 2023. The assessment covers multiple dimensions including project delivery, technical skills, collaboration, and professional development.

Key Achievements:
1. Project Milestones
   - Successfully delivered the customer portal redesign project ahead of schedule
   - Implemented new security protocols across all cloud infrastructure
   - Optimized database performance resulting in 40% faster query response times

2. Technical Contributions
   - Developed and deployed 5 new microservices
   - Reduced system downtime by 75% through improved monitoring
   - Implemented automated testing framework increasing code coverage to 90%

3. Team Collaboration
   - Led weekly technical knowledge sharing sessions
   - Mentored 2 junior developers
   - Contributed to cross-team architecture planning sessions

Areas for Improvement:
1. Documentation
   - Enhance API documentation coverage
   - Improve technical specification detail level

2. Process Optimization
   - Streamline code review process
   - Reduce time spent in meetings

Key Metrics:
- Code Quality Score: 94/100
- Customer Satisfaction: 4.8/5.0
- Project Delivery On-Time Rate: 95%
- Bug Resolution Time: Average 1.2 days

Recommendations:
1. Focus on knowledge transfer through enhanced documentation
2. Participate in advanced cloud architecture certification
3. Continue leading technical innovation initiatives

Next Quarter Goals:
1. Complete system migration to kubernetes
2. Implement machine learning pipeline
3. Achieve 100% test coverage

Development Goals:
- Advanced cloud architecture certification
- Public speaking at tech conferences
- Leadership skill development

Conclusion:
Overall performance exceeds expectations with significant contributions to team success and project delivery. Continue focusing on documentation and process improvements while maintaining excellent technical delivery standards.`;

  openReport() {
    if (this.isBrowser) {
      this.modalService.open(this.reportModal, { 
        size: 'lg',
        centered: true,
        scrollable: true,
        backdrop: 'static'
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
