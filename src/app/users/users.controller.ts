import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    async index(){
        return await this.userService.findAll();
        
    }
    @Post()
    async store(@Body() body: CreateUserDto){
        //body.password = hashSync(body.password, 10);
        return  await this.userService.store(body);

    }
    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe) id:string ){
        return await this.userService.findOneOrFail({id});

    }
    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id,
    @Body() body: UpdateUserDto){
        return await this.userService.update(id, body);

    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async detroy(@Param('id', new ParseUUIDPipe) id:string ){
        await this.userService.destroy(id);

    }
}
