import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { RegExHelper } from "src/helpers/regex.helpers";
import {MessagesHelper} from "src/helpers/messages.helper";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;
    
    @IsNotEmpty()
    lastName: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;

}