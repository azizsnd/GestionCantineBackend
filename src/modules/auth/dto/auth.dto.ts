import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty({ message: 'UserName est obligatoire.' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'password est obligatoire.' })
  password: string;
}
