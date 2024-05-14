import { Controller, Get } from '@nestjs/common'
import { DashboardService } from './dashboard.service'

@Controller('dashboards')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async countAll() {
        return this.dashboardService.countAll()
    }
}
