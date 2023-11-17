import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { CurrentUser } from "../decorators/current-user.decorator";
import { UserDocument } from "./models/user.schema";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Delete(':id')
	async deleteById(@Param() id: string) {
		return this.usersService.deleteById(id);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getUser(
		@CurrentUser() user: UserDocument
	) {
		return user;
	}
}
