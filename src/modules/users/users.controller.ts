import { Controller, Get, Body, Put, Param, Delete, UsePipes, Query, ParseIntPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserRequestDto } from './users.dto'
import { SearchRequestDto } from '../../common/pagination.dto'
import { MainValidationPipe } from '../../common/validation.pipe'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.usersService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Get('profile/:username')
    async profile(@Param('username') username: string) {
        return this.usersService.profile(username)
    }

    @Put('update/:username')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async update(@Param('username') username: string, @Body() data: UserRequestDto) {
        return this.usersService.update(username, data)
    }

    @Put('update-user/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserRequestDto) {
        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id)
    }
}
