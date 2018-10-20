import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule  } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SwansAppService } from './swans.app.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationpickerModule } from './locationpicker';
import { UserService } from './service/user.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LocationpickerModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    IntroComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    SwansAppService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
