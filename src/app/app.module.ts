import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { AuthserviceProvider } from '../providers/authservice/authservice';
import { SalaryPage } from '../pages/salary/salary';
import { InfoPage } from '../pages/info/info';
import { AttendencePage } from '../pages/attendence/attendence';
import { ChartsModule } from 'ng2-charts-x';
import { CountUpModule } from 'countup.js-angular2';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from "@ionic-native/file-opener";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BlankPage } from '../pages/blank/blank';
import { RaiseAttendencePage } from '../pages/raise-attendence/raise-attendence';
import { RaisedRequestPage } from '../pages/raised-request/raised-request';
import { ApprovalPage } from '../pages/approval/approval';
import { CelebrationPage } from '../pages/celebration/celebration';
import { HrAdminPage } from '../pages/hr-admin/hr-admin';
import { FinancePage } from '../pages/finance/finance';
import { LDPage } from '../pages/l-d/l-d';
import { SalaryIncentivePage } from '../pages/salary-incentive/salary-incentive';
import { TaskPage } from '../pages/task/task';
import { LeavePage } from '../pages/leave/leave';
import { TravelNStayPage } from '../pages/travel-n-stay/travel-n-stay';
import { NotificationPage } from '../pages/notification/notification';
// import { ExpressBookingPage } from '../pages/express-booking/express-booking';
import { TravelRequestPage } from '../pages/travel-request/travel-request';
// import { HotelPlanningPage } from '../pages/hotel-planning/hotel-planning';
import { AdvancedRequestPage } from '../pages/advanced-request/advanced-request';
import { GuestHousePage } from '../pages/guest-house/guest-house';
import { BirthdayPage } from '../pages/birthday/birthday';
import { AniversaryPage } from '../pages/aniversary/aniversary';
import { TravelEntitlementPage } from '../pages/travel-entitlement/travel-entitlement';
import { VehicleRequestPage } from '../pages/vehicle-request/vehicle-request';
import { Push } from '@ionic-native/push';
import { TravelRequestShowPage } from '../pages/travel-request-show/travel-request-show';
import { TravelReimbersmentModalPage } from '../pages/travel-reimbersment-modal/travel-reimbersment-modal';
import { TravelDocModalPage } from '../pages/travel-doc-modal/travel-doc-modal';
import { Base64 } from '@ionic-native/base64';
import { AskHrFormPage } from '../pages/ask-hr-form/ask-hr-form';
import { AskHrPage } from '../pages/ask-hr/ask-hr';
import { AskHrQueriesPage } from '../pages/ask-hr-queries/ask-hr-queries';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { PollsPage } from '../pages/polls/polls';
import { EventsPage } from '../pages/events/events';
import { OrgChartPage } from '../pages/org-chart/org-chart';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { DatePipe } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { TravelApprovalPage } from '../pages/travel-approval/travel-approval';
import { WarningPage } from '../pages/warning/warning';
import { AppreciationPage } from '../pages/appreciation/appreciation';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { MissPunchApprovalPage } from '../pages/miss-punch-approval/miss-punch-approval';
import { SQLite } from "@ionic-native/sqlite";
import { ClaimRequestsPage } from '../pages/claim-requests/claim-requests';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { NewTaskModalPage } from '../pages/new-task-modal/new-task-modal';
import { TaskMasterPage } from '../pages/task-master/task-master';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { GalleryPage } from '../pages/gallery/gallery';
import { AddEventPage } from '../pages/add-event/add-event';
import { TravelEntitlementModalPage } from '../pages/travel-entitlement-modal/travel-entitlement-modal';
import { TravelDeskPage } from '../pages/travel-desk/travel-desk';
import { TravelDeskModalPage } from '../pages/travel-desk-modal/travel-desk-modal';
import { LDAdminPage } from '../pages/l-d-admin/l-d-admin';
import { ClaimsDetailPage } from '../pages/claims-detail/claims-detail';
import { BusinessPage } from '../pages/business/business';
import { EmpPerformancePage } from '../pages/emp-performance/emp-performance';
import { CheckListPage } from '../pages/check-list/check-list';
import { CheckListFormPage } from '../pages/check-list-form/check-list-form';
import { SendWishesPage } from '../pages/send-wishes/send-wishes';
import { CreateEventPage } from '../pages/create-event/create-event';
import { MyLeavesPage } from '../pages/my-leaves/my-leaves';
import { LeaveFormPage } from '../pages/leave-form/leave-form';
import { LeaveApprovalPage } from '../pages/leave-approval/leave-approval';
import { MyCalendarPage } from '../pages/my-calendar/my-calendar';
import { AppraisalPage } from '../pages/appraisal/appraisal';
import { AppraisalDetailsPage } from '../pages/appraisal-details/appraisal-details';

