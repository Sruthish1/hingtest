import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddTreeElementDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @Min(0)
  readonly parentId: number;
}
