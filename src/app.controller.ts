import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission, UserInfo } from './custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @RequireLogin()
  @RequirePermission('aaa')
  aaaa(@UserInfo('username') username: string, @UserInfo() userInfo) {
    console.log(username);
    console.log(userInfo);
    return 'aaa';
  }

  @Get('bbb')
  @RequirePermission('bbb')
  @SetMetadata('require-login', true)
  bbb() {
    return 'bbb';
  }

  @Get('ccc')
  @RequireLogin()
  @RequirePermission('ccc')
  @SetMetadata('require-login', true)
  ccc(@UserInfo('username') username: string, @UserInfo() userInfo) {
    console.log('username', username);
    console.log('userInfo', userInfo);
    return 'ccc';
  }
}