import { LearningPage } from '../pages/learning/learning';
import { ChaptersPage } from '../pages/chapters/chapters';
import { ChapterDetailPage } from '../pages/chapter-detail/chapter-detail';
import { AllAnswersPage } from '../pages/all-answers/all-answers';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    BlankPage,
    LoginPage,
    SalaryPage,
    InfoPage,
    AttendencePage,
    RaiseAttendencePage,
    RaisedRequestPage,
    ApprovalPage,
    CelebrationPage,
    HrAdminPage,
    FinancePage,
    HrAdminPage,
    LDPage,
    SalaryIncentivePage,
    TaskPage,
    LeavePage,
    TravelNStayPage,
    NotificationPage,
    // ExpressBookingPage,
    TravelRequestPage,
    // HotelPlanningPage,
    AdvancedRequestPage,
    GuestHousePage,
    BirthdayPage,
    AniversaryPage,
    TravelEntitlementPage,
    VehicleRequestPage,
    TravelRequestShowPage,
    TravelReimbersmentModalPage,
    TravelDocModalPage,
    AskHrFormPage,
    AskHrPage,
    AskHrQueriesPage,
    PollsPage,
    OrgChartPage,
    EventsPage,
    EventDetailPage,
    TravelApprovalPage,
    WarningPage,
    AppreciationPage,
    TaskModalPage,
    MissPunchApprovalPage,
    ClaimRequestsPage,
    NewTaskModalPage,
    TaskMasterPage,
    CreateTaskPage,
    GalleryPage,
    AddEventPage,
    TravelEntitlementModalPage,
    TravelDeskPage,
    TravelDeskModalPage,
    LDAdminPage,
    ClaimsDetailPage,
    BusinessPage,
    EmpPerformancePage,
    CheckListPage,
    CheckListFormPage,
    SendWishesPage,
    CreateEventPage,
    MyLeavesPage,
    LeaveFormPage,
    LeaveApprovalPage,
    MyCalendarPage,
    AppraisalPage,
    AppraisalDetailsPage,
    LearningPage,
    ChaptersPage,
    ChapterDetailPage,
    AllAnswersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule,
    CountUpModule,
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MenuPage,
    LoginPage,
    BlankPage,
    SalaryPage,
    InfoPage,
    AttendencePage,
    RaiseAttendencePage,
    RaisedRequestPage,
    ApprovalPage,
    CelebrationPage,
    HrAdminPage,
    FinancePage,
    HrAdminPage,
    LDPage,
    SalaryIncentivePage,
    TaskPage,
    LeavePage,
    TravelNStayPage,
    NotificationPage,
    // ExpressBookingPage,
    TravelRequestPage,
    // HotelPlanningPage,
    AdvancedRequestPage,
    GuestHousePage,
    BirthdayPage,
    AniversaryPage,
    TravelEntitlementPage,
    VehicleRequestPage,
    TravelRequestShowPage,
    TravelReimbersmentModalPage,
    TravelDocModalPage,
    AskHrFormPage,
    AskHrPage,
    AskHrQueriesPage,
    PollsPage,
    OrgChartPage,
    EventsPage,
    EventDetailPage,
    TravelApprovalPage,
    WarningPage,
    AppreciationPage,
    TaskModalPage,
    MissPunchApprovalPage,
    ClaimRequestsPage,
    NewTaskModalPage,
    TaskMasterPage,
    CreateTaskPage,
    GalleryPage,
    AddEventPage,
    TravelEntitlementModalPage,
    TravelDeskPage,
    TravelDeskModalPage,
    LDAdminPage,
    ClaimsDetailPage,
    BusinessPage,
    EmpPerformancePage,
    CheckListPage,
    CheckListFormPage,
    SendWishesPage,
    CreateEventPage,
    MyLeavesPage,
    LeaveFormPage,
    LeaveApprovalPage,
    MyCalendarPage,
    AppraisalPage,
    AppraisalDetailsPage,
    LearningPage,
    ChaptersPage,
    ChapterDetailPage,
    AllAnswersPage
  ],
  providers: [
    Base64,
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileTransferObject,
    File,
    FileOpener,
    HttpClientModule,
    HttpModule,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthserviceProvider,
    GlobalVarsProvider,
    DatePipe,
    PhotoViewer,
    SQLite,
    DocumentViewer,
    StreamingMedia,
   
  ]
})
export class AppModule {}
