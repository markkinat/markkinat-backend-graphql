import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private userServices: UserService) { }

    @Post()
    @HttpCode(201)
    createUser(@Body() createUserInput: CreateUserInput) {
        return this.userServices.createUser(createUserInput);
    }

    @Get()
    @HttpCode(200)
    getUser(@Param("id") id: string): User{
        return this.getUser(id);
    }

    @Get("/address")
    @HttpCode(200)
    async getUserByWalletAddress(@Param("address") address: string): Promise<User>{
        return this.userServices.getUserByWalletAddress(address);
    }

    @Delete()
    @HttpCode(200)
    deleteUserAccount(@Param("address") address: string) {
        
    }
}
