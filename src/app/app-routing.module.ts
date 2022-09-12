import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'salary',
    loadChildren: () => import('./salary/salary.module').then( m => m.SalaryPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'attendence',
    loadChildren: () => import('./attendence/attendence.module').then( m => m.AttendencePageModule)
  },
  {
    path: 'blank',
    loadChildren: () => import('./blank/blank.module').then( m => m.BlankPageModule)
  },
  {
    path: 'raise-attendence',
    loadChildren: () => import('./raise-attendence/raise-attendence.module').then( m => m.RaiseAttendencePageModule)
  },
  {
    path: 'raised-request',
    loadChildren: () => import('./raised-request/raised-request.module').then( m => m.RaisedRequestPageModule)
  },
  {
    path: 'approval',
    loadChildren: () => import('./approval/approval.module').then( m => m.ApprovalPageModule)
  },
  {
    path: 'celebration',
    loadChildren: () => import('./celebration/celebration.module').then( m => m.CelebrationPageModule)
  },
  {
    path: 'hr-admin',
    loadChildren: () => import('./hr-admin/hr-admin.module').then( m => m.HrAdminPageModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'l-d',
    loadChildren: () => import('./l-d/l-d.module').then( m => m.LDPageModule)
  },
  {
    path: 'salary-incentive',
    loadChildren: () => import('./salary-incentive/salary-incentive.module').then( m => m.SalaryIncentivePageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'leave',
    loadChildren: () => import('./leave/leave.module').then( m => m.LeavePageModule)
  },
  {
    path: 'travel-n-stay',
    loadChildren: () => import('./travel-n-stay/travel-n-stay.module').then( m => m.TravelNStayPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'travel-request',
    loadChildren: () => import('./travel-request/travel-request.module').then( m => m.TravelRequestPageModule)
  },
  {
    path: 'advanced-request',
    loadChildren: () => import('./advanced-request/advanced-request.module').then( m => m.AdvancedRequestPageModule)
  },
  {
    path: 'guest-house',
    loadChildren: () => import('./guest-house/guest-house.module').then( m => m.GuestHousePageModule)
  },
  {
    path: 'birthday',
    loadChildren: () => import('./birthday/birthday.module').then( m => m.BirthdayPageModule)
  },
  {
    path: 'aniversary',
    loadChildren: () => import('./aniversary/aniversary.module').then( m => m.AniversaryPageModule)
  },
  {
    path: 'travel-entitlement',
    loadChildren: () => import('./travel-entitlement/travel-entitlement.module').then( m => m.TravelEntitlementPageModule)
  },
  {
    path: 'vehicle-request',
    loadChildren: () => import('./vehicle-request/vehicle-request.module').then( m => m.VehicleRequestPageModule)
  },
  {
    path: 'travel-request-show',
    loadChildren: () => import('./travel-request-show/travel-request-show.module').then( m => m.TravelRequestShowPageModule)
  },
  {
    path: 'travel-reimbersment-modal',
    loadChildren: () => import('./travel-reimbersment-modal/travel-reimbersment-modal.module').then( m => m.TravelReimbersmentModalPageModule)
  },
  {
    path: 'travel-doc-modal',
    loadChildren: () => import('./travel-doc-modal/travel-doc-modal.module').then( m => m.TravelDocModalPageModule)
  },
  {
    path: 'ask-hr-form',
    loadChildren: () => import('./ask-hr-form/ask-hr-form.module').then( m => m.AskHrFormPageModule)
  },
  {
    path: 'ask-hr',
    loadChildren: () => import('./ask-hr/ask-hr.module').then( m => m.AskHRPageModule)
  },
  {
    path: 'ask-hr-queries',
    loadChildren: () => import('./ask-hr-queries/ask-hr-queries.module').then( m => m.AskHrQueriesPageModule)
  },
  {
    path: 'polls',
    loadChildren: () => import('./polls/polls.module').then( m => m.PollsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'org-chart',
    loadChildren: () => import('./org-chart/org-chart.module').then( m => m.OrgChartPageModule)
  },
  {
    path: 'event-detail',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'travel-approval',
    loadChildren: () => import('./travel-approval/travel-approval.module').then( m => m.TravelApprovalPageModule)
  },
  {
    path: 'warning',
    loadChildren: () => import('./warning/warning.module').then( m => m.WarningPageModule)
  },
  {
    path: 'appreciation',
    loadChildren: () => import('./appreciation/appreciation.module').then( m => m.AppreciationPageModule)
  },
  {
    path: 'task-modal',
    loadChildren: () => import('./task-modal/task-modal.module').then( m => m.TaskModalPageModule)
  },
  {
    path: 'miss-punch-approval',
    loadChildren: () => import('./miss-punch-approval/miss-punch-approval.module').then( m => m.MissPunchApprovalPageModule)
  },
  {
    path: 'claim-requests',
    loadChildren: () => import('./claim-requests/claim-requests.module').then( m => m.ClaimRequestsPageModule)
  },
  {
    path: 'new-task-modal',
    loadChildren: () => import('./new-task-modal/new-task-modal.module').then( m => m.NewTaskModalPageModule)
  },
  {
    path: 'task-master',
    loadChildren: () => import('./task-master/task-master.module').then( m => m.TaskMasterPageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'travel-entitlement-modal',
    loadChildren: () => import('./travel-entitlement-modal/travel-entitlement-modal.module').then( m => m.TravelEntitlementModalPageModule)
  },
  {
    path: 'travel-desk',
    loadChildren: () => import('./travel-desk/travel-desk.module').then( m => m.TravelDeskPageModule)
  },
  {
    path: 'travel-desk-modal',
    loadChildren: () => import('./travel-desk-modal/travel-desk-modal.module').then( m => m.TravelDeskModalPageModule)
  },
  {
    path: 'l-d-admin',
    loadChildren: () => import('./l-d-admin/l-d-admin.module').then( m => m.LDAdminPageModule)
  },
  {
    path: 'claims-detail',
    loadChildren: () => import('./claims-detail/claims-detail.module').then( m => m.ClaimsDetailPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'emp-performance',
    loadChildren: () => import('./emp-performance/emp-performance.module').then( m => m.EmpPerformancePageModule)
  },
  {
    path: 'check-list',
    loadChildren: () => import('./check-list/check-list.module').then( m => m.CheckListPageModule)
  },
  {
    path: 'check-list-form',
    loadChildren: () => import('./check-list-form/check-list-form.module').then( m => m.CheckListFormPageModule)
  },
  {
    path: 'send-wishes',
    loadChildren: () => import('./send-wishes/send-wishes.module').then( m => m.SendWishesPageModule)
  },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
  {
    path: 'my-leaves',
    loadChildren: () => import('./my-leaves/my-leaves.module').then( m => m.MyLeavesPageModule)
  },
  {
    path: 'leave-form',
    loadChildren: () => import('./leave-form/leave-form.module').then( m => m.LeaveFormPageModule)
  },
  {
    path: 'leave-approval',
    loadChildren: () => import('./leave-approval/leave-approval.module').then( m => m.LeaveApprovalPageModule)
  },
  {
    path: 'my-calendar',
    loadChildren: () => import('./my-calendar/my-calendar.module').then( m => m.MyCalendarPageModule)
  },
  {
    path: 'appraisal',
    loadChildren: () => import('./appraisal/appraisal.module').then( m => m.AppraisalPageModule)
  },
  {
    path: 'appraisal-details',
    loadChildren: () => import('./appraisal-details/appraisal-details.module').then( m => m.AppraisalDetailsPageModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then( m => m.LearningPageModule)
  },
  {
    path: 'chapters',
    loadChildren: () => import('./chapters/chapters.module').then( m => m.ChaptersPageModule)
  },
  {
    path: 'chapter-detail',
    loadChildren: () => import('./chapter-detail/chapter-detail.module').then( m => m.ChapterDetailPageModule)
  },
  {
    path: 'all-answers',
    loadChildren: () => import('./all-answers/all-answers.module').then( m => m.AllAnswersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
