import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class EngagementQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  likes: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  comments: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  followers: number;
}
