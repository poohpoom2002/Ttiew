import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    // @Get(':id')
    // async getUserProfile(@Param('id') id: string) {
    //   return this.adminService.findByUserId(id);
    // }
  
    // @Get()
    // async getAll(@Param('id') id: string) {
    //   return this.adminService.findAll();
    // }
}
